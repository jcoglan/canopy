<%= license %>

if (typeof Canopy === 'undefined')
  Canopy = new JS.Module('Canopy');

Canopy.extend({
  compile: function(grammar) {
    var compiler = new this.Compiler(grammar),
        source   = compiler.toSource();
    
    eval(source);
    return source;
  }
});

