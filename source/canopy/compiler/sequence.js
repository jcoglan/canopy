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

  compileNodeClasses: function(builder, nodeClassName, subclassIndex) {
    var subclassName = nodeClassName + subclassIndex,
        expressions  = this.expressions(),
        labels       = {},
        anyLabels    = false,
        exprLabels, i, j, m, n;

    for (i = 0, n = expressions.length; i < n; i++) {
      exprLabels = expressions[i].labels();
      if (exprLabels.length === 0) continue;
      anyLabels = true;
      for (j = 0, m = exprLabels.length; j < m; j++)
        labels[exprLabels[j]] = i;
    }

    if (!anyLabels) return false;

    builder.class_(subclassName, nodeClassName, function(builder) {
      builder.constructor_(['textValue', 'offset', 'elements'], function(builder) {
        for (var key in labels)
          builder.attribute_(key, builder.arrayLookup_('elements', labels[key]));
      });
    });
    this._nodeClassName = subclassName;
    return true;
  },

  compile: function(builder, address, nodeType) {
    var temp = builder.localVars_({
      index:    builder.offset_(),
      elements: builder.emptyList_(),
      text:     builder.emptyString_()
    });

    var startOffset = temp.index,
        elements    = temp.elements,
        textValue   = temp.text;

    this._compileExpressions(builder, 0, startOffset, elements, textValue);
    builder.if_(elements, function(builder) {
      builder.assign_(builder.offset_(), startOffset);
      builder.syntaxNode_(address, nodeType, textValue, builder.stringLength_(textValue), elements, this._nodeClassName);
    }, this);
    builder.else_(function(builder) {
      builder.assign_(address, builder.null_());
    });
  },

  _compileExpressions: function(builder, index, startOffset, elements, textValue) {
    var expressions = this.expressions();
    if (index === expressions.length) return;

    var expAddr = builder.localVar_('address');

    expressions[index].compile(builder, expAddr);

    builder.if_(expAddr, function(builder) {
      builder.append_(elements, expAddr);
      builder.concatText_(textValue, expAddr);

      this._compileExpressions(builder, index + 1, startOffset, elements, textValue);

    }, this);
    builder.else_(function(builder) {
      builder.assign_(elements, builder.null_());
      builder.assign_(builder.offset_(), startOffset);
    });
  }
};
