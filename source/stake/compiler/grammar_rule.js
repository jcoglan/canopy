Stake.Compiler.extend({
  GrammarRule: new JS.Module({
    name: function() {
      return this.identifier.textValue;
    },
    
    toSexp: function() {
      return ['rule', this.name(), this.parsing_expression.toSexp()];
    },
    
    compile: function(builder) {
      var name = this.name();
      
      builder.method_('__consume__' + name, ['input'], function() {
        var address = builder.tempVar_('address');
        
        builder.line_('this._nodeCache.' + name + ' = this._nodeCache.' + name + ' || {}');
        builder.var_('cached', 'this._nodeCache.' + name + '[this._offset]');
        
        builder.if_('cached', function(builder) {
          builder.return_('cached');
        }, this);
        this.parsing_expression.compile(builder, address);
        
        builder.return_(address);
      }, this);
    }
  })
});

