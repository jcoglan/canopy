'use strict';

var util = require('../util');

var Predicate = function(expression, positive) {
  this._expression = expression;
  this._positive   = positive;
};

util.assign(Predicate.prototype, {
  toSexp: function() {
    var type = this._positive ? 'and' : 'not';
    return [type, this._expression.toSexp()];
  },

  forEach: function(callback, context) {
    callback.call(context, this._expression);
  },

  compile: function(builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_()),
        branch      = this._positive ? 'ifNode_' : 'unlessNode_';

    this._expression.compile(builder, address);
    builder.assign_(builder.offset_(), startOffset);

    builder[branch](address, function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of, null);
    }, function(builder) {
      builder.assign_(address, builder.nullNode_());
    });
  }
});

module.exports = Predicate;
