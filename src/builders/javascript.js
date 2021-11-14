'use strict'

const Base = require('./base')
const util = require('../util')

class Builder extends Base {
  _quote (string) {
    string = string.replace(/\\/g, '\\\\')
                   .replace(/'/g, "\\'")
                   .replace(/\x08/g, '\\b')
                   .replace(/\t/g, '\\t')
                   .replace(/\n/g, '\\n')
                   .replace(/\v/g, '\\v')
                   .replace(/\f/g, '\\f')
                   .replace(/\r/g, '\\r')

    return "'" + string + "'"
  }

  comment (lines) {
    lines = lines.map((line) => ' * ' + line)
    return ['/**'].concat(lines).concat([' */'])
  }

  package_ (name, block) {
    this._newBuffer('js')
    
    this._line('(function() {', false)
    this._indent((builder) => {
      builder._line("'use strict'")

      builder._newline()
      builder._line('var formatError = ' + util.formatError.toString())
      builder._newline()
      builder._line('var inherit = ' + util.inherit.toString())

      this._grammarName = name
      block(this)
    })
    this._line('})()')
  }

  syntaxNodeClass_ () {
    let name = 'TreeNode'

    this._newline()
    this._template('javascript', 'tree_node.js', { name })

    return name
  }

  grammarModule_ (actions, block) {
    this._newline()
    this.assign_('var ' + this.nullNode_(), '{}')
    this._newline()
    this._line('var Grammar = {', false)
    this._scope(block)
    this._newline()
    this._line('}')
  }

  parserClass_ (root) {
    let namespace = this._grammarName.split('.'),
        name = namespace.pop()

    this._newline()
    this._template('javascript', 'parser.js', { root, namespace, name })
  }

  class_ (name, parent, block) {
    this._scope(block, name, parent, false)
  }

  constructor_ (args, block) {
    this.function_('var ' + this._currentScope.name, args, (builder) => {
      builder._line(this._currentScope.parent + '.apply(this, arguments)')
      block(builder)
    })
    this._line('inherit(' + this._currentScope.name + ', ' + this._currentScope.parent + ')')
  }

  function_ (name, args, block) {
    this._newline()
    this._line(name + ' = function(' + args.join(', ') + ') {', false)
    this._scope(block)
    this._line('}')
  }

  method_ (name, args, block) {
    this._write(this._currentScope.methodSeparator)
    this._currentScope.methodSeparator = ',\n\n'
    this._line(name + ' (' + args.join(', ') + ') {', false)
    this._scope(block)
    let n = this._indentLevel
    while (n--) this._write('  ')
    this._write('}')
  }

  cache_ (name, block) {
    let temp      = this.localVars_({address: this.nullNode_(), index: 'this._offset'}),
        address   = temp.address,
        offset    = temp.index,
        cacheMap  = 'this._cache._' + name,
        cacheAddr = cacheMap + '[' + offset + ']'

    this.assign_(cacheMap, cacheMap + ' || {}')
    this.assign_('var cached', cacheAddr)

    this.if_('cached', (builder) => {
      builder.assign_('this._offset', 'cached[1]')
      builder.return_('cached[0]')
    })

    block(this, address)
    this.assign_(cacheAddr,  '[' + address + ', this._offset]')
    this.return_(address)
  }

  attribute_ (name, value) {
    this.assign_("this['" + name + "']", value)
  }

  localVars_ (vars) {
    let names = {}, code = []
    for (let name in vars) {
      let varName = this._varName(name)
      code.push(varName + ' = ' + vars[name])
      names[name] = varName
    }
    this._line('var ' + code.join(', '))
    return names
  }

  localVar_ (name, value) {
    let varName = this._varName(name)

    if (value == undefined) value = this.nullNode_()
    this.assign_('var ' + varName, value)

    return varName
  }

  chunk_ (length) {
    let input = 'this._input',
        ofs   = 'this._offset',
        temp  = this.localVars_({chunk: this.null_(), max: ofs + ' + ' + length})

    this.if_(temp.max + ' <= this._inputSize', (builder) => {
      builder._line(temp.chunk + ' = ' + input + '.substring(' + ofs + ', ' + temp.max + ')')
    })
    return temp.chunk
  }

  syntaxNode_ (address, start, end, elements, action, nodeClass) {
    let args

    if (action) {
      action = 'this._actions.' + action
      args   = ['this._input', start, end]
    } else {
      action = 'new ' + (nodeClass || 'TreeNode')
      args   = ['this._input.substring(' + start + ', ' + end + ')', start]
    }
    args.push(elements || this.emptyList_())

    this.assign_(address, action + '(' + args.join(', ') + ')')
    this.assign_('this._offset', end)
  }

  ifNode_ (address, block, else_) {
    this.if_(address + ' !== ' + this.nullNode_(), block, else_)
  }

  unlessNode_ (address, block, else_) {
    this.if_(address + ' === ' + this.nullNode_(), block, else_)
  }

  ifNull_ (elements, block, else_) {
    this.if_(elements + ' === null', block, else_)
  }

  extendNode_ (address, nodeType) {
    this._line('Object.assign(' + address + ', this._types.' + nodeType + ')')
  }

  failure_ (address, expected) {
    expected = this._quote(expected)
    this.assign_(address, this.nullNode_())

    this.if_('this._offset > this._failure', (builder) => {
      builder.assign_('this._failure', 'this._offset')
      builder.assign_('this._expected', '[]')
    })
    this.if_('this._offset === this._failure', (builder) => {
      builder.append_('this._expected', expected)
    })
  }

  jump_ (address, rule) {
    this.assign_(address, 'this._read_' + rule + '()')
  }

  conditional_ (kwd, condition, block, else_) {
    this._line(kwd + ' (' + condition + ') {', false)
    this._indent(block)
    if (else_) {
      this._line('} else {', false)
      this._indent(else_)
    }
    this._line('}', false)
  }

  if_ (condition, block, else_) {
    this.conditional_('if', condition, block, else_)
  }

  whileNotNull_ (expression, block) {
    this.conditional_('while', expression + ' !== ' + this.nullNode_(), block)
  }

  stringMatch_ (expression, string) {
    return expression + ' === ' + this._quote(string)
  }

  stringMatchCI_ (expression, string) {
    return expression + ' !== null && ' +
      expression + '.toLowerCase() === ' + this._quote(string) + '.toLowerCase()'
  }

  regexMatch_ (regex, string) {
    return string + ' !== null && /' + regex.source + '/.test(' + string + ')'
  }

  arrayLookup_ (expression, offset) {
    return expression + '[' + offset + ']'
  }

  append_ (list, value, index) {
    if (index === undefined)
      this._line(list + '.push(' + value + ')')
    else
      this._line(list + '[' + index + '] = ' + value)
  }

  hasChars_ () {
    return 'this._offset < this._inputSize'
  }

  nullNode_ () {
    return 'FAILURE'
  }

  offset_ () {
    return 'this._offset'
  }

  emptyList_ (size) {
    return size ? 'new Array(' + size + ')' : '[]'
  }

  emptyString_ () {
    return "''"
  }

  true_ () {
    return 'true'
  }

  null_ () {
    return 'null'
  }
}

module.exports = Builder
