Stake.Compiler.extend({
  SequencePart: new JS.Module({
    atomic: function() {
      var expression = this.expression;
      return expression.parsing_expression || expression;
    },
    
    label: function() {
      var element = this.elements[0].identifier,
          expression = this.atomic();
      
      if (element) return element.textValue;
      if (expression.referenceName) return expression.referenceName();
      
      return null;
    },
    
    toSexp: function() {
      var expression = this.atomic(),
          label = this.label(),
          sexp  = expression.toSexp();
      
      if (element = this.elements[0].identifier)
        sexp = ['label', label, sexp];
      
      return sexp;
    },
    
    compile: function(builder, address, nodeType) {
      return this.atomic().compile(builder, address, nodeType);
    }
  })
});

