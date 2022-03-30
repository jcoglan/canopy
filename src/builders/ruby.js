'use strict'

const Base = require('./base')

class Builder extends Base {
  _line (source) {
    super._line(source, false)
  }

  _quote (string) {
    string = string.replace(/\\/g, '\\\\')
                   .replace(/"/g, '\\"')
                   .replace(/#\{/g, '\\#{')
                   .replace(/\x07/g, '\\a')
                   .replace(/\x08/g, '\\b')
                   .replace(/\t/g, '\\t')
                   .replace(/\n/g, '\\n')
                   .replace(/\v/g, '\\v')
                   .replace(/\f/g, '\\f')
                   .replace(/\r/g, '\\r')
                   .replace(/\x1b/g, '\\e')

    return '"' + string + '"'
  }

  comment (lines) {
    return lines.map((line) => '# ' + line)
  }

  package_ (name, actions, block) {
    this._newBuffer('rb')
    
    this._line('module ' + name.replace(/\./g, '::'))
    this._indent(block)
    this._line('end')
  }

  syntaxNodeClass_ () {
    let name = 'TreeNode'

    this._template('ruby', 'tree_node.rb', { name })
    this._newline()

    return name
  }

  grammarModule_ (block) {
    this.assign_(this.nullNode_(), 'Object.new')
    this._newline()
    this._line('module Grammar')
    this._scope(block)
    this._line('end')
    this._newline()
  }

  parserClass_ (root) {
    this._template('ruby', 'parser.rb', { root })
  }

  class_ (name, parent, block) {
    this._line('class ' + name + ' < ' + parent)
    this._scope(block)
    this._line('end')
    this._newline()
  }

  constructor_ (args, block) {
    this.method_('initialize', args, () => {
      this._line('super')
      block()
    })
  }

  method_ (name, args, block) {
    this._write(this._currentScope.methodSeparator)
    this._currentScope.methodSeparator = '\n'
    args = (args.length > 0) ? '(' + args.join(', ') + ')' : ''
    this._line('def ' + name + args)
    this._scope(block)
    this._line('end')
  }

  cache_ (name, block) {
    let temp      = this.localVars_({address: this.nullNode_(), index: '@offset'}),
        address   = temp.address,
        offset    = temp.index,
        cacheMap  = '@cache[:' + name + ']',
        cacheAddr = cacheMap + '[' + offset + ']'

    this.assign_('cached', cacheAddr)

    this.if_('cached', () => {
      this._line('@offset = cached[1]')
      this.return_('cached[0]')
    })

    block(address)
    this.assign_(cacheAddr, '[' + address + ', @offset]')
    this.return_(address)
  }

  attributes_ (names) {
    let keys = []
    for (let name of names) keys.push(':' + name)
    this._line('attr_reader ' + keys.join(', '))
    this._currentScope.methodSeparator = '\n'
  }

  attribute_ (name, value) {
    this.assign_('@' + name, value)
  }

  localVars_ (vars) {
    let names = {}, lhs = [], rhs = []
    for (let name in vars) {
      let varName = this._varName(name)
      lhs.push(varName)
      rhs.push(vars[name])
      names[name] = varName
    }
    this.assign_(lhs.join(', '), rhs.join(', '))
    return names
  }

  localVar_ (name, value) {
    let varName = this._varName(name)

    if (value === undefined) value = this.nullNode_()
    this.assign_(varName, value)

    return varName
  }

  chunk_ (length) {
    let input = '@input',
        ofs   = '@offset',
        temp  = this.localVars_({chunk: this.null_(), max: ofs + ' + ' + length})

    this.if_(temp.max + ' <= @input_size', () => {
      this.assign_(temp.chunk, input + '[' + ofs + '...' + temp.max + ']')
    })
    return temp.chunk
  }

  syntaxNode_ (address, start, end, elements, action, nodeClass) {
    let args

    if (action) {
      action = '@actions.' + action
      args   = ['@input', start, end]
    } else {
      action = (nodeClass || 'TreeNode') + '.new'
      args   = ['@input[' + start + '...' + end + ']', start]
    }
    args.push(elements || this.emptyList_())

    this.assign_(address, action + '(' + args.join(', ') + ')')
    this.assign_('@offset', end)
  }

  ifNode_ (address, block, else_) {
    this.unless_(address + ' == ' + this.nullNode_(), block, else_)
  }

  unlessNode_ (address, block, else_) {
    this.if_(address + ' == ' + this.nullNode_(), block, else_)
  }

  ifNull_ (elements, block, else_) {
    this.if_(elements + '.nil?', block, else_)
  }

  extendNode_ (address, nodeType) {
    this._line(address + '.extend(@types::' + nodeType.replace(/\./g, '::') + ')')
  }

  failure_ (address, expected) {
    expected = this._quote(expected)
    this.assign_(address, this.nullNode_())

    this.if_('@offset > @failure', () => {
      this.assign_('@failure', '@offset')
      this.assign_('@expected', '[]')
    })
    this.if_('@offset == @failure', () => {
      this.append_('@expected', expected)
    })
  }

  jump_ (address, name) {
    this.assign_(address, '_read_' + name)
  }

  conditional_ (type, condition, block, else_) {
    this._line(type + ' ' + condition)
    this._indent(block)
    if (else_) {
      this._line('else')
      this._indent(else_)
    }
    this._line('end')
  }

  if_ (condition, block, else_) {
    this.conditional_('if', condition, block, else_)
  }

  unless_ (condition, block, else_) {
    this.conditional_('unless', condition, block, else_)
  }

  whileNotNull_ (expression, block) {
    this._line('until ' + expression + ' == ' + this.nullNode_())
    this._indent(block)
    this._line('end')
  }

  stringMatch_ (expression, string) {
    return expression + ' == ' + this._quote(string)
  }

  stringMatchCI_ (expression, string) {
    return '!' + expression + '.nil? && ' +
      expression + '.downcase == ' + this._quote(string) + '.downcase'
  }

  regexMatch_ (regex, string) {
    let source = regex.source.replace(/^\^/g, '\\A')
    return string + ' =~ /' + source + '/'
  }

  arrayLookup_ (expression, index) {
    return expression + '[' + index + ']'
  }

  append_ (list, value) {
    this._line(list + ' << ' + value)
  }

  hasChars_ () {
    return '@offset < @input_size'
  }

  nullNode_ () {
    return 'FAILURE'
  }

  offset_ () {
    return '@offset'
  }

  emptyList_ () {
    return '[]'
  }

  emptyString_ () {
    return '""'
  }

  true_ () {
    return 'true'
  }

  null_ () {
    return 'nil'
  }
}

module.exports = Builder
