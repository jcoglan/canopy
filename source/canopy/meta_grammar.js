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
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;

    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;

    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];

    message += line + '\n';
    offset  -= line.length + 1;

    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var SyntaxNode = function(textValue, offset, elements) {
    this.textValue = textValue;
    this.offset = offset;
    this.elements = elements || [];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var el = this.elements, i = 0, n = el.length; i < n; i++)
      block.call(context, el[i], i, el);
  };
  
  var SyntaxNode1 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.grammar_name = elements[1];
    this.rules = elements[2];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode1.prototype = new parent();
  })();
  
  var SyntaxNode2 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.grammar_rule = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode2.prototype = new parent();
  })();
  
  var SyntaxNode3 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.object_identifier = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode3.prototype = new parent();
  })();
  
  var SyntaxNode4 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.identifier = elements[0];
    this.assignment = elements[1];
    this.parsing_expression = elements[2];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode4.prototype = new parent();
  })();
  
  var SyntaxNode5 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.parsing_expression = elements[2];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode5.prototype = new parent();
  })();
  
  var SyntaxNode6 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.first_part = elements[0];
    this.choice_part = elements[0];
    this.rest = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode6.prototype = new parent();
  })();
  
  var SyntaxNode7 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.expression = elements[3];
    this.choice_part = elements[3];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode7.prototype = new parent();
  })();
  
  var SyntaxNode8 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.type_expression = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode8.prototype = new parent();
  })();
  
  var SyntaxNode9 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.object_identifier = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode9.prototype = new parent();
  })();
  
  var SyntaxNode10 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.first_part = elements[0];
    this.sequence_part = elements[0];
    this.rest = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode10.prototype = new parent();
  })();
  
  var SyntaxNode11 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.expression = elements[1];
    this.sequence_part = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode11.prototype = new parent();
  })();
  
  var SyntaxNode12 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.expression = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode12.prototype = new parent();
  })();
  
  var SyntaxNode13 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.atom = elements[0];
    this.quantifier = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode13.prototype = new parent();
  })();
  
  var SyntaxNode14 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.predicate = elements[0];
    this.atom = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode14.prototype = new parent();
  })();
  
  var SyntaxNode15 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.identifier = elements[0];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode15.prototype = new parent();
  })();
  
  var SyntaxNode16 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.identifier = elements[0];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode16.prototype = new parent();
  })();
  
  var SyntaxNode17 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.identifier = elements[0];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode17.prototype = new parent();
  })();
  
  var SyntaxNode18 = function(textValue, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this.identifier = elements[1];
  };
  (function() {
    var parent = function() {};
    parent.prototype = SyntaxNode.prototype;
    SyntaxNode18.prototype = new parent();
  })();
  
  var Grammar = {
    _read_grammar: function() {
      var address0 = null, index0 = this._offset;
      this._cache.grammar = this._cache.grammar || {};
      var cached = this._cache.grammar[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = '', address2 = true;
      while (address2) {
        address2 = this._read_space();
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var type0 = null;
        address1 = new SyntaxNode(text1, this._offset, elements1);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        address3 = this._read_grammar_name();
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          var address4 = null;
          var remaining1 = 1, index3 = this._offset, elements2 = [], text2 = '', address5 = true;
          while (address5) {
            var index4 = this._offset, elements3 = [], text3 = '';
            var address6 = null;
            var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = '', address7 = true;
            while (address7) {
              address7 = this._read_space();
              if (address7) {
                elements4.push(address7);
                text4 += address7.textValue;
                --remaining2;
              }
            }
            if (remaining2 <= 0) {
              this._offset = index5;
              var type1 = null;
              address6 = new SyntaxNode(text4, this._offset, elements4);
              if (typeof type1 === "object") {
                extend(address6, type1);
              }
              this._offset += text4.length;
            } else {
              address6 = null;
            }
            if (address6) {
              elements3.push(address6);
              text3 += address6.textValue;
              var address8 = null;
              address8 = this._read_grammar_rule();
              if (address8) {
                elements3.push(address8);
                text3 += address8.textValue;
              } else {
                elements3 = null;
                this._offset = index4;
              }
            } else {
              elements3 = null;
              this._offset = index4;
            }
            if (elements3) {
              this._offset = index4;
              var type2 = null;
              address5 = new SyntaxNode2(text3, this._offset, elements3);
              if (typeof type2 === "object") {
                extend(address5, type2);
              }
              this._offset += text3.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index3;
            var type3 = null;
            address4 = new SyntaxNode(text2, this._offset, elements2);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += text2.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            var address9 = null;
            var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = '', address10 = true;
            while (address10) {
              address10 = this._read_space();
              if (address10) {
                elements5.push(address10);
                text5 += address10.textValue;
                --remaining3;
              }
            }
            if (remaining3 <= 0) {
              this._offset = index6;
              var type4 = null;
              address9 = new SyntaxNode(text5, this._offset, elements5);
              if (typeof type4 === "object") {
                extend(address9, type4);
              }
              this._offset += text5.length;
            } else {
              address9 = null;
            }
            if (address9) {
              elements0.push(address9);
              text0 += address9.textValue;
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
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type5 = find(this.constructor, "Grammar");
        address0 = new SyntaxNode1(text0, this._offset, elements0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.grammar[index0] = address0;
    },

    _read_grammar_name: function() {
      var address0 = null, index0 = this._offset;
      this._cache.grammar_name = this._cache.grammar_name || {};
      var cached = this._cache.grammar_name[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 8);
      }
      if (chunk0 === 'grammar ') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 8;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"grammar \""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this._read_object_identifier();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type1 = null;
        address0 = new SyntaxNode3(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.grammar_name[index0] = address0;
    },

    _read_grammar_rule: function() {
      var address0 = null, index0 = this._offset;
      this._cache.grammar_rule = this._cache.grammar_rule || {};
      var cached = this._cache.grammar_rule[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this._read_assignment();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this._read_parsing_expression();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
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
        this._offset = index1;
        var type0 = find(this.constructor, "GrammarRule");
        address0 = new SyntaxNode4(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.grammar_rule[index0] = address0;
    },

    _read_assignment: function() {
      var address0 = null, index0 = this._offset;
      this._cache.assignment = this._cache.assignment || {};
      var cached = this._cache.assignment[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = '', address2 = true;
      while (address2) {
        address2 = this._read_space();
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var type0 = null;
        address1 = new SyntaxNode(text1, this._offset, elements1);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        var chunk0 = null;
        if (this._input.length > this._offset) {
          chunk0 = this._input.substring(this._offset, this._offset + 2);
        }
        if (chunk0 === '<-') {
          var type1 = null;
          address3 = new SyntaxNode(chunk0, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 2;
        } else {
          address3 = null;
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"<-\""};
          }
        }
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          var address4 = null;
          var remaining1 = 1, index3 = this._offset, elements2 = [], text2 = '', address5 = true;
          while (address5) {
            address5 = this._read_space();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index3;
            var type2 = null;
            address4 = new SyntaxNode(text2, this._offset, elements2);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += text2.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
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
        this._offset = index1;
        var type3 = null;
        address0 = new SyntaxNode(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.assignment[index0] = address0;
    },

    _read_parsing_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.parsing_expression = this._cache.parsing_expression || {};
      var cached = this._cache.parsing_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this._read_choice_expression();
      if (!address0) {
        this._offset = index1;
        address0 = this._read_choice_part();
        if (!address0) {
          this._offset = index1;
        }
      }
      return this._cache.parsing_expression[index0] = address0;
    },

    _read_parenthesised_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.parenthesised_expression = this._cache.parenthesised_expression || {};
      var cached = this._cache.parenthesised_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '(') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"(\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          address3 = this._read_space();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type1 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this._read_parsing_expression();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = '', address6 = true;
            while (address6) {
              address6 = this._read_space();
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                --remaining1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var type2 = null;
              address5 = new SyntaxNode(text2, this._offset, elements2);
              if (typeof type2 === "object") {
                extend(address5, type2);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              var address7 = null;
              var chunk1 = null;
              if (this._input.length > this._offset) {
                chunk1 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk1 === ')') {
                var type3 = null;
                address7 = new SyntaxNode(chunk1, this._offset, []);
                if (typeof type3 === "object") {
                  extend(address7, type3);
                }
                this._offset += 1;
              } else {
                address7 = null;
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\")\""};
                }
              }
              if (address7) {
                elements0.push(address7);
                text0 += address7.textValue;
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
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type4 = null;
        address0 = new SyntaxNode5(text0, this._offset, elements0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.parenthesised_expression[index0] = address0;
    },

    _read_choice_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.choice_expression = this._cache.choice_expression || {};
      var cached = this._cache.choice_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_choice_part();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], text2 = '';
          var address4 = null;
          var remaining1 = 1, index4 = this._offset, elements3 = [], text3 = '', address5 = true;
          while (address5) {
            address5 = this._read_space();
            if (address5) {
              elements3.push(address5);
              text3 += address5.textValue;
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index4;
            var type0 = null;
            address4 = new SyntaxNode(text3, this._offset, elements3);
            if (typeof type0 === "object") {
              extend(address4, type0);
            }
            this._offset += text3.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address6 = null;
            var chunk0 = null;
            if (this._input.length > this._offset) {
              chunk0 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk0 === '/') {
              var type1 = null;
              address6 = new SyntaxNode(chunk0, this._offset, []);
              if (typeof type1 === "object") {
                extend(address6, type1);
              }
              this._offset += 1;
            } else {
              address6 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"/\""};
              }
            }
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
              var address7 = null;
              var remaining2 = 1, index5 = this._offset, elements4 = [], text4 = '', address8 = true;
              while (address8) {
                address8 = this._read_space();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  --remaining2;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var type2 = null;
                address7 = new SyntaxNode(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements2.push(address7);
                text2 += address7.textValue;
                var address9 = null;
                address9 = this._read_choice_part();
                if (address9) {
                  elements2.push(address9);
                  text2 += address9.textValue;
                } else {
                  elements2 = null;
                  this._offset = index3;
                }
              } else {
                elements2 = null;
                this._offset = index3;
              }
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var type3 = null;
            address3 = new SyntaxNode7(text2, this._offset, elements2);
            if (typeof type3 === "object") {
              extend(address3, type3);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type4 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type5 = find(this.constructor, "Choice");
        address0 = new SyntaxNode6(text0, this._offset, elements0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.choice_expression[index0] = address0;
    },

    _read_choice_part: function() {
      var address0 = null, index0 = this._offset;
      this._cache.choice_part = this._cache.choice_part || {};
      var cached = this._cache.choice_part[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var index2 = this._offset;
      address1 = this._read_sequence_expression();
      if (!address1) {
        this._offset = index2;
        address1 = this._read_sequence_part();
        if (!address1) {
          this._offset = index2;
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index3 = this._offset;
        var index4 = this._offset, elements1 = [], text1 = '';
        var address3 = null;
        var remaining0 = 1, index5 = this._offset, elements2 = [], text2 = '', address4 = true;
        while (address4) {
          address4 = this._read_space();
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index5;
          var type0 = null;
          address3 = new SyntaxNode(text2, this._offset, elements2);
          if (typeof type0 === "object") {
            extend(address3, type0);
          }
          this._offset += text2.length;
        } else {
          address3 = null;
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          var address5 = null;
          address5 = this._read_type_expression();
          if (address5) {
            elements1.push(address5);
            text1 += address5.textValue;
          } else {
            elements1 = null;
            this._offset = index4;
          }
        } else {
          elements1 = null;
          this._offset = index4;
        }
        if (elements1) {
          this._offset = index4;
          var type1 = null;
          address2 = new SyntaxNode8(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (!address2) {
          this._offset = index3;
          var type2 = null;
          address2 = new SyntaxNode('', this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type3 = find(this.constructor, "ChoicePart");
        address0 = new SyntaxNode(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.choice_part[index0] = address0;
    },

    _read_type_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.type_expression = this._cache.type_expression || {};
      var cached = this._cache.type_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '<') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"<\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this._read_object_identifier();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '>') {
            var type1 = null;
            address3 = new SyntaxNode(chunk1, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\">\""};
            }
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
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
        this._offset = index1;
        var type2 = null;
        address0 = new SyntaxNode9(text0, this._offset, elements0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.type_expression[index0] = address0;
    },

    _read_sequence_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.sequence_expression = this._cache.sequence_expression || {};
      var cached = this._cache.sequence_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_sequence_part();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], text2 = '';
          var address4 = null;
          var remaining1 = 1, index4 = this._offset, elements3 = [], text3 = '', address5 = true;
          while (address5) {
            address5 = this._read_space();
            if (address5) {
              elements3.push(address5);
              text3 += address5.textValue;
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index4;
            var type0 = null;
            address4 = new SyntaxNode(text3, this._offset, elements3);
            if (typeof type0 === "object") {
              extend(address4, type0);
            }
            this._offset += text3.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address6 = null;
            address6 = this._read_sequence_part();
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var type1 = null;
            address3 = new SyntaxNode11(text2, this._offset, elements2);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type2 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type3 = find(this.constructor, "Sequence");
        address0 = new SyntaxNode10(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.sequence_expression[index0] = address0;
    },

    _read_sequence_part: function() {
      var address0 = null, index0 = this._offset;
      this._cache.sequence_part = this._cache.sequence_part || {};
      var cached = this._cache.sequence_part[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var index2 = this._offset;
      address1 = this._read_label();
      if (!address1) {
        this._offset = index2;
        var type0 = null;
        address1 = new SyntaxNode('', this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index3 = this._offset;
        address2 = this._read_quantified_atom();
        if (!address2) {
          this._offset = index3;
          address2 = this._read_atom();
          if (!address2) {
            this._offset = index3;
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type1 = find(this.constructor, "SequencePart");
        address0 = new SyntaxNode12(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.sequence_part[index0] = address0;
    },

    _read_quantified_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache.quantified_atom = this._cache.quantified_atom || {};
      var cached = this._cache.quantified_atom[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_atom();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this._read_quantifier();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type0 = find(this.constructor, "Repeat");
        address0 = new SyntaxNode13(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.quantified_atom[index0] = address0;
    },

    _read_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache.atom = this._cache.atom || {};
      var cached = this._cache.atom[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this._read_parenthesised_expression();
      if (!address0) {
        this._offset = index1;
        address0 = this._read_predicated_atom();
        if (!address0) {
          this._offset = index1;
          address0 = this._read_reference_expression();
          if (!address0) {
            this._offset = index1;
            address0 = this._read_string_expression();
            if (!address0) {
              this._offset = index1;
              address0 = this._read_ci_string_expression();
              if (!address0) {
                this._offset = index1;
                address0 = this._read_any_char_expression();
                if (!address0) {
                  this._offset = index1;
                  address0 = this._read_char_class_expression();
                  if (!address0) {
                    this._offset = index1;
                  }
                }
              }
            }
          }
        }
      }
      return this._cache.atom[index0] = address0;
    },

    _read_predicated_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache.predicated_atom = this._cache.predicated_atom || {};
      var cached = this._cache.predicated_atom[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var index2 = this._offset;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '&') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"&\""};
        }
      }
      if (!address1) {
        this._offset = index2;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '!') {
          var type1 = null;
          address1 = new SyntaxNode(chunk1, this._offset, []);
          if (typeof type1 === "object") {
            extend(address1, type1);
          }
          this._offset += 1;
        } else {
          address1 = null;
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"!\""};
          }
        }
        if (!address1) {
          this._offset = index2;
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this._read_atom();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type2 = find(this.constructor, "Predicate");
        address0 = new SyntaxNode14(text0, this._offset, elements0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.predicated_atom[index0] = address0;
    },

    _read_reference_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.reference_expression = this._cache.reference_expression || {};
      var cached = this._cache.reference_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        address2 = this._read_assignment();
        this._offset = index2;
        if (!address2) {
          var type0 = null;
          address2 = new SyntaxNode('', this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 0;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type1 = find(this.constructor, "Reference");
        address0 = new SyntaxNode15(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.reference_expression[index0] = address0;
    },

    _read_string_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.string_expression = this._cache.string_expression || {};
      var cached = this._cache.string_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '"') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\"\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = [], text2 = '';
          var address4 = null;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '\\') {
            var type1 = null;
            address4 = new SyntaxNode(chunk1, this._offset, []);
            if (typeof type1 === "object") {
              extend(address4, type1);
            }
            this._offset += 1;
          } else {
            address4 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            var chunk2 = null;
            if (this._input.length > this._offset) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 === null) {
              address5 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
              }
            } else {
              var type2 = null;
              address5 = new SyntaxNode(chunk2, this._offset, []);
              if (typeof type2 === "object") {
                extend(address5, type2);
              }
              this._offset += 1;
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
            } else {
              elements2 = null;
              this._offset = index4;
            }
          } else {
            elements2 = null;
            this._offset = index4;
          }
          if (elements2) {
            this._offset = index4;
            var type3 = null;
            address3 = new SyntaxNode(text2, this._offset, elements2);
            if (typeof type3 === "object") {
              extend(address3, type3);
            }
            this._offset += text2.length;
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
              var type4 = null;
              address3 = new SyntaxNode(chunk3, this._offset, []);
              if (typeof type4 === "object") {
                extend(address3, type4);
              }
              this._offset += 1;
            } else {
              address3 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\"]"};
              }
            }
            if (!address3) {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type5 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type5 === "object") {
            extend(address2, type5);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address6 = null;
          var chunk4 = null;
          if (this._input.length > this._offset) {
            chunk4 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk4 === '"') {
            var type6 = null;
            address6 = new SyntaxNode(chunk4, this._offset, []);
            if (typeof type6 === "object") {
              extend(address6, type6);
            }
            this._offset += 1;
          } else {
            address6 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\"\""};
            }
          }
          if (address6) {
            elements0.push(address6);
            text0 += address6.textValue;
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
        this._offset = index1;
        var type7 = find(this.constructor, "String");
        address0 = new SyntaxNode(text0, this._offset, elements0);
        if (typeof type7 === "object") {
          extend(address0, type7);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.string_expression[index0] = address0;
    },

    _read_ci_string_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.ci_string_expression = this._cache.ci_string_expression || {};
      var cached = this._cache.ci_string_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '`') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"`\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = [], text2 = '';
          var address4 = null;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '\\') {
            var type1 = null;
            address4 = new SyntaxNode(chunk1, this._offset, []);
            if (typeof type1 === "object") {
              extend(address4, type1);
            }
            this._offset += 1;
          } else {
            address4 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            var chunk2 = null;
            if (this._input.length > this._offset) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 === null) {
              address5 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
              }
            } else {
              var type2 = null;
              address5 = new SyntaxNode(chunk2, this._offset, []);
              if (typeof type2 === "object") {
                extend(address5, type2);
              }
              this._offset += 1;
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
            } else {
              elements2 = null;
              this._offset = index4;
            }
          } else {
            elements2 = null;
            this._offset = index4;
          }
          if (elements2) {
            this._offset = index4;
            var type3 = null;
            address3 = new SyntaxNode(text2, this._offset, elements2);
            if (typeof type3 === "object") {
              extend(address3, type3);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (!address3) {
            this._offset = index3;
            var chunk3 = null;
            if (this._input.length > this._offset) {
              chunk3 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk3 && /^[^`]/.test(chunk3)) {
              var type4 = null;
              address3 = new SyntaxNode(chunk3, this._offset, []);
              if (typeof type4 === "object") {
                extend(address3, type4);
              }
              this._offset += 1;
            } else {
              address3 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^`]"};
              }
            }
            if (!address3) {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type5 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type5 === "object") {
            extend(address2, type5);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address6 = null;
          var chunk4 = null;
          if (this._input.length > this._offset) {
            chunk4 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk4 === '`') {
            var type6 = null;
            address6 = new SyntaxNode(chunk4, this._offset, []);
            if (typeof type6 === "object") {
              extend(address6, type6);
            }
            this._offset += 1;
          } else {
            address6 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"`\""};
            }
          }
          if (address6) {
            elements0.push(address6);
            text0 += address6.textValue;
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
        this._offset = index1;
        var type7 = find(this.constructor, "CIString");
        address0 = new SyntaxNode(text0, this._offset, elements0);
        if (typeof type7 === "object") {
          extend(address0, type7);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.ci_string_expression[index0] = address0;
    },

    _read_any_char_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.any_char_expression = this._cache.any_char_expression || {};
      var cached = this._cache.any_char_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '.') {
        var type0 = find(this.constructor, "AnyChar");
        address0 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
        }
      }
      return this._cache.any_char_expression[index0] = address0;
    },

    _read_char_class_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache.char_class_expression = this._cache.char_class_expression || {};
      var cached = this._cache.char_class_expression[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '[') {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '^') {
          var type1 = null;
          address2 = new SyntaxNode(chunk1, this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 1;
        } else {
          address2 = null;
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"^\""};
          }
        }
        if (!address2) {
          this._offset = index2;
          var type2 = null;
          address2 = new SyntaxNode('', this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          var remaining0 = 1, index3 = this._offset, elements1 = [], text1 = '', address4 = true;
          while (address4) {
            var index4 = this._offset;
            var index5 = this._offset, elements2 = [], text2 = '';
            var address5 = null;
            var chunk2 = null;
            if (this._input.length > this._offset) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 === '\\') {
              var type3 = null;
              address5 = new SyntaxNode(chunk2, this._offset, []);
              if (typeof type3 === "object") {
                extend(address5, type3);
              }
              this._offset += 1;
            } else {
              address5 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
              }
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              var address6 = null;
              var chunk3 = null;
              if (this._input.length > this._offset) {
                chunk3 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk3 === null) {
                address6 = null;
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
                }
              } else {
                var type4 = null;
                address6 = new SyntaxNode(chunk3, this._offset, []);
                if (typeof type4 === "object") {
                  extend(address6, type4);
                }
                this._offset += 1;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
              } else {
                elements2 = null;
                this._offset = index5;
              }
            } else {
              elements2 = null;
              this._offset = index5;
            }
            if (elements2) {
              this._offset = index5;
              var type5 = null;
              address4 = new SyntaxNode(text2, this._offset, elements2);
              if (typeof type5 === "object") {
                extend(address4, type5);
              }
              this._offset += text2.length;
            } else {
              address4 = null;
            }
            if (!address4) {
              this._offset = index4;
              var chunk4 = null;
              if (this._input.length > this._offset) {
                chunk4 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk4 && /^[^\]]/.test(chunk4)) {
                var type6 = null;
                address4 = new SyntaxNode(chunk4, this._offset, []);
                if (typeof type6 === "object") {
                  extend(address4, type6);
                }
                this._offset += 1;
              } else {
                address4 = null;
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\\]]"};
                }
              }
              if (!address4) {
                this._offset = index4;
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index3;
            var type7 = null;
            address3 = new SyntaxNode(text1, this._offset, elements1);
            if (typeof type7 === "object") {
              extend(address3, type7);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            var address7 = null;
            var chunk5 = null;
            if (this._input.length > this._offset) {
              chunk5 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk5 === ']') {
              var type8 = null;
              address7 = new SyntaxNode(chunk5, this._offset, []);
              if (typeof type8 === "object") {
                extend(address7, type8);
              }
              this._offset += 1;
            } else {
              address7 = null;
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
              }
            }
            if (address7) {
              elements0.push(address7);
              text0 += address7.textValue;
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
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type9 = find(this.constructor, "CharClass");
        address0 = new SyntaxNode(text0, this._offset, elements0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.char_class_expression[index0] = address0;
    },

    _read_label: function() {
      var address0 = null, index0 = this._offset;
      this._cache.label = this._cache.label || {};
      var cached = this._cache.label[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var chunk0 = null;
        if (this._input.length > this._offset) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === ':') {
          var type0 = null;
          address2 = new SyntaxNode(chunk0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\":\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type1 = null;
        address0 = new SyntaxNode16(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.label[index0] = address0;
    },

    _read_object_identifier: function() {
      var address0 = null, index0 = this._offset;
      this._cache.object_identifier = this._cache.object_identifier || {};
      var cached = this._cache.object_identifier[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      address1 = this._read_identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], text2 = '';
          var address4 = null;
          var chunk0 = null;
          if (this._input.length > this._offset) {
            chunk0 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk0 === '.') {
            var type0 = null;
            address4 = new SyntaxNode(chunk0, this._offset, []);
            if (typeof type0 === "object") {
              extend(address4, type0);
            }
            this._offset += 1;
          } else {
            address4 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            address5 = this._read_identifier();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var type1 = null;
            address3 = new SyntaxNode18(text2, this._offset, elements2);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type2 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type3 = null;
        address0 = new SyntaxNode17(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.object_identifier[index0] = address0;
    },

    _read_identifier: function() {
      var address0 = null, index0 = this._offset;
      this._cache.identifier = this._cache.identifier || {};
      var cached = this._cache.identifier[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], text0 = '';
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 && /^[a-zA-Z_$]/.test(chunk0)) {
        var type0 = null;
        address1 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-zA-Z_$]"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = '', address3 = true;
        while (address3) {
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 && /^[a-zA-Z0-9_$]/.test(chunk1)) {
            var type1 = null;
            address3 = new SyntaxNode(chunk1, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-zA-Z0-9_$]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var type2 = null;
          address2 = new SyntaxNode(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var type3 = null;
        address0 = new SyntaxNode(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._cache.identifier[index0] = address0;
    },

    _read_quantifier: function() {
      var address0 = null, index0 = this._offset;
      this._cache.quantifier = this._cache.quantifier || {};
      var cached = this._cache.quantifier[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '?') {
        var type0 = null;
        address0 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?\""};
        }
      }
      if (!address0) {
        this._offset = index1;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '*') {
          var type1 = null;
          address0 = new SyntaxNode(chunk1, this._offset, []);
          if (typeof type1 === "object") {
            extend(address0, type1);
          }
          this._offset += 1;
        } else {
          address0 = null;
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"*\""};
          }
        }
        if (!address0) {
          this._offset = index1;
          var chunk2 = null;
          if (this._input.length > this._offset) {
            chunk2 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk2 === '+') {
            var type2 = null;
            address0 = new SyntaxNode(chunk2, this._offset, []);
            if (typeof type2 === "object") {
              extend(address0, type2);
            }
            this._offset += 1;
          } else {
            address0 = null;
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"+\""};
            }
          }
          if (!address0) {
            this._offset = index1;
          }
        }
      }
      return this._cache.quantifier[index0] = address0;
    },

    _read_space: function() {
      var address0 = null, index0 = this._offset;
      this._cache.space = this._cache.space || {};
      var cached = this._cache.space[index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 && /^[\s\n\r\t]/.test(chunk0)) {
        var type0 = null;
        address0 = new SyntaxNode(chunk0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[\\s\\n\\r\\t]"};
        }
      }
      return this._cache.space[index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._cache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this._read_grammar();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!this.error) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
    if (typeof Canopy !== "undefined") {
      Canopy.MetaGrammar = Grammar;
      Canopy.MetaGrammarParser = Parser;
      Canopy.MetaGrammarParser.formatError = formatError;
    }
  } else {
    var namespace = this;
    namespace = namespace.Canopy = namespace.Canopy || {};
    Canopy.MetaGrammar = Grammar;
    Canopy.MetaGrammarParser = Parser;
    Canopy.MetaGrammarParser.formatError = formatError;
  }
})();
