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
  constructor (...args) {
    super(...args)
    this._labels = new Set()
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
    this._grammarName = name

    this._newBuffer('cs', 'Actions')
    this._template('cs', 'Actions.cs', { actions })

    this._newBuffer('cs', 'CacheRecord')
    this._template('cs', 'CacheRecord.cs')

    block()
  }

  syntaxNodeClass_ () {
    let name = 'TreeNode'

    this._newBuffer('cs', name)
    this._template('cs', 'TreeNode.cs', { name })

    return name
  }

  grammarModule_ (block) {
    this._newBuffer('cs', 'Grammar')

    this._line('using System.Collections')
    this._line('using System.Collections.Generic')
    //this._line('import java.util.List') in System.Collections.Generic
   // this._line('import java.util.Map') gonna use dictionary
    this._line('using System.Text.RegularExpressions')
    this._newline()

    this._line('abstract class Grammar {', false)
    this._indent(() => {
      this.assign_('static TreeNode ' + this.nullNode_(), 'new TreeNode()')
      this._newline()

      this._line('int inputSize, offset, failure')
      this._line('String input')
      this._line('List<String[]> expected')
      this._line('Dictionary<Label, Dictionary<Integer, CacheRecord>> cache')
      this._line('Actions actions')
      this._newline()
      block()
    })
    this._line('}', false)
  }

  compileRegex_ (charClass, name) {
    let regex  = charClass.regex,
        source = regex.source.replace(/^\^/, '\\A')
    this.assign_('private static Regex ' + name, 'new Regex(' + this._quote(source) + ')')
    charClass.constName = name
  }

  parserClass_ (root) {
    this._newBuffer('cs', 'ParseError')
    this._template('cs', 'ParseError.cs')

    let grammar = this._quote(this._grammarName)
    let name = this._grammarName.replace(/\./g, '')
    this._newBuffer('cs', name)
    this._template('cs', 'Parser.cs', { grammar, root, name })

    let labels = [...this._labels].sort()

    this._newBuffer('cs', 'Label')
    this._template('cs', 'Label.cs', { labels })
  }

  class_ (name, parent, block) {
    this._newline()
    this._line('class ' + name + ' : ' + parent + ' {', false)
    this._scope(block, name)
    this._line('}', false)
  }

  constructor_ (args, block) {
    this._line(this._currentScope.name + '(String text, int offset, List<TreeNode> elements) {', false)
    this._indent(() => {
      this._line('base(text, offset, elements)')
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
    this._labels.add(name)

    let temp    = this.localVars_({ address: this.nullNode_(), index: 'offset' }),
        address = temp.address,
        offset  = temp.index

    this.assign_('Dictionary<Integer, CacheRecord> rule', 'cache[Label.' + name + ']')
    this.if_('rule == null', () => {
      this.assign_('rule', 'new Dictionary<Integer, CacheRecord>()')
      this.assign_('cache[Label.' + name + ']',rule)
    })
    this.if_('rule.ContainsKey(offset)', () => {
      this.assign_(address, 'rule[offset].node')
      this.assign_('offset', 'rule[offset].tail')
    }, () => {
      block(address)
      this.assign_('rule[' + offset + ']', 'new CacheRecord(' + address + ', offset)')
    })
    this._return(address)
  }

  attribute_ (name, value) {
    this._labels.add(name)
    this.assign_('labelled[Label.' + name + ']', value)
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
        temp  = this.localVars_({ chunk: this.null_(), max: ofs + ' + ' + length })

    this.if_(temp.max + ' <= inputSize', () => {
      this._line(temp.chunk + ' = ' + input + '.Substring(' + ofs + ', ' + temp.max + '- 1 - ' + ofs + ')')
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
      args   = ['input.Substring(' + start + ', ' + end  + '- 1 - ' + start +')', start]
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
    let rule = this._quote(this._grammarName + '::' + this._ruleName)
    expected = this._quote(expected)

    this.assign_(address, this.nullNode_())

    this.if_('offset > failure', () => {
      this.assign_('failure', 'offset')
      this.assign_('expected', 'new ArrayList<String[]>()')
    })
    this.if_('offset == failure', () => {
      this.append_('expected', 'new String[] { ' + rule + ', ' + expected + ' }')
    })
  }

  jump_ (address, rule) {
    this.assign_(address, '_read_' + rule + '()')
  }

  _conditional (kwd, condition, block, else_) {
    this._line(kwd + ' (' + condition + ') {', false)
    this._indent(block)
    if (else_) {
      this._line('} else {', false)
      this._indent(else_)
    }
    this._line('}', false)
  }

  if_ (condition, block, else_) {
    this._conditional('if', condition, block, else_)
  }

  loop_ (block) {
    this._conditional('while', 'true', block)
  }

  break_ () {
    this._line('break')
  }

  sizeInRange_ (address, [min, max]) {
    if (max === -1) {
      return address + '.Count >= ' + min
    } else if (max === 0) {
      return address + '.Count == ' + min
    } else {
      return address + '.Count >= ' + min + ' && ' + address + '.Count <= ' + max
    }
  }

  stringMatch_ (expression, string) {
    return expression + ' != null && ' + expression + '.Equals(' + this._quote(string) + ')'
  }

  stringMatchCI_ (expression, string) {
    return expression + ' != null && ' + expression + '.ToLower().Equals(' + this._quote(string) + '.ToLower())'
  }

  regexMatch_ (regex, string) {
    return string + ' != null && ' + regex + '.matcher(' + string + ').matches()'
  }

  arrayLookup_ (expression, offset) {
    return expression + '.GetValue(' + offset + ')'
  }

  append_ (list, value, index) {
    if (index === undefined)
      this._line(list + '.Add(' + value + ')')
    else
      this._line(list + '.Insert(' + index + ', ' + value + ')')
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

  _emptyString () {
    return '""'
  }

  null_ () {
    return 'null'
  }
}

module.exports = Builder
