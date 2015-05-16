(function() {
  var Builder = function(parent, name) {
    if (parent) {
      this._parent = parent;
      this._indentLevel = parent._indentLevel;
    } else {
      this._buffer = '';
      this._indentLevel = 0;
    }
    this._name = name;
    this._methodSeparator = '';
    this._varIndex = {};
  };

  Canopy.extend(Builder.prototype, {
    serialize: function() {
      return this._buffer;
    },

    outputPathname: function(inputPathname) {
      return inputPathname.replace(/\.peg$/, '.py');
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
    },

    _line: function(source) {
      var i = this._indentLevel;
      while (i--) this._write('    ');
      this._write(source);
      this._newline();
    },

    _quote: function(string) {
      string = string.replace(/\\/g, '\\\\')
                     .replace(/'/g, "\\'")
                     .replace(/\x07/g, '\\a')
                     .replace(/\x08/g, '\\b')
                     .replace(/\t/g, '\\t')
                     .replace(/\n/g, '\\n')
                     .replace(/\v/g, '\\v')
                     .replace(/\f/g, '\\f')
                     .replace(/\r/g, '\\r')
                     .replace(/\x1b/g, '\\e');

      return "'" + string + "'";
    },

    package_: function(name, block, context) {
      this._line('from collections import defaultdict');
      this._line('import re');
      this._newline();
      this._newline();
      block.call(context, this);
    },

    syntaxNodeClass_: function() {
      var name = 'SyntaxNode';
      this.class_(name, 'object', function(builder) {
        builder.method_('__init__', ['text', 'offset', 'elements=None'], function(builder) {
          builder.attribute_('text', 'text');
          builder.attribute_('offset', 'offset');
          builder.attribute_('elements', 'elements or []');
        });
        builder.method_('__iter__', [], function(builder) {
          builder._line('for el in self.elements:');
          builder._indent(function(builder) {
            builder._line('yield el');
          });
        });
      });
      return name;
    },

    grammarModule_: function(block, context) {
      this.class_('ParseError', 'SyntaxError', function(builder) {
        builder._line('pass');
      });
      this.assign_(this.nullNode_(), 'object()');
      this._newline();
      this._newline();
      this.class_('Grammar', 'object', block, context);
    },

    parserClass_: function(root) {
      this.class_('Parser', 'Grammar', function(builder) {
        builder.method_('__init__', ['input', 'actions', 'types'], function(builder) {
          builder.attribute_('_input', 'input');
          builder.attribute_('_input_size', 'len(input)');
          builder.attribute_('_actions', 'actions');
          builder.attribute_('_types', 'types');
          builder.attribute_('_offset', '0');
          builder.attribute_('_cache', 'defaultdict(dict)');
          builder.attribute_('_failure', '0');
          builder.attribute_('_expected', '[]');
        });

        builder.method_('parse', [], function(builder) {
          builder.jump_('tree', root);
          builder.if_('tree is not ' + builder.nullNode_() + ' and self._offset == self._input_size', function(builder) {
            builder.return_('tree');
          });
          builder.if_('not self._expected', function(builder) {
            builder.assign_('self._failure', 'self._offset');
            builder.append_('self._expected', "'<EOF>'");
          });
          builder._line('raise ParseError(format_error(self._input, self._failure, self._expected))');
        });
      });

      this._line('def format_error(input, offset, expected):');
      this._indent(function(builder) {
       builder._line("lines, line_no, position = input.split('\\n'), 0, 0");
        builder._line('while position <= offset:');
        builder._indent(function(builder) {
          builder._line('position += len(lines[line_no]) + 1');
          builder._line('line_no += 1');
        });
        builder._line("message, line = 'Line ' + str(line_no) + ': expected ' + ', '.join(expected) + '\\n', lines[line_no - 1]");
        builder._line("message += line + '\\n'");
        builder._line('position -= len(line) + 1');
        builder._line("message += ' ' * (offset - position)");
        builder.return_("message + '^'");
      });
      this._newline();
    },

    exports_: function() {
      this._line('def parse(input, actions=None, types=None):');
      this._indent(function(builder) {
        builder.assign_('parser', 'Parser(input, actions, types)');
        builder.return_('parser.parse()');
      });
    },

    class_: function(name, parent, block, context) {
      this._line('class ' + name + '(' + parent + '):');
      new Builder(this, name, parent)._indent(block, context);
      this._newline();
      this._newline();
    },

    constructor_: function(args, block, context) {
      this.method_('__init__', args, function(builder) {
        builder._line('super(' + this._name + ', self).__init__(' + args.join(', ') + ')');
        block.call(context, builder);
      }, this);
    },

    method_: function(name, args, block, context) {
      this._write(this._methodSeparator);
      this._methodSeparator = '\n';
      args = ['self'].concat(args).join(', ');
      this._line('def ' + name + '(' + args + '):');
      new Builder(this)._indent(block, context);
    },

    cache_: function(name, block, context) {
      var temp      = this.localVars_({address: this.nullNode_(), index: 'self._offset'}),
          address   = temp.address,
          offset    = temp.index,
          cacheMap  = "self._cache['" + name + "']",
          cacheAddr = cacheMap + '[' + offset + ']';

      this.assign_('cached', cacheMap + '.get(' + offset + ')');

      this.if_('cached', function(builder) {
        builder.assign_('self._offset', 'cached[1]');
        builder.return_('cached[0]');
      });

      block.call(context, this, address);
      this.assign_(cacheAddr, '(' + address + ', self._offset)');
      this.return_(address);
    },

    attributes_: function(names) {},

    attribute_: function(name, value) {
      this.assign_('self.' + name, value);
    },

    localVars_: function(vars) {
      var names = {}, lhs = [], rhs = [], varName;
      for (var name in vars) {
        this._varIndex[name] = this._varIndex[name] || 0;
        varName = name + this._varIndex[name];
        this._varIndex[name] += 1;
        lhs.push(varName);
        rhs.push(vars[name]);
        names[name] = varName;
      }
      this.assign_(lhs.join(', '), rhs.join(', '));
      return names;
    },

    localVar_: function(name, value) {
      this._varIndex[name] = this._varIndex[name] || 0;
      var varName = name + this._varIndex[name];
      this._varIndex[name] += 1;
      this.assign_(varName, (value === undefined) ? this.nullNode_() : value);
      return varName;
    },

    chunk_: function(length) {
      var chunk = this.localVar_('chunk', this.null_()), input = 'self._input', of = 'self._offset';
      this.if_(of + ' < self._input_size', function(builder) {
        builder.assign_(chunk, input + '[' + of + ':' + of + ' + ' + length + ']');
      });
      return chunk;
    },

    syntaxNode_: function(address, start, end, elements, action, nodeClass) {
      var args;

      if (action) {
        action = 'self._actions.' + action;
        args   = ['self._input', start, end];
      } else {
        action = nodeClass || 'SyntaxNode';
        args   = ['self._input[' + start + ':' + end + ']', start];
      }
      if (elements) args.push(elements);

      this.assign_(address, action + '(' + args.join(', ') + ')');
      this.assign_('self._offset', end);
    },

    ifNode_: function(address, block, else_, context) {
      this.if_(address + ' is not ' + this.nullNode_(), block, else_, context);
    },

    unlessNode_: function(address, block, else_, context) {
      this.if_(address + ' is ' + this.nullNode_(), block, else_, context);
    },

    extendNode_: function(address, nodeType) {
      if (!nodeType) return;
      var cls = this.localVar_('cls', 'type(' + address + ')');
      this.assign_(address + '.__class__', "type(" + cls + ".__name__ + '" + nodeType + "', (" + cls + ", self._types." + nodeType + "), {})");
    },

    failure_: function(address, expected) {
      expected = this._quote(expected);
      this.assign_(address, this.nullNode_());

      this.if_('self._offset > self._failure', function(builder) {
        builder.assign_('self._failure', 'self._offset');
        builder.assign_('self._expected', '[]');
      });
      this.if_('self._offset == self._failure', function(builder) {
        builder.append_('self._expected', expected);
      });
    },

    assign_: function(name, value) {
      this._line(name + ' = ' + value);
    },

    jump_: function(address, name) {
      this.assign_(address, 'self._read_' + name + '()');
    },

    if_: function(condition, block, else_, context) {
      if (typeof else_ !== 'function') {
        context = else_;
        else_   = null;
      }
      this._line('if ' + condition + ':');
      this._indent(block, context);
      if (else_) {
        this._line('else:');
        this._indent(else_, context);
      }
    },

    whileNotNull_: function(expression, block, context) {
      this._line('while ' + expression + ' is not ' + this.nullNode_() + ':');
      this._indent(block, context);
    },

    stringMatch_: function(expression, string) {
      return expression + ' == ' + this._quote(string);
    },

    stringMatchCI_: function(expression, string) {
      return expression + '.lower() == ' + this._quote(string) + '.lower()';
    },

    regexMatch_: function(regex, string) {
      return string + ' is not None and re.match(' + this._quote(regex.source) + ', ' + string + ')';
    },

    return_: function(expression) {
      this._line('return ' + expression);
    },

    arrayLookup_: function(expression, index) {
      return expression + '[' + index + ']';
    },

    append_: function(list, value) {
      this._line(list + '.append(' + value + ')');
    },

    decrement_: function(variable) {
      this._line(variable + ' -= 1');
    },

    isNull_: function(expression) {
      return expression + ' is None';
    },

    isZero_: function(expression) {
      return expression + ' <= 0';
    },

    nullNode_: function() {
      return 'FAILURE';
    },

    offset_: function() {
      return 'self._offset';
    },

    emptyList_: function() {
      return '[]';
    },

    emptyString_: function() {
      return "''";
    },

    true_: function() {
      return 'True';
    },

    null_: function() {
      return 'None';
    }
  });

  Canopy.Builders.Python = Builder;
})();
