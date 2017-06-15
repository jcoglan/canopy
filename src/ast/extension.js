'use strict';

var util = require('../util');

var Extension = function(expression, typeName) {
  this._expression = expression;
  this._typeName   = typeName;
};

util.assign(Extension.prototype, {
  toSexp: function() {
    return ['type', this._typeName, this._expression.toSexp()];
  },

  forEach: function(callback, context) {
    callback.call(context, this._expression);
  },

  compile: function(builder, address) {
    this._expression.compile(builder, address);
    builder.extendNode_(address, this._typeName);
  }
});

module.exports = Extension;
