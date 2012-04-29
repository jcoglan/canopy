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
    __consume__program: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["program"] = this._nodeCache["program"] || {};
      var cached = this._nodeCache["program"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1;
      var index1 = this._offset;
      var elements0 = [];
      var text0 = "";
      var address1 = true;
      while (address1) {
        address1 = this.__consume__cell();
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0(text0, this._offset, elements0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["program"][index0] = address0;
    },
    __consume__cell: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["cell"] = this._nodeCache["cell"] || {};
      var cached = this._nodeCache["cell"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var elements0 = [];
      var labelled0 = {};
      var text0 = "";
      var address1 = null;
      var remaining0 = 0;
      var index2 = this._offset;
      var elements1 = [];
      var text1 = "";
      var address2 = true;
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
        var index3 = this._offset;
        address3 = this.__consume__list();
        if (address3) {
        } else {
          this._offset = index3;
          address3 = this.__consume__atom();
          if (address3) {
          } else {
            this._offset = index3;
          }
        }
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          labelled0.data = address3;
          var address4 = null;
          var remaining1 = 0;
          var index4 = this._offset;
          var elements2 = [];
          var text2 = "";
          var address5 = true;
          while (address5) {
            address5 = this.__consume__space();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index4;
            var klass1 = this.constructor.SyntaxNode;
            address4 = new klass1(text2, this._offset, elements2);
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
        var klass2 = this.constructor.SyntaxNode;
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["cell"][index0] = address0;
    },
    __consume__list: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["list"] = this._nodeCache["list"] || {};
      var cached = this._nodeCache["list"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var elements0 = [];
      var labelled0 = {};
      var text0 = "";
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
        var remaining0 = 1;
        var index2 = this._offset;
        var elements1 = [];
        var text1 = "";
        var address3 = true;
        while (address3) {
          address3 = this.__consume__cell();
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
          labelled0.cells = address2;
          var address4 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === ")") {
            var klass2 = this.constructor.SyntaxNode;
            address4 = new klass2(")", this._offset, []);
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
      return this._nodeCache["list"][index0] = address0;
    },
    __consume__atom: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["atom"] = this._nodeCache["atom"] || {};
      var cached = this._nodeCache["atom"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__boolean();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__integer();
        if (address0) {
        } else {
          this._offset = index1;
          address0 = this.__consume__string();
          if (address0) {
          } else {
            this._offset = index1;
            address0 = this.__consume__symbol();
            if (address0) {
            } else {
              this._offset = index1;
            }
          }
        }
      }
      return this._nodeCache["atom"][index0] = address0;
    },
    __consume__boolean: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["boolean"] = this._nodeCache["boolean"] || {};
      var cached = this._nodeCache["boolean"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "#t") {
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0("#t", this._offset, []);
        this._offset += 2;
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
          slice2 = this._input.substring(this._offset, this._offset + 2);
        } else {
          slice2 = null;
        }
        if (slice2 === "#f") {
          var klass1 = this.constructor.SyntaxNode;
          address0 = new klass1("#f", this._offset, []);
          this._offset += 2;
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
        }
      }
      return this._nodeCache["boolean"][index0] = address0;
    },
    __consume__integer: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["integer"] = this._nodeCache["integer"] || {};
      var cached = this._nodeCache["integer"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var elements0 = [];
      var labelled0 = {};
      var text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[1-9]/.test(slice0)) {
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
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[1-9]", actual: slice1 || "<EOF>"};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0;
        var index2 = this._offset;
        var elements1 = [];
        var text1 = "";
        var address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9]/.test(slice2)) {
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
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]", actual: slice3 || "<EOF>"};
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
      return this._nodeCache["integer"][index0] = address0;
    },
    __consume__string: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["string"] = this._nodeCache["string"] || {};
      var cached = this._nodeCache["string"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var elements0 = [];
      var labelled0 = {};
      var text0 = "";
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
        var remaining0 = 0;
        var index2 = this._offset;
        var elements1 = [];
        var text1 = "";
        var address3 = true;
        while (address3) {
          var index3 = this._offset;
          var index4 = this._offset;
          var elements2 = [];
          var labelled1 = {};
          var text2 = "";
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
      return this._nodeCache["string"][index0] = address0;
    },
    __consume__symbol: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["symbol"] = this._nodeCache["symbol"] || {};
      var cached = this._nodeCache["symbol"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1;
      var index1 = this._offset;
      var elements0 = [];
      var text0 = "";
      var address1 = true;
      while (address1) {
        var index2 = this._offset;
        var elements1 = [];
        var labelled0 = {};
        var text1 = "";
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__delimiter();
        this._offset = index3;
        if (!(address2)) {
          var klass0 = this.constructor.SyntaxNode;
          address2 = new klass0("", this._offset, []);
          this._offset += 0;
        } else {
          address2 = null;
        }
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          var address3 = null;
          var slice0 = null;
          if (this._input.length > this._offset) {
            slice0 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice0 = null;
          }
          var temp0 = slice0;
          if (temp0 === null) {
            address3 = null;
            var slice1 = null;
            if (this._input.length > this._offset) {
              slice1 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice1 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>", actual: slice1 || "<EOF>"};
            }
          } else {
            var klass1 = this.constructor.SyntaxNode;
            address3 = new klass1(temp0, this._offset, []);
            this._offset += 1;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          address1 = new klass2(text1, this._offset, elements1, labelled0);
          this._offset += text1.length;
        } else {
          address1 = null;
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        address0 = new klass3(text0, this._offset, elements0);
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["symbol"][index0] = address0;
    },
    __consume__space: function(input) {
      var address0 = null;
      var index0 = this._offset;
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
    },
    __consume__paren: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["paren"] = this._nodeCache["paren"] || {};
      var cached = this._nodeCache["paren"][index0];
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
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        address0 = new klass0("(", this._offset, []);
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
        if (slice2 === ")") {
          var klass1 = this.constructor.SyntaxNode;
          address0 = new klass1(")", this._offset, []);
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
        }
      }
      return this._nodeCache["paren"][index0] = address0;
    },
    __consume__delimiter: function(input) {
      var address0 = null;
      var index0 = this._offset;
      this._nodeCache["delimiter"] = this._nodeCache["delimiter"] || {};
      var cached = this._nodeCache["delimiter"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__paren();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__space();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["delimiter"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__program();
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
    
  } else {
    var namespace = this;
    CanopyLisp = Grammar;
    CanopyLispParser = Parser;
    CanopyLispParser.formatError = formatError;
  }
})();

