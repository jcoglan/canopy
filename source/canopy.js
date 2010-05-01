this.Canopy = this.Canopy || new JS.Module('Canopy');

Canopy.extend({
  compile: function(grammar) {
    var compiler = new this.Compiler(grammar),
        source   = compiler.toSource();
    
    eval(source);
    return source;
  },
  
  SyntaxNode: new JS.Class({
    initialize: function(textValue, offset, elements, properties) {
      this.textValue = textValue;
      this.offset    = offset;
      this.elements  = elements || [];
      
      if (!properties) return;
      for (var key in properties) this[key] = properties[key];
    },
    
    forEach: function(block, context) {
      for (var i = 0, n = this.elements.length; i < n; i++)
        block.call(context, this.elements[i], i);
    }
  })
});

