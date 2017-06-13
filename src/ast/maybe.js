'use strict';

var util = require('../util');

var Maybe = function(expression) {
  this._expression = expression;
};

util.assign(Maybe.prototype, {
  toSexp: function() {
    return ['maybe', this._expression.toSexp()];
  },

  forEach: function(callback, context) {
    callback.call(context, this._expression);
  },

  compile: function(builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this._expression.compile(builder, address);

    builder.unlessNode_(address, function(builder) {
      builder.syntaxNode_(address, startOffset, startOffset, null);
    });
  }
});

module.exports = Maybe;
