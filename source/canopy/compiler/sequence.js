Canopy.Compiler.Sequence = {
  expressions: function() {
    if (this._expressions) return this._expressions;
    this._expressions = [this.first_part];
    this.rest.forEach(function(part) {
      this._expressions.push(part.expression);
    }, this);
    return this._expressions;
  },

  toSexp: function() {
    var sexp = ['sequence'];
    Canopy.forEach(this.expressions(), function(expression) {
      sexp.push(expression.toSexp());
    });
    return sexp;
  },

  compile: function(builder, address, nodeType) {
    var temp = builder.tempVars_({
      index:    builder.offset_(),
      elements: '[]',
      labelled: '{}',
      text:     '""'
    });

    var startOffset = temp.index,
        elements    = temp.elements,
        labelled    = temp.labelled,
        textValue   = temp.text;

    this._compileExpressions(builder, 0, startOffset, elements, labelled, textValue);
    builder.if_(elements, function(builder) {
      builder.line_(builder.offset_() + ' = ' + startOffset);
      builder.syntaxNode_(address, nodeType, textValue, textValue + '.length', elements, labelled);
    });
    builder.else_(function(builder) {
      builder.line_(address + ' = null');
    });
  },

  _compileExpressions: function(builder, index, startOffset, elements, labelled, textValue) {
    var expressions = this.expressions();
    if (index === expressions.length) return;

    var expAddr = builder.tempVar_('address'),
        label   = expressions[index].label();

    expressions[index].compile(builder, expAddr);

    builder.if_(expAddr, function(builder) {
      builder.line_(elements + '.push(' + expAddr + ')');
      builder.line_(textValue + ' += ' + expAddr + '.textValue');
      if (label) builder.line_(labelled + '.' + label + ' = ' + expAddr);

      this._compileExpressions(builder, index + 1, startOffset, elements, labelled, textValue);

    }, this);
    builder.else_(function(builder) {
      builder.line_(elements + ' = null');
      builder.line_(builder.offset_() + ' = ' + startOffset);
    });
  }
};
