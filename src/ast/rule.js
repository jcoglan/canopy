'use strict';

var util = require('../util');

var Rule = function(name, expression) {
  this.name        = name;
  this._expression = expression;
};

util.assign(Rule.prototype, {
  forEach: function(callback, context) {
    callback.call(context, this._expression);
  },

  compile: function(builder, address) {
    builder.method_('_read_' + this.name, [], function(builder) {
      builder.cache_(this.name, function(builder, address) {
        this._expression.compile(builder, address);
      }, this);
    }, this);
  }
});

module.exports = Rule;
