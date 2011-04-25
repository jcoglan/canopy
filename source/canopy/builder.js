Canopy.extend({
  Builder: new JS.Class({
    initialize: function(parent) {
      if (parent) {
        this._parent = parent;
        this._indentLevel = parent._indentLevel;
      } else {
        this._buffer = '';
        this._indentLevel = 0;
      }
      this._methodSeparator = '';
      this._varIndex = {};
    },
    
    serialize: function() {
      return this._buffer;
    },
    
    write: function(string) {
      if (this._parent) return this._parent.write(string);
      this._buffer += string;
    },
    
    indent_: function(block, context) {
      this._indentLevel += 1;
      block.call(context, this);
      this._indentLevel -= 1;
    },
    
    newline_: function() {
      this.write('\n');
      var i = this._indentLevel;
      while (i--) this.write('    ');
    },
    
    delimitField_: function() {
      this.write(this._methodSeparator);
      this._methodSeparator = ',';
    },
    
    line_: function(source) {
      this.newline_();
      this.write(source + ';');
    },
    
    input_: function() {
      return 'this._input';
    },
    
    offset_: function() {
      return 'this._offset';
    },
    
    slice_: function(length) {
      var slice = this.tempVar_('slice'), input = this.input_(), of = this.offset_();
      this.if_(input + '.length > ' + of, function(builder) {
        builder.line_(slice + ' = ' + input + '.substring(' + of + ', ' + of + ' + ' + length + ')');
      });
      this.else_(function(builder) {
        builder.line_(slice + ' = null');
      });
      return slice;
    },
    
    syntaxNode_: function(address, nodeType, expression, bump, elements, labelled) {
      elements = ', ' + (elements || '[]');
      labelled = labelled ? ', ' + labelled : '';
      var klass, of = ', ' + this.offset_();
      
      if (nodeType) {
        klass = this.tempVar_('klass');
        this.if_(nodeType + ' instanceof Function', function(builder) {
          builder.line_(klass + ' = ' + nodeType);
        });
        this.else_(function(builder) {
          builder.line_(klass + ' = this.klass.SyntaxNode');
        });
      } else {
        klass = this.tempVar_('klass', 'this.klass.SyntaxNode');
      }
      
      this.line_(address + ' = new ' + klass + '(' + expression + of + elements + labelled + ')');
      this.extendNode_(address, nodeType);
      this.line_(this.offset_() + ' += ' + bump);
    },
    
    extendNode_: function(address, nodeType) {
      if (!nodeType) return;
      this.unless_(nodeType + ' instanceof Function', function(builder) {
        builder.line_(address + '.extend(' + nodeType + ')');
      });
    },
    
    failure_: function(address, expected) {
      this.line_(address + ' = null');
      var input = this.input_(), of = this.offset_(), slice = this.slice_(1);
      var error = 'this.error = this.klass.lastError';
      this.if_('!this.error || this.error.offset <= ' + of, function(builder) {
        builder.line_(error + ' = {input: ' + input +
                                ', offset: ' + of +
                                ', expected: "' + (expected || '').replace(/"/g, '\\"') +
                               '", actual: ' + slice + ' || "<EOF>"}');
      });
    },
    
    nameSpace_: function(objectName) {
      var parts = objectName.split('.');
      this.line_('(function() {');
      this.indent_(function() {
        this.var_('namespace', 'this');
        for (var i = 0, n = parts.length; i < n - 1; i++)
          this.line_('namespace = namespace.' + parts[i] + ' = namespace.' + parts[i] + ' || {}');
        this.if_('typeof exports === "object"', function(builder) {
          builder.line_('exports.' + parts[0] + ' = this.' + parts[0]);
        });
      }, this);
      this.line_('})()');
    },
    
    module_: function(name, block, context) {
      this.newline_();
      this.write(name + ' = new JS.Module("' + name + '", {');
      new Canopy.Builder(this).indent_(block, context);
      this.newline_();
      this.write('});');
    },
    
    class_: function(name, block, context) {
      this.newline_();
      this.write(name + ' = new JS.Class("' + name + '", {');
      new Canopy.Builder(this).indent_(block, context);
      this.newline_();
      this.write('});');
    },
    
    include_: function(name) {
      this.delimitField_();
      this.newline_();
      this.write('include: ' + name);
    },
    
    classMethods_: function(block, context) {
      this.delimitField_();
      this.newline_();
      this.write('extend: {');
      new Canopy.Builder(this).indent_(block, context);
      this.newline_();
      this.write('}');
    },
    
    field_: function(name, value) {
      this.delimitField_();
      this.newline_();
      this.write(name + ': ' + value);
    },
    
    method_: function(name, args, block, context) {
      this.delimitField_();
      this.newline_();
      this.write(name + ': function(' + args.join(', ') + ') {');
      this._varIndex = {};
      this.indent_(block, context);
      this.newline_();
      this.write('}');
    },
    
    ivar_: function(name, value) {
      this.line_('this._' + name + ' = ' + value);
    },
    
    var_: function() {
      for (var i = 0, n = arguments.length; i < n; i += 2)
        this.line_('var ' + arguments[i] + ' = ' + arguments[i+1]);
    },
    
    tempVar_: function(name, value) {
      this._varIndex[name] = this._varIndex[name] || 0;
      var varName = name + this._varIndex[name];
      this._varIndex[name] += 1;
      this.var_(varName, (value === undefined) ? 'null' : value);
      return varName;
    },
    
    conditional_: function(kwd, condition, block, context) {
      this.newline_();
      this.write(kwd + ' (' + condition + ') {');
      this.indent_(block, context);
      this.newline_();
      this.write('}');
    },
    
    while_: function(condition, block, context) {
      this.conditional_('while', condition, block, context);
    },
    
    if_: function(condition, block, context) {
      this.conditional_('if', condition, block, context);
    },
    
    unless_: function(condition, block, context) {
      this.conditional_('if', '!(' + condition + ')', block, context);
    },
    
    else_: function(block, context) {
      this.write(' else {');
      this.indent_(block, context);
      this.newline_();
      this.write('}');
    },
    
    return_: function(expression) {
      this.line_('return ' + expression);
    }
  })
});

