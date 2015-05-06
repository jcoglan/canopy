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
    this['grammar_name'] = elements[1];
    this['rules'] = elements[2];
  };
  inherit(SyntaxNode1, SyntaxNode);
  
  var SyntaxNode2 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['grammar_rule'] = elements[1];
  };
  inherit(SyntaxNode2, SyntaxNode);
  
  var SyntaxNode3 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['object_identifier'] = elements[3];
  };
  inherit(SyntaxNode3, SyntaxNode);
  
  var SyntaxNode4 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['identifier'] = elements[0];
    this['assignment'] = elements[1];
    this['parsing_expression'] = elements[2];
  };
  inherit(SyntaxNode4, SyntaxNode);
  
  var SyntaxNode5 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['parsing_expression'] = elements[2];
  };
  inherit(SyntaxNode5, SyntaxNode);
  
  var SyntaxNode6 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['first_part'] = elements[0];
    this['choice_part'] = elements[0];
    this['rest'] = elements[1];
  };
  inherit(SyntaxNode6, SyntaxNode);
  
  var SyntaxNode7 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['expression'] = elements[3];
    this['choice_part'] = elements[3];
  };
  inherit(SyntaxNode7, SyntaxNode);
  
  var SyntaxNode8 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['type_tag'] = elements[1];
  };
  inherit(SyntaxNode8, SyntaxNode);
  
  var SyntaxNode9 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['actionable_expression'] = elements[0];
    this['action_tag'] = elements[2];
  };
  inherit(SyntaxNode9, SyntaxNode);
  
  var SyntaxNode10 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['actionable_expression'] = elements[2];
  };
  inherit(SyntaxNode10, SyntaxNode);
  
  var SyntaxNode11 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['identifier'] = elements[1];
  };
  inherit(SyntaxNode11, SyntaxNode);
  
  var SyntaxNode12 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['object_identifier'] = elements[1];
  };
  inherit(SyntaxNode12, SyntaxNode);
  
  var SyntaxNode13 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['first_part'] = elements[0];
    this['sequence_part'] = elements[0];
    this['rest'] = elements[1];
  };
  inherit(SyntaxNode13, SyntaxNode);
  
  var SyntaxNode14 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['expression'] = elements[1];
    this['sequence_part'] = elements[1];
  };
  inherit(SyntaxNode14, SyntaxNode);
  
  var SyntaxNode15 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['expression'] = elements[1];
  };
  inherit(SyntaxNode15, SyntaxNode);
  
  var SyntaxNode16 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['atom'] = elements[0];
  };
  inherit(SyntaxNode16, SyntaxNode);
  
  var SyntaxNode17 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['atom'] = elements[0];
    this['quantifier'] = elements[1];
  };
  inherit(SyntaxNode17, SyntaxNode);
  
  var SyntaxNode18 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['predicate'] = elements[0];
    this['atom'] = elements[1];
  };
  inherit(SyntaxNode18, SyntaxNode);
  
  var SyntaxNode19 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['identifier'] = elements[0];
  };
  inherit(SyntaxNode19, SyntaxNode);
  
  var SyntaxNode20 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['identifier'] = elements[0];
  };
  inherit(SyntaxNode20, SyntaxNode);
  
  var SyntaxNode21 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['identifier'] = elements[0];
  };
  inherit(SyntaxNode21, SyntaxNode);
  
  var SyntaxNode22 = function(text, offset, elements) {
    SyntaxNode.apply(this, arguments);
    this['identifier'] = elements[1];
  };
  inherit(SyntaxNode22, SyntaxNode);
  
  var Grammar = {
    _read_grammar: function() {
      var address0 = null, index0 = this._offset;
      this._cache._grammar = this._cache._grammar || {};
      var cached = this._cache._grammar[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== null) {
        address2 = this._read__();
        if (address2 !== null) {
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
      if (address1 !== null) {
        elements0.push(address1);
        var address3 = null;
        address3 = this._read_grammar_name();
        if (address3 !== null) {
          elements0.push(address3);
          var address4 = null;
          var remaining1 = 1, index3 = this._offset, elements2 = [], address5 = true;
          while (address5 !== null) {
            var index4 = this._offset, elements3 = [];
            var address6 = null;
            var remaining2 = 0, index5 = this._offset, elements4 = [], address7 = true;
            while (address7 !== null) {
              address7 = this._read__();
              if (address7 !== null) {
                elements4.push(address7);
                --remaining2;
              }
            }
            if (remaining2 <= 0) {
              address6 = new SyntaxNode(this._input.substring(index5, this._offset), index5, elements4);
              this._offset = this._offset;
            } else {
              address6 = null;
            }
            if (address6 !== null) {
              elements3.push(address6);
              var address8 = null;
              address8 = this._read_grammar_rule();
              if (address8 !== null) {
                elements3.push(address8);
              } else {
                elements3 = null;
                this._offset = index4;
              }
            } else {
              elements3 = null;
              this._offset = index4;
            }
            if (elements3) {
              address5 = new SyntaxNode2(this._input.substring(index4, this._offset), index4, elements3);
              this._offset = this._offset;
            } else {
              address5 = null;
            }
            if (address5 !== null) {
              elements2.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address4 = null;
          }
          if (address4 !== null) {
            elements0.push(address4);
            var address9 = null;
            var remaining3 = 0, index6 = this._offset, elements5 = [], address10 = true;
            while (address10 !== null) {
              address10 = this._read__();
              if (address10 !== null) {
                elements5.push(address10);
                --remaining3;
              }
            }
            if (remaining3 <= 0) {
              address9 = new SyntaxNode(this._input.substring(index6, this._offset), index6, elements5);
              this._offset = this._offset;
            } else {
              address9 = null;
            }
            if (address9 !== null) {
              elements0.push(address9);
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
        address0 = new SyntaxNode1(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Grammar);
      this._cache._grammar[index0] = [address0, this._offset];
      return address0;
    },

    _read_grammar_name: function() {
      var address0 = null, index0 = this._offset;
      this._cache._grammar_name = this._cache._grammar_name || {};
      var cached = this._cache._grammar_name[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 7);
      }
      if (chunk0.toLowerCase() === 'grammar'.toLowerCase()) {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 7), this._offset, []);
        this._offset = this._offset + 7;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('`grammar`');
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var index2 = this._offset;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === ':') {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('":"');
          }
        }
        if (!address2) {
          address2 = new SyntaxNode(this._input.substring(index2, index2), index2, []);
          this._offset = index2;
        }
        if (address2 !== null) {
          elements0.push(address2);
          var address3 = null;
          var remaining0 = 1, index3 = this._offset, elements1 = [], address4 = true;
          while (address4 !== null) {
            address4 = this._read__();
            if (address4 !== null) {
              elements1.push(address4);
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            address3 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements1);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (address3 !== null) {
            elements0.push(address3);
            var address5 = null;
            address5 = this._read_object_identifier();
            if (address5 !== null) {
              elements0.push(address5);
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
        address0 = new SyntaxNode3(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._grammar_name[index0] = [address0, this._offset];
      return address0;
    },

    _read_grammar_rule: function() {
      var address0 = null, index0 = this._offset;
      this._cache._grammar_rule = this._cache._grammar_rule || {};
      var cached = this._cache._grammar_rule[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_identifier();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        address2 = this._read_assignment();
        if (address2 !== null) {
          elements0.push(address2);
          var address3 = null;
          address3 = this._read_parsing_expression();
          if (address3 !== null) {
            elements0.push(address3);
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
        address0 = new SyntaxNode4(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.GrammarRule);
      this._cache._grammar_rule[index0] = [address0, this._offset];
      return address0;
    },

    _read_assignment: function() {
      var address0 = null, index0 = this._offset;
      this._cache._assignment = this._cache._assignment || {};
      var cached = this._cache._assignment[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var remaining0 = 1, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== null) {
        address2 = this._read__();
        if (address2 !== null) {
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
      if (address1 !== null) {
        elements0.push(address1);
        var address3 = null;
        var chunk0 = null;
        if (this._input.length > this._offset) {
          chunk0 = this._input.substring(this._offset, this._offset + 2);
        }
        if (chunk0 === '<-') {
          address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
          this._offset = this._offset + 2;
        } else {
          address3 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"<-"');
          }
        }
        if (address3 !== null) {
          elements0.push(address3);
          var address4 = null;
          var remaining1 = 1, index3 = this._offset, elements2 = [], address5 = true;
          while (address5 !== null) {
            address5 = this._read__();
            if (address5 !== null) {
              elements2.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address4 = null;
          }
          if (address4 !== null) {
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
        address0 = new SyntaxNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._assignment[index0] = [address0, this._offset];
      return address0;
    },

    _read_parsing_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._parsing_expression = this._cache._parsing_expression || {};
      var cached = this._cache._parsing_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
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
      this._cache._parsing_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_parenthesised_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._parenthesised_expression = this._cache._parenthesised_expression || {};
      var cached = this._cache._parenthesised_expression[index0];
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
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          address3 = this._read__();
          if (address3 !== null) {
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
        if (address2 !== null) {
          elements0.push(address2);
          var address4 = null;
          address4 = this._read_parsing_expression();
          if (address4 !== null) {
            elements0.push(address4);
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], address6 = true;
            while (address6 !== null) {
              address6 = this._read__();
              if (address6 !== null) {
                elements2.push(address6);
                --remaining1;
              }
            }
            if (remaining1 <= 0) {
              address5 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements2);
              this._offset = this._offset;
            } else {
              address5 = null;
            }
            if (address5 !== null) {
              elements0.push(address5);
              var address7 = null;
              var chunk1 = null;
              if (this._input.length > this._offset) {
                chunk1 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk1 === ')') {
                address7 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address7 = null;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('")"');
                }
              }
              if (address7 !== null) {
                elements0.push(address7);
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
        address0 = new SyntaxNode5(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._parenthesised_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_choice_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._choice_expression = this._cache._choice_expression || {};
      var cached = this._cache._choice_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_choice_part();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var index3 = this._offset, elements2 = [];
          var address4 = null;
          var remaining1 = 1, index4 = this._offset, elements3 = [], address5 = true;
          while (address5 !== null) {
            address5 = this._read__();
            if (address5 !== null) {
              elements3.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new SyntaxNode(this._input.substring(index4, this._offset), index4, elements3);
            this._offset = this._offset;
          } else {
            address4 = null;
          }
          if (address4 !== null) {
            elements2.push(address4);
            var address6 = null;
            var chunk0 = null;
            if (this._input.length > this._offset) {
              chunk0 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk0 === '/') {
              address6 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address6 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"/"');
              }
            }
            if (address6 !== null) {
              elements2.push(address6);
              var address7 = null;
              var remaining2 = 1, index5 = this._offset, elements4 = [], address8 = true;
              while (address8 !== null) {
                address8 = this._read__();
                if (address8 !== null) {
                  elements4.push(address8);
                  --remaining2;
                }
              }
              if (remaining2 <= 0) {
                address7 = new SyntaxNode(this._input.substring(index5, this._offset), index5, elements4);
                this._offset = this._offset;
              } else {
                address7 = null;
              }
              if (address7 !== null) {
                elements2.push(address7);
                var address9 = null;
                address9 = this._read_choice_part();
                if (address9 !== null) {
                  elements2.push(address9);
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
            address3 = new SyntaxNode7(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (address3 !== null) {
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
        if (address2 !== null) {
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
        address0 = new SyntaxNode6(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Choice);
      this._cache._choice_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_choice_part: function() {
      var address0 = null, index0 = this._offset;
      this._cache._choice_part = this._cache._choice_part || {};
      var cached = this._cache._choice_part[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var index2 = this._offset;
      address1 = this._read_action_expression();
      if (!address1) {
        this._offset = index2;
        address1 = this._read_sequence_expression();
        if (!address1) {
          this._offset = index2;
          address1 = this._read_sequence_part();
          if (!address1) {
            this._offset = index2;
          }
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var index3 = this._offset;
        var index4 = this._offset, elements1 = [];
        var address3 = null;
        var remaining0 = 1, index5 = this._offset, elements2 = [], address4 = true;
        while (address4 !== null) {
          address4 = this._read__();
          if (address4 !== null) {
            elements2.push(address4);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address3 = new SyntaxNode(this._input.substring(index5, this._offset), index5, elements2);
          this._offset = this._offset;
        } else {
          address3 = null;
        }
        if (address3 !== null) {
          elements1.push(address3);
          var address5 = null;
          address5 = this._read_type_tag();
          if (address5 !== null) {
            elements1.push(address5);
          } else {
            elements1 = null;
            this._offset = index4;
          }
        } else {
          elements1 = null;
          this._offset = index4;
        }
        if (elements1) {
          address2 = new SyntaxNode8(this._input.substring(index4, this._offset), index4, elements1);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (!address2) {
          address2 = new SyntaxNode(this._input.substring(index3, index3), index3, []);
          this._offset = index3;
        }
        if (address2 !== null) {
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
      extend(address0, this._types.ChoicePart);
      this._cache._choice_part[index0] = [address0, this._offset];
      return address0;
    },

    _read_action_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._action_expression = this._cache._action_expression || {};
      var cached = this._cache._action_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_actionable_expression();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          address3 = this._read__();
          if (address3 !== null) {
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
        if (address2 !== null) {
          elements0.push(address2);
          var address4 = null;
          address4 = this._read_action_tag();
          if (address4 !== null) {
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
        address0 = new SyntaxNode9(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Action);
      this._cache._action_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_actionable_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._actionable_expression = this._cache._actionable_expression || {};
      var cached = this._cache._actionable_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [];
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
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index3 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          address3 = this._read__();
          if (address3 !== null) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2 !== null) {
          elements0.push(address2);
          var address4 = null;
          address4 = this._read_actionable_expression();
          if (address4 !== null) {
            elements0.push(address4);
            var address5 = null;
            var remaining1 = 0, index4 = this._offset, elements2 = [], address6 = true;
            while (address6 !== null) {
              address6 = this._read__();
              if (address6 !== null) {
                elements2.push(address6);
                --remaining1;
              }
            }
            if (remaining1 <= 0) {
              address5 = new SyntaxNode(this._input.substring(index4, this._offset), index4, elements2);
              this._offset = this._offset;
            } else {
              address5 = null;
            }
            if (address5 !== null) {
              elements0.push(address5);
              var address7 = null;
              var chunk1 = null;
              if (this._input.length > this._offset) {
                chunk1 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk1 === ')') {
                address7 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address7 = null;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('")"');
                }
              }
              if (address7 !== null) {
                elements0.push(address7);
              } else {
                elements0 = null;
                this._offset = index2;
              }
            } else {
              elements0 = null;
              this._offset = index2;
            }
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        address0 = new SyntaxNode10(this._input.substring(index2, this._offset), index2, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      if (!address0) {
        this._offset = index1;
        address0 = this._read_sequence_expression();
        if (!address0) {
          this._offset = index1;
          address0 = this._read_repeated_atom();
          if (!address0) {
            this._offset = index1;
            address0 = this._read_terminal_node();
            if (!address0) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._actionable_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_action_tag: function() {
      var address0 = null, index0 = this._offset;
      this._cache._action_tag = this._cache._action_tag || {};
      var cached = this._cache._action_tag[index0];
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
      if (chunk0 === '%') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"%"');
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        address2 = this._read_identifier();
        if (address2 !== null) {
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
        address0 = new SyntaxNode11(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._action_tag[index0] = [address0, this._offset];
      return address0;
    },

    _read_type_tag: function() {
      var address0 = null, index0 = this._offset;
      this._cache._type_tag = this._cache._type_tag || {};
      var cached = this._cache._type_tag[index0];
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
      if (chunk0 === '<') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"<"');
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        address2 = this._read_object_identifier();
        if (address2 !== null) {
          elements0.push(address2);
          var address3 = null;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '>') {
            address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('">"');
            }
          }
          if (address3 !== null) {
            elements0.push(address3);
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
        address0 = new SyntaxNode12(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._type_tag[index0] = [address0, this._offset];
      return address0;
    },

    _read_sequence_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._sequence_expression = this._cache._sequence_expression || {};
      var cached = this._cache._sequence_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_sequence_part();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var index3 = this._offset, elements2 = [];
          var address4 = null;
          var remaining1 = 1, index4 = this._offset, elements3 = [], address5 = true;
          while (address5 !== null) {
            address5 = this._read__();
            if (address5 !== null) {
              elements3.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new SyntaxNode(this._input.substring(index4, this._offset), index4, elements3);
            this._offset = this._offset;
          } else {
            address4 = null;
          }
          if (address4 !== null) {
            elements2.push(address4);
            var address6 = null;
            address6 = this._read_sequence_part();
            if (address6 !== null) {
              elements2.push(address6);
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            address3 = new SyntaxNode14(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (address3 !== null) {
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
        if (address2 !== null) {
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
        address0 = new SyntaxNode13(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Sequence);
      this._cache._sequence_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_sequence_part: function() {
      var address0 = null, index0 = this._offset;
      this._cache._sequence_part = this._cache._sequence_part || {};
      var cached = this._cache._sequence_part[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var index2 = this._offset;
      address1 = this._read_label();
      if (!address1) {
        address1 = new SyntaxNode(this._input.substring(index2, index2), index2, []);
        this._offset = index2;
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var index3 = this._offset;
        address2 = this._read_maybe_atom();
        if (!address2) {
          this._offset = index3;
          address2 = this._read_repeated_atom();
          if (!address2) {
            this._offset = index3;
            address2 = this._read_atom();
            if (!address2) {
              this._offset = index3;
            }
          }
        }
        if (address2 !== null) {
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
        address0 = new SyntaxNode15(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.SequencePart);
      this._cache._sequence_part[index0] = [address0, this._offset];
      return address0;
    },

    _read_maybe_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache._maybe_atom = this._cache._maybe_atom || {};
      var cached = this._cache._maybe_atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_atom();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var chunk0 = null;
        if (this._input.length > this._offset) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === '?') {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"?"');
          }
        }
        if (address2 !== null) {
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
        address0 = new SyntaxNode16(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Maybe);
      this._cache._maybe_atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_repeated_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache._repeated_atom = this._cache._repeated_atom || {};
      var cached = this._cache._repeated_atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_atom();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var index2 = this._offset;
        var chunk0 = null;
        if (this._input.length > this._offset) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === '*') {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"*"');
          }
        }
        if (!address2) {
          this._offset = index2;
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '+') {
            address2 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address2 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"+"');
            }
          }
          if (!address2) {
            this._offset = index2;
          }
        }
        if (address2 !== null) {
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
        address0 = new SyntaxNode17(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Repeat);
      this._cache._repeated_atom[index0] = [address0, this._offset];
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
      address0 = this._read_parenthesised_expression();
      if (!address0) {
        this._offset = index1;
        address0 = this._read_predicated_atom();
        if (!address0) {
          this._offset = index1;
          address0 = this._read_reference_expression();
          if (!address0) {
            this._offset = index1;
            address0 = this._read_terminal_node();
            if (!address0) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_terminal_node: function() {
      var address0 = null, index0 = this._offset;
      this._cache._terminal_node = this._cache._terminal_node || {};
      var cached = this._cache._terminal_node[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_string_expression();
      if (!address0) {
        this._offset = index1;
        address0 = this._read_ci_string_expression();
        if (!address0) {
          this._offset = index1;
          address0 = this._read_char_class_expression();
          if (!address0) {
            this._offset = index1;
            address0 = this._read_any_char_expression();
            if (!address0) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._terminal_node[index0] = [address0, this._offset];
      return address0;
    },

    _read_predicated_atom: function() {
      var address0 = null, index0 = this._offset;
      this._cache._predicated_atom = this._cache._predicated_atom || {};
      var cached = this._cache._predicated_atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      var index2 = this._offset;
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '&') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"&"');
        }
      }
      if (!address1) {
        this._offset = index2;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '!') {
          address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address1 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"!"');
          }
        }
        if (!address1) {
          this._offset = index2;
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        address2 = this._read_atom();
        if (address2 !== null) {
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
        address0 = new SyntaxNode18(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Predicate);
      this._cache._predicated_atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_reference_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._reference_expression = this._cache._reference_expression || {};
      var cached = this._cache._reference_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_identifier();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var index2 = this._offset;
        address2 = this._read_assignment();
        this._offset = index2;
        if (!address2) {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset), this._offset, []);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2 !== null) {
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
        address0 = new SyntaxNode19(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.Reference);
      this._cache._reference_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_string_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._string_expression = this._cache._string_expression || {};
      var cached = this._cache._string_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [];
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
          this._expected.push('\'"\'');
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index3 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var index4 = this._offset;
          var index5 = this._offset, elements2 = [];
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
          if (address4 !== null) {
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
            if (address5 !== null) {
              elements2.push(address5);
            } else {
              elements2 = null;
              this._offset = index5;
            }
          } else {
            elements2 = null;
            this._offset = index5;
          }
          if (elements2) {
            address3 = new SyntaxNode(this._input.substring(index5, this._offset), index5, elements2);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (!address3) {
            this._offset = index4;
            var chunk3 = null;
            if (this._input.length > this._offset) {
              chunk3 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk3 !== null && /^[^"]/.test(chunk3)) {
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
              this._offset = index4;
            }
          }
          if (address3 !== null) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = null;
        }
        if (address2 !== null) {
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
              this._expected.push('\'"\'');
            }
          }
          if (address6 !== null) {
            elements0.push(address6);
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        address0 = new SyntaxNode(this._input.substring(index2, this._offset), index2, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      if (!address0) {
        this._offset = index1;
        var index6 = this._offset, elements3 = [];
        var address7 = null;
        var chunk5 = null;
        if (this._input.length > this._offset) {
          chunk5 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk5 === '\'') {
          address7 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address7 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"\'"');
          }
        }
        if (address7 !== null) {
          elements3.push(address7);
          var address8 = null;
          var remaining1 = 0, index7 = this._offset, elements4 = [], address9 = true;
          while (address9 !== null) {
            var index8 = this._offset;
            var index9 = this._offset, elements5 = [];
            var address10 = null;
            var chunk6 = null;
            if (this._input.length > this._offset) {
              chunk6 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk6 === '\\') {
              address10 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address10 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"\\\\"');
              }
            }
            if (address10 !== null) {
              elements5.push(address10);
              var address11 = null;
              var chunk7 = null;
              if (this._input.length > this._offset) {
                chunk7 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk7 === null) {
                address11 = null;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('<any char>');
                }
              } else {
                address11 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              }
              if (address11 !== null) {
                elements5.push(address11);
              } else {
                elements5 = null;
                this._offset = index9;
              }
            } else {
              elements5 = null;
              this._offset = index9;
            }
            if (elements5) {
              address9 = new SyntaxNode(this._input.substring(index9, this._offset), index9, elements5);
              this._offset = this._offset;
            } else {
              address9 = null;
            }
            if (!address9) {
              this._offset = index8;
              var chunk8 = null;
              if (this._input.length > this._offset) {
                chunk8 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk8 !== null && /^[^']/.test(chunk8)) {
                address9 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address9 = null;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('[^\']');
                }
              }
              if (!address9) {
                this._offset = index8;
              }
            }
            if (address9 !== null) {
              elements4.push(address9);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address8 = new SyntaxNode(this._input.substring(index7, this._offset), index7, elements4);
            this._offset = this._offset;
          } else {
            address8 = null;
          }
          if (address8 !== null) {
            elements3.push(address8);
            var address12 = null;
            var chunk9 = null;
            if (this._input.length > this._offset) {
              chunk9 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk9 === '\'') {
              address12 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address12 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"\'"');
              }
            }
            if (address12 !== null) {
              elements3.push(address12);
            } else {
              elements3 = null;
              this._offset = index6;
            }
          } else {
            elements3 = null;
            this._offset = index6;
          }
        } else {
          elements3 = null;
          this._offset = index6;
        }
        if (elements3) {
          address0 = new SyntaxNode(this._input.substring(index6, this._offset), index6, elements3);
          this._offset = this._offset;
        } else {
          address0 = null;
        }
        if (!address0) {
          this._offset = index1;
        }
      }
      extend(address0, this._types.String);
      this._cache._string_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_ci_string_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._ci_string_expression = this._cache._ci_string_expression || {};
      var cached = this._cache._ci_string_expression[index0];
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
      if (chunk0 === '`') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"`"');
        }
      }
      if (address1 !== null) {
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
          if (address4 !== null) {
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
            if (address5 !== null) {
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
            if (chunk3 !== null && /^[^`]/.test(chunk3)) {
              address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address3 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[^`]');
              }
            }
            if (!address3) {
              this._offset = index3;
            }
          }
          if (address3 !== null) {
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
        if (address2 !== null) {
          elements0.push(address2);
          var address6 = null;
          var chunk4 = null;
          if (this._input.length > this._offset) {
            chunk4 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk4 === '`') {
            address6 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address6 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"`"');
            }
          }
          if (address6 !== null) {
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
      extend(address0, this._types.CIString);
      this._cache._ci_string_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_any_char_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._any_char_expression = this._cache._any_char_expression || {};
      var cached = this._cache._any_char_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '.') {
        address0 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"."');
        }
      }
      extend(address0, this._types.AnyChar);
      this._cache._any_char_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_char_class_expression: function() {
      var address0 = null, index0 = this._offset;
      this._cache._char_class_expression = this._cache._char_class_expression || {};
      var cached = this._cache._char_class_expression[index0];
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
      if (chunk0 === '[') {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"["');
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var index2 = this._offset;
        var chunk1 = null;
        if (this._input.length > this._offset) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '^') {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"^"');
          }
        }
        if (!address2) {
          address2 = new SyntaxNode(this._input.substring(index2, index2), index2, []);
          this._offset = index2;
        }
        if (address2 !== null) {
          elements0.push(address2);
          var address3 = null;
          var remaining0 = 1, index3 = this._offset, elements1 = [], address4 = true;
          while (address4 !== null) {
            var index4 = this._offset;
            var index5 = this._offset, elements2 = [];
            var address5 = null;
            var chunk2 = null;
            if (this._input.length > this._offset) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 === '\\') {
              address5 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address5 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"\\\\"');
              }
            }
            if (address5 !== null) {
              elements2.push(address5);
              var address6 = null;
              var chunk3 = null;
              if (this._input.length > this._offset) {
                chunk3 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk3 === null) {
                address6 = null;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('<any char>');
                }
              } else {
                address6 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              }
              if (address6 !== null) {
                elements2.push(address6);
              } else {
                elements2 = null;
                this._offset = index5;
              }
            } else {
              elements2 = null;
              this._offset = index5;
            }
            if (elements2) {
              address4 = new SyntaxNode(this._input.substring(index5, this._offset), index5, elements2);
              this._offset = this._offset;
            } else {
              address4 = null;
            }
            if (!address4) {
              this._offset = index4;
              var chunk4 = null;
              if (this._input.length > this._offset) {
                chunk4 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk4 !== null && /^[^\]]/.test(chunk4)) {
                address4 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address4 = null;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('[^\\]]');
                }
              }
              if (!address4) {
                this._offset = index4;
              }
            }
            if (address4 !== null) {
              elements1.push(address4);
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            address3 = new SyntaxNode(this._input.substring(index3, this._offset), index3, elements1);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (address3 !== null) {
            elements0.push(address3);
            var address7 = null;
            var chunk5 = null;
            if (this._input.length > this._offset) {
              chunk5 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk5 === ']') {
              address7 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address7 = null;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"]"');
              }
            }
            if (address7 !== null) {
              elements0.push(address7);
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
        address0 = new SyntaxNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      extend(address0, this._types.CharClass);
      this._cache._char_class_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_label: function() {
      var address0 = null, index0 = this._offset;
      this._cache._label = this._cache._label || {};
      var cached = this._cache._label[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_identifier();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var chunk0 = null;
        if (this._input.length > this._offset) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === ':') {
          address2 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = null;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('":"');
          }
        }
        if (address2 !== null) {
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
        address0 = new SyntaxNode20(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._label[index0] = [address0, this._offset];
      return address0;
    },

    _read_object_identifier: function() {
      var address0 = null, index0 = this._offset;
      this._cache._object_identifier = this._cache._object_identifier || {};
      var cached = this._cache._object_identifier[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [];
      var address1 = null;
      address1 = this._read_identifier();
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var index3 = this._offset, elements2 = [];
          var address4 = null;
          var chunk0 = null;
          if (this._input.length > this._offset) {
            chunk0 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk0 === '.') {
            address4 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"."');
            }
          }
          if (address4 !== null) {
            elements2.push(address4);
            var address5 = null;
            address5 = this._read_identifier();
            if (address5 !== null) {
              elements2.push(address5);
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            address3 = new SyntaxNode22(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address3 = null;
          }
          if (address3 !== null) {
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
        if (address2 !== null) {
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
        address0 = new SyntaxNode21(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = null;
      }
      this._cache._object_identifier[index0] = [address0, this._offset];
      return address0;
    },

    _read_identifier: function() {
      var address0 = null, index0 = this._offset;
      this._cache._identifier = this._cache._identifier || {};
      var cached = this._cache._identifier[index0];
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
      if (chunk0 !== null && /^[a-zA-Z_]/.test(chunk0)) {
        address1 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = null;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('[a-zA-Z_]');
        }
      }
      if (address1 !== null) {
        elements0.push(address1);
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== null) {
          var chunk1 = null;
          if (this._input.length > this._offset) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[a-zA-Z0-9_]/.test(chunk1)) {
            address3 = new SyntaxNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = null;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[a-zA-Z0-9_]');
            }
          }
          if (address3 !== null) {
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
        if (address2 !== null) {
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
      this._cache._identifier[index0] = [address0, this._offset];
      return address0;
    },

    _read__: function() {
      var address0 = null, index0 = this._offset;
      this._cache.__ = this._cache.__ || {};
      var cached = this._cache.__[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._input.length > this._offset) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 !== null && /^[\s]/.test(chunk0)) {
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
      this._cache.__[index0] = [address0, this._offset];
      return address0;
    }
  };
  
  var Parser = function(input, actions, types) {
    this._input = input;
    this._actions = actions;
    this._types = types;
    this._offset = 0;
    this._cache = {};
    this._failure = 0;
    this._expected = [];
  };
  
  Parser.prototype.parse = function() {
    var tree = this._read_grammar();
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
  
  var parse = function(input, options) {
    options = options || {};
    var parser = new Parser(input, options.actions, options.types);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var exported = {Grammar: Grammar, Parser: Parser, parse: parse};
  
  if (typeof require === 'function' && typeof exports === 'object') {
    extend(exports, exported);
    if (typeof Canopy !== 'undefined') {
      Canopy.MetaGrammar = exported;
    }
  } else {
    var namespace = window;
    namespace = namespace.Canopy = namespace.Canopy || {};
    namespace.MetaGrammar = exported;
  }
})();
