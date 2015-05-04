Canopy.Compiler.Maybe = {
  atomic: function() {
    var expression = this.atom;
    return expression.parsing_expression || expression;
  },

  toSexp: function() {
    var expression = this.atomic(),
        sexp = expression.toSexp();

    return ['maybe', sexp];
  },

  compile: function(builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this.atomic().compile(builder, address);

    builder.unless_(address, function(builder) {
      builder.syntaxNode_(address, startOffset, startOffset, builder.emptyList_());
    });
  }
};
