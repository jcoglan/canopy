'use strict';

var util = require('../util');

var Reference = function(name) {
  this.refName = name;
};

util.assign(Reference.prototype, {
  referenceName: function() {
    return this.refName;
  },

  toSexp: function() {
    return ['reference', this.refName];
  },

  compile: function(builder, address, action) {
    builder.jump_(address, this.refName);
    if (action) {
      builder.ifNode_(address, function(builder){
        builder.assign_(address, builder.action_(address, action));
      }, this);
    }
  }
});

module.exports = Reference;
