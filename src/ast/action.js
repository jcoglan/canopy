'use strict';

class Action {
  constructor (expression, actionName) {
    this._expression = expression;
    this._actionName = actionName;
  }

  forEach (callback, context) {
    callback.call(context, this._expression);
  }

  compile (builder, address) {
    this._expression.compile(builder, address, this._actionName);
  }
}

module.exports = Action;
