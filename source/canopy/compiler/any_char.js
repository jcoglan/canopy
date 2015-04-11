Canopy.Compiler.AnyChar = {
  toSexp: function() {
    return ['any-char'];
  },

  compile: function(builder, address, nodeType) {
    var temp = builder.tempVar_('temp', builder.slice_(1));

    builder.if_(temp + ' === null', function(builder) {
      builder.failure_(address, '<any char>');
    });
    builder.else_(function(builder) {
      builder.syntaxNode_(address, nodeType, temp, 1);
    });
  }
};
