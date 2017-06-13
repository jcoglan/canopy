'use strict';

module.exports = {
  labels: function() {
    var element    = this.elements[1].identifier,
        expression = this.expression,
        labels     = [];

    if (element) labels.push(element.text);
    if (expression.referenceName) labels.push(expression.referenceName());

    return labels;
  },

  muted: function() {
    return this.elements[0].text !== '';
  },

  toSexp: function() {
    var expression = this.expression,
        labels     = this.labels(),
        sexp       = expression.toSexp();

    if (this.elements[1].identifier) sexp = ['label', labels[0], sexp];

    return sexp;
  },

  compile: function(builder, address) {
    return this.expression.compile(builder, address);
  }
};
