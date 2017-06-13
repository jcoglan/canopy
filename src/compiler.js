'use strict';

var metagrammar = require('./meta_grammar'),
    util        = require('./util');

var types = {
  Action:       require('./compiler/action'),
  Choice:       require('./compiler/choice'),
  ChoicePart:   require('./compiler/choice_part'),
  Grammar:      require('./compiler/grammar'),
  GrammarRule:  require('./compiler/grammar_rule'),
  Predicate:    require('./compiler/predicate'),
  Repeat:       require('./compiler/repeat'),
  Sequence:     require('./compiler/sequence'),
  SequencePart: require('./compiler/sequence_part')
};

var Maybe     = require('./ast/maybe'),
    Reference = require('./ast/reference'),
    String    = require('./ast/string'),
    CharClass = require('./ast/char_class'),
    AnyChar   = require('./ast/any_char');

var actions = {
  paren_expr: function(text, a, b, elements) {
    return elements[2];
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
