Canopy.Compiler.SequencePart = {
  atomic: function() {
    var expression = this.expression;
    return expression.parsing_expression || expression;
  },

  labels: function() {
    var element    = this.elements[0].identifier,
        expression = this.atomic(),
        labels     = [];

    if (element) labels.push(element.text);
    if (expression.referenceName) labels.push(expression.referenceName());

    return labels;
  },

  toSexp: function() {
    var expression = this.atomic(),
        labels     = this.labels(),
        sexp       = expression.toSexp();

    if (this.elements[0].identifier) sexp = ['label', labels[0], sexp];

    return sexp;
  },

  compile: function(builder, address, nodeType) {
    return this.atomic().compile(builder, address, nodeType);
  }
};
