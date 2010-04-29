Stake.Compiler.extend({
  Atom: new JS.Module({
    toSexp: function() {
      var exp   = this.expression.parsing_expression || this.expression,
          sexp  = exp.toSexp(),
          label;
      
      switch (this.elements[2].textValue) {
        case '?': sexp = ['maybe', sexp]; break;
        case '*': sexp = ['repeat', 0, sexp]; break;
        case '+': sexp = ['repeat', 1, sexp]; break;
      }
      
      if (label = this.elements[0].identifier)
        sexp = ['label', label.textValue, sexp];
      
      return sexp;
    },
    
    compile: function(builder, address) {
      return this.expression.compile(builder, address);
    }
  })
});

