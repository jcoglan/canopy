'use strict';

var metagrammar = require('./meta_grammar'),
    util        = require('./util');

var types = {
  Action:       require('./compiler/action'),
  AnyChar:      require('./compiler/any_char'),
  CharClass:    require('./compiler/char_class'),
  Choice:       require('./compiler/choice'),
  ChoicePart:   require('./compiler/choice_part'),
  CIString:     require('./compiler/ci_string'),
  Grammar:      require('./compiler/grammar'),
  GrammarRule:  require('./compiler/grammar_rule'),
  Maybe:        require('./compiler/maybe'),
  Predicate:    require('./compiler/predicate'),
  Reference:    require('./compiler/reference'),
  Repeat:       require('./compiler/repeat'),
  Sequence:     require('./compiler/sequence'),
  SequencePart: require('./compiler/sequence_part')
};

var String = require('./ast/string');

var actions = {
  string: function(text, a, b, elements) {
    return new String(text.substring(a, b));
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
