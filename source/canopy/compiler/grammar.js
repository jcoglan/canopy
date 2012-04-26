Canopy.Compiler.Grammar = {
  grammarName: function() {
    return this.grammar_name.object_identifier.textValue
  },
  
  toSexp: function() {
    var sexp = ['grammar', this.grammarName()];
    this.rules.forEach(function(rule) {
      sexp.push(rule.grammar_rule.toSexp());
    });
    return sexp;
  },
  
  compile: function(builder) {
    builder.nameSpace_(this.grammarName());
    builder.newline_();
    
    builder.module_(this.grammarName(), function(builder) {
      builder.field_('root', '"' + this.rules.elements[0].grammar_rule.name() + '"');
      this.rules.forEach(function(rule) {
        rule.grammar_rule.compile(builder);
      });
    }, this);
    builder.newline_();
    
    builder.class_(this.grammarName() + 'Parser', function(builder) {
      builder.include_(this.grammarName());
      builder.method_('initialize', ['input'], function(builder) {
        builder.ivar_('input', 'input');
        builder.ivar_('offset', '0');
        builder.ivar_('nodeCache', '{}');
      });
      builder.method_('parse', [], function(builder) {
        builder.var_('result', 'this["__consume__" + this.root]()');
        builder.return_(builder.offset_() + ' === ' + builder.input_() + '.length ? result : null');
      });
      builder.classMethods_(function(builder) {
        builder.method_('parse', ['input'], function(builder) {
          builder.var_('parser', 'new this(input)');
          builder.return_('parser.parse()');
        });
      });
    }, this);
    builder.newline_();
    
    builder.class_(this.grammarName() + 'Parser.SyntaxNode', function(builder) {
      builder.include_('JS.Enumerable');
      
      builder.method_('initialize', ['textValue', 'offset', 'elements', 'properties'], function(builder) {
        builder.line_('this.textValue = textValue');
        builder.line_('this.offset    = offset');
        builder.line_('this.elements  = elements || []');
        
        builder.line_('if (!properties) return');
        builder.line_('for (var key in properties) this[key] = properties[key]');
      });
      
      builder.method_('forEach', ['block', 'context'], function(builder) {
        builder.newline_();
        builder.write('for (var i = 0, n = this.elements.length; i < n; i++)');
        builder.indent_(function(builder) {
          builder.line_('block.call(context, this.elements[i], i)');
        });
      });
    });
    builder.newline_();
    builder.line_(this.grammarName() + 'Parser.formatError = ' + Canopy.formatError.toString());
  }
};

