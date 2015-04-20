Canopy.Compiler.Repeat = {
  QUANTITIES: {'*': 0, '+': 1},

  atomic: function() {
    var expression = this.atom;
    return expression.parsing_expression || expression;
  },

  toSexp: function() {
    var expression = this.atomic(),
        sexp = expression.toSexp();

    sexp = expression.toSexp();
    switch (this.quantifier.text) {
      case '*': sexp = ['repeat', 0, sexp]; break;
      case '+': sexp = ['repeat', 1, sexp]; break;
      case '?': sexp = ['maybe', sexp]; break;
    }
    return sexp;
  },

  compile: function(builder, address, nodeType) {
    var quantifier = this.quantifier.text;

    if (quantifier === '?') return this._compileMaybe(builder, address, nodeType);

    var minimum = this.QUANTITIES[quantifier],
        temp = builder.localVars_({
          remaining: minimum,
          index:     builder.offset_(),
          elements:  builder.emptyList_(),
          text:      builder.emptyString_(),
          address:   builder.true_()
        }),

        remaining   = temp.remaining,
        startOffset = temp.index,
        elements    = temp.elements,
        text   = temp.text,
        elAddr      = temp.address;

    builder.whileNotNull_(elAddr, function(builder) {
      this.atomic().compile(builder, elAddr);
      builder.if_(elAddr, function(builder) {
        builder.append_(elements, elAddr);
        builder.concatText_(text, elAddr);
        builder.decrement_(remaining);
      });
    }, this);

    builder.if_(builder.isZero_(remaining), function(builder) {
      builder.assign_(builder.offset_(), startOffset);
      builder.syntaxNode_(address, nodeType, text, builder.stringLength_(text), elements);
    }, function(builder) {
      builder.assign_(address, builder.null_());
    });
  },

  _compileMaybe: function(builder, address, nodeType) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this.atomic().compile(builder, address);

    var onFail = function(builder) {
      builder.assign_(builder.offset_(), startOffset);
      builder.syntaxNode_(address, nodeType, builder.emptyString_(), 0);
    };

    if (nodeType) {
      builder.if_(address, function(builder) {
        builder.extendNode_(address, nodeType);
      }, onFail);
    } else {
      builder.unless_(address, onFail);
    }
  }
};
