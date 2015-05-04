Canopy.Compiler.Action = {
  expression: function() {
    var expr = this;
    while (expr.actionable_expression) expr = expr.actionable_expression;
    return expr;
  },

  actionName: function() {
    return this.action_tag.identifier.text;
  },

  toSexp: function() {
    return ['action', this.actionName(), this.expression().toSexp()];
  },

  compile: function(builder, address) {
    this.expression().compile(builder, address, this.actionName());
  }
};
