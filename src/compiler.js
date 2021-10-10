'use strict'

var metagrammar = require('./meta_grammar')

var Grammar      = require('./ast/grammar'),
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

var actions = {
  grammar (text, a, b, elements) {
    var rules = elements[2].elements.map((e) => e.rule)
    return new Grammar(elements[1].id.text, rules)
  },

  rule (text, a, b, elements) {
    return new Rule(elements[0].text, elements[2])
  },

  paren_expr (text, a, b, elements) {
    return elements[2]
  },

  choice (text, a, b, elements) {
    var parts = [elements[0]].concat(
      elements[1].elements.map((e) => e.expr))

    return new Choice(parts)
  },

  extension (text, a, b, elements) {
    var expression = elements[0],
        typeTag    = elements[2]

    return new Extension(expression, typeTag.id.text)
  },

  action (text, a, b, elements) {
    var actionName = elements[2].id.text

    if (elements[0] instanceof Maybe)
      return new Maybe(new Action(elements[0]._expression, actionName))
    else
      return new Action(elements[0], actionName)
  },

  sequence (text, a, b, elements) {
    var parts = [elements[0]].concat(
      elements[1].elements.map((e) => e.expr))

    return new Sequence(parts)
  },

  sequence_part (text, a, b, elements) {
    var muted = elements[0].text !== '',
        label = elements[1].id

    return new SequencePart(elements[2], label && label.text, muted)
  },

  predicate (text, a, b, elements) {
    var polarities = {'&': true, '!': false}
    return new Predicate(elements[2], polarities[elements[0].text])
  },

  repeat (text, a, b, elements) {
    var quantities = {'*': 0, '+': 1}
    return new Repeat(elements[0], quantities[elements[2].text])
  },

  maybe (text, a, b, elements) {
    return new Maybe(elements[0])
  },

  reference (text, a, b, elements) {
    return new Reference(elements[0].text)
  },

  string (text, a, b, elements) {
    var text  = text.substring(a, b),
        value = eval(text)

    return new String(text, value, false)
  },

  ci_string (text, a, b, elements) {
    var text  = text.substring(a, b),
        value = eval('"' + elements[1].text + '"')

    return new String(text, value, true)
  },

  char_class (text, a, b, elements) {
    var text = text.substring(a, b)
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

    var message = metagrammar.formatError(metagrammar.Parser.lastError)
    throw new Error(message)
  }

  toSource () {
    this.parseTree().compile(this._builder)
    return this._builder.serialize()
  }
}

module.exports = Compiler
