Canopy.Compiler.Reference = {
  referenceName: function() {
    return this.identifier.textValue;
  },
  
  toSexp: function() {
    return ['reference', this.referenceName()];
  },
  
  compile: function(builder, address, nodeType) {
    builder.line_(address + ' = this.__consume__' + this.referenceName() + '()');
    builder.extendNode_(address, nodeType);
  }
};

