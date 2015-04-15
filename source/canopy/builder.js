Canopy.Builder = function(parent, name, parentName) {
  if (parent) {
    this._parent = parent;
    this._indentLevel = parent._indentLevel;
  } else {
    this._buffer = '';
    this._indentLevel = 0;
  }
  this._name = name;
  this._parentName = parentName;
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

  package_: function(name, block, context) {
    this.write('(function() {');
    this.indent_(function(builder) {
      builder.line_("'use strict'");

      builder.newline_();
      builder.line_('var extend = ' + Canopy.extend.toString());
      builder.newline_();
      builder.line_('var find = ' + Canopy.find.toString());
      builder.newline_();
      builder.line_('var formatError = ' + Canopy.formatError.toString());
      builder.newline_();

      block.call(context, this);
    }, this);
    this.newline_();
    this.write('})();');
    this.newline_();
  },

  syntaxNodeClass_: function() {
    var name = 'SyntaxNode';
    this.function_('var ' + name, ['textValue', 'offset', 'elements'], function(builder) {
      builder.line_('this.textValue = textValue');
      builder.line_('this.offset = offset');
      builder.line_('this.elements = elements || []');
    });
    this.function_(name + '.prototype.forEach', ['block', 'context'], function(builder) {
      builder.newline_();
      builder.write('for (var el = this.elements, i = 0, n = el.length; i < n; i++)');
      builder.indent_(function(builder) {
        builder.line_('block.call(context, el[i], i, el)');
      });
    });
    return name;
  },

  class_: function(name, parent, block, context) {
    var builder = new Canopy.Builder(this, name, parent);
    block.call(context, builder);
  },

  constructor_: function(args, block, context) {
    this.function_('var ' + this._name, args, function(builder) {
      if (this._parentName) builder.line_(this._parentName + '.apply(this, arguments)');
      block.call(context, builder);
    }, this);
    if (this._parentName) {
      this.write('(function() {');
      this.indent_(function(builder) {
        builder.assign_('var parent', 'function() {}');
        builder.assign_('parent.prototype', this._parentName + '.prototype');
        builder.assign_(this._name + '.prototype', 'new parent()');
      }, this);
      this.line_('})()');
    }
    this.newline_();
  },

  attribute_: function(name, value) {
    this.assign_('this.' + name, value);
  },

  arrayLookup_: function(expression, offset) {
    return expression + '[' + offset + ']';
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

  chunk_: function(length) {
    var chunk = this.localVar_('chunk'), input = this.input_(), of = this.offset_();
    this.if_(input + '.length > ' + of, function(builder) {
      builder.line_(chunk + ' = ' + input + '.substring(' + of + ', ' + of + ' + ' + length + ')');
    });
    this.else_(function(builder) {
      builder.line_(chunk + ' = null');
    });
    return chunk;
  },

  syntaxNode_: function(address, nodeType, expression, bump, elements, nodeClass) {
    elements = ', ' + (elements || '[]');

    var klass = nodeClass || 'SyntaxNode',
        type  = this.findType_(nodeType),
        of    = ', ' + this.offset_();

    this.line_(address + ' = new ' + klass + '(' + expression + of + elements + ')');
    this.extendNode_(address, type);
    this.line_(this.offset_() + ' += ' + bump);
  },

  findType_: function(nodeType) {
    if (nodeType)
      return this.localVar_('type', 'find(this.constructor, "' + nodeType + '")');
    else
      return this.localVar_('type', 'null');
  },

  extendNode_: function(address, nodeType) {
    if (!nodeType) return;
    this.if_('typeof ' + nodeType + ' === "object"', function(builder) {
      builder.line_('extend(' + address + ', ' + nodeType + ')');
    });
  },

  failure_: function(address, expected) {
    this.line_(address + ' = null');
    var input = this.input_(), of = this.offset_();
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

  function_: function(name, args, block, context) {
    this.newline_();
    this.write(name + ' = function(' + args.join(', ') + ') {');
    new Canopy.Builder(this, this._name, this._parentName).indent_(block, context);
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
    new Canopy.Builder(this).indent_(block, context);
    this.newline_();
    this.write('}');
  },

  assign_: function(name, value) {
    this.line_(name + ' = ' + value);
  },

  jump_: function(address, rule) {
    this.assign_(address, 'this._read_' + rule + '()');
  },

  ivar_: function(name, value) {
    this.assign_('this._' + name, value);
  },

  var_: function() {
    for (var i = 0, n = arguments.length; i < n; i += 2)
      this.line_('var ' + arguments[i] + ' = ' + arguments[i+1]);
  },

  localVar_: function(name, value) {
    this._varIndex[name] = this._varIndex[name] || 0;
    var varName = name + this._varIndex[name];
    this._varIndex[name] += 1;
    this.var_(varName, (value === undefined) ? 'null' : value);
    return varName;
  },

  localVars_: function(vars) {
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
  },

  append_: function(list, value) {
    this.line_(list + '.push(' + value + ')');
  },

  concatText_: function(buffer, value) {
    this.line_(buffer + ' += ' + value + '.textValue');
  },

  decrement_: function(variable) {
    this.line_('--' + variable);
  },

  and_: function(left, right) {
    return left + ' && ' + right;
  },

  regexMatch_: function(regex, expression) {
    return '/' + regex.source + '/.test(' + expression + ')';
  },

  stringMatch_: function(expression, string) {
    var quoted = "'" + string.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    return expression + ' === ' + quoted;
  },

  stringMatchCI_: function(expression, string) {
    var quoted = "'" + string.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    return expression + '.toLowerCase() === ' + quoted + '.toLowerCase()';
  },

  stringLength_: function(expression) {
    return expression + '.length';
  },

  isZero_: function(expression) {
    return expression + ' <= 0';
  },

  isNull_: function(expression) {
    return expression + ' === null';
  },

  emptyList_: function() {
    return '[]';
  },

  emptyString_: function() {
    return "''";
  },

  true_: function() {
    return 'true';
  },

  null_: function() {
    return 'null';
  }
});
