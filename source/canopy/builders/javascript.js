(function() {
  var Builder = function(parent, name, parentName) {
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

  Canopy.extend(Builder.prototype, {
    serialize: function() {
      return this._buffer;
    },

    outputPathname: function(inputPathname) {
      return inputPathname.replace(/\.peg$/, '.js');
    },

    _write: function(string) {
      if (this._parent) return this._parent._write(string);
      this._buffer += string;
    },

    _indent: function(block, context) {
      this._indentLevel += 1;
      block.call(context, this);
      this._indentLevel -= 1;
    },

    _newline: function() {
      this._write('\n');
      var i = this._indentLevel;
      while (i--) this._write('  ');
    },

    _line: function(source) {
      this._newline();
      this._write(source + ';');
    },

    _quote: function(string) {
      string = string.replace(/\\/g, '\\\\')
                     .replace(/'/g, "\\'")
                     .replace(/\x08/g, '\\b')
                     .replace(/\t/g, '\\t')
                     .replace(/\n/g, '\\n')
                     .replace(/\v/g, '\\v')
                     .replace(/\f/g, '\\f')
                     .replace(/\r/g, '\\r');

      return "'" + string + "'";
    },

    package_: function(name, block, context) {
      this._write('(function() {');
      this._indent(function(builder) {
        builder._line("'use strict'");

        builder._newline();
        builder._line('var extend = ' + Canopy.extend.toString());
        builder._newline();
        builder._line('var formatError = ' + Canopy.formatError.toString());
        builder._newline();
        builder._line('var inherit = ' + Canopy.inherit.toString());
        builder._newline();

        this._grammarName = name;
        block.call(context, this);
      }, this);
      this._newline();
      this._write('})();');
      this._newline();
    },

    syntaxNodeClass_: function() {
      var name = 'SyntaxNode';
      this.function_('var ' + name, ['text', 'offset', 'elements'], function(builder) {
        builder._line('this.text = text');
        builder._line('this.offset = offset');
        builder._line('this.elements = elements || []');
      });
      this.function_(name + '.prototype.forEach', ['block', 'context'], function(builder) {
        builder._newline();
        builder._write('for (var el = this.elements, i = 0, n = el.length; i < n; i++) {');
        builder._indent(function(builder) {
          builder._line('block.call(context, el[i], i, el)');
        });
        builder._newline();
        builder._write('}');
      });
      return name;
    },

    grammarModule_: function(block, context) {
      this._newline();
      this._write('var Grammar = {');
      new Builder(this)._indent(block, context);
      this._newline();
      this._write('};');
      this._newline();
    },

    parserClass_: function(root) {
      this.function_('var Parser', ['input'], function(builder) {
        builder.assign_('this._input', 'input');
        builder.assign_('this._offset', '0');
        builder.assign_('this._cache', '{}');
        builder.assign_('this._failure', '0');
        builder.assign_('this._expected', '[]');
      });
      this.function_('Parser.prototype.parse', [], function(builder) {
        builder.jump_('var tree', root);

        builder.if_('tree && this._offset === this._input.length', function(builder) {
          builder.return_('tree');
        });
        builder.if_('this._expected.length === 0', function(builder) {
          builder.assign_('this._failure', 'this._offset');
          builder.append_('this._expected', "'<EOF>'");
        });
        builder.assign_('this.constructor.lastError', '{offset: this._offset, expected: this._expected}');
        builder._line('throw new SyntaxError(formatError(this._input, this._failure, this._expected))');
      });
      this.function_('var parse', ['input'], function(builder) {
        builder.assign_('var parser', 'new Parser(input)');
        builder.return_('parser.parse()');
      });
      this._line('extend(Parser.prototype, Grammar)');
      this._newline();
    },

    exports_: function() {
      var grammar   = this._grammarName,
          namespace = grammar.split('.'),
          last      = namespace.pop(),
          n         = namespace.length,
          condition = [];

      for (var i = 0; i < n; i++)
        condition.push('typeof ' + namespace.slice(0,i+1).join('.') + " !== 'undefined'");

      this.assign_('var exported', '{Grammar: Grammar, Parser: Parser, parse: parse}');
      this._newline();

      this.if_("typeof require === 'function' && typeof exports === 'object'", function(builder) {
        builder._line('extend(exports, exported)');
        if (condition.length > 0) builder.if_(condition.join(' &&' ), function(builder) {
          builder.assign_(grammar, 'exported');
        });
      }, function(builder) {
        builder.assign_('var namespace', 'window');
        for (var i = 0; i < n; i++) {
          builder.assign_('namespace', 'namespace.' + namespace[i] + ' = namespace.' + namespace[i] + ' || {}');
        }
        builder.assign_('namespace.' + last, 'exported');
      });
    },

    class_: function(name, parent, block, context) {
      var builder = new Builder(this, name, parent);
      block.call(context, builder);
    },

    constructor_: function(args, block, context) {
      this.function_('var ' + this._name, args, function(builder) {
        builder._line(this._parentName + '.apply(this, arguments)');
        block.call(context, builder);
      }, this);
      this._write('inherit(' + this._name + ', ' + this._parentName + ');');
      this._newline();
    },

    function_: function(name, args, block, context) {
      this._newline();
      this._write(name + ' = function(' + args.join(', ') + ') {');
      new Builder(this, this._name, this._parentName)._indent(block, context);
      this._newline();
      this._write('};');
      this._newline();
    },

    method_: function(name, args, block, context) {
      this._write(this._methodSeparator);
      this._methodSeparator = ',\n';
      this._newline();
      this._write(name + ': function(' + args.join(', ') + ') {');
      new Builder(this)._indent(block, context);
      this._newline();
      this._write('}');
    },

    cache_: function(name, block, context) {
      var temp      = this.localVars_({address: this.null_(), index: 'this._offset'}),
          address   = temp.address,
          offset    = temp.index,
          cacheMap  = 'this._cache._' + name,
          cacheAddr = cacheMap + '[' + offset + ']';

      this.assign_(cacheMap, cacheMap + ' || {}');
      this.assign_('var cached', cacheAddr);

      this.if_('cached', function(builder) {
        builder.assign_('this._offset', 'cached[1]');
        builder.return_('cached[0]');
      });

      block.call(context, this, address);
      this.assign_(cacheAddr,  '[' + address + ', this._offset]');
      this.return_(address);
    },

    attributes_: function() {},

    attribute_: function(name, value) {
      this.assign_("this['" + name + "']", value);
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
      this._line('var ' + code.join(', '));
      return names;
    },

    localVar_: function(name, value) {
      this._varIndex[name] = this._varIndex[name] || 0;
      var varName = name + this._varIndex[name];
      this._varIndex[name] += 1;
      this.assign_('var ' + varName, (value === undefined) ? this.null_(): value);
      return varName;
    },

    chunk_: function(length) {
      var chunk = this.localVar_('chunk', this.null_()), input = 'this._input', of = 'this._offset';
      this.if_(input + '.length > ' + of, function(builder) {
        builder._line(chunk + ' = ' + input + '.substring(' + of + ', ' + of + ' + ' + length + ')');
      });
      return chunk;
    },

    syntaxNode_: function(address, nodeType, start, end, elements, nodeClass) {
      elements = elements || '[]';

      var klass = nodeClass || 'SyntaxNode',
          text  = 'this._input.substring(' + start + ', ' + end + ')';

      this.assign_(address, 'new ' + klass + '(' + [text, start, elements].join(', ') + ')');
      this.extendNode_(address, nodeType);
      this.assign_('this._offset', end);
    },

    extendNode_: function(address, nodeType) {
      if (!nodeType) return;
      this._line('extend(' + address + ', this.constructor.' + nodeType + ')');
    },

    failure_: function(address, expected) {
      expected = this._quote(expected);
      this.assign_(address, this.null_());

      this.if_('this._offset > this._failure', function(builder) {
        builder.assign_('this._failure', 'this._offset');
        builder.assign_('this._expected', '[]');
      });
      this.if_('this._offset === this._failure', function(builder) {
        builder.append_('this._expected', expected);
      });
    },

    assign_: function(name, value) {
      this._line(name + ' = ' + value);
    },

    jump_: function(address, rule) {
      this.assign_(address, 'this._read_' + rule + '()');
    },

    conditional_: function(kwd, condition, block, context) {
      this._newline();
      this._write(kwd + ' (' + condition + ') {');
      this._indent(block, context);
      this._newline();
      this._write('}');
    },

    if_: function(condition, block, else_, context) {
      if (typeof else_ !== 'function') {
        context = else_;
        else_   = null;
      }
      this.conditional_('if', condition, block, context);
      if (!else_) return;
      this._write(' else {');
      this._indent(else_, context);
      this._newline();
      this._write('}');
    },

    unless_: function(condition, block, else_, context) {
      this.if_('!' + condition, block, else_, context);
    },

    whileNotNull_: function(expression, block, context) {
      this.conditional_('while', expression + ' !== ' + this.null_(), block, context);
    },

    stringMatch_: function(expression, string) {
      return expression + ' === ' + this._quote(string);
    },

    stringMatchCI_: function(expression, string) {
      return expression + '.toLowerCase() === ' + this._quote(string) + '.toLowerCase()';
    },

    regexMatch_: function(regex, expression) {
      return '/' + regex.source + '/.test(' + expression + ')';
    },

    return_: function(expression) {
      this._line('return ' + expression);
    },

    arrayLookup_: function(expression, offset) {
      return expression + '[' + offset + ']';
    },

    append_: function(list, value) {
      this._line(list + '.push(' + value + ')');
    },

    concatText_: function(buffer, value) {
      this._line(buffer + ' += ' + value + '.text');
    },

    decrement_: function(variable) {
      this._line('--' + variable);
    },

    and_: function(left, right) {
      return left + ' && ' + right;
    },

    isNull_: function(expression) {
      return expression + ' === ' + this.null_();
    },

    isZero_: function(expression) {
      return expression + ' <= 0';
    },

    offset_: function() {
      return 'this._offset';
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

  Canopy.Builders.JavaScript = Builder;
})();