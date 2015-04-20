Canopy.Compiler.ChoicePart = {
  nodeType: function() {
    var element = this.elements[1].type_expression;
    return element ? element.object_identifier.text : null;
  },

  toSexp: function() {
    var sexp = this.elements[0].toSexp(), type;
    if (type = this.nodeType()) sexp = ['type', type, sexp];
    return sexp;
  },

  compile: function(builder, address) {
    this.elements[0].compile(builder, address, this.nodeType());
  }
};
