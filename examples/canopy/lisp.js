(function() {
  'use strict';
  
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var formatError = function (input, offset, expected) {
    var lines = input.split(/\n/g),
        lineNo = 0,
        position = 0;

    while (position <= offset) {
      position += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + expected.join(', ') + '\n',
        line = lines[lineNo - 1];

    message += line + '\n';
    position -= line.length + 1;

    while (position < offset) {
      message += ' ';
      position += 1;
    }
    return message + '^';
  };
  
  var inherit = function (subclass, parent) {
    var chain = function() {};
    chain.prototype = parent.prototype;
    subclass.prototype = new chain();
    subclass.prototype.constructor = subclass;
  };
  
  var SyntaxNode = function(text, offset, elements) {
    this.text = text;
    this.offset = offset;
    this.elements = elements || [];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
      block.call(context, el[i], i, el);
    }
  };
  
  var SyntaxNode1 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['data'] = elements[1];
  };
  inherit(SyntaxNode1, SyntaxNode);
  
  var SyntaxNode2 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['cells'] = elements[1];
  };
  inherit(SyntaxNode2, SyntaxNode);
  
  var Grammar = {
    _read_program: function() {
      var address0 = null, index0 = this._offset;
      this._cache._program = this._cache._program || {};
      var cached = this._cache._program[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], address1 = true;
      while (address1 !== null) {
        address1 = this._read_cell();
        if (address1) {
          elements0.push(address1);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address0 = new SyntaxNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._program[index0] = [address0, this._offset];
      return address0;
    },

    _read_cell: function() {
      var address0 = null, index0 = this._offset;
      this._cache._cell = this._cache._cell || {};
      var cached = this._cache._cell[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== null) {
        address2 = this._read_space();
        if (address2) {
          elements1.push(address2);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address1 = new SyntaxNode(this._input.substring(index2, this._offset), index2, elements1);
        this._offset = this._offset;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        var address3 = null;
        var index3 = this._offset;
        address3 = this._read_list();
        if (!address3) {
          this._offset = index3;
          address3 = this._read_atom();
          if (!address3) {
            this._offset = index3;
          }
        }
        if (address3) {
          elements0.push(address3);
          var address4 = null;
          var remaining1 = 0, index4 = this._offset, elements2 = [], address5 = true;
          while (address5 !== null) {
            address5 = this._read_space();
            if (address5) {
              elements2.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new SyntaxNode(this._input.substring(index4, this._offset), index4, elements2);
            this._offset = this._offset;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        address0 = new SyntaxNode1(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._cell[index0] = [address0, this._offset];
      return address0;
    },

    _read_list: function() {
      var address0 = null, index0 = this._offset;
      this._cache._list = this._cache._list || {};
      var cached = this._cache._list[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '(') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"("');
        }
      }
      if (address1) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          address3 = this._read_cell();
          if (address3) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new SyntaxNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          var address4 = null;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === ')') {
            address4 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('")"');
            }
          }
          if (address4) {
            elements0.push(address4);
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        address0 = new SyntaxNode2(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._list[index0] = [address0, this._offset];
      return address0;
    },

    _read_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache._atom = this._cache._atom || {};
      var cached = this._cache._atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_boolean();
      if (!address0) {
        this._offset = index1;
        address0 = this._read_integer();
        if (!address0) {
          this._offset = index1;
          address0 = this._read_string();
          if (!address0) {
            this._offset = index1;
            address0 = this._read_symbol();
            if (!address0) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_boolean: function() {
      var address0 = null, index0 = this._offset;
      this._cache._boolean = this._cache._boolean || {};
      var cached = this._cache._boolean[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 2);
      }
      if (chunk0 === '#t') {
        address0 = new SyntaxNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
        this._offset = this._offset + 2;
      } else {
        address0 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"#t"');
        }
      }
      if (!address0) {
        this._offset = index1;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 2);
        }
        if (chunk1 === '#f') {
          address0 = new SyntaxNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
          this._offset = this._offset + 2;
        } else {
          address0 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"#f"');
          }
        }
        if (!address0) {
          this._offset = index1;
        }
      }
      this._cache._boolean[index0] = [address0, this._offset];
      return address0;
    },

    _read_integer: function() {
      var address0 = null, index0 = this._offset;
      this._cache._integer = this._cache._integer || {};
      var cached = this._cache._integer[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 && /^[1-9]/.test(chunk0)) {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('[1-9]');
        }
      }
      if (address1) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 && /^[0-9]/.test(chunk1)) {
            address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[0-9]');
            }
          }
          if (address3) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new SyntaxNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        address0 = new SyntaxNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._integer[index0] = [address0, this._offset];
      return address0;
    },

    _read_string: function() {
      var address0 = null, index0 = this._offset;
      this._cache._string = this._cache._string || {};
      var cached = this._cache._string[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '"') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"\\""');
        }
      }
      if (address1) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = [];
          var address4 = null;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '\\') {
            address4 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"\\\\"');
            }
          }
          if (address4) {
            elements2.push(address4);
            var address5 = null;
            var chunk2 = null;
            if (this._input.length > this._offset) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 === null) {
              address5 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('<any char>');
              }
            } else {
              address5 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            }
            if (address5) {
              elements2.push(address5);
            } else {
              elements2 = null;
              this._offset = index4;
            }
          } else {
            elements2 = null;
            this._offset = index4;
          }
          if (elements2) {
            address3 = new SyntaxNode(this._input.substring(index4, this._offset), index4, elements2);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (!address3) {
            this._offset = index3;
            var chunk3 = null;
            if (this._input.length > this._offset) {
              chunk3 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk3 && /^[^"]/.test(chunk3)) {
              address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address3 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[^"]');
              }
            }
            if (!address3) {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new SyntaxNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          var address6 = null;
          var chunk4 = null;
          if (this._input.length > this._offset) {
            chunk4 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk4 === '"') {
            address6 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address6 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"\\""');
            }
          }
          if (address6) {
            elements0.push(address6);
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        address0 = new SyntaxNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._string[index0] = [address0, this._offset];
      return address0;
    },

    _read_symbol: function() {
      var address0 = null, index0 = this._offset;
      this._cache._symbol = this._cache._symbol || {};
      var cached = this._cache._symbol[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], address1 = true;
      while (address1 !== null) {
        var index2 = this._offset, elements1 = [];
        var address2 = null;
        var index3 = this._offset;
        address2 = this._read_delimiter();
        this._offset = index3;
        if (!address2) {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset), this._offset, []);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2) {
          elements1.push(address2);
          var address3 = null;
          var chunk0 = null;
          if (this._input.length > this._offset) {
            chunk0 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk0 === null) {
            address3 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('<any char>');
            }
          } else {
            address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          }
          if (address3) {
            elements1.push(address3);
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1) {
          address1 = new SyntaxNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address1 = null;
        }
        if (address1) {
          elements0.push(address1);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address0 = new SyntaxNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._symbol[index0] = [address0, this._offset];
      return address0;
    },

    _read_space: function() {
      var address0 = null, index0 = this._offset;
      this._cache._space = this._cache._space || {};
      var cached = this._cache._space[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 && /^[\s]/.test(chunk0)) {
        address0 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('[\\s]');
        }
      }
      this._cache._space[index0] = [address0, this._offset];
      return address0;
    },

    _read_paren: function() {
      var address0 = null, index0 = this._offset;
      this._cache._paren = this._cache._paren || {};
      var cached = this._cache._paren[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '(') {
        address0 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"("');
        }
      }
      if (!address0) {
        this._offset = index1;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === ')') {
          address0 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address0 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('")"');
          }
        }
        if (!address0) {
          this._offset = index1;
        }
      }
      this._cache._paren[index0] = [address0, this._offset];
      return address0;
    },

    _read_delimiter: function() {
      var address0 = null, index0 = this._offset;
      this._cache._delimiter = this._cache._delimiter || {};
      var cached = this._cache._delimiter[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_paren();
      if (!address0) {
        this._offset = index1;
        address0 = this._read_space();
        if (!address0) {
          this._offset = index1;
        }
      }
      this._cache._delimiter[index0] = [address0, this._offset];
      return address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._cache = {};
    this._failure = 0;
    this._expected = [];
  };
  
  Parser.prototype.parse = function() {
    var tree = this._read_program();
    if (tree && this._offset === this._input.length) {
      return tree;
    }
    if (this._expected.length === 0) {
      this._failure = this._offset;
      this._expected.push('<EOF>');
    }
    this.constructor.lastError = {offset: this._offset, expected: this._expected};
    throw new SyntaxError(formatError(this._input, this._failure, this._expected));
  };
  
  var parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var exported = {Grammar: Grammar, Parser: Parser, parse: parse};
  
  if (typeof require === 'function' && typeof exports === 'object') {
    extend(exports, exported);
  } else {
    var namespace = window;
    namespace.CanopyLisp = exported;
  }
})();
