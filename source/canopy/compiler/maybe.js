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

  compile: function(builder, address, nodeType) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this.atomic().compile(builder, address);

    var onFail = function(builder) {
      builder.syntaxNode_(address, startOffset, startOffset, builder.emptyList_(), nodeType);
    };

    if (nodeType) {
      builder.ifNode_(address, function(builder) {
        builder.extendNode_(address, nodeType);
      }, onFail);
    } else {
      builder.unless_(address, onFail);
    }
  }
};
