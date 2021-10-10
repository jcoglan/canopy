'use strict';

class Maybe {
  constructor (expression) {
    this._expression = expression;
  }

  forEach (callback, context) {
    callback.call(context, this._expression);
  }

  compile (builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this._expression.compile(builder, address);

    builder.unlessNode_(address, (builder) => {
      builder.syntaxNode_(address, startOffset, startOffset, null);
    });
  }
}

module.exports = Maybe;
