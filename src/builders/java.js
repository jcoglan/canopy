'use strict'

const { sep } = require('path')
const Base = require('./base')

const TYPES = {
  address:    'TreeNode',
  chunk:      'String',
  elements:   'List<TreeNode>',
  index:      'int',
  max:        'int'
}

class Builder extends Base {
  constructor () {
    super()
    this._labels = {}
  }

  _tab () {
    return '    '
  }

  _initBuffer (pathname) {
    let namespace = pathname.split(sep)
    namespace.pop()
    return 'package ' + namespace.join('.') + ';\n\n'
  }

  _quote (string) {
    string = string.replace(/\\/g, '\\\\')
                   .replace(/"/g, '\\"')
                   .replace(/\x08/g, '\\b')
                   .replace(/\t/g, '\\t')
                   .replace(/\n/g, '\\n')
                   .replace(/\f/g, '\\f')
                   .replace(/\r/g, '\\r')

    return '"' + string + '"'
  }

  comment (lines) {
    lines = lines.map((line) => ' * ' + line)
    return ['/**'].concat(lines).concat([' */'])
  }

  package_ (name, actions, block) {
    this._grammarName = name.replace(/\./g, '')

    this._newBuffer('java', 'Actions')
    this._template('java', 'Actions.java', { actions })

    this._newBuffer('java', 'CacheRecord')
    this._template('java', 'CacheRecord.java')

    block()
  }

  syntaxNodeClass_ () {
    let name = 'TreeNode'

    this._newBuffer('java', name)
    this._template('java', 'TreeNode.java', { name })

    return name
  }

  grammarModule_ (block) {
    this._newBuffer('java', 'Grammar')

    this._line('import java.util.ArrayList')
    this._line('import java.util.HashMap')
    this._line('import java.util.List')
    this._line('import java.util.Map')
    this._line('import java.util.regex.Pattern')
    this._newline()

    this._line('abstract class Grammar {', false)
    this._indent(() => {
      this.assign_('static TreeNode ' + this.nullNode_(), 'new TreeNode()')
      this._newline()

      this._line('int inputSize, offset, failure')
      this._line('String input')
      this._line('List<String> expected')
      this._line('Map<Label, Map<Integer, CacheRecord>> cache')
      this._line('Actions actions')
      this._newline()
      block()
    })
    this._line('}', false)
  }

  compileRegex_ (charClass, name) {
    let regex  = charClass.regex,
        source = regex.source.replace(/^\^/, '\\A')

    this.assign_('private static Pattern ' + name, 'Pattern.compile(' + this._quote(source) + ')')
    charClass.constName = name
  }

  parserClass_ (root) {
    this._newBuffer('java', 'ParseError')
    this._template('java', 'ParseError.java')

    this._newBuffer('java', this._grammarName)
    this._template('java', 'Parser.java', { root, name: this._grammarName })

    let labels = Object.keys(this._labels).sort()

    this._newBuffer('java', 'Label')
    this._template('java', 'Label.java', { labels })
  }

  class_ (name, parent, block) {
    this._newline()
    this._line('class ' + name + ' extends ' + parent + ' {', false)
    this._scope(block, name)
    this._line('}', false)
  }

  constructor_ (args, block) {
    this._line(this._currentScope.name + '(String text, int offset, List<TreeNode> elements) {', false)
    this._indent(() => {
      this._line('super(text, offset, elements)')
      block()
    })
    this._line('}', false)
  }

  method_ (name, args, block) {
    this._newline()
    this._line('TreeNode ' + name + '() {', false)
    this._scope(block)
    this._line('}', false)
  }

  cache_ (name, block) {
    this._labels[name] = true

    let temp    = this.localVars_({address: this.nullNode_(), index: 'offset'}),
        address = temp.address,
        offset  = temp.index

    this.assign_('Map<Integer, CacheRecord> rule', 'cache.get(Label.' + name + ')')
    this.if_('rule == null', () => {
      this.assign_('rule', 'new HashMap<Integer, CacheRecord>()')
      this._line('cache.put(Label.' + name + ', rule)')
    })
    this.if_('rule.containsKey(offset)', () => {
      this.assign_(address, 'rule.get(offset).node')
      this.assign_('offset', 'rule.get(offset).tail')
    }, () => {
      block(address)
      this._line('rule.put(' + offset + ', new CacheRecord(' + address + ', offset))')
    })
    this.return_(address)
  }

  attribute_ (name, value) {
    this._labels[name] = true
    this._line('labelled.put(Label.' + name + ', ' + value + ')')
  }

  localVars_ (vars) {
    let names = {}
    for (let name in vars)
      names[name] = this.localVar_(name, vars[name])
    return names
  }

  localVar_ (name, value) {
    let varName = this._varName(name)

    if (value === undefined) value = this.nullNode_()
    this.assign_(TYPES[name] + ' ' + varName, value)

    return varName
  }

  chunk_ (length) {
    let input = 'input',
        ofs   = 'offset',
        temp  = this.localVars_({chunk: this.null_(), max: ofs + ' + ' + length})

    this.if_(temp.max + ' <= inputSize', () => {
      this._line(temp.chunk + ' = ' + input + '.substring(' + ofs + ', ' + temp.max + ')')
    })
    return temp.chunk
  }

  syntaxNode_ (address, start, end, elements, action, nodeClass) {
    let args

    if (action) {
      action = 'actions.' + action
      args   = ['input', start, end]
    } else {
      action = 'new ' + (nodeClass || 'TreeNode')
      args   = ['input.substring(' + start + ', ' + end + ')', start]
    }
    args.push(elements || this.emptyList_())

    this.assign_(address, action + '(' + args.join(', ') + ')')
    this.assign_('offset', end)
  }

  ifNode_ (address, block, else_) {
    this.if_(address + ' != ' + this.nullNode_(), block, else_)
  }

  unlessNode_ (address, block, else_) {
    this.if_(address + ' == ' + this.nullNode_(), block, else_)
  }

  ifNull_ (elements, block, else_) {
    this.if_(elements + ' == null', block, else_)
  }

  extendNode_ (address, nodeType) {
    // TODO
  }

  failure_ (address, expected) {
    expected = this._quote(expected)
    this.assign_(address, this.nullNode_())

    this.if_('offset > failure', () => {
      this.assign_('failure', 'offset')
      this.assign_('expected', 'new ArrayList<String>()')
    })
    this.if_('offset == failure', () => {
      this.append_('expected', expected)
    })
  }

  jump_ (address, rule) {
    this.assign_(address, '_read_' + rule + '()')
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

  loop_ (block) {
    this.conditional_('while', 'true', block)
  }

  break_ () {
    this._line('break')
  }

  sizeInRange_ (address, range) {
    if (range[1] === -1) {
      return address + '.size() >= ' + range[0]
    } else if (range[1] === 0) {
      return address + '.size() == ' + range[0]
    } else {
      return address + '.size() >= ' + range[0] + ' && ' + address + '.size() <= ' + range[1]
    }
  }

  stringMatch_ (expression, string) {
    return expression + ' != null && ' + expression + '.equals(' + this._quote(string) + ')'
  }

  stringMatchCI_ (expression, string) {
    return expression + ' != null && ' + expression + '.toLowerCase().equals(' + this._quote(string) + '.toLowerCase())'
  }

  regexMatch_ (regex, string) {
    return string + ' != null && ' + regex + '.matcher(' + string + ').matches()'
  }

  arrayLookup_ (expression, offset) {
    return expression + '.get(' + offset + ')'
  }

  append_ (list, value, index) {
    if (index === undefined)
      this._line(list + '.add(' + value + ')')
    else
      this._line(list + '.add(' + index + ', ' + value + ')')
  }

  hasChars_ () {
    return 'offset < inputSize'
  }

  nullNode_ () {
    return 'FAILURE'
  }

  offset_ () {
    return 'offset'
  }

  emptyList_ (size) {
    return 'new ArrayList<TreeNode>(' + (size || '') + ')'
  }

  emptyString_ () {
    return '""'
  }

  true_ () {
    return 'new TreeNode("", -1, ' + this.emptyList_(0) + ')'
  }

  null_ () {
    return 'null'
  }
}

module.exports = Builder
