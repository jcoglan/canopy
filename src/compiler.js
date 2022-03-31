'use strict'

const metagrammar = require('./meta_grammar')

const Grammar      = require('./ast/grammar'),
      Rule         = require('./ast/rule'),
      Choice       = require('./ast/choice'),
      Extension    = require('./ast/extension'),
      Action       = require('./ast/action'),
      Sequence     = require('./ast/sequence'),
      SequencePart = require('./ast/sequence_part'),
      Predicate    = require('./ast/predicate'),
      Repeat       = require('./ast/repeat'),
      Maybe        = require('./ast/maybe'),
      Reference    = require('./ast/reference'),
      String       = require('./ast/string'),
      CharClass    = require('./ast/char_class'),
      AnyChar      = require('./ast/any_char')

const actions = {
  grammar (text, a, b, [_, name, rules]) {
    rules = rules.elements.map((e) => e.rule)
    return new Grammar(name.id.text, rules)
  },

  rule (text, a, b, [name, _, body]) {
    return new Rule(name.text, body)
  },

  paren_expr (text, a, b, [_, __, expr]) {
    return expr
  },

  choice (text, a, b, [first, rest]) {
    let parts = [first].concat(rest.elements.map((e) => e.expr))
    return new Choice(parts)
  },

  extension (text, a, b, [expression, _, typeTag]) {
    return new Extension(expression, typeTag.id.text)
  },

  action (text, a, b, [root, _, name]) {
    let actionName = name.id.text

    if (root instanceof Maybe)
      return new Maybe(new Action(root._expression, actionName))
    else
      return new Action(root, actionName)
  },

  sequence (text, a, b, [first, rest]) {
    let parts = [first].concat(rest.elements.map((e) => e.expr))
    return new Sequence(parts)
  },

  sequence_part (text, a, b, [muted, label, expr]) {
    muted = muted.text !== ''
    label = label.id

    return new SequencePart(expr, label && label.text, muted)
  },

  predicate (text, a, b, [pred, _, expr]) {
    let polarities = { '&': true, '!': false }
    return new Predicate(expr, polarities[pred.text])
  },

  repeat (text, a, b, [expr, _, quant]) {
    let count
    let range = quant.numeric_quantifier

    if (quant.text === '*') {
      count = [0, -1]
    } else if (quant.text === '+') {
      count = [1, -1]
    } else if (range.max.text === '') {
      count = [parseInt(range.min.text, 10), 0]
    } else if (range.max.n.text === '') {
      count = [parseInt(range.min.text, 10), -1]
    } else {
      count = [parseInt(range.min.text, 10), parseInt(range.max.n.text, 10)]
    }
    return new Repeat(expr, count)
  },

  maybe (text, a, b, [expr]) {
    return new Maybe(expr)
  },

  reference (text, a, b, [expr]) {
    return new Reference(expr.text)
  },

  string (text, a, b, elements) {
    text = text.substring(a, b)
    let value = eval(text)

    return new String(text, value, false)
  },

  ci_string (text, a, b, [_, string]) {
    text = text.substring(a, b)
    let value = eval('"' + string.text + '"')

    return new String(text, value, true)
  },

  char_class (text, a, b, elements) {
    text = text.substring(a, b)
    return new CharClass(text, new RegExp('^' + text))
  },

  any_char (text, a, b, elements) {
    return new AnyChar()
  }
}

class Compiler {
  constructor (grammarText, builder) {
    this._grammarText = grammarText
    this._builder = builder
  }

  parseTree () {
    if (this._tree) return this._tree

    this._tree = metagrammar.parse(this._grammarText, {actions: actions})
    if (this._tree) return this._tree

    let message = metagrammar.formatError(metagrammar.Parser.lastError)
    throw new Error(message)
  }

  toSource () {
    this.parseTree().compile(this._builder)
    return this._builder.serialize()
  }
}

module.exports = Compiler
