Stake.Compiler.extend({
  Choice: new JS.Module({
    expressions: function() {
      if (this._expressions) return this._expressions;
      this._expressions = [this.first_expression];
      this.rest_expressions.forEach(function(choice) {
        this._expressions.push(choice.expression);
      }, this);
      return this._expressions;
    },
    
    toSexp: function() {
      var sexp = ['choice'];
      this.expressions().forEach(function(expression) {
        sexp.push(expression.toSexp());
      });
      return sexp;
    },
    
    compile: function(builder, address) {
      var startOffset = builder.tempVar_('index', builder.offset_());
      this._compileChoices(builder, 0, address, startOffset);
    },
    
    _compileChoices: function(builder, index, address, startOffset) {
      var expressions = this.expressions();
      if (index === expressions.length) return;
      
      expressions[index].compile(builder, address);
      
      builder.unless_(address, function(builder) {
        builder.line_(builder.offset_() + ' = ' + startOffset);
        this._compileChoices(builder, index + 1, address, startOffset);
      }, this);
    }
  })
});

