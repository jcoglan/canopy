'use strict'

const TYPES = {
  address:    'TreeNode',
  chunk:      'String',
  elements:   'List<TreeNode>',
  index:      'int',
  max:        'int',
  remaining:  'int'
}

class Builder {
  static create (filename, sep) {
    let builder = new Builder()
    builder.filename = filename
    builder.pathsep = sep
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
    this._varIndex = {}

    this._buffers = {}
    this._currentBuffer = null
    this._labels = {}
  }

  comment (lines) {
    lines = lines.map((line) => ' * ' + line)
    return ['/**'].concat(lines).concat([' */'])
  }

  serialize () {
    return this._buffers
  }

  _newBuffer (name) {
    this._currentBuffer = this.filename.replace(/\.peg$/, this.pathsep + name + '.java')
    let namespace = this.filename.replace(/\.peg$/, '').split(this.pathsep)
    this._buffers[this._currentBuffer] = 'package ' + namespace.join('.') + ';\n\n'
  }

  _write (string) {
    if (this._parent) return this._parent._write(string)
    this._buffers[this._currentBuffer] += string
  }

  _indent (block) {
    this._indentLevel += 1
    block(this)
    this._indentLevel -= 1
  }

  _newline () {
    this._write('\n')
  }

  _line (source, semicolon) {
    let i = this._indentLevel
    while (i--) this._write('    ')
    this._write(source)
    if (semicolon !== false) this._write(';')
    this._newline()
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

  package_ (name, block) {
    this._grammarName = name.replace(/\./g, '')
    block(this)
  }

  syntaxNodeClass_ () {
    this._newBuffer('TreeNode')

    for (let impt of ['ArrayList', 'EnumMap', 'Iterator', 'List', 'Map'])
      this._line('import java.util.' + impt)

    let name = 'TreeNode'

    this._newline()
    this._line('public class ' + name + ' implements Iterable<' + name + '> {', false)
    this._indent((builder) => {
      builder._line('public String text')
      builder._line('public int offset')
      builder._line('public List<' + name + '> elements')
      builder._newline()
      builder._line('Map<Label, ' + name + '> labelled')

      builder._newline()
      builder._line('public ' + name + '() {', false)
      builder._indent((builder) => {
        builder._line('this("", -1, new ArrayList<' + name + '>(0))')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('public ' + name + '(String text, int offset, List<' + name + '> elements) {', false)
      builder._indent((builder) => {
        builder.assign_('this.text', 'text')
        builder.assign_('this.offset', 'offset')
        builder.assign_('this.elements', 'elements')
        builder.assign_('this.labelled', 'new EnumMap<Label, ' + name + '>(Label.class)')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('public ' + name + ' get(Label key) {', false)
      builder._indent((builder) => {
        builder.return_('labelled.get(key)')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('public Iterator<' + name + '> iterator() {', false)
      builder._indent((builder) => {
        builder.return_('elements.iterator()')
      })
      builder._line('}', false)
    })
    this._line('}', false)

    return name
  }

  grammarModule_ (actions, block) {
    this._newBuffer('CacheRecord')
    this._line('class CacheRecord {', false)
    this._indent((builder) => {
      builder._line('TreeNode node')
      builder._line('int tail')
      builder._newline()
      builder._line('CacheRecord(TreeNode node, int tail) {', false)
      builder._indent((builder) => {
        builder.assign_('this.node', 'node')
        builder.assign_('this.tail', 'tail')
      })
      builder._line('}', false)
    })
    this._line('}', false)

    this._newBuffer('Actions')
    this._line('import java.util.List')
    this._newline()
    this._line('public interface Actions {', false)
    this._indent((builder) => {
      for (let action of actions)
        builder._line('public TreeNode ' + action + '(String input, int start, int end, List<TreeNode> elements)')
    })
    this._line('}', false)

    this._newBuffer('Grammar')
    this._line('import java.util.ArrayList')
    this._line('import java.util.HashMap')
    this._line('import java.util.List')
    this._line('import java.util.Map')
    this._line('import java.util.regex.Pattern')
    this._newline()
    this._line('abstract class Grammar {', false)
    this._indent((builder) => {
      builder.assign_('static TreeNode ' + builder.nullNode_(), 'new TreeNode()')
      builder._newline()
      builder._line('int inputSize, offset, failure')
      builder._line('String input')
      builder._line('List<String> expected')
      builder._line('Map<Label, Map<Integer, CacheRecord>> cache')
      builder._line('Actions actions')
      builder._newline()
      block(builder)
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
    this._newBuffer('ParseError')
    this._line('public class ParseError extends Exception {', false)
    this._indent((builder) => {
      builder._line('public ParseError(String message) {', false)
      builder._indent((builder) => {
        builder._line('super(message)')
      })
      builder._line('}', false)
    })
    this._line('}', false)

    this._newBuffer(this._grammarName)
    this._line('import java.util.ArrayList')
    this._line('import java.util.EnumMap')
    this._line('import java.util.List')
    this._line('import java.util.Map')

    this._newline()
    this._line('public class ' + this._grammarName + ' extends Grammar {', false)
    this._indent((builder) => {
      builder._line('public ' + this._grammarName + '(String input, Actions actions) {', false)
      builder._indent((builder) => {
        builder.assign_('this.input', 'input')
        builder.assign_('this.inputSize', 'input.length()')
        builder.assign_('this.actions', 'actions')
        builder.assign_('this.offset', '0')
        builder.assign_('this.cache', 'new EnumMap<Label, Map<Integer, CacheRecord>>(Label.class)')
        builder.assign_('this.failure', '0')
        builder.assign_('this.expected', 'new ArrayList<String>()')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('public static TreeNode parse(String input, Actions actions) throws ParseError {', false)
      builder._indent((builder) => {
        builder.assign_(this._grammarName + ' parser', 'new ' + this._grammarName + '(input, actions)')
        builder.return_('parser.parse()')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('public static TreeNode parse(String input) throws ParseError {', false)
      builder._indent((builder) => {
        builder.return_('parse(input, null)')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('private static String formatError(String input, int offset, List<String> expected) {', false)
      builder._indent((builder) => {
        builder.assign_('String[] lines', 'input.split("\\n")')
        builder._line('int lineNo = 0, position = 0')
        builder._line('while (position <= offset) {', false)
        builder._indent((builder) => {
          builder._line('position += lines[lineNo].length() + 1')
          builder._line('lineNo += 1')
        })
        builder._line('}', false)
        builder.assign_('String message', '"Line " + lineNo + ": expected " + expected + "\\n"')
        builder.assign_('String line', 'lines[lineNo - 1]')
        builder._line('message += line + "\\n"')
        builder._line('position -= line.length() + 1')
        builder._line('while (position < offset) {', false)
        builder._indent((builder) => {
          builder._line('message += " "')
          builder._line('position += 1')
        })
        builder._line('}', false)
        builder.return_('message + "^"')
      })
      builder._line('}', false)

      builder._newline()
      builder._line('private TreeNode parse() throws ParseError {', false)
      builder._indent((builder) => {
        builder.jump_('TreeNode tree', root)
        builder.if_('tree != ' + builder.nullNode_() + ' && offset == inputSize', (builder) => {
          builder.return_('tree')
        })
        builder.if_('expected.isEmpty()', (builder) => {
          builder.assign_('failure', 'offset')
          builder.append_('expected', '"<EOF>"')
        })
        builder._line('throw new ParseError(formatError(input, failure, expected))')
      })
      builder._line('}', false)
    })
    this._line('}', false)
  }

  exports_ () {
    let labels = []
    for (let name in this._labels) labels.push(name)
    labels = labels.sort()
    this._newBuffer('Label')
    this._line('public enum Label {', false)
    this._indent((builder) => {
      for (let [i, label] of labels.entries())
        builder._line(label + (i < labels.length - 1 ? ',' : ''), false)
    })
    this._line('}', false)
  }

  class_ (name, parent, block) {
    this._newline()
    this._line('class ' + name + ' extends ' + parent + ' {', false)
    new Builder(this, name)._indent(block)
    this._line('}', false)
  }

  constructor_ (args, block) {
    this._line(this._name + '(String text, int offset, List<TreeNode> elements) {', false)
    this._indent((builder) => {
      builder._line('super(text, offset, elements)')
      block(builder)
    })
    this._line('}', false)
  }

  method_ (name, args, block) {
    this._newline()
    this._line('TreeNode ' + name + '() {', false)
    new Builder(this)._indent(block)
    this._line('}', false)
  }

  cache_ (name, block) {
    let builder = this
    while (builder._parent) builder = builder._parent
    builder._labels[name] = true

    let temp    = this.localVars_({address: this.nullNode_(), index: 'offset'}),
        address = temp.address,
        offset  = temp.index

    this.assign_('Map<Integer, CacheRecord> rule', 'cache.get(Label.' + name + ')')
    this.if_('rule == null', (builder) => {
      builder.assign_('rule', 'new HashMap<Integer, CacheRecord>()')
      builder._line('cache.put(Label.' + name + ', rule)')
    })
    this.if_('rule.containsKey(offset)', (builder) => {
      builder.assign_(address, 'rule.get(offset).node')
      builder.assign_('offset', 'rule.get(offset).tail')
    }, (builder) => {
      block(builder, address)
      builder._line('rule.put(' + offset + ', new CacheRecord(' + address + ', offset))')
    })
    this.return_(address)
  }

  attributes_ () {}

  attribute_ (name, value) {
    let builder = this
    while (builder._parent) builder = builder._parent
    builder._labels[name] = true
    this._line('labelled.put(Label.' + name + ', ' + value + ')')
  }

  localVars_ (vars) {
    let names = {}, code = [], varName
    for (let name in vars)
      names[name] = this.localVar_(name, vars[name])
    return names
  }

  localVar_ (name, value) {
    this._varIndex[name] = this._varIndex[name] || 0
    let varName = name + this._varIndex[name]
    this._varIndex[name] += 1

    if (value === undefined) value = this.nullNode_()
    this.assign_(TYPES[name] + ' ' + varName, value)

    return varName
  }

  chunk_ (length) {
    let input = 'input',
        ofs   = 'offset',
        temp  = this.localVars_({chunk: this.null_(), max: ofs + ' + ' + length})

    this.if_(temp.max + ' <= inputSize', (builder) => {
      builder._line(temp.chunk + ' = ' + input + '.substring(' + ofs + ', ' + temp.max + ')')
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

    this.if_('offset > failure', (builder) => {
      builder.assign_('failure', 'offset')
      builder.assign_('expected', 'new ArrayList<String>()')
    })
    this.if_('offset == failure', (builder) => {
      builder.append_('expected', expected)
    })
  }

  assign_ (name, value) {
    this._line(name + ' = ' + value)
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

  whileNotNull_ (expression, block) {
    this.conditional_('while', expression + ' != ' + this.nullNode_(), block)
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

  return_ (expression) {
    this._line('return ' + expression)
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

  decrement_ (variable) {
    this._line('--' + variable)
  }

  isZero_ (expression) {
    return expression + ' <= 0'
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
