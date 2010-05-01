Stake.Compiler.extend({
  SequencePart: new JS.Module({
    atomic: function() {
      var expression = this.expression;
      return expression.parsing_expression || expression;
    },
    
    label: function() {
      var element = this.elements[0].identifier;
      return element ? element.textValue : null;
    },
    
    toSexp: function() {
      var expression = this.atomic(),
          label = this.label(),
          sexp  = expression.toSexp();
      
      if (label) sexp = ['label', label, sexp];
      return sexp;
    },
    
    compile: function(builder, address) {
      return this.atomic().compile(builder, address);
    }
  })
});

