Stake.Compiler.extend({
  Repeat: new JS.Module({
    QUANTITIES: {'*': 0, '+': 1},
    
    atomic: function() {
      var expression = this.atom;
      return expression.parsing_expression || expression;
    },
    
    toSexp: function() {
      var expression = this.atomic(),
          sexp = expression.toSexp();
      
      sexp = expression.toSexp();
      switch (this.quantifier.textValue) {
        case '*': sexp = ['repeat', 0, sexp]; break;
        case '+': sexp = ['repeat', 1, sexp]; break;
        case '?': sexp = ['maybe', sexp]; break;
      }
      return sexp;
    },
    
    compile: function(builder, address, nodeType) {
      var quantifier  = this.quantifier.textValue;
      
      if (quantifier === '?') return this._compileMaybe(builder, address, nodeType);
      
      var minimum     = this.QUANTITIES[quantifier],
          remaining   = builder.tempVar_('remaining', minimum),
          startOffset = builder.tempVar_('index', builder.offset_()),
          elements    = builder.tempVar_('elements', '[]'),
          textValue   = builder.tempVar_('text', '""'),
          elAddr      = builder.tempVar_('address', 'true');
      
      builder.while_(elAddr, function(builder) {
        this.atomic().compile(builder, elAddr);
        builder.if_(elAddr, function(builder) {
          builder.line_(elements + '.push(' + elAddr + ')');
          builder.line_(textValue + ' += ' + elAddr + '.textValue');
          builder.line_(remaining + ' -= 1');
        });
      }, this);
      
      builder.if_(remaining + ' <= 0', function(builder) {
        builder.line_(builder.offset_() + ' = ' + startOffset);
        builder.syntaxNode_(address, nodeType, textValue, textValue + '.length', elements);
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    },
    
    _compileMaybe: function(builder, address, nodeType) {
      var startOffset = builder.tempVar_('index', builder.offset_());
      
      this.atomic().compile(builder, address);
      
      builder.if_(address, function(builder) {
        builder.extendNode_(address, nodeType);
      });
      builder.else_(function(builder) {
        builder.line_(builder.offset_() + ' = ' + startOffset);
        builder.syntaxNode_(address, nodeType, '""', 0);
      });
    }
  })
});

