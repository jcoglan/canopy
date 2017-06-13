'use strict';

var util = require('../util');

var Reference = function(name) {
  this._name = name;
};

util.assign(Reference.prototype, {
  referenceName: function() {
    return this._name;
  },

  toSexp: function() {
    return ['reference', this._name];
  },

  compile: function(builder, address) {
    builder.jump_(address, this._name);
  }
});

module.exports = Reference;
