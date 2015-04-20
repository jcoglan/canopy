Canopy.Compiler.Grammar = {
  grammarName: function() {
    return this.grammar_name.object_identifier.text
  },

  toSexp: function() {
    var sexp = ['grammar', this.grammarName()];
    this.rules.forEach(function(rule) {
      sexp.push(rule.grammar_rule.toSexp());
    });
    return sexp;
  },

  compile: function(builder) {
    builder.package_(this.grammarName(), function(builder) {
      var nodeClassName = builder.syntaxNodeClass_(),
          subclassIndex = 1;

      var scan = function(node) {
        if (node.compileNodeClasses) {
          if (node.compileNodeClasses(builder, nodeClassName, subclassIndex))
            subclassIndex += 1;
        }
        node.forEach(scan, this);
      };
      scan.call(this, this);

      builder.grammarModule_(function(builder) {
        this.rules.forEach(function(rule) {
          rule.grammar_rule.compile(builder);
        });
      }, this);

      var root = this.rules.elements[0].grammar_rule.name();

      builder.parserClass_(root);
      builder.exports_();
    }, this);
  }
};
