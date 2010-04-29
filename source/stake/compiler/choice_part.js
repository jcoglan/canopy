Stake.Compiler.extend({
  ChoicePart: new JS.Module({
    toSexp: function() {
      var sexp = this.elements[0].toSexp(), type;
      
      if (type = this.elements[1].type_expression)
        sexp = ['type', type.object_identifier.textValue, sexp];
      
      return sexp;
    },
    
    compile: function(builder, address) {
      this.elements[0].compile(builder, address);
    }
  })
});

