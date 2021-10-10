'use strict';

class Predicate {
  constructor (expression, positive) {
    this._expression = expression;
    this._positive   = positive;
  }

  forEach (callback, context) {
    callback.call(context, this._expression);
  }

  compile (builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_()),
        branch      = this._positive ? 'ifNode_' : 'unlessNode_';

    this._expression.compile(builder, address);
    builder.assign_(builder.offset_(), startOffset);

    builder[branch](address, (builder) => {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of, null);
    }, (builder) => {
      builder.assign_(address, builder.nullNode_());
    });
  }
}

module.exports = Predicate;
