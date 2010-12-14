Canopy.Compiler.extend({
  Sequence: new JS.Module({
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
      this._startOffset = builder.tempVar_('index', builder.offset_());
      this._elements    = builder.tempVar_('elements', '[]');
      this._labelled    = builder.tempVar_('labelled', '{}');
      this._textValue   = builder.tempVar_('text', '""');
      
      builder.line_('namedNodeStack.push({})');
      
      this._compileExpressions(builder, 0);
      builder.if_(this._elements, function(builder) {
        builder.line_(builder.offset_() + ' = ' + this._startOffset);
        builder.syntaxNode_(address, nodeType, this._textValue,
                                               this._textValue + '.length',
                                               this._elements,
                                               this._labelled,
                                               'namedNodeStack.pop()');
      }, this);
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    },
    
    _compileExpressions: function(builder, index) {
      var expressions = this.expressions();
      if (index === expressions.length) return;
      
      var expAddr = builder.tempVar_('address'),
          label   = expressions[index].label();
      
      expressions[index].compile(builder, expAddr);
      
      builder.if_(expAddr, function(builder) {
        builder.line_(this._elements + '.push(' + expAddr + ')');
        builder.line_(this._textValue + ' += ' + expAddr + '.textValue');
        if (label) {
          builder.line_(this._labelled + '.' + label + ' = ' + expAddr);
          
          var i = builder.tempVar_('i', 'namedNodeStack.length');
          builder.while_(i + '--', function() {
            var list = 'namedNodeStack[' + i + '].' + label;
            builder.line_(list + ' = ' + list + ' || []');
            builder.line_(list + '.push(' + expAddr + ')');
          }, this);
        }
        
        this._compileExpressions(builder, index + 1);
        
      }, this);
      builder.else_(function(builder) {
        builder.line_(this._elements + ' = null');
        builder.line_(builder.offset_() + ' = ' + this._startOffset);
      }, this);
    }
  })
});

