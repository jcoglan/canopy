'use strict';

module.exports = {
  nodeType: function() {
    var element = this.elements[1].type_tag;
    return element ? element.object_identifier.text : null;
  },

  toSexp: function() {
    var sexp = this.elements[0].toSexp(), type;
    if (type = this.nodeType()) sexp = ['type', type, sexp];
    return sexp;
  },

  compile: function(builder, address) {
    this.elements[0].compile(builder, address);
    builder.extendNode_(address, this.nodeType());
  }
};
