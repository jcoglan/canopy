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
    builder.closure_(function(builder) {
      builder.function_('var extend', ['destination', 'source'], function(builder) {
        builder.line_('if (!source) return destination');
        builder.for_('var key in source', function(builder) {
          builder.if_('destination[key] !== source[key]', function(builder) {
            builder.line_('destination[key] = source[key]');
          });
        });
        builder.return_('destination');
      });
      
      builder.nameSpace_(this.grammarName());
      builder.newline_();
      
      builder.module_(this.grammarName(), function(builder) {
        this.rules.forEach(function(rule) {
          rule.grammar_rule.compile(builder);
        });
      }, this);
      builder.newline_();
      
      var parser = this.grammarName() + 'Parser',
          root   = this.rules.elements[0].grammar_rule.name();
      
      builder.function_(parser, ['input'], function(builder) {
        builder.ivar_('input', 'input');
        builder.ivar_('offset', '0');
        builder.ivar_('nodeCache', '{}');
      });
      builder.function_(parser + '.prototype.parse', [], function(builder) {
        builder.var_('result', 'this.__consume__' + root + '()');
        builder.return_(builder.offset_() + ' === ' + builder.input_() + '.length ? result : null');
      });
      builder.function_(parser + '.parse', ['input'], function(builder) {
        builder.var_('parser', 'new this(input)');
        builder.return_('parser.parse()');
      });
      builder.line_('extend(' + parser + '.prototype, ' + this.grammarName() + ')');
      builder.newline_();
      
      builder.function_('var SyntaxNode', ['textValue', 'offset', 'elements', 'properties'], function(builder) {
        builder.line_('this.textValue = textValue');
        builder.line_('this.offset    = offset');
        builder.line_('this.elements  = elements || []');
        
        builder.line_('if (!properties) return');
        builder.line_('for (var key in properties) this[key] = properties[key]');
      });
      builder.function_('SyntaxNode.prototype.forEach', ['block', 'context'], function(builder) {
        builder.newline_();
        builder.write('for (var i = 0, n = this.elements.length; i < n; i++)');
        builder.indent_(function(builder) {
          builder.line_('block.call(context, this.elements[i], i)');
        });
      });
      builder.line_(parser + '.SyntaxNode = SyntaxNode');
      
      builder.newline_();
      builder.line_(this.grammarName() + 'Parser.formatError = ' + Canopy.formatError.toString());
    }, this);
  }
};

