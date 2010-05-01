this.Canopy = this.Canopy || new JS.Module('Canopy');

Canopy.extend({
  compile: function(grammar) {
    var compiler = new this.Compiler(grammar),
        source   = compiler.toSource();
    
    eval(source);
    return source;
  }
});

