'use strict';

var metagrammar = require('./meta_grammar'),
    util        = require('./util');

var types = {
  Grammar:      require('./compiler/grammar'),
  GrammarRule:  require('./compiler/grammar_rule')
};

var Choice       = require('./ast/choice'),
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
    AnyChar      = require('./ast/any_char');

var actions = {
  paren_expr: function(text, a, b, elements) {
    return elements[2];
  },

  choice: function(text, a, b, elements) {
    var parts = [elements[0]].concat(
      elements[1].elements.map(function(e) { return e.expression }));

    return new Choice(parts);
  },

  choice_part: function(text, a, b, elements) {
    var expression = elements[0],
        typeTag    = elements[1].type_tag;

    if (typeTag)
      return new Extension(expression, typeTag.object_identifier.text);
    else
      return expression;
  },

  action: function(text, a, b, elements) {
    return new Action(elements[0], elements[2].identifier.text);
  },

  sequence: function(text, a, b, elements) {
    var parts = [elements[0]].concat(
      elements[1].elements.map(function(e) { return e.expression }));

    return new Sequence(parts);
  },

  sequence_part: function(text, a, b, elements) {
    var muted = elements[0].text !== '',
        label = elements[1].identifier;

    return new SequencePart(elements[2], label && label.text, muted);
  },

  predicate: function(text, a, b, elements) {
    var polarities = {'&': true, '!': false};
    return new Predicate(elements[1], polarities[elements[0].text]);
  },

  repeat: function(text, a, b, elements) {
    var quantities = {'*': 0, '+': 1};
    return new Repeat(elements[0], quantities[elements[1].text]);
  },

  maybe: function(text, a, b, elements) {
    return new Maybe(elements[0]);
  },

  reference: function(text, a, b, elements) {
    return new Reference(elements[0].text);
  },

  string: function(text, a, b, elements) {
    var text  = text.substring(a, b),
        value = eval(text);

    return new String(text, value, false);
  },

  ci_string: function(text, a, b, elements) {
    var text  = text.substring(a, b),
        value = eval('"' + elements[1].text + '"');

    return new String(text, value, true);
  },

  char_class: function(text, a, b, elements) {
    var text = text.substring(a, b);
    return new CharClass(text, new RegExp('^' + text));
  },

  any_char: function(text, a, b, elements) {
    return new AnyChar();
  }
};

var Compiler = function(grammarText, builder) {
  this._grammarText = grammarText;
  this._builder = builder;
};

util.assign(Compiler.prototype, {
  parseTree: function() {
    if (this._tree) return this._tree;

    this._tree = metagrammar.parse(this._grammarText, {types: types, actions: actions});
    if (this._tree) return this._tree;

    var message = metagrammar.formatError(metagrammar.Parser.lastError);
    throw new Error(message);
  },

  toSexp: function(tree) {
    return this.parseTree().toSexp();
  },

  toSource: function() {
    this.parseTree().compile(this._builder);
    return this._builder.serialize();
  }
});

module.exports = Compiler;
