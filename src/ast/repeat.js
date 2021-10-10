'use strict';

var util = require('../util');

var Repeat = function(expression, count) {
  this._expression = expression;
  this._count      = count;
};

util.assign(Repeat.prototype, {
  forEach: function(callback, context) {
    callback.call(context, this._expression);
  },

  compile: function(builder, address, action) {
    var temp = builder.localVars_({
          remaining: this._count,
          index:     builder.offset_(),
          elements:  builder.emptyList_(),
          address:   builder.true_()
        }),

        remaining   = temp.remaining,
        startOffset = temp.index,
        elements    = temp.elements,
        elAddr      = temp.address;

    builder.whileNotNull_(elAddr, function(builder) {
      this._expression.compile(builder, elAddr);
      builder.ifNode_(elAddr, function(builder) {
        builder.append_(elements, elAddr);
        builder.decrement_(remaining);
      });
    }, this);

    builder.if_(builder.isZero_(remaining), function(builder) {
      builder.syntaxNode_(address, startOffset, builder.offset_(), elements, action);
    }, function(builder) {
      builder.assign_(address, builder.nullNode_());
    });
  }
});

module.exports = Repeat;
