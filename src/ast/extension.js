'use strict';

class Extension {
  constructor (expression, typeName) {
    this._expression = expression;
    this._typeName   = typeName;
  }

  *[Symbol.iterator] () {
    yield this._expression;
  }

  compile (builder, address) {
    this._expression.compile(builder, address);

    builder.ifNode_(address, (builder) => {
      builder.extendNode_(address, this._typeName);
    }, this);
  }
}

module.exports = Extension;
