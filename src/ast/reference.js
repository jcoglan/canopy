'use strict';

var util = require('../util');

var Reference = function(name) {
  this.refName = name;
};

util.assign(Reference.prototype, {
  referenceName: function() {
    return this.refName;
  },

  compile: function(builder, address) {
    builder.jump_(address, this.refName);
  }
});

module.exports = Reference;
