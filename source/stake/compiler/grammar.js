Stake.Compiler.extend({
  Grammar: new JS.Module({
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
          builder.ivar_('input', 'input')
          builder.ivar_('offset', '0')
          builder.ivar_('nodeCache', '{}')
        });
        builder.method_('parse', [], function(builder) {
          builder.var_('result', 'this["__consume__" + this.root]()')
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
    }
  })
});

