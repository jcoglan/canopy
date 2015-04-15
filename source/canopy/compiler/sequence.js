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
        i, n, j, m, labels;

    builder.class_(subclassName, nodeClassName, function(builder) {
      builder.constructor_(['textValue', 'offset', 'elements'], function(builder) {
        for (i = 0, n = expressions.length; i < n; i++) {
          labels = expressions[i].labels();
          if (labels.length > 0) {
            for (j = 0, m = labels.length; j < m; j++)
              builder.attribute_(labels[j], builder.arrayLookup_('elements', i));
          }
        }
      });
    });
    this._nodeClassName = subclassName;
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
