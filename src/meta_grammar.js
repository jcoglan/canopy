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

  var TreeNode = function(text, offset, elements) {
    this.text = text;
    this.offset = offset;
    this.elements = elements || [];
  };

  TreeNode.prototype.forEach = function(block, context) {
    for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
      block.call(context, el[i], i, el);
    }
  };

  var TreeNode1 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['grammar_name'] = elements[1];
    this['rules'] = elements[2];
  };
  inherit(TreeNode1, TreeNode);

  var TreeNode2 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['grammar_rule'] = elements[1];
  };
  inherit(TreeNode2, TreeNode);

  var TreeNode3 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['object_identifier'] = elements[3];
  };
  inherit(TreeNode3, TreeNode);

  var TreeNode4 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['identifier'] = elements[0];
    this['assignment'] = elements[1];
    this['parsing_expression'] = elements[2];
  };
  inherit(TreeNode4, TreeNode);

  var TreeNode5 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['parsing_expression'] = elements[2];
  };
  inherit(TreeNode5, TreeNode);

  var TreeNode6 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['first_part'] = elements[0];
    this['choice_part'] = elements[0];
    this['rest'] = elements[1];
  };
  inherit(TreeNode6, TreeNode);

  var TreeNode7 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['expression'] = elements[3];
    this['choice_part'] = elements[3];
  };
  inherit(TreeNode7, TreeNode);

  var TreeNode8 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['type_tag'] = elements[1];
  };
  inherit(TreeNode8, TreeNode);

  var TreeNode9 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['actionable_expression'] = elements[0];
    this['action_tag'] = elements[2];
  };
  inherit(TreeNode9, TreeNode);

  var TreeNode10 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['actionable_expression'] = elements[2];
  };
  inherit(TreeNode10, TreeNode);

  var TreeNode11 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['identifier'] = elements[1];
  };
  inherit(TreeNode11, TreeNode);

  var TreeNode12 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['object_identifier'] = elements[1];
  };
  inherit(TreeNode12, TreeNode);

  var TreeNode13 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['first_part'] = elements[0];
    this['sequence_part'] = elements[0];
    this['rest'] = elements[1];
  };
  inherit(TreeNode13, TreeNode);

  var TreeNode14 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['expression'] = elements[1];
    this['sequence_part'] = elements[1];
  };
  inherit(TreeNode14, TreeNode);

  var TreeNode15 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['expression'] = elements[2];
  };
  inherit(TreeNode15, TreeNode);

  var TreeNode16 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['atom'] = elements[0];
  };
  inherit(TreeNode16, TreeNode);

  var TreeNode17 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['atom'] = elements[0];
    this['quantifier'] = elements[1];
  };
  inherit(TreeNode17, TreeNode);

  var TreeNode18 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['predicate'] = elements[0];
    this['atom'] = elements[1];
  };
  inherit(TreeNode18, TreeNode);

  var TreeNode19 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['identifier'] = elements[0];
  };
  inherit(TreeNode19, TreeNode);

  var TreeNode20 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['identifier'] = elements[0];
  };
  inherit(TreeNode20, TreeNode);

  var TreeNode21 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['identifier'] = elements[0];
  };
  inherit(TreeNode21, TreeNode);

  var TreeNode22 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['identifier'] = elements[1];
  };
  inherit(TreeNode22, TreeNode);

  var FAILURE = {};

  var Grammar = {
    _read_grammar: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._grammar = this._cache._grammar || {};
      var cached = this._cache._grammar[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(4);
      var address1 = FAILURE;
      var remaining0 = 0, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== FAILURE) {
        address2 = this._read___();
        if (address2 !== FAILURE) {
          elements1.push(address2);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
        this._offset = this._offset;
      } else {
        address1 = FAILURE;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address3 = FAILURE;
        address3 = this._read_grammar_name();
        if (address3 !== FAILURE) {
          elements0[1] = address3;
          var address4 = FAILURE;
          var remaining1 = 1, index3 = this._offset, elements2 = [], address5 = true;
          while (address5 !== FAILURE) {
            var index4 = this._offset, elements3 = new Array(2);
            var address6 = FAILURE;
            var remaining2 = 0, index5 = this._offset, elements4 = [], address7 = true;
            while (address7 !== FAILURE) {
              address7 = this._read___();
              if (address7 !== FAILURE) {
                elements4.push(address7);
                --remaining2;
              }
            }
            if (remaining2 <= 0) {
              address6 = new TreeNode(this._input.substring(index5, this._offset), index5, elements4);
              this._offset = this._offset;
            } else {
              address6 = FAILURE;
            }
            if (address6 !== FAILURE) {
              elements3[0] = address6;
              var address8 = FAILURE;
              address8 = this._read_grammar_rule();
              if (address8 !== FAILURE) {
                elements3[1] = address8;
              } else {
                elements3 = null;
                this._offset = index4;
              }
            } else {
              elements3 = null;
              this._offset = index4;
            }
            if (elements3 === null) {
              address5 = FAILURE;
            } else {
              address5 = new TreeNode2(this._input.substring(index4, this._offset), index4, elements3);
              this._offset = this._offset;
            }
            if (address5 !== FAILURE) {
              elements2.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
            var address9 = FAILURE;
            var remaining3 = 0, index6 = this._offset, elements5 = [], address10 = true;
            while (address10 !== FAILURE) {
              address10 = this._read___();
              if (address10 !== FAILURE) {
                elements5.push(address10);
                --remaining3;
              }
            }
            if (remaining3 <= 0) {
              address9 = new TreeNode(this._input.substring(index6, this._offset), index6, elements5);
              this._offset = this._offset;
            } else {
              address9 = FAILURE;
            }
            if (address9 !== FAILURE) {
              elements0[3] = address9;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.grammar(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._grammar[index0] = [address0, this._offset];
      return address0;
    },

    _read_grammar_name: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._grammar_name = this._cache._grammar_name || {};
      var cached = this._cache._grammar_name[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(4);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 7);
      }
      if (chunk0 !== null && chunk0.toLowerCase() === 'grammar'.toLowerCase()) {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 7), this._offset);
        this._offset = this._offset + 7;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('`grammar`');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === ':') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('":"');
          }
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var remaining0 = 1, index3 = this._offset, elements1 = [], address4 = true;
          while (address4 !== FAILURE) {
            address4 = this._read___();
            if (address4 !== FAILURE) {
              elements1.push(address4);
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
            this._offset = this._offset;
          } else {
            address3 = FAILURE;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address5 = FAILURE;
            address5 = this._read_object_identifier();
            if (address5 !== FAILURE) {
              elements0[3] = address5;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode3(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._grammar_name[index0] = [address0, this._offset];
      return address0;
    },

    _read_grammar_rule: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._grammar_rule = this._cache._grammar_rule || {};
      var cached = this._cache._grammar_rule[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_identifier();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_assignment();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_parsing_expression();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.rule(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._grammar_rule[index0] = [address0, this._offset];
      return address0;
    },

    _read_assignment: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._assignment = this._cache._assignment || {};
      var cached = this._cache._assignment[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var remaining0 = 1, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== FAILURE) {
        address2 = this._read___();
        if (address2 !== FAILURE) {
          elements1.push(address2);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
        this._offset = this._offset;
      } else {
        address1 = FAILURE;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address3 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 2);
        }
        if (chunk0 === '<-') {
          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
          this._offset = this._offset + 2;
        } else {
          address3 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"<-"');
          }
        }
        if (address3 !== FAILURE) {
          elements0[1] = address3;
          var address4 = FAILURE;
          var remaining1 = 1, index3 = this._offset, elements2 = [], address5 = true;
          while (address5 !== FAILURE) {
            address5 = this._read___();
            if (address5 !== FAILURE) {
              elements2.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._assignment[index0] = [address0, this._offset];
      return address0;
    },

    _read_parsing_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._parsing_expression = this._cache._parsing_expression || {};
      var cached = this._cache._parsing_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_choice_expression();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_choice_part();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._parsing_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_parenthesised_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._parenthesised_expression = this._cache._parenthesised_expression || {};
      var cached = this._cache._parenthesised_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '(') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"("');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          address3 = this._read___();
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          address4 = this._read_parsing_expression();
          if (address4 !== FAILURE) {
            elements0[2] = address4;
            var address5 = FAILURE;
            var remaining1 = 0, index3 = this._offset, elements2 = [], address6 = true;
            while (address6 !== FAILURE) {
              address6 = this._read___();
              if (address6 !== FAILURE) {
                elements2.push(address6);
                --remaining1;
              }
            }
            if (remaining1 <= 0) {
              address5 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
              this._offset = this._offset;
            } else {
              address5 = FAILURE;
            }
            if (address5 !== FAILURE) {
              elements0[3] = address5;
              var address7 = FAILURE;
              var chunk1 = null;
              if (this._offset < this._inputSize) {
                chunk1 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk1 === ')') {
                address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address7 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('")"');
                }
              }
              if (address7 !== FAILURE) {
                elements0[4] = address7;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.paren_expr(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._parenthesised_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_choice_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._choice_expression = this._cache._choice_expression || {};
      var cached = this._cache._choice_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_choice_part();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index3 = this._offset, elements2 = new Array(4);
          var address4 = FAILURE;
          var remaining1 = 1, index4 = this._offset, elements3 = [], address5 = true;
          while (address5 !== FAILURE) {
            address5 = this._read___();
            if (address5 !== FAILURE) {
              elements3.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new TreeNode(this._input.substring(index4, this._offset), index4, elements3);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address6 = FAILURE;
            var chunk0 = null;
            if (this._offset < this._inputSize) {
              chunk0 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk0 === '/') {
              address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address6 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"/"');
              }
            }
            if (address6 !== FAILURE) {
              elements2[1] = address6;
              var address7 = FAILURE;
              var remaining2 = 1, index5 = this._offset, elements4 = [], address8 = true;
              while (address8 !== FAILURE) {
                address8 = this._read___();
                if (address8 !== FAILURE) {
                  elements4.push(address8);
                  --remaining2;
                }
              }
              if (remaining2 <= 0) {
                address7 = new TreeNode(this._input.substring(index5, this._offset), index5, elements4);
                this._offset = this._offset;
              } else {
                address7 = FAILURE;
              }
              if (address7 !== FAILURE) {
                elements2[2] = address7;
                var address9 = FAILURE;
                address9 = this._read_choice_part();
                if (address9 !== FAILURE) {
                  elements2[3] = address9;
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
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode7(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.choice(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._choice_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_choice_part: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._choice_part = this._cache._choice_part || {};
      var cached = this._cache._choice_part[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_action_expression();
      if (address1 === FAILURE) {
        this._offset = index2;
        address1 = this._read_sequence_expression();
        if (address1 === FAILURE) {
          this._offset = index2;
          address1 = this._read_sequence_part();
          if (address1 === FAILURE) {
            this._offset = index2;
          }
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index3 = this._offset;
        var index4 = this._offset, elements1 = new Array(2);
        var address3 = FAILURE;
        var remaining0 = 1, index5 = this._offset, elements2 = [], address4 = true;
        while (address4 !== FAILURE) {
          address4 = this._read___();
          if (address4 !== FAILURE) {
            elements2.push(address4);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address3 = new TreeNode(this._input.substring(index5, this._offset), index5, elements2);
          this._offset = this._offset;
        } else {
          address3 = FAILURE;
        }
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address5 = FAILURE;
          address5 = this._read_type_tag();
          if (address5 !== FAILURE) {
            elements1[1] = address5;
          } else {
            elements1 = null;
            this._offset = index4;
          }
        } else {
          elements1 = null;
          this._offset = index4;
        }
        if (elements1 === null) {
          address2 = FAILURE;
        } else {
          address2 = new TreeNode8(this._input.substring(index4, this._offset), index4, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index3, index3), index3);
          this._offset = index3;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.choice_part(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._choice_part[index0] = [address0, this._offset];
      return address0;
    },

    _read_action_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._action_expression = this._cache._action_expression || {};
      var cached = this._cache._action_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_actionable_expression();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          address3 = this._read___();
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          address4 = this._read_action_tag();
          if (address4 !== FAILURE) {
            elements0[2] = address4;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.action(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._action_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_actionable_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._actionable_expression = this._cache._actionable_expression || {};
      var cached = this._cache._actionable_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_sequence_expression();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_repeated_atom();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_terminal_node();
          if (address0 === FAILURE) {
            this._offset = index1;
            var index2 = this._offset, elements0 = new Array(5);
            var address1 = FAILURE;
            var chunk0 = null;
            if (this._offset < this._inputSize) {
              chunk0 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk0 === '(') {
              address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address1 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"("');
              }
            }
            if (address1 !== FAILURE) {
              elements0[0] = address1;
              var address2 = FAILURE;
              var remaining0 = 0, index3 = this._offset, elements1 = [], address3 = true;
              while (address3 !== FAILURE) {
                address3 = this._read___();
                if (address3 !== FAILURE) {
                  elements1.push(address3);
                  --remaining0;
                }
              }
              if (remaining0 <= 0) {
                address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
                this._offset = this._offset;
              } else {
                address2 = FAILURE;
              }
              if (address2 !== FAILURE) {
                elements0[1] = address2;
                var address4 = FAILURE;
                address4 = this._read_actionable_expression();
                if (address4 !== FAILURE) {
                  elements0[2] = address4;
                  var address5 = FAILURE;
                  var remaining1 = 0, index4 = this._offset, elements2 = [], address6 = true;
                  while (address6 !== FAILURE) {
                    address6 = this._read___();
                    if (address6 !== FAILURE) {
                      elements2.push(address6);
                      --remaining1;
                    }
                  }
                  if (remaining1 <= 0) {
                    address5 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
                    this._offset = this._offset;
                  } else {
                    address5 = FAILURE;
                  }
                  if (address5 !== FAILURE) {
                    elements0[3] = address5;
                    var address7 = FAILURE;
                    var chunk1 = null;
                    if (this._offset < this._inputSize) {
                      chunk1 = this._input.substring(this._offset, this._offset + 1);
                    }
                    if (chunk1 === ')') {
                      address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                      this._offset = this._offset + 1;
                    } else {
                      address7 = FAILURE;
                      if (this._offset > this._failure) {
                        this._failure = this._offset;
                        this._expected = [];
                      }
                      if (this._offset === this._failure) {
                        this._expected.push('")"');
                      }
                    }
                    if (address7 !== FAILURE) {
                      elements0[4] = address7;
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
            if (elements0 === null) {
              address0 = FAILURE;
            } else {
              address0 = this._actions.paren_expr(this._input, index2, this._offset, elements0);
              this._offset = this._offset;
            }
            if (address0 === FAILURE) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._actionable_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_action_tag: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._action_tag = this._cache._action_tag || {};
      var cached = this._cache._action_tag[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '%') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"%"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_identifier();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode11(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._action_tag[index0] = [address0, this._offset];
      return address0;
    },

    _read_type_tag: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._type_tag = this._cache._type_tag || {};
      var cached = this._cache._type_tag[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '<') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"<"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_object_identifier();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '>') {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('">"');
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode12(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._type_tag[index0] = [address0, this._offset];
      return address0;
    },

    _read_sequence_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._sequence_expression = this._cache._sequence_expression || {};
      var cached = this._cache._sequence_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_sequence_part();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var remaining1 = 1, index4 = this._offset, elements3 = [], address5 = true;
          while (address5 !== FAILURE) {
            address5 = this._read___();
            if (address5 !== FAILURE) {
              elements3.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new TreeNode(this._input.substring(index4, this._offset), index4, elements3);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address6 = FAILURE;
            address6 = this._read_sequence_part();
            if (address6 !== FAILURE) {
              elements2[1] = address6;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode14(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.sequence(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._sequence_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_sequence_part: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._sequence_part = this._cache._sequence_part || {};
      var cached = this._cache._sequence_part[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_mute();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index3 = this._offset;
        address2 = this._read_label();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index3, index3), index3);
          this._offset = index3;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index4 = this._offset;
          address3 = this._read_maybe_atom();
          if (address3 === FAILURE) {
            this._offset = index4;
            address3 = this._read_repeated_atom();
            if (address3 === FAILURE) {
              this._offset = index4;
              address3 = this._read_atom();
              if (address3 === FAILURE) {
                this._offset = index4;
              }
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.sequence_part(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._sequence_part[index0] = [address0, this._offset];
      return address0;
    },

    _read_maybe_atom: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._maybe_atom = this._cache._maybe_atom || {};
      var cached = this._cache._maybe_atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_atom();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === '?') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"?"');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.maybe(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._maybe_atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_repeated_atom: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._repeated_atom = this._cache._repeated_atom || {};
      var cached = this._cache._repeated_atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_atom();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === '*') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"*"');
          }
        }
        if (address2 === FAILURE) {
          this._offset = index2;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '+') {
            address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address2 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"+"');
            }
          }
          if (address2 === FAILURE) {
            this._offset = index2;
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.repeat(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._repeated_atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_atom: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._atom = this._cache._atom || {};
      var cached = this._cache._atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_parenthesised_expression();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_predicated_atom();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_reference_expression();
          if (address0 === FAILURE) {
            this._offset = index1;
            address0 = this._read_terminal_node();
            if (address0 === FAILURE) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_terminal_node: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._terminal_node = this._cache._terminal_node || {};
      var cached = this._cache._terminal_node[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_string_expression();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_ci_string_expression();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_char_class_expression();
          if (address0 === FAILURE) {
            this._offset = index1;
            address0 = this._read_any_char_expression();
            if (address0 === FAILURE) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._terminal_node[index0] = [address0, this._offset];
      return address0;
    },

    _read_predicated_atom: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._predicated_atom = this._cache._predicated_atom || {};
      var cached = this._cache._predicated_atom[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '&') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"&"');
        }
      }
      if (address1 === FAILURE) {
        this._offset = index2;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '!') {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"!"');
          }
        }
        if (address1 === FAILURE) {
          this._offset = index2;
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_atom();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.predicate(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._predicated_atom[index0] = [address0, this._offset];
      return address0;
    },

    _read_reference_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._reference_expression = this._cache._reference_expression || {};
      var cached = this._cache._reference_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_identifier();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_assignment();
        this._offset = index2;
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.reference(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._reference_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_string_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._string_expression = this._cache._string_expression || {};
      var cached = this._cache._string_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '"') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('\'"\'');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index3 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index4 = this._offset;
          var index5 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '\\') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"\\\\"');
            }
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            if (this._offset < this._inputSize) {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('<any char>');
              }
            }
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index5;
            }
          } else {
            elements2 = null;
            this._offset = index5;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode(this._input.substring(index5, this._offset), index5, elements2);
            this._offset = this._offset;
          }
          if (address3 === FAILURE) {
            this._offset = index4;
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 !== null && /^[^"]/.test(chunk2)) {
              address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address3 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[^"]');
              }
            }
            if (address3 === FAILURE) {
              this._offset = index4;
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address6 = FAILURE;
          var chunk3 = null;
          if (this._offset < this._inputSize) {
            chunk3 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk3 === '"') {
            address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address6 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('\'"\'');
            }
          }
          if (address6 !== FAILURE) {
            elements0[2] = address6;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.string(this._input, index2, this._offset, elements0);
        this._offset = this._offset;
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var index6 = this._offset, elements3 = new Array(3);
        var address7 = FAILURE;
        var chunk4 = null;
        if (this._offset < this._inputSize) {
          chunk4 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk4 === '\'') {
          address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address7 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"\'"');
          }
        }
        if (address7 !== FAILURE) {
          elements3[0] = address7;
          var address8 = FAILURE;
          var remaining1 = 0, index7 = this._offset, elements4 = [], address9 = true;
          while (address9 !== FAILURE) {
            var index8 = this._offset;
            var index9 = this._offset, elements5 = new Array(2);
            var address10 = FAILURE;
            var chunk5 = null;
            if (this._offset < this._inputSize) {
              chunk5 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk5 === '\\') {
              address10 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address10 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"\\\\"');
              }
            }
            if (address10 !== FAILURE) {
              elements5[0] = address10;
              var address11 = FAILURE;
              if (this._offset < this._inputSize) {
                address11 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address11 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('<any char>');
                }
              }
              if (address11 !== FAILURE) {
                elements5[1] = address11;
              } else {
                elements5 = null;
                this._offset = index9;
              }
            } else {
              elements5 = null;
              this._offset = index9;
            }
            if (elements5 === null) {
              address9 = FAILURE;
            } else {
              address9 = new TreeNode(this._input.substring(index9, this._offset), index9, elements5);
              this._offset = this._offset;
            }
            if (address9 === FAILURE) {
              this._offset = index8;
              var chunk6 = null;
              if (this._offset < this._inputSize) {
                chunk6 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk6 !== null && /^[^']/.test(chunk6)) {
                address9 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address9 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('[^\']');
                }
              }
              if (address9 === FAILURE) {
                this._offset = index8;
              }
            }
            if (address9 !== FAILURE) {
              elements4.push(address9);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address8 = new TreeNode(this._input.substring(index7, this._offset), index7, elements4);
            this._offset = this._offset;
          } else {
            address8 = FAILURE;
          }
          if (address8 !== FAILURE) {
            elements3[1] = address8;
            var address12 = FAILURE;
            var chunk7 = null;
            if (this._offset < this._inputSize) {
              chunk7 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk7 === '\'') {
              address12 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address12 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"\'"');
              }
            }
            if (address12 !== FAILURE) {
              elements3[2] = address12;
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
        if (elements3 === null) {
          address0 = FAILURE;
        } else {
          address0 = this._actions.string(this._input, index6, this._offset, elements3);
          this._offset = this._offset;
        }
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._string_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_ci_string_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ci_string_expression = this._cache._ci_string_expression || {};
      var cached = this._cache._ci_string_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '`') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"`"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === '\\') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"\\\\"');
            }
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            if (this._offset < this._inputSize) {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('<any char>');
              }
            }
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index4;
            }
          } else {
            elements2 = null;
            this._offset = index4;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
            this._offset = this._offset;
          }
          if (address3 === FAILURE) {
            this._offset = index3;
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 !== null && /^[^`]/.test(chunk2)) {
              address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address3 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[^`]');
              }
            }
            if (address3 === FAILURE) {
              this._offset = index3;
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address6 = FAILURE;
          var chunk3 = null;
          if (this._offset < this._inputSize) {
            chunk3 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk3 === '`') {
            address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address6 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"`"');
            }
          }
          if (address6 !== FAILURE) {
            elements0[2] = address6;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.ci_string(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._ci_string_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_any_char_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._any_char_expression = this._cache._any_char_expression || {};
      var cached = this._cache._any_char_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '.') {
        address0 = this._actions.any_char(this._input, this._offset, this._offset + 1);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"."');
        }
      }
      this._cache._any_char_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_char_class_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._char_class_expression = this._cache._char_class_expression || {};
      var cached = this._cache._char_class_expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(4);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '[') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"["');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '^') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"^"');
          }
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var remaining0 = 1, index3 = this._offset, elements1 = [], address4 = true;
          while (address4 !== FAILURE) {
            var index4 = this._offset;
            var index5 = this._offset, elements2 = new Array(2);
            var address5 = FAILURE;
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 === '\\') {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"\\\\"');
              }
            }
            if (address5 !== FAILURE) {
              elements2[0] = address5;
              var address6 = FAILURE;
              if (this._offset < this._inputSize) {
                address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address6 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('<any char>');
                }
              }
              if (address6 !== FAILURE) {
                elements2[1] = address6;
              } else {
                elements2 = null;
                this._offset = index5;
              }
            } else {
              elements2 = null;
              this._offset = index5;
            }
            if (elements2 === null) {
              address4 = FAILURE;
            } else {
              address4 = new TreeNode(this._input.substring(index5, this._offset), index5, elements2);
              this._offset = this._offset;
            }
            if (address4 === FAILURE) {
              this._offset = index4;
              var chunk3 = null;
              if (this._offset < this._inputSize) {
                chunk3 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk3 !== null && /^[^\]]/.test(chunk3)) {
                address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address4 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('[^\\]]');
                }
              }
              if (address4 === FAILURE) {
                this._offset = index4;
              }
            }
            if (address4 !== FAILURE) {
              elements1.push(address4);
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
            this._offset = this._offset;
          } else {
            address3 = FAILURE;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address7 = FAILURE;
            var chunk4 = null;
            if (this._offset < this._inputSize) {
              chunk4 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk4 === ']') {
              address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address7 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"]"');
              }
            }
            if (address7 !== FAILURE) {
              elements0[3] = address7;
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
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.char_class(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._char_class_expression[index0] = [address0, this._offset];
      return address0;
    },

    _read_label: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._label = this._cache._label || {};
      var cached = this._cache._label[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_identifier();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === ':') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('":"');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode20(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._label[index0] = [address0, this._offset];
      return address0;
    },

    _read_mute: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._mute = this._cache._mute || {};
      var cached = this._cache._mute[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '@') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"@"');
        }
      }
      this._cache._mute[index0] = [address0, this._offset];
      return address0;
    },

    _read_object_identifier: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._object_identifier = this._cache._object_identifier || {};
      var cached = this._cache._object_identifier[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_identifier();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var chunk0 = null;
          if (this._offset < this._inputSize) {
            chunk0 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk0 === '.') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"."');
            }
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_identifier();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode22(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode21(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._object_identifier[index0] = [address0, this._offset];
      return address0;
    },

    _read_identifier: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._identifier = this._cache._identifier || {};
      var cached = this._cache._identifier[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 !== null && /^[a-zA-Z_]/.test(chunk0)) {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('[a-zA-Z_]');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[a-zA-Z0-9_]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[a-zA-Z0-9_]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._identifier[index0] = [address0, this._offset];
      return address0;
    },

    _read___: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache.___ = this._cache.___ || {};
      var cached = this._cache.___[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 !== null && /^[\s]/.test(chunk0)) {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('[\\s]');
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_comment();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache.___[index0] = [address0, this._offset];
      return address0;
    },

    _read_comment: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comment = this._cache._comment || {};
      var cached = this._cache._comment[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '#') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"#"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[^\n]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[^\\n]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._comment[index0] = [address0, this._offset];
      return address0;
    }
  };

  var Parser = function(input, actions, types) {
    this._input = input;
    this._inputSize = input.length;
    this._actions = actions;
    this._types = types;
    this._offset = 0;
    this._cache = {};
    this._failure = 0;
    this._expected = [];
  };

  Parser.prototype.parse = function() {
    var tree = this._read_grammar();
    if (tree !== FAILURE && this._offset === this._inputSize) {
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
    var namespace = typeof this !== 'undefined' ? this : window;
    namespace = namespace.Canopy = namespace.Canopy || {};
    namespace.MetaGrammar = exported;
  }
})();
