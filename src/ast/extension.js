'use strict';

class Extension {
  constructor (expression, typeName) {
    this._expression = expression;
    this._typeName   = typeName;
  }

  forEach (callback, context) {
    callback.call(context, this._expression);
  }

  compile (builder, address) {
    this._expression.compile(builder, address);

    builder.ifNode_(address, (builder) => {
      builder.extendNode_(address, this._typeName);
    }, this);
  }
}

module.exports = Extension;
