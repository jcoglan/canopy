Stake.Compiler.extend({
  GrammarRule: new JS.Module({
    name: function() {
      return this.identifier.textValue;
    },
    
    toSexp: function() {
      return ['rule', this.name(), this.parsing_expression.toSexp()];
    },
    
    compile: function(builder) {
      this._index = 0;
      
      var name = this.name(),
          addr = this.getAddress();
      
      builder.method_('__consume__' + name, ['input'], function() {
        builder.line_('this._nodeCache.' + name + ' = this._nodeCache.' + name + ' || {}');
        builder.vars_('cached', 'this._nodeCache.' + name + '[this._offset]',
                      addr, 'null');
        
        builder.if_('cached', function(builder) {
          builder.return_('cached');
        }, this);
        this.parsing_expression.compile(builder, addr);
        builder.return_(addr);
      }, this);
    },
    
    getAddress: function() {
      var addr = 'addr' + this._index;
      this._index += 1;
      return addr;
    }
  })
});

