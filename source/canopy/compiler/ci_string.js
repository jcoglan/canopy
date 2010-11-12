Canopy.Compiler.extend({
  CIString: new JS.Module({
    toSexp: function() {
      return ['ci-string', this.stringValue()];
    },
    
    compile: function(builder, address, nodeType) {
      var string = this.stringValue(),
          length = string.length,
          temp   = builder.tempVar_('temp', builder.slice_(length)),
          tlc    = '.toLowerCase()';
      
      builder.if_(temp + tlc + ' === "' + string + '"' + tlc, function(builder) {
        builder.syntaxNode_(address, nodeType, temp, length);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    },
    
    stringValue: function() {
      var string = '"' + this.elements[1].textValue + '"';
      return eval(string);
    }
  })
});

