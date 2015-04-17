Canopy.Compiler.Reference = {
  referenceName: function() {
    return this.identifier.textValue;
  },

  toSexp: function() {
    return ['reference', this.referenceName()];
  },

  compile: function(builder, address, nodeType) {
    builder.jump_(address, this.referenceName());
    if (nodeType) {
      builder.extendNode_(address, nodeType);
    }
  }
};
