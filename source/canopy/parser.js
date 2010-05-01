Canopy.extend({
  generate: function(grammar) {
    var compiler = new this.Compiler(grammar),
        sexp     = compiler.toSexp();
    
    return this.Parser.fromSexp(sexp);
  },
  
  map: function(list, block, context) {
    var results = [], n = list.length, i;
    for (i = 0; i < n; i++)
      results.push(block.call(context, list[i]));
    return results;
  },
  
  getObject: function(name) {
    var parts  = name.split('.'),
        object = this.ENV,
        part;
    
    while (part = parts.shift())
      object = object && object[part];
    
    return object;
  },
  
  ENV: this,
  
  Parser: new JS.Class({
    extend: {
      ALIASES: {
        rule: 'label'
      },
      
      fromSexp: function(sexp) {
        if (!(sexp instanceof Array)) return sexp;
        var components = Canopy.map(sexp, this.fromSexp, this),
            type = components.shift();
        
        type = this.ALIASES[type] || type;
        
        type = type.replace(/(^.|-.)/g, function(m) {
          return m.replace('-', '').toUpperCase();
        });
        
        var klass = this[type];
        return klass.create.apply(klass, components);
      },
      
      create: function(arg) {
        return new this(arg);
      }
    },
    
    _begins: function(input, matcher) {
      return input.substring(0,matcher.length) === matcher;
    },
    
    _syntaxNode: function(textValue, offset, elements, properties) {
      var custom = this.nodeClass && Canopy.getObject(this.nodeClass),
          klass  = (custom instanceof Function) ? custom : Canopy.SyntaxNode,
          node   = new klass(textValue, offset, elements, properties);
      
      if (!custom || custom instanceof Function) return node;
      node.extend(custom);
      return node;
    },
    
    _extendNode: function(node) {
      if (!node) return node;
      var custom = this.nodeClass && Canopy.getObject(this.nodeClass);
      if (custom instanceof Function) return node;
      node.extend(custom);
      return node;
    },
    
    parse: function(input) {
      var node = this.consume(input, this.createSession());
      if (!node) return null;
      return (node.textValue === input) ? node : null;
    },
    
    createSession: function() {
      return {offset: 0};
    }
  })
});

