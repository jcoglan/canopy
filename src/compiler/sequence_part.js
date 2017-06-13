'use strict';

module.exports = {
  atomic: function() {
    var expression = this.expression;
    return expression.parsing_expression || expression;
  },

  labels: function() {
    var element    = this.elements[1].identifier,
        expression = this.atomic(),
        labels     = [];

    if (element) labels.push(element.text);
    if (expression.referenceName) labels.push(expression.referenceName());

    return labels;
  },

  muted: function() {
    return this.elements[0].text !== '';
  },

  toSexp: function() {
    var expression = this.atomic(),
        labels     = this.labels(),
        sexp       = expression.toSexp();

    if (this.elements[1].identifier) sexp = ['label', labels[0], sexp];

    return sexp;
  },

  compile: function(builder, address) {
    return this.atomic().compile(builder, address);
  }
};
