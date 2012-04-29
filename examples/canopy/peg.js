(function() {
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
    var lines    = error.input.split(/\n/g),
        lineNo   = 0,
        offset   = 0;
    
    while (offset < error.offset) {
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
  
  var Grammar = {
    __consume__grammar: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["grammar"] = this._nodeCache["grammar"] || {};
      var cached = this._nodeCache["grammar"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address2 = true;
      while (address2) {
        address2 = this.__consume__space();
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0(text1, this._offset, elements1);
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        address3 = this.__consume__grammar_name();
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          labelled0.grammar_name = address3;
          var address4 = null;
          var remaining1 = 1, index3 = this._offset, elements2 = [], text2 = "", address5 = true;
          while (address5) {
            var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
            var address6 = null;
            var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address7 = true;
            while (address7) {
              address7 = this.__consume__space();
              if (address7) {
                elements4.push(address7);
                text4 += address7.textValue;
                remaining2 -= 1;
              }
            }
            if (remaining2 <= 0) {
              this._offset = index5;
              var klass1 = this.constructor.SyntaxNode;
              address6 = new klass1(text4, this._offset, elements4);
              this._offset += text4.length;
            } else {
              address6 = null;
            }
            if (address6) {
              elements3.push(address6);
              text3 += address6.textValue;
              var address8 = null;
              address8 = this.__consume__grammar_rule();
              if (address8) {
                elements3.push(address8);
                text3 += address8.textValue;
                labelled1.grammar_rule = address8;
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
              var klass2 = this.constructor.SyntaxNode;
              address5 = new klass2(text3, this._offset, elements3, labelled1);
              this._offset += text3.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index3;
            var klass3 = this.constructor.SyntaxNode;
            address4 = new klass3(text2, this._offset, elements2);
            this._offset += text2.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.rules = address4;
            var address9 = null;
            var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address10 = true;
            while (address10) {
              address10 = this.__consume__space();
              if (address10) {
                elements5.push(address10);
                text5 += address10.textValue;
                remaining3 -= 1;
              }
            }
            if (remaining3 <= 0) {
              this._offset = index6;
              var klass4 = this.constructor.SyntaxNode;
              address9 = new klass4(text5, this._offset, elements5);
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
        var klass5 = this.constructor.SyntaxNode;
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["grammar"][index0] = address0;
    },
    __consume__grammar_name: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["grammar_name"] = this._nodeCache["grammar_name"] || {};
      var cached = this._nodeCache["grammar_name"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 8);
      } else {
        slice0 = null;
      }
      if (slice0 === "grammar ") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("grammar ", this._offset, []);
        this._offset += 8;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__object_identifier();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.object_identifier = address2;
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
        var klass1 = this.constructor.SyntaxNode;
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["grammar_name"][index0] = address0;
    },
    __consume__grammar_rule: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["grammar_rule"] = this._nodeCache["grammar_rule"] || {};
      var cached = this._nodeCache["grammar_rule"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.identifier = address1;
        var address2 = null;
        address2 = this.__consume__assignment();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.assignment = address2;
          var address3 = null;
          address3 = this.__consume__parsing_expression();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.parsing_expression = address3;
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
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["grammar_rule"][index0] = address0;
    },
    __consume__assignment: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["assignment"] = this._nodeCache["assignment"] || {};
      var cached = this._nodeCache["assignment"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address2 = true;
      while (address2) {
        address2 = this.__consume__space();
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0(text1, this._offset, elements1);
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 2);
        } else {
          slice0 = null;
        }
        if (slice0 === "<-") {
          var klass1 = this.constructor.SyntaxNode;
          address3 = new klass1("<-", this._offset, []);
          this._offset += 2;
        } else {
          address3 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
          }
        }
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          var address4 = null;
          var remaining1 = 1, index3 = this._offset, elements2 = [], text2 = "", address5 = true;
          while (address5) {
            address5 = this.__consume__space();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index3;
            var klass2 = this.constructor.SyntaxNode;
            address4 = new klass2(text2, this._offset, elements2);
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
        var klass3 = this.constructor.SyntaxNode;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["assignment"][index0] = address0;
    },
    __consume__parsing_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["parsing_expression"] = this._nodeCache["parsing_expression"] || {};
      var cached = this._nodeCache["parsing_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__choice_expression();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__choice_part();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["parsing_expression"][index0] = address0;
    },
    __consume__parenthesised_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["parenthesised_expression"] = this._nodeCache["parenthesised_expression"] || {};
      var cached = this._nodeCache["parenthesised_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("(", this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__space();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          address2 = new klass1(text1, this._offset, elements1);
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__parsing_expression();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.parsing_expression = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              address6 = this.__consume__space();
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass2 = this.constructor.SyntaxNode;
              address5 = new klass2(text2, this._offset, elements2);
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              var address7 = null;
              var slice2 = null;
              if (this._input.length > this._offset) {
                slice2 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice2 = null;
              }
              if (slice2 === ")") {
                var klass3 = this.constructor.SyntaxNode;
                address7 = new klass3(")", this._offset, []);
                this._offset += 1;
              } else {
                address7 = null;
                var slice3 = null;
                if (this._input.length > this._offset) {
                  slice3 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice3 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
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
        var klass4 = this.constructor.SyntaxNode;
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["parenthesised_expression"][index0] = address0;
    },
    __consume__choice_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["choice_expression"] = this._nodeCache["choice_expression"] || {};
      var cached = this._nodeCache["choice_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__choice_part();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.first_part = address1;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var remaining1 = 1, index4 = this._offset, elements3 = [], text3 = "", address5 = true;
          while (address5) {
            address5 = this.__consume__space();
            if (address5) {
              elements3.push(address5);
              text3 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index4;
            var klass0 = this.constructor.SyntaxNode;
            address4 = new klass0(text3, this._offset, elements3);
            this._offset += text3.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address6 = null;
            var slice0 = null;
            if (this._input.length > this._offset) {
              slice0 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice0 = null;
            }
            if (slice0 === "/") {
              var klass1 = this.constructor.SyntaxNode;
              address6 = new klass1("/", this._offset, []);
              this._offset += 1;
            } else {
              address6 = null;
              var slice1 = null;
              if (this._input.length > this._offset) {
                slice1 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice1 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
              }
            }
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
              var address7 = null;
              var remaining2 = 1, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__space();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                address7 = new klass2(text4, this._offset, elements4);
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements2.push(address7);
                text2 += address7.textValue;
                var address9 = null;
                address9 = this.__consume__choice_part();
                if (address9) {
                  elements2.push(address9);
                  text2 += address9.textValue;
                  labelled1.expression = address9;
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
            var klass3 = this.constructor.SyntaxNode;
            address3 = new klass3(text2, this._offset, elements2, labelled1);
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass4 = this.constructor.SyntaxNode;
          address2 = new klass4(text1, this._offset, elements1);
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.rest = address2;
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
        var klass5 = this.constructor.SyntaxNode;
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["choice_expression"][index0] = address0;
    },
    __consume__choice_part: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["choice_part"] = this._nodeCache["choice_part"] || {};
      var cached = this._nodeCache["choice_part"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__sequence_expression();
      if (address1) {
      } else {
        this._offset = index2;
        address1 = this.__consume__sequence_part();
        if (address1) {
        } else {
          this._offset = index2;
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index3 = this._offset;
        var index4 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var remaining0 = 1, index5 = this._offset, elements2 = [], text2 = "", address4 = true;
        while (address4) {
          address4 = this.__consume__space();
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index5;
          var klass0 = this.constructor.SyntaxNode;
          address3 = new klass0(text2, this._offset, elements2);
          this._offset += text2.length;
        } else {
          address3 = null;
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          var address5 = null;
          address5 = this.__consume__type_expression();
          if (address5) {
            elements1.push(address5);
            text1 += address5.textValue;
            labelled1.type_expression = address5;
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
          var klass1 = this.constructor.SyntaxNode;
          address2 = new klass1(text1, this._offset, elements1, labelled1);
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
        } else {
          this._offset = index3;
          var klass2 = this.constructor.SyntaxNode;
          address2 = new klass2("", this._offset, []);
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
        var klass3 = this.constructor.SyntaxNode;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["choice_part"][index0] = address0;
    },
    __consume__type_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["type_expression"] = this._nodeCache["type_expression"] || {};
      var cached = this._nodeCache["type_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "<") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("<", this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__object_identifier();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.object_identifier = address2;
          var address3 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === ">") {
            var klass1 = this.constructor.SyntaxNode;
            address3 = new klass1(">", this._offset, []);
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
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
        var klass2 = this.constructor.SyntaxNode;
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["type_expression"][index0] = address0;
    },
    __consume__sequence_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["sequence_expression"] = this._nodeCache["sequence_expression"] || {};
      var cached = this._nodeCache["sequence_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__sequence_part();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.first_part = address1;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var remaining1 = 1, index4 = this._offset, elements3 = [], text3 = "", address5 = true;
          while (address5) {
            address5 = this.__consume__space();
            if (address5) {
              elements3.push(address5);
              text3 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index4;
            var klass0 = this.constructor.SyntaxNode;
            address4 = new klass0(text3, this._offset, elements3);
            this._offset += text3.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address6 = null;
            address6 = this.__consume__sequence_part();
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
              labelled1.expression = address6;
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
            var klass1 = this.constructor.SyntaxNode;
            address3 = new klass1(text2, this._offset, elements2, labelled1);
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          address2 = new klass2(text1, this._offset, elements1);
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.rest = address2;
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
        var klass3 = this.constructor.SyntaxNode;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["sequence_expression"][index0] = address0;
    },
    __consume__sequence_part: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["sequence_part"] = this._nodeCache["sequence_part"] || {};
      var cached = this._nodeCache["sequence_part"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__label();
      if (address1) {
      } else {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("", this._offset, []);
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__quantified_atom();
        if (address2) {
        } else {
          this._offset = index3;
          address2 = this.__consume__atom();
          if (address2) {
          } else {
            this._offset = index3;
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.expression = address2;
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
        var klass1 = this.constructor.SyntaxNode;
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["sequence_part"][index0] = address0;
    },
    __consume__quantified_atom: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["quantified_atom"] = this._nodeCache["quantified_atom"] || {};
      var cached = this._nodeCache["quantified_atom"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__atom();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.atom = address1;
        var address2 = null;
        address2 = this.__consume__quantifier();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.quantifier = address2;
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
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["quantified_atom"][index0] = address0;
    },
    __consume__atom: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["atom"] = this._nodeCache["atom"] || {};
      var cached = this._nodeCache["atom"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__parenthesised_expression();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__predicated_atom();
        if (address0) {
        } else {
          this._offset = index1;
          address0 = this.__consume__reference_expression();
          if (address0) {
          } else {
            this._offset = index1;
            address0 = this.__consume__string_expression();
            if (address0) {
            } else {
              this._offset = index1;
              address0 = this.__consume__ci_string_expression();
              if (address0) {
              } else {
                this._offset = index1;
                address0 = this.__consume__any_char_expression();
                if (address0) {
                } else {
                  this._offset = index1;
                  address0 = this.__consume__char_class_expression();
                  if (address0) {
                  } else {
                    this._offset = index1;
                  }
                }
              }
            }
          }
        }
      }
      return this._nodeCache["atom"][index0] = address0;
    },
    __consume__predicated_atom: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["predicated_atom"] = this._nodeCache["predicated_atom"] || {};
      var cached = this._nodeCache["predicated_atom"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "&") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("&", this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
      } else {
        this._offset = index2;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "!") {
          var klass1 = this.constructor.SyntaxNode;
          address1 = new klass1("!", this._offset, []);
          this._offset += 1;
        } else {
          address1 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
          }
        }
        if (address1) {
        } else {
          this._offset = index2;
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.predicate = address1;
        var address2 = null;
        address2 = this.__consume__atom();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.atom = address2;
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
        var klass2 = this.constructor.SyntaxNode;
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["predicated_atom"][index0] = address0;
    },
    __consume__reference_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["reference_expression"] = this._nodeCache["reference_expression"] || {};
      var cached = this._nodeCache["reference_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.identifier = address1;
        var address2 = null;
        var index2 = this._offset;
        address2 = this.__consume__assignment();
        this._offset = index2;
        if (!(address2)) {
          var klass0 = this.constructor.SyntaxNode;
          address2 = new klass0("", this._offset, []);
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
        var klass1 = this.constructor.SyntaxNode;
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["reference_expression"][index0] = address0;
    },
    __consume__string_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["string_expression"] = this._nodeCache["string_expression"] || {};
      var cached = this._nodeCache["string_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\"") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("\"", this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === "\\") {
            var klass1 = this.constructor.SyntaxNode;
            address4 = new klass1("\\", this._offset, []);
            this._offset += 1;
          } else {
            address4 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            var temp0 = slice4;
            if (temp0 === null) {
              address5 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>", actual: slice5 || "<EOF>"};
              }
            } else {
              var klass2 = this.constructor.SyntaxNode;
              address5 = new klass2(temp0, this._offset, []);
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
            var klass3 = this.constructor.SyntaxNode;
            address3 = new klass3(text2, this._offset, elements2, labelled1);
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
          } else {
            this._offset = index3;
            var slice6 = null;
            if (this._input.length > this._offset) {
              slice6 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice6 = null;
            }
            if (slice6 && /^[^"]/.test(slice6)) {
              var klass4 = this.constructor.SyntaxNode;
              address3 = new klass4(slice6, this._offset, []);
              this._offset += 1;
            } else {
              address3 = null;
              var slice7 = null;
              if (this._input.length > this._offset) {
                slice7 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice7 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\"]", actual: slice7 || "<EOF>"};
              }
            }
            if (address3) {
            } else {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass5 = this.constructor.SyntaxNode;
          address2 = new klass5(text1, this._offset, elements1);
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address6 = null;
          var slice8 = null;
          if (this._input.length > this._offset) {
            slice8 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice8 = null;
          }
          if (slice8 === "\"") {
            var klass6 = this.constructor.SyntaxNode;
            address6 = new klass6("\"", this._offset, []);
            this._offset += 1;
          } else {
            address6 = null;
            var slice9 = null;
            if (this._input.length > this._offset) {
              slice9 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice9 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice9 || "<EOF>"};
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
        var klass7 = this.constructor.SyntaxNode;
        address0 = new klass7(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["string_expression"][index0] = address0;
    },
    __consume__ci_string_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["ci_string_expression"] = this._nodeCache["ci_string_expression"] || {};
      var cached = this._nodeCache["ci_string_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "`") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("`", this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === "\\") {
            var klass1 = this.constructor.SyntaxNode;
            address4 = new klass1("\\", this._offset, []);
            this._offset += 1;
          } else {
            address4 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            var temp0 = slice4;
            if (temp0 === null) {
              address5 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>", actual: slice5 || "<EOF>"};
              }
            } else {
              var klass2 = this.constructor.SyntaxNode;
              address5 = new klass2(temp0, this._offset, []);
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
            var klass3 = this.constructor.SyntaxNode;
            address3 = new klass3(text2, this._offset, elements2, labelled1);
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
          } else {
            this._offset = index3;
            var slice6 = null;
            if (this._input.length > this._offset) {
              slice6 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice6 = null;
            }
            if (slice6 && /^[^`]/.test(slice6)) {
              var klass4 = this.constructor.SyntaxNode;
              address3 = new klass4(slice6, this._offset, []);
              this._offset += 1;
            } else {
              address3 = null;
              var slice7 = null;
              if (this._input.length > this._offset) {
                slice7 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice7 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^`]", actual: slice7 || "<EOF>"};
              }
            }
            if (address3) {
            } else {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass5 = this.constructor.SyntaxNode;
          address2 = new klass5(text1, this._offset, elements1);
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address6 = null;
          var slice8 = null;
          if (this._input.length > this._offset) {
            slice8 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice8 = null;
          }
          if (slice8 === "`") {
            var klass6 = this.constructor.SyntaxNode;
            address6 = new klass6("`", this._offset, []);
            this._offset += 1;
          } else {
            address6 = null;
            var slice9 = null;
            if (this._input.length > this._offset) {
              slice9 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice9 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice9 || "<EOF>"};
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
        var klass7 = this.constructor.SyntaxNode;
        address0 = new klass7(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["ci_string_expression"][index0] = address0;
    },
    __consume__any_char_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["any_char_expression"] = this._nodeCache["any_char_expression"] || {};
      var cached = this._nodeCache["any_char_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === ".") {
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0(".", this._offset, []);
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      return this._nodeCache["any_char_expression"][index0] = address0;
    },
    __consume__char_class_expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["char_class_expression"] = this._nodeCache["char_class_expression"] || {};
      var cached = this._nodeCache["char_class_expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0("[", this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "^") {
          var klass1 = this.constructor.SyntaxNode;
          address2 = new klass1("^", this._offset, []);
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
          }
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          address2 = new klass2("", this._offset, []);
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          var remaining0 = 1, index3 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var index4 = this._offset;
            var index5 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
            var address5 = null;
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            if (slice4 === "\\") {
              var klass3 = this.constructor.SyntaxNode;
              address5 = new klass3("\\", this._offset, []);
              this._offset += 1;
            } else {
              address5 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice5 || "<EOF>"};
              }
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              var address6 = null;
              var slice6 = null;
              if (this._input.length > this._offset) {
                slice6 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice6 = null;
              }
              var temp0 = slice6;
              if (temp0 === null) {
                address6 = null;
                var slice7 = null;
                if (this._input.length > this._offset) {
                  slice7 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice7 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>", actual: slice7 || "<EOF>"};
                }
              } else {
                var klass4 = this.constructor.SyntaxNode;
                address6 = new klass4(temp0, this._offset, []);
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
              var klass5 = this.constructor.SyntaxNode;
              address4 = new klass5(text2, this._offset, elements2, labelled1);
              this._offset += text2.length;
            } else {
              address4 = null;
            }
            if (address4) {
            } else {
              this._offset = index4;
              var slice8 = null;
              if (this._input.length > this._offset) {
                slice8 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice8 = null;
              }
              if (slice8 && /^[^\]]/.test(slice8)) {
                var klass6 = this.constructor.SyntaxNode;
                address4 = new klass6(slice8, this._offset, []);
                this._offset += 1;
              } else {
                address4 = null;
                var slice9 = null;
                if (this._input.length > this._offset) {
                  slice9 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice9 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\]]", actual: slice9 || "<EOF>"};
                }
              }
              if (address4) {
              } else {
                this._offset = index4;
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index3;
            var klass7 = this.constructor.SyntaxNode;
            address3 = new klass7(text1, this._offset, elements1);
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            var address7 = null;
            var slice10 = null;
            if (this._input.length > this._offset) {
              slice10 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice10 = null;
            }
            if (slice10 === "]") {
              var klass8 = this.constructor.SyntaxNode;
              address7 = new klass8("]", this._offset, []);
              this._offset += 1;
            } else {
              address7 = null;
              var slice11 = null;
              if (this._input.length > this._offset) {
                slice11 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice11 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice11 || "<EOF>"};
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
        var klass9 = this.constructor.SyntaxNode;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["char_class_expression"][index0] = address0;
    },
    __consume__label: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["label"] = this._nodeCache["label"] || {};
      var cached = this._nodeCache["label"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.identifier = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === ":") {
          var klass0 = this.constructor.SyntaxNode;
          address2 = new klass0(":", this._offset, []);
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
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
        var klass1 = this.constructor.SyntaxNode;
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["label"][index0] = address0;
    },
    __consume__object_identifier: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["object_identifier"] = this._nodeCache["object_identifier"] || {};
      var cached = this._nodeCache["object_identifier"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__identifier();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.identifier = address1;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var slice0 = null;
          if (this._input.length > this._offset) {
            slice0 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice0 = null;
          }
          if (slice0 === ".") {
            var klass0 = this.constructor.SyntaxNode;
            address4 = new klass0(".", this._offset, []);
            this._offset += 1;
          } else {
            address4 = null;
            var slice1 = null;
            if (this._input.length > this._offset) {
              slice1 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice1 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            address5 = this.__consume__identifier();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              labelled1.identifier = address5;
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
            var klass1 = this.constructor.SyntaxNode;
            address3 = new klass1(text2, this._offset, elements2, labelled1);
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          address2 = new klass2(text1, this._offset, elements1);
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
        var klass3 = this.constructor.SyntaxNode;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["object_identifier"][index0] = address0;
    },
    __consume__identifier: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["identifier"] = this._nodeCache["identifier"] || {};
      var cached = this._nodeCache["identifier"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[a-zA-Z_$]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        address1 = new klass0(slice0, this._offset, []);
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-zA-Z_$]", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[a-zA-Z0-9_$]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            address3 = new klass1(slice2, this._offset, []);
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-zA-Z0-9_$]", actual: slice3 || "<EOF>"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          address2 = new klass2(text1, this._offset, elements1);
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
        var klass3 = this.constructor.SyntaxNode;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["identifier"][index0] = address0;
    },
    __consume__quantifier: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["quantifier"] = this._nodeCache["quantifier"] || {};
      var cached = this._nodeCache["quantifier"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "?") {
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0("?", this._offset, []);
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice1 || "<EOF>"};
        }
      }
      if (address0) {
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "*") {
          var klass1 = this.constructor.SyntaxNode;
          address0 = new klass1("*", this._offset, []);
          this._offset += 1;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice3 || "<EOF>"};
          }
        }
        if (address0) {
        } else {
          this._offset = index1;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === "+") {
            var klass2 = this.constructor.SyntaxNode;
            address0 = new klass2("+", this._offset, []);
            this._offset += 1;
          } else {
            address0 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "", actual: slice5 || "<EOF>"};
            }
          }
          if (address0) {
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["quantifier"][index0] = address0;
    },
    __consume__space: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["space"] = this._nodeCache["space"] || {};
      var cached = this._nodeCache["space"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[\s\n\r\t]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0(slice0, this._offset, []);
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[\s\n\r\t]", actual: slice1 || "<EOF>"};
        }
      }
      return this._nodeCache["space"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__grammar();
    return this._offset === this._input.length ? result : null;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof module === "object") {
    module.exports = {
      Grammar: Grammar,
      Parser: Parser,
      SyntaxNode: SyntaxNode,
      parse: Parser.parse,
      formatError: formatError
    };
    
    if (typeof Canopy !== "undefined") {
      Canopy.PEG = Grammar;
      Canopy.PEGParser = Parser;
      Canopy.PEGParser.formatError = formatError;
    }
  } else {
    var namespace = this;
    namespace = namespace.Canopy = namespace.Canopy || {};
    Canopy.PEG = Grammar;
    Canopy.PEGParser = Parser;
    Canopy.PEGParser.formatError = formatError;
  }
})();

