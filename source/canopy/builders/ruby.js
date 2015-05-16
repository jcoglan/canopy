(function() {
  var Builder = function(parent) {
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

  Canopy.extend(Builder.prototype, {
    serialize: function() {
      return this._buffer;
    },

    outputPathname: function(inputPathname) {
      return inputPathname.replace(/\.peg$/, '.rb');
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
      while (i--) this._write('  ');
      this._write(source);
      this._newline();
    },

    _quote: function(string) {
      string = string.replace(/\\/g, '\\\\')
                     .replace(/"/g, '\\"')
                     .replace(/#\{/g, '\\#{')
                     .replace(/\x07/g, '\\a')
                     .replace(/\x08/g, '\\b')
                     .replace(/\t/g, '\\t')
                     .replace(/\n/g, '\\n')
                     .replace(/\v/g, '\\v')
                     .replace(/\f/g, '\\f')
                     .replace(/\r/g, '\\r')
                     .replace(/\x1b/g, '\\e');

      return '"' + string + '"';
    },

    package_: function(name, block, context) {
      this._line('module ' + name.replace(/\./g, '::'));
      this._indent(block, context);
      this._line('end');
    },

    syntaxNodeClass_: function() {
      var name = 'SyntaxNode';
      this._line('class ' + name);
      this._indent(function(builder) {
        builder._line('include Enumerable');
        builder.attributes_(['text', 'offset', 'elements']);
        builder.method_('initialize', ['text', 'offset', 'elements = []'], function(builder) {
          builder.attribute_('text', 'text');
          builder.attribute_('offset', 'offset');
          builder.attribute_('elements', 'elements');
        });
        builder.method_('each', ['&block'], function(builder) {
          builder._line('@elements.each(&block)');
        });
      });
      this._line('end');
      this._newline();
      return name;
    },

    grammarModule_: function(block, context) {
      this.assign_('ParseError', 'Struct.new(:input, :offset, :expected)');
      this.assign_(this.nullNode_(), 'Object.new');
      this._newline();
      this._line('module Grammar');
      new Builder(this)._indent(block, context);
      this._line('end');
      this._newline();
    },

    parserClass_: function(root) {
      this._line('class Parser');
      this._indent(function(builder) {
        builder._line('include Grammar');
        builder._methodSeparator = '\n';

        builder.method_('initialize', ['input', 'actions', 'types'], function(builder) {
          builder.attribute_('input', 'input');
          builder.attribute_('input_size', 'input.size');
          builder.attribute_('actions', 'actions');
          builder.attribute_('types', 'types');
          builder.attribute_('offset', '0');
          builder.attribute_('cache', 'Hash.new { |h,k| h[k] = {} }');
          builder.attribute_('failure', '0');
          builder.attribute_('expected', '[]');
        });

        builder.method_('parse', [], function(builder) {
          builder.jump_('tree', root);
          builder.if_('tree != ' + builder.nullNode_() + ' and @offset == @input_size', function(builder) {
            builder.return_('tree');
          });
          builder.if_('@expected.empty?', function(builder) {
            builder.assign_('@failure', '@offset');
            builder.append_('@expected', '"<EOF>"');
          });
          builder._line('raise SyntaxError, Parser.format_error(@input, @failure, @expected)');
        });

        builder.method_('self.format_error', ['input', 'offset', 'expected'], function(builder) {
          builder._line('lines, line_no, position = input.split(/\\n/), 0, 0');
          builder._line('while position <= offset');
          builder._indent(function(builder) {
            builder._line('position += lines[line_no].size + 1');
            builder._line('line_no += 1');
          });
          builder._line('end');
          builder._line('message, line = "Line #{line_no}: expected #{expected * ", "}\\n", lines[line_no - 1]');
          builder._line('message += "#{line}\\n"');
          builder._line('position -= line.size + 1');
          builder._line('message += " " * (offset - position)');
          builder.return_('message + "^"');
        });
      });
      this._line('end');
      this._newline();
    },

    exports_: function() {
      this._line('def self.parse(input, options = {})');
      this._indent(function(builder) {
        builder.assign_('parser', 'Parser.new(input, options[:actions], options[:types])');
        builder._line('parser.parse');
      });
      this._line('end');
    },

    class_: function(name, parent, block, context) {
      this._line('class ' + name + ' < ' + parent);
      new Builder(this)._indent(block, context);
      this._line('end');
      this._newline();
    },

    constructor_: function(args, block, context) {
      this.method_('initialize', args, function(builder) {
        builder._line('super');
        block.call(context, builder);
      });
    },

    method_: function(name, args, block, context) {
      this._write(this._methodSeparator);
      this._methodSeparator = '\n';
      args = (args.length > 0) ? '(' + args.join(', ') + ')' : '';
      this._line('def ' + name + args);
      new Builder(this)._indent(block, context);
      this._line('end');
    },

    cache_: function(name, block, context) {
      var temp      = this.localVars_({address: this.nullNode_(), index: '@offset'}),
          address   = temp.address,
          offset    = temp.index,
          cacheMap  = '@cache[:' + name + ']',
          cacheAddr = cacheMap + '[' + offset + ']';

      this.assign_('cached', cacheAddr);

      this.if_('cached', function(builder) {
        builder._line('@offset = cached[1]');
        builder.return_('cached[0]');
      }, this);

      block.call(context, this, address);
      this.assign_(cacheAddr, '[' + address + ', @offset]');
      this.return_(address);
    },

    attributes_: function(names) {
      var keys = [];
      for (var i = 0, n = names.length; i < n; i++) keys.push(':' + names[i]);
      this._line('attr_reader ' + keys.join(', '));
      this._methodSeparator = '\n';
    },

    attribute_: function(name, value) {
      this.assign_('@' + name, value);
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
      this.assign_(varName, (value === undefined) ? this.nullNode_(): value);
      return varName;
    },

    chunk_: function(length) {
      var chunk = this.localVar_('chunk', this.null_()), input = '@input', of = '@offset';
      this.if_(of + ' < @input_size', function(builder) {
        builder.assign_(chunk, input + '[' + of + '...' + of + ' + ' + length + ']');
      });
      return chunk;
    },

    syntaxNode_: function(address, start, end, elements, action, nodeClass) {
      var args;

      if (action) {
        action = '@actions.' + action;
        args   = ['@input', start, end];
      } else {
        action = (nodeClass || 'SyntaxNode') + '.new';
        args   = ['@input[' + start + '...' + end + ']', start];
      }
      if (elements) args.push(elements);

      this.assign_(address, action + '(' + args.join(', ') + ')');
      this.assign_('@offset', end);
    },

    ifNode_: function(address, block, else_, context) {
      this.unless_(address + ' == ' + this.nullNode_(), block, else_, context);
    },

    unlessNode_: function(address, block, else_, context) {
      this.if_(address + ' == ' + this.nullNode_(), block, else_, context);
    },

    extendNode_: function(address, nodeType) {
      if (!nodeType) return;
      this._line(address + '.extend(@types::' + nodeType.replace(/\./g, '::') + ')');
    },

    failure_: function(address, expected) {
      expected = this._quote(expected);
      this.assign_(address, this.nullNode_());

      this.if_('@offset > @failure', function(builder) {
        builder.assign_('@failure', '@offset');
        builder.assign_('@expected', '[]');
      });
      this.if_('@offset == @failure', function(builder) {
        builder.append_('@expected', expected);
      });
    },

    assign_: function(name, value) {
      this._line(name + ' = ' + value);
    },

    jump_: function(address, name) {
      this.assign_(address, '_read_' + name);
    },

    conditional_: function(type, condition, block, else_, context) {
      if (typeof else_ !== 'function') {
        context = else_;
        else_   = null;
      }
      this._line(type + ' ' + condition);
      this._indent(block, context);
      if (else_) {
        this._line('else');
        this._indent(else_, context);
      }
      this._line('end');
    },

    if_: function(condition, block, else_, context) {
      this.conditional_('if', condition, block, else_, context);
    },

    unless_: function(condition, block, else_, context) {
      this.conditional_('unless', condition, block, else_, context);
    },

    whileNotNull_: function(expression, block, context) {
      this._line('until ' + expression + ' == ' + this.nullNode_());
      this._indent(block, context);
      this._line('end');
    },

    stringMatch_: function(expression, string) {
      return expression + ' == ' + this._quote(string);
    },

    stringMatchCI_: function(expression, string) {
      return expression + '.downcase == ' + this._quote(string) + '.downcase';
    },

    regexMatch_: function(regex, string) {
      var source = regex.source.replace(/^\^/g, '\\A');
      return string + ' =~ /' + source + '/';
    },

    return_: function(expression) {
      this._line('return ' + expression);
    },

    arrayLookup_: function(expression, index) {
      return expression + '[' + index + ']';
    },

    append_: function(list, value) {
      this._line(list + ' << ' + value);
    },

    decrement_: function(variable) {
      this._line(variable + ' -= 1');
    },

    isNull_: function(expression) {
      return expression + '.nil?';
    },

    isZero_: function(expression) {
      return expression + ' <= 0';
    },

    nullNode_: function() {
      return 'FAILURE';
    },

    offset_: function() {
      return '@offset';
    },

    emptyList_: function() {
      return '[]';
    },

    emptyString_: function() {
      return '""';
    },

    true_: function() {
      return 'true';
    },

    null_: function() {
      return 'nil';
    }
  });

  Canopy.Builders.Ruby = Builder;
})();
