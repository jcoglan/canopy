'use strict'

const Base = require('./base')

class Builder extends Base {
  _tab () {
    return '    '
  }

  _line (source) {
    super._line(source, false)
  }

  _quote (string) {
    string = string.replace(/\\/g, '\\\\')
                   .replace(/'/g, "\\'")
                   .replace(/\x07/g, '\\a')
                   .replace(/\x08/g, '\\b')
                   .replace(/\t/g, '\\t')
                   .replace(/\n/g, '\\n')
                   .replace(/\v/g, '\\v')
                   .replace(/\f/g, '\\f')
                   .replace(/\r/g, '\\r')
                   .replace(/\x1b/g, '\\e')

    return "'" + string + "'"
  }

  comment (lines) {
    return lines.map((line) => '# ' + line)
  }

  package_ (name, actions, block) {
    this._newBuffer('py')
    
    this._line('from collections import defaultdict')
    this._line('import re')
    this._newline()
    this._newline()
    block()
  }

  syntaxNodeClass_ () {
    let name = 'TreeNode'

    this._template('python', 'tree_node.py', { name })
    this._newline()
    this._newline()

    return name
  }

  grammarModule_ (block) {
    this.assign_(this.nullNode_(), 'object()')
    this._newline()
    this._newline()
    this.class_('Grammar', 'object', block)
  }

  compileRegex_ (charClass, name) {
    let regex = charClass.regex
    this.assign_(name, 're.compile(' + this._quote(regex.source) + ')')
    charClass.constName = name
    this._currentScope.methodSeparator = '\n'
  }

  parserClass_ (root) {
    this._template('python', 'parser.py', { root })
  }

  class_ (name, parent, block) {
    this._line('class ' + name + '(' + parent + '):')
    this._scope(block, name, parent)
    this._newline()
    this._newline()
  }

  constructor_ (args, block) {
    this.method_('__init__', args, () => {
      this._line('super(' + this._currentScope.name + ', self).__init__(' + args.join(', ') + ')')
      block()
    })
  }

  method_ (name, args, block) {
    this._write(this._currentScope.methodSeparator)
    this._currentScope.methodSeparator = '\n'
    args = ['self'].concat(args).join(', ')
    this._line('def ' + name + '(' + args + '):')
    this._scope(block)
  }

  cache_ (name, block) {
    let temp      = this.localVars_({ address: this.nullNode_(), index: 'self._offset' }),
        address   = temp.address,
        offset    = temp.index,
        cacheMap  = "self._cache['" + name + "']",
        cacheAddr = cacheMap + '[' + offset + ']'

    this.assign_('cached', cacheMap + '.get(' + offset + ')')

    this.if_('cached', () => {
      this.assign_('self._offset', 'cached[1]')
      this._return('cached[0]')
    })

    block(address)
    this.assign_(cacheAddr, '(' + address + ', self._offset)')
    this._return(address)
  }

  attribute_ (name, value) {
    this.assign_('self.' + name, value)
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
    let input = 'self._input',
        ofs   = 'self._offset',
        temp  = this.localVars_({ chunk: this.null_(), max: ofs + ' + ' + length })

    this.if_(temp.max + ' <= self._input_size', () => {
      this.assign_(temp.chunk, input + '[' + ofs + ':' + temp.max + ']')
    })
    return temp.chunk
  }

  syntaxNode_ (address, start, end, elements, action, nodeClass) {
    let args

    if (action) {
      action = 'self._actions.' + action
      args   = ['self._input', start, end]
    } else {
      action = nodeClass || 'TreeNode'
      args   = ['self._input[' + start + ':' + end + ']', start]
    }
    args.push(elements || this.emptyList_())

    this.assign_(address, action + '(' + args.join(', ') + ')')
    this.assign_('self._offset', end)
  }

  ifNode_ (address, block, else_) {
    this.if_(address + ' is not ' + this.nullNode_(), block, else_)
  }

  unlessNode_ (address, block, else_) {
    this.if_(address + ' is ' + this.nullNode_(), block, else_)
  }

  ifNull_ (elements, block, else_) {
    this.if_(elements + ' is None', block, else_)
  }

  extendNode_ (address, nodeType) {
    let cls = this.localVar_('cls', 'type(' + address + ')')
    this.assign_(address + '.__class__', "type(" + cls + ".__name__ + '" + nodeType + "', (" + cls + ", self._types." + nodeType + "), {})")
  }

  failure_ (address, expected) {
    expected = this._quote(expected)
    this.assign_(address, this.nullNode_())

    this.if_('self._offset > self._failure', () => {
      this.assign_('self._failure', 'self._offset')
      this.assign_('self._expected', '[]')
    })
    this.if_('self._offset == self._failure', () => {
      this.append_('self._expected', expected)
    })
  }

  jump_ (address, name) {
    this.assign_(address, 'self._read_' + name + '()')
  }

  _conditional (kwd, condition, block, else_) {
    this._line(kwd + ' ' + condition + ':')
    this._indent(block)
    if (else_) {
      this._line('else:')
      this._indent(else_)
    }
  }

  if_ (condition, block, else_) {
    this._conditional('if', condition, block, else_)
  }

  loop_ (block) {
    this._conditional('while', 'True', block)
  }

  break_ () {
    this._line('break')
  }

  sizeInRange_ (address, range) {
    if (range[1] === -1) {
      return 'len(' + address + ') >= ' + range[0]
    } else if (range[1] === 0) {
      return 'len(' + address + ') == ' + range[0]
    } else {
      return 'len(' + address + ') >= ' + range[0] + ' and len(' + address + ') <= ' + range[1]
    }
  }

  stringMatch_ (expression, string) {
    return expression + ' == ' + this._quote(string)
  }

  stringMatchCI_ (expression, string) {
    return expression + ' is not None and ' +
      expression + '.lower() == ' + this._quote(string) + '.lower()'
  }

  regexMatch_ (regex, string) {
    return string + ' is not None and Grammar.' + regex + '.search(' + string + ')'
  }

  arrayLookup_ (expression, index) {
    return expression + '[' + index + ']'
  }

  append_ (list, value) {
    this._line(list + '.append(' + value + ')')
  }

  hasChars_ () {
    return 'self._offset < self._input_size'
  }

  nullNode_ () {
    return 'FAILURE'
  }

  offset_ () {
    return 'self._offset'
  }

  emptyList_ () {
    return '[]'
  }

  _emptyString () {
    return "''"
  }

  null_ () {
    return 'None'
  }
}

module.exports = Builder
