Canopy.Compiler.Reference = {
  referenceName: function() {
    return this.identifier.text;
  },

  toSexp: function() {
    return ['reference', this.referenceName()];
  },

  compile: function(builder, address, nodeType) {
    builder.jump_(address, this.referenceName());
    builder.extendNode_(address, nodeType);
  }
};
