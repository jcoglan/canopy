Canopy.Compiler.Predicate = {
  atomic: function() {
    var expression = this.atom;
    return expression.parsing_expression || expression;
  },

  toSexp: function() {
    var expression = this.atomic(),
        table      = {'&': 'and', '!': 'not'},
        predicate  = table[this.predicate.text];

    return [predicate, expression.toSexp()];
  },

  compile: function(builder, address, nodeType) {
    var startOffset = builder.localVar_('index', builder.offset_()),
        table       = {'&': 'if_', '!': 'unless_'},
        branch      = table[this.predicate.text];

    this.atomic().compile(builder, address);
    builder.assign_(builder.offset_(), startOffset);

    builder[branch](address, function(builder) {
      builder.syntaxNode_(address, nodeType, builder.emptyString_(), 0);
    }, function(builder) {
      builder.assign_(address, builder.null_());
    });
  }
};
