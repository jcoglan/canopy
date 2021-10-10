'use strict';

class Rule {
  constructor (name, expression) {
    this.name        = name;
    this._expression = expression;
  }

  forEach (callback, context) {
    callback.call(context, this._expression);
  }

  compile (builder, address) {
    builder.method_('_read_' + this.name, [], (builder) => {
      builder.cache_(this.name, (builder, address) => {
        this._expression.compile(builder, address);
      }, this);
    }, this);
  }
}

module.exports = Rule;
