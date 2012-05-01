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
      builder.line_('var extend = ' + Canopy.extend.toString());
      builder.newline_();
      builder.line_('var find = ' + Canopy.find.toString());
      builder.newline_();
      builder.line_('var formatError = ' + Canopy.formatError.toString());
      builder.newline_();
      
      builder.module_('var Grammar', function(builder) {
        this.rules.forEach(function(rule) {
          rule.grammar_rule.compile(builder);
        });
      }, this);
      builder.newline_();
      
      var grammar   = this.grammarName(),
          parser    = this.grammarName() + 'Parser',
          namespace = /\./.test(grammar) ? grammar.replace(/\.[^\.]+$/g, '').split('.') : [],
          root      = this.rules.elements[0].grammar_rule.name();
      
      builder.function_('var Parser', ['input'], function(builder) {
        builder.ivar_('input', 'input');
        builder.ivar_('offset', '0');
        builder.ivar_('nodeCache', '{}');
      });
      builder.function_('Parser.prototype.parse', [], function(builder) {
        var input = builder.input_(),
            of    = builder.offset_();
        
        builder.var_('result', 'this.__consume__' + root + '()');
        
        builder.if_('result && ' + of + ' === ' + input + '.length', function(builder) {
          builder.return_('result');
        });
        builder.unless_('this.error', function(builder) {
          builder.line_('this.error = {input: ' + input + ', offset: ' + of + ', expected: "<EOF>"}');
        });
        builder.var_('message', 'formatError(this.error)');
        builder.var_('error', 'new Error(message)');
        builder.line_('throw error');
      });
      builder.function_('Parser.parse', ['input'], function(builder) {
        builder.var_('parser', 'new Parser(input)');
        builder.return_('parser.parse()');
      });
      builder.line_('extend(Parser.prototype, Grammar)');
      builder.newline_();
      
      builder.function_('var SyntaxNode', ['textValue', 'offset', 'elements', 'properties'], function(builder) {
        builder.line_('this.textValue = textValue');
        builder.line_('this.offset    = offset');
        builder.line_('this.elements  = elements || []');
        
        builder.line_('if (!properties) return');
        builder.line_('for (var key in properties) this[key] = properties[key]');
      });
      builder.function_('SyntaxNode.prototype.forEach', ['block', 'context'], function(builder) {
        builder.for_('var i = 0, n = this.elements.length; i < n; i++', function(builder) {
          builder.line_('block.call(context, this.elements[i], i)');
        });
      });
      builder.line_('Parser.SyntaxNode = SyntaxNode');
      
      var expose = function(builder) {
        builder.line_(grammar + ' = Grammar');
        builder.line_(parser  + ' = Parser');
        builder.line_(parser  + '.formatError = formatError');
      };
      
      var n = namespace.length, namespaceCondition;
      if (n > 0) {
        namespaceCondition = [];
        for (var i = 0; i < n; i++)
          namespaceCondition.push('typeof ' + namespace.slice(0,i+1).join('.') + ' !== "undefined"');
        namespaceCondition = namespaceCondition.join(' && ');
      }
      
      builder.newline_();
      builder.if_('typeof require === "function" && typeof module === "object"', function(builder) {
        builder.module_('module.exports', function(builder) {
          builder.field_('Grammar',     'Grammar');
          builder.field_('Parser',      'Parser');
          builder.field_('SyntaxNode',  'SyntaxNode');
          builder.field_('parse',       'Parser.parse');
          builder.field_('formatError', 'formatError');
        });
        builder.newline_();
        if (namespaceCondition)
          builder.if_(namespaceCondition, expose);
      });
      builder.else_(function(builder) {
        builder.namespace_(grammar);
        expose(builder);
      });
    }, this);
  }
};

