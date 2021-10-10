'use strict'

class Builder {
  static create (filename) {
    let builder = new Builder()
    builder.filename = filename
    return builder
  }

  constructor (parent, name) {
    if (parent) {
      this._parent = parent
      this._indentLevel = parent._indentLevel
    } else {
      this._buffer = ''
      this._indentLevel = 0
    }
    this._name = name
    this._methodSeparator = ''
    this._varIndex = {}
  }

  comment (lines) {
    return lines.map((line) => '# ' + line)
  }

  serialize () {
    let files = {}
    files[this._outputPathname()] = this._buffer
    return files
  }

  _outputPathname () {
    return this.filename.replace(/\.peg$/, '.py')
  }

  _write (string) {
    if (this._parent) return this._parent._write(string)
    this._buffer += string
  }

  _indent (block, context) {
    this._indentLevel += 1
    block.call(context, this)
    this._indentLevel -= 1
  }

  _newline () {
    this._write('\n')
  }

  _line (source) {
    let i = this._indentLevel
    while (i--) this._write('    ')
    this._write(source)
    this._newline()
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

  package_ (name, block, context) {
    this._line('from collections import defaultdict')
    this._line('import re')
    this._newline()
    this._newline()
    block.call(context, this)
  }

  syntaxNodeClass_ () {
    let name = 'TreeNode'
    this.class_(name, 'object', (builder) => {
      builder.method_('__init__', ['text', 'offset', 'elements'], (builder) => {
        builder.attribute_('text', 'text')
        builder.attribute_('offset', 'offset')
        builder.attribute_('elements', 'elements')
      })
      builder.method_('__iter__', [], (builder) => {
        builder._line('for el in self.elements:')
        builder._indent((builder) => {
          builder._line('yield el')
        })
      })
    })
    return name
  }

  grammarModule_ (actions, block, context) {
    this.class_('ParseError', 'SyntaxError', (builder) => {
      builder._line('pass')
    })
    this.assign_(this.nullNode_(), 'object()')
    this._newline()
    this._newline()
    this.class_('Grammar', 'object', block, context)
  }

  compileRegex_ (charClass, name) {
    let regex = charClass.regex
    this.assign_(name, 're.compile(' + this._quote(regex.source) + ')')
    charClass.constName = name
    this._methodSeparator = '\n'
  }

  parserClass_ (root) {
    this.class_('Parser', 'Grammar', (builder) => {
      builder.method_('__init__', ['input', 'actions', 'types'], (builder) => {
        builder.attribute_('_input', 'input')
        builder.attribute_('_input_size', 'len(input)')
        builder.attribute_('_actions', 'actions')
        builder.attribute_('_types', 'types')
        builder.attribute_('_offset', '0')
        builder.attribute_('_cache', 'defaultdict(dict)')
        builder.attribute_('_failure', '0')
        builder.attribute_('_expected', '[]')
      })

      builder.method_('parse', [], (builder) => {
        builder.jump_('tree', root)
        builder.if_('tree is not ' + builder.nullNode_() + ' and self._offset == self._input_size', (builder) => {
          builder.return_('tree')
        })
        builder.if_('not self._expected', (builder) => {
          builder.assign_('self._failure', 'self._offset')
          builder.append_('self._expected', "'<EOF>'")
        })
        builder._line('raise ParseError(format_error(self._input, self._failure, self._expected))')
      })
    })

    this._line('def format_error(input, offset, expected):')
    this._indent((builder) => {
     builder._line("lines, line_no, position = input.split('\\n'), 0, 0")
      builder._line('while position <= offset:')
      builder._indent((builder) => {
        builder._line('position += len(lines[line_no]) + 1')
        builder._line('line_no += 1')
      })
      builder._line("message, line = 'Line ' + str(line_no) + ': expected ' + ', '.join(expected) + '\\n', lines[line_no - 1]")
      builder._line("message += line + '\\n'")
      builder._line('position -= len(line) + 1')
      builder._line("message += ' ' * (offset - position)")
      builder.return_("message + '^'")
    })
    this._newline()
  }

  exports_ () {
    this._line('def parse(input, actions=None, types=None):')
    this._indent((builder) => {
      builder.assign_('parser', 'Parser(input, actions, types)')
      builder.return_('parser.parse()')
    })
  }

  class_ (name, parent, block, context) {
    this._line('class ' + name + '(' + parent + '):')
    new Builder(this, name, parent)._indent(block, context)
    this._newline()
    this._newline()
  }

  constructor_ (args, block, context) {
    this.method_('__init__', args, (builder) => {
      builder._line('super(' + this._name + ', self).__init__(' + args.join(', ') + ')')
      block.call(context, builder)
    }, this)
  }

  method_ (name, args, block, context) {
    this._write(this._methodSeparator)
    this._methodSeparator = '\n'
    args = ['self'].concat(args).join(', ')
    this._line('def ' + name + '(' + args + '):')
    new Builder(this)._indent(block, context)
  }

  cache_ (name, block, context) {
    let temp      = this.localVars_({address: this.nullNode_(), index: 'self._offset'}),
        address   = temp.address,
        offset    = temp.index,
        cacheMap  = "self._cache['" + name + "']",
        cacheAddr = cacheMap + '[' + offset + ']'

    this.assign_('cached', cacheMap + '.get(' + offset + ')')

    this.if_('cached', (builder) => {
      builder.assign_('self._offset', 'cached[1]')
      builder.return_('cached[0]')
    })

    block.call(context, this, address)
    this.assign_(cacheAddr, '(' + address + ', self._offset)')
    this.return_(address)
  }

  attributes_ (names) {}

  attribute_ (name, value) {
    this.assign_('self.' + name, value)
  }

  localVars_ (vars) {
    let names = {}, lhs = [], rhs = [], varName
    for (let name in vars) {
      this._varIndex[name] = this._varIndex[name] || 0
      varName = name + this._varIndex[name]
      this._varIndex[name] += 1
      lhs.push(varName)
      rhs.push(vars[name])
      names[name] = varName
    }
    this.assign_(lhs.join(', '), rhs.join(', '))
    return names
  }

  localVar_ (name, value) {
    this._varIndex[name] = this._varIndex[name] || 0
    let varName = name + this._varIndex[name]
    this._varIndex[name] += 1

    if (value === undefined) value = this.nullNode_()
    this.assign_(varName, value)

    return varName
  }

  chunk_ (length) {
    let input = 'self._input',
        ofs   = 'self._offset',
        temp  = this.localVars_({chunk: this.null_(), max: ofs + ' + ' + length})

    this.if_(temp.max + ' <= self._input_size', (builder) => {
      builder.assign_(temp.chunk, input + '[' + ofs + ':' + temp.max + ']')
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

  ifNode_ (address, block, else_, context) {
    this.if_(address + ' is not ' + this.nullNode_(), block, else_, context)
  }

  unlessNode_ (address, block, else_, context) {
    this.if_(address + ' is ' + this.nullNode_(), block, else_, context)
  }

  ifNull_ (elements, block, else_, context) {
    this.if_(elements + ' is None', block, else_, context)
  }

  extendNode_ (address, nodeType) {
    let cls = this.localVar_('cls', 'type(' + address + ')')
    this.assign_(address + '.__class__', "type(" + cls + ".__name__ + '" + nodeType + "', (" + cls + ", self._types." + nodeType + "), {})")
  }

  failure_ (address, expected) {
    expected = this._quote(expected)
    this.assign_(address, this.nullNode_())

    this.if_('self._offset > self._failure', (builder) => {
      builder.assign_('self._failure', 'self._offset')
      builder.assign_('self._expected', '[]')
    })
    this.if_('self._offset == self._failure', (builder) => {
      builder.append_('self._expected', expected)
    })
  }

  assign_ (name, value) {
    this._line(name + ' = ' + value)
  }

  jump_ (address, name) {
    this.assign_(address, 'self._read_' + name + '()')
  }

  if_ (condition, block, else_, context) {
    if (typeof else_ !== 'function') {
      context = else_
      else_   = null
    }
    this._line('if ' + condition + ':')
    this._indent(block, context)
    if (else_) {
      this._line('else:')
      this._indent(else_, context)
    }
  }

  whileNotNull_ (expression, block, context) {
    this._line('while ' + expression + ' is not ' + this.nullNode_() + ':')
    this._indent(block, context)
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

  return_ (expression) {
    this._line('return ' + expression)
  }

  arrayLookup_ (expression, index) {
    return expression + '[' + index + ']'
  }

  append_ (list, value) {
    this._line(list + '.append(' + value + ')')
  }

  decrement_ (variable) {
    this._line(variable + ' -= 1')
  }

  hasChars_ () {
    return 'self._offset < self._input_size'
  }

  isZero_ (expression) {
    return expression + ' <= 0'
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

  emptyString_ () {
    return "''"
  }

  true_ () {
    return 'True'
  }

  null_ () {
    return 'None'
  }
}

module.exports = Builder
