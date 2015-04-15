Canopy.Compiler.AnyChar = {
  toSexp: function() {
    return ['any-char'];
  },

  compile: function(builder, address, nodeType) {
    var nextChar = builder.localVar_('nextChar', builder.chunk_(1));

    builder.if_(builder.isNull_(nextChar), function(builder) {
      builder.failure_(address, '<any char>');
    });
    builder.else_(function(builder) {
      builder.syntaxNode_(address, nodeType, nextChar, 1);
    });
  }
};
