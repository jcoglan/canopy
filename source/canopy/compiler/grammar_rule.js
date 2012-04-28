Canopy.Compiler.GrammarRule = {
  name: function() {
    return this.identifier.textValue;
  },
  
  toSexp: function() {
    return ['rule', this.name(), this.parsing_expression.toSexp()];
  },
  
  compile: function(builder) {
    var name = this.name();
    
    builder.method_('__consume__' + name, ['input'], function() {
      var address   = builder.tempVar_('address'),
          offset    = builder.tempVar_('index', builder.offset_());
          cacheAddr = 'this._nodeCache["' + name + '"][' + offset + ']';
      
      builder.line_('this._nodeCache["' + name + '"] = this._nodeCache["' + name + '"] || {}');
      builder.var_('cached', cacheAddr);
      
      builder.if_('cached', function(builder) {
        builder.line_(builder.offset_() + ' += cached.textValue.length');
        builder.return_('cached');
      }, this);
      
      this.parsing_expression.compile(builder, address);
      
      builder.return_(cacheAddr + ' = ' + address);
    }, this);
  }
};

