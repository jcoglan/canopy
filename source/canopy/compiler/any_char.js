Canopy.Compiler.AnyChar = {
  toSexp: function() {
    return ['any-char'];
  },

  compile: function(builder, address, nodeType) {
    var nextChar = builder.chunk_(1);

    // TODO just check the length, don't make a substring
    builder.if_(builder.isNull_(nextChar), function(builder) {
      builder.failure_(address, '<any char>');
    }, function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, nodeType, of, of + ' + 1');
    });
  }
};
