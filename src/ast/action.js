'use strict';

class Action {
  constructor (expression, actionName) {
    this._expression = expression;
    this._actionName = actionName;
  }

  *[Symbol.iterator] () {
    yield this._expression;
  }

  compile (builder, address) {
    this._expression.compile(builder, address, this._actionName);
  }
}

module.exports = Action;
