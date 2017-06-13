'use strict';

module.exports = {
  referenceName: function() {
    return this.identifier.text;
  },

  toSexp: function() {
    return ['reference', this.referenceName()];
  },

  compile: function(builder, address) {
    builder.jump_(address, this.referenceName());
  }
};
