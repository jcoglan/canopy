Canopy.Builder = function(parent) {
  if (parent) {
    this._parent = parent;
    this._indentLevel = parent._indentLevel;
  } else {
    this._buffer = '';
    this._indentLevel = 0;
  }
  this._methodSeparator = '';
  this._varIndex = {};
};

Canopy.extend(Canopy.Builder.prototype, {
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
    while (i--) this.write('  ');
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
    
    var klass = this.tempVar_('klass', 'this.constructor.SyntaxNode'),
        type  = this.findType_(nodeType),
        of    = ', ' + this.offset_();
    
    this.line_(address + ' = new ' + klass + '(' + expression + of + elements + labelled + ')');
    this.extendNode_(address, type);
    this.line_(this.offset_() + ' += ' + bump);
  },
  
  findType_: function(nodeType) {
    if (nodeType)
      return this.tempVar_('type', 'find(this.constructor, "' + nodeType + '")');
    else
      return this.tempVar_('type', 'null');
  },
  
  extendNode_: function(address, nodeType) {
    if (!nodeType) return;
    this.if_('typeof ' + nodeType + ' === "object"', function(builder) {
      builder.line_('extend(' + address + ', ' + nodeType + ')');
    });
  },
  
  failure_: function(address, expected) {
    this.line_(address + ' = null');
    var input = this.input_(), of = this.offset_(), slice = this.slice_(1);
    var error = 'this.error = this.constructor.lastError';
    expected = expected.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    this.if_('!this.error || this.error.offset <= ' + of, function(builder) {
      builder.line_(error + ' = {input: ' + input +
                              ', offset: ' + of +
                              ', expected: "' + expected + '"}');
    });
  },
  
  namespace_: function(objectName) {
    var parts = objectName.split('.');
    this.var_('namespace', 'this');
    for (var i = 0, n = parts.length; i < n - 1; i++)
      this.line_('namespace = namespace.' + parts[i] + ' = namespace.' + parts[i] + ' || {}');
  },
  
  closure_: function(block, context) {
    this.write('(function() {');
    new Canopy.Builder(this).indent_(block, context);
    this.newline_();
    this.write('})();');
    this.newline_();
    this.newline_();
  },
  
  function_: function(name, args, block, context) {
    this.newline_();
    this.write(name + ' = function(' + args.join(', ') + ') {');
    new Canopy.Builder(this).indent_(block, context);
    this.newline_();
    this.write('};');
    this.newline_();
  },
  
  module_: function(name, block, context) {
    this.newline_();
    this.write(name + ' = {');
    new Canopy.Builder(this).indent_(block, context);
    this.newline_();
    this.write('};');
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
  
  tempVars_: function(vars) {
    var names = {}, code = [], varName;
    for (var name in vars) {
      this._varIndex[name] = this._varIndex[name] || 0;
      varName = name + this._varIndex[name];
      this._varIndex[name] += 1;
      code.push(varName + ' = ' + vars[name]);
      names[name] = varName;
    }
    this.line_('var ' + code.join(', '));
    return names;
  },
  
  conditional_: function(kwd, condition, block, context) {
    this.newline_();
    this.write(kwd + ' (' + condition + ') {');
    this.indent_(block, context);
    this.newline_();
    this.write('}');
  },
  
  for_: function(condition, block, context) {
    this.conditional_('for', condition, block, context);
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
});

