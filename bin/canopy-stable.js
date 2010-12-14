/**
 * Canopy -- a JavaScript parser compiler
 * ======================================
 * 
 * http://github.com/jcoglan/canopy
 * http://jcoglan.com
 * 
 * Copyright (c) 2010 James Coglan
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

if (typeof Canopy === 'undefined')
  Canopy = new JS.Module('Canopy');

Canopy.extend({
  compile: function(grammar) {
    var compiler = new this.Compiler(grammar),
        source   = compiler.toSource();
    
    eval(source);
    return source;
  },
  
  forEach: function(list, block, context) {
    for (var i = 0, n = list.length; i < n; i++)
      block.call(context, list[i], i);
  }
});


(function() {;
    var namespace = this;
    namespace = namespace.Canopy = namespace.Canopy || {};
    if (typeof exports === "object") {
        exports.Canopy = this.Canopy;
    }
})();

Canopy.MetaGrammar = new JS.Module("Canopy.MetaGrammar", {
    root: "grammar",
    __consume__grammar: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.grammar = this._nodeCache.grammar || {};
        var cached = this._nodeCache.grammar[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
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
            var klass0 = this.klass.SyntaxNode;
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
                named0.grammar_name = named0.grammar_name || [];
                named0.grammar_name.push(address3);
                var address4 = null;
                var remaining1 = 1;
                var index3 = this._offset;
                var elements2 = [];
                var text2 = "";
                var address5 = true;
                while (address5) {
                    var index4 = this._offset;
                    var elements3 = [];
                    var labelled1 = {};
                    var text3 = "";
                    var named1 = {};
                    var address6 = null;
                    var remaining2 = 0;
                    var index5 = this._offset;
                    var elements4 = [];
                    var text4 = "";
                    var address7 = true;
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
                        var klass1 = this.klass.SyntaxNode;
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
                            named1.grammar_rule = named1.grammar_rule || [];
                            named1.grammar_rule.push(address8);
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
                        var klass2 = this.klass.SyntaxNode;
                        address5 = new klass2(text3, this._offset, elements3, labelled1, named1);
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
                    var klass3 = this.klass.SyntaxNode;
                    address4 = new klass3(text2, this._offset, elements2);
                    this._offset += text2.length;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements0.push(address4);
                    text0 += address4.textValue;
                    labelled0.rules = address4;
                    named0.rules = named0.rules || [];
                    named0.rules.push(address4);
                    var address9 = null;
                    var remaining3 = 0;
                    var index6 = this._offset;
                    var elements5 = [];
                    var text5 = "";
                    var address10 = true;
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
                        var klass4 = this.klass.SyntaxNode;
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
            var klass5 = null;
            if (Canopy.Compiler.Grammar instanceof Function) {
                klass5 = Canopy.Compiler.Grammar;
            } else {
                klass5 = this.klass.SyntaxNode;
            }
            address0 = new klass5(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.Grammar instanceof Function)) {
                address0.extend(Canopy.Compiler.Grammar);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.grammar[index0] = address0;
    },
    __consume__grammar_name: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.grammar_name = this._nodeCache.grammar_name || {};
        var cached = this._nodeCache.grammar_name[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 8) === "grammar ") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("grammar ", this._offset, []);
            this._offset += 8;
        } else {
            address1 = null;
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
                named0.object_identifier = named0.object_identifier || [];
                named0.object_identifier.push(address2);
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
            var klass1 = this.klass.SyntaxNode;
            address0 = new klass1(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.grammar_name[index0] = address0;
    },
    __consume__grammar_rule: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.grammar_rule = this._nodeCache.grammar_rule || {};
        var cached = this._nodeCache.grammar_rule[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__identifier();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.identifier = address1;
            named0.identifier = named0.identifier || [];
            named0.identifier.push(address1);
            var address2 = null;
            address2 = this.__consume__assignment();
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.assignment = address2;
                named0.assignment = named0.assignment || [];
                named0.assignment.push(address2);
                var address3 = null;
                address3 = this.__consume__parsing_expression();
                if (address3) {
                    elements0.push(address3);
                    text0 += address3.textValue;
                    labelled0.parsing_expression = address3;
                    named0.parsing_expression = named0.parsing_expression || [];
                    named0.parsing_expression.push(address3);
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
            var klass0 = null;
            if (Canopy.Compiler.GrammarRule instanceof Function) {
                klass0 = Canopy.Compiler.GrammarRule;
            } else {
                klass0 = this.klass.SyntaxNode;
            }
            address0 = new klass0(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.GrammarRule instanceof Function)) {
                address0.extend(Canopy.Compiler.GrammarRule);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.grammar_rule[index0] = address0;
    },
    __consume__assignment: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.assignment = this._nodeCache.assignment || {};
        var cached = this._nodeCache.assignment[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        var remaining0 = 1;
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
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0(text1, this._offset, elements1);
            this._offset += text1.length;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address3 = null;
            if (this._input.substring(this._offset, this._offset + 2) === "<-") {
                var klass1 = this.klass.SyntaxNode;
                address3 = new klass1("<-", this._offset, []);
                this._offset += 2;
            } else {
                address3 = null;
            }
            if (address3) {
                elements0.push(address3);
                text0 += address3.textValue;
                var address4 = null;
                var remaining1 = 1;
                var index3 = this._offset;
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
                    this._offset = index3;
                    var klass2 = this.klass.SyntaxNode;
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
            var klass3 = this.klass.SyntaxNode;
            address0 = new klass3(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.assignment[index0] = address0;
    },
    __consume__parsing_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.parsing_expression = this._nodeCache.parsing_expression || {};
        var cached = this._nodeCache.parsing_expression[index0];
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
        return this._nodeCache.parsing_expression[index0] = address0;
    },
    __consume__parenthesised_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.parenthesised_expression = this._nodeCache.parenthesised_expression || {};
        var cached = this._nodeCache.parenthesised_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "(") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("(", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
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
                address3 = this.__consume__space();
                if (address3) {
                    elements1.push(address3);
                    text1 += address3.textValue;
                    remaining0 -= 1;
                }
            }
            if (remaining0 <= 0) {
                this._offset = index2;
                var klass1 = this.klass.SyntaxNode;
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
                    named0.parsing_expression = named0.parsing_expression || [];
                    named0.parsing_expression.push(address4);
                    var address5 = null;
                    var remaining1 = 0;
                    var index3 = this._offset;
                    var elements2 = [];
                    var text2 = "";
                    var address6 = true;
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
                        var klass2 = this.klass.SyntaxNode;
                        address5 = new klass2(text2, this._offset, elements2);
                        this._offset += text2.length;
                    } else {
                        address5 = null;
                    }
                    if (address5) {
                        elements0.push(address5);
                        text0 += address5.textValue;
                        var address7 = null;
                        if (this._input.substring(this._offset, this._offset + 1) === ")") {
                            var klass3 = this.klass.SyntaxNode;
                            address7 = new klass3(")", this._offset, []);
                            this._offset += 1;
                        } else {
                            address7 = null;
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
            var klass4 = this.klass.SyntaxNode;
            address0 = new klass4(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.parenthesised_expression[index0] = address0;
    },
    __consume__choice_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.choice_expression = this._nodeCache.choice_expression || {};
        var cached = this._nodeCache.choice_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__choice_part();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.first_part = address1;
            named0.first_part = named0.first_part || [];
            named0.first_part.push(address1);
            var address2 = null;
            var remaining0 = 1;
            var index2 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                var index3 = this._offset;
                var elements2 = [];
                var labelled1 = {};
                var text2 = "";
                var named1 = {};
                var address4 = null;
                var remaining1 = 1;
                var index4 = this._offset;
                var elements3 = [];
                var text3 = "";
                var address5 = true;
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
                    var klass0 = this.klass.SyntaxNode;
                    address4 = new klass0(text3, this._offset, elements3);
                    this._offset += text3.length;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements2.push(address4);
                    text2 += address4.textValue;
                    var address6 = null;
                    if (this._input.substring(this._offset, this._offset + 1) === "/") {
                        var klass1 = this.klass.SyntaxNode;
                        address6 = new klass1("/", this._offset, []);
                        this._offset += 1;
                    } else {
                        address6 = null;
                    }
                    if (address6) {
                        elements2.push(address6);
                        text2 += address6.textValue;
                        var address7 = null;
                        var remaining2 = 1;
                        var index5 = this._offset;
                        var elements4 = [];
                        var text4 = "";
                        var address8 = true;
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
                            var klass2 = this.klass.SyntaxNode;
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
                                named1.expression = named1.expression || [];
                                named1.expression.push(address9);
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
                    var klass3 = this.klass.SyntaxNode;
                    address3 = new klass3(text2, this._offset, elements2, labelled1, named1);
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
                var klass4 = this.klass.SyntaxNode;
                address2 = new klass4(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.rest = address2;
                named0.rest = named0.rest || [];
                named0.rest.push(address2);
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
            var klass5 = null;
            if (Canopy.Compiler.Choice instanceof Function) {
                klass5 = Canopy.Compiler.Choice;
            } else {
                klass5 = this.klass.SyntaxNode;
            }
            address0 = new klass5(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.Choice instanceof Function)) {
                address0.extend(Canopy.Compiler.Choice);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.choice_expression[index0] = address0;
    },
    __consume__choice_part: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.choice_part = this._nodeCache.choice_part || {};
        var cached = this._nodeCache.choice_part[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
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
            var index4 = this._offset;
            var elements1 = [];
            var labelled1 = {};
            var text1 = "";
            var named1 = {};
            var address3 = null;
            var remaining0 = 1;
            var index5 = this._offset;
            var elements2 = [];
            var text2 = "";
            var address4 = true;
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
                var klass0 = this.klass.SyntaxNode;
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
                    named1.type_expression = named1.type_expression || [];
                    named1.type_expression.push(address5);
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
                var klass1 = this.klass.SyntaxNode;
                address2 = new klass1(text1, this._offset, elements1, labelled1, named1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
            } else {
                this._offset = index3;
                var klass2 = this.klass.SyntaxNode;
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
            var klass3 = null;
            if (Canopy.Compiler.ChoicePart instanceof Function) {
                klass3 = Canopy.Compiler.ChoicePart;
            } else {
                klass3 = this.klass.SyntaxNode;
            }
            address0 = new klass3(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.ChoicePart instanceof Function)) {
                address0.extend(Canopy.Compiler.ChoicePart);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.choice_part[index0] = address0;
    },
    __consume__type_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.type_expression = this._nodeCache.type_expression || {};
        var cached = this._nodeCache.type_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "<") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("<", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
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
                named0.object_identifier = named0.object_identifier || [];
                named0.object_identifier.push(address2);
                var address3 = null;
                if (this._input.substring(this._offset, this._offset + 1) === ">") {
                    var klass1 = this.klass.SyntaxNode;
                    address3 = new klass1(">", this._offset, []);
                    this._offset += 1;
                } else {
                    address3 = null;
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
            var klass2 = this.klass.SyntaxNode;
            address0 = new klass2(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.type_expression[index0] = address0;
    },
    __consume__sequence_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.sequence_expression = this._nodeCache.sequence_expression || {};
        var cached = this._nodeCache.sequence_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__sequence_part();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.first_part = address1;
            named0.first_part = named0.first_part || [];
            named0.first_part.push(address1);
            var address2 = null;
            var remaining0 = 1;
            var index2 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                var index3 = this._offset;
                var elements2 = [];
                var labelled1 = {};
                var text2 = "";
                var named1 = {};
                var address4 = null;
                var remaining1 = 1;
                var index4 = this._offset;
                var elements3 = [];
                var text3 = "";
                var address5 = true;
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
                    var klass0 = this.klass.SyntaxNode;
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
                        named1.expression = named1.expression || [];
                        named1.expression.push(address6);
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
                    var klass1 = this.klass.SyntaxNode;
                    address3 = new klass1(text2, this._offset, elements2, labelled1, named1);
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
                var klass2 = this.klass.SyntaxNode;
                address2 = new klass2(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.rest = address2;
                named0.rest = named0.rest || [];
                named0.rest.push(address2);
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
            var klass3 = null;
            if (Canopy.Compiler.Sequence instanceof Function) {
                klass3 = Canopy.Compiler.Sequence;
            } else {
                klass3 = this.klass.SyntaxNode;
            }
            address0 = new klass3(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.Sequence instanceof Function)) {
                address0.extend(Canopy.Compiler.Sequence);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.sequence_expression[index0] = address0;
    },
    __consume__sequence_part: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.sequence_part = this._nodeCache.sequence_part || {};
        var cached = this._nodeCache.sequence_part[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        var index2 = this._offset;
        address1 = this.__consume__label();
        if (address1) {
        } else {
            this._offset = index2;
            var klass0 = this.klass.SyntaxNode;
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
                named0.expression = named0.expression || [];
                named0.expression.push(address2);
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
            var klass1 = null;
            if (Canopy.Compiler.SequencePart instanceof Function) {
                klass1 = Canopy.Compiler.SequencePart;
            } else {
                klass1 = this.klass.SyntaxNode;
            }
            address0 = new klass1(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.SequencePart instanceof Function)) {
                address0.extend(Canopy.Compiler.SequencePart);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.sequence_part[index0] = address0;
    },
    __consume__quantified_atom: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.quantified_atom = this._nodeCache.quantified_atom || {};
        var cached = this._nodeCache.quantified_atom[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__atom();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.atom = address1;
            named0.atom = named0.atom || [];
            named0.atom.push(address1);
            var address2 = null;
            address2 = this.__consume__quantifier();
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.quantifier = address2;
                named0.quantifier = named0.quantifier || [];
                named0.quantifier.push(address2);
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
            var klass0 = null;
            if (Canopy.Compiler.Repeat instanceof Function) {
                klass0 = Canopy.Compiler.Repeat;
            } else {
                klass0 = this.klass.SyntaxNode;
            }
            address0 = new klass0(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.Repeat instanceof Function)) {
                address0.extend(Canopy.Compiler.Repeat);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.quantified_atom[index0] = address0;
    },
    __consume__atom: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.atom = this._nodeCache.atom || {};
        var cached = this._nodeCache.atom[index0];
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
        return this._nodeCache.atom[index0] = address0;
    },
    __consume__predicated_atom: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.predicated_atom = this._nodeCache.predicated_atom || {};
        var cached = this._nodeCache.predicated_atom[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        var index2 = this._offset;
        if (this._input.substring(this._offset, this._offset + 1) === "&") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("&", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
        } else {
            this._offset = index2;
            if (this._input.substring(this._offset, this._offset + 1) === "!") {
                var klass1 = this.klass.SyntaxNode;
                address1 = new klass1("!", this._offset, []);
                this._offset += 1;
            } else {
                address1 = null;
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
            named0.predicate = named0.predicate || [];
            named0.predicate.push(address1);
            var address2 = null;
            address2 = this.__consume__atom();
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.atom = address2;
                named0.atom = named0.atom || [];
                named0.atom.push(address2);
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
            var klass2 = null;
            if (Canopy.Compiler.PredicatedAtom instanceof Function) {
                klass2 = Canopy.Compiler.PredicatedAtom;
            } else {
                klass2 = this.klass.SyntaxNode;
            }
            address0 = new klass2(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.PredicatedAtom instanceof Function)) {
                address0.extend(Canopy.Compiler.PredicatedAtom);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.predicated_atom[index0] = address0;
    },
    __consume__reference_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.reference_expression = this._nodeCache.reference_expression || {};
        var cached = this._nodeCache.reference_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__identifier();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.identifier = address1;
            named0.identifier = named0.identifier || [];
            named0.identifier.push(address1);
            var address2 = null;
            var index2 = this._offset;
            address2 = this.__consume__assignment();
            this._offset = index2;
            if (!(address2)) {
                var klass0 = this.klass.SyntaxNode;
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
            var klass1 = null;
            if (Canopy.Compiler.Reference instanceof Function) {
                klass1 = Canopy.Compiler.Reference;
            } else {
                klass1 = this.klass.SyntaxNode;
            }
            address0 = new klass1(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.Reference instanceof Function)) {
                address0.extend(Canopy.Compiler.Reference);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.reference_expression[index0] = address0;
    },
    __consume__string_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.string_expression = this._nodeCache.string_expression || {};
        var cached = this._nodeCache.string_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "\"") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("\"", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
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
                var named1 = {};
                var address4 = null;
                if (this._input.substring(this._offset, this._offset + 1) === "\\") {
                    var klass1 = this.klass.SyntaxNode;
                    address4 = new klass1("\\", this._offset, []);
                    this._offset += 1;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements2.push(address4);
                    text2 += address4.textValue;
                    var address5 = null;
                    var temp0 = this._input.substring(this._offset, this._offset + 1);
                    if (temp0 === "") {
                        address5 = null;
                    } else {
                        var klass2 = this.klass.SyntaxNode;
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
                    var klass3 = this.klass.SyntaxNode;
                    address3 = new klass3(text2, this._offset, elements2, labelled1, named1);
                    this._offset += text2.length;
                } else {
                    address3 = null;
                }
                if (address3) {
                } else {
                    this._offset = index3;
                    var temp1 = this._input.substring(this._offset, this._offset + 1);
                    var match0 = null;
                    if (match0 = temp1.match(/^[^"]/)) {
                        var klass4 = this.klass.SyntaxNode;
                        address3 = new klass4(match0[0], this._offset, []);
                        this._offset += 1;
                    } else {
                        address3 = null;
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
                var klass5 = this.klass.SyntaxNode;
                address2 = new klass5(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                var address6 = null;
                if (this._input.substring(this._offset, this._offset + 1) === "\"") {
                    var klass6 = this.klass.SyntaxNode;
                    address6 = new klass6("\"", this._offset, []);
                    this._offset += 1;
                } else {
                    address6 = null;
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
            var klass7 = null;
            if (Canopy.Compiler.String instanceof Function) {
                klass7 = Canopy.Compiler.String;
            } else {
                klass7 = this.klass.SyntaxNode;
            }
            address0 = new klass7(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.String instanceof Function)) {
                address0.extend(Canopy.Compiler.String);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.string_expression[index0] = address0;
    },
    __consume__ci_string_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.ci_string_expression = this._nodeCache.ci_string_expression || {};
        var cached = this._nodeCache.ci_string_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "`") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("`", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
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
                var named1 = {};
                var address4 = null;
                if (this._input.substring(this._offset, this._offset + 1) === "\\") {
                    var klass1 = this.klass.SyntaxNode;
                    address4 = new klass1("\\", this._offset, []);
                    this._offset += 1;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements2.push(address4);
                    text2 += address4.textValue;
                    var address5 = null;
                    var temp0 = this._input.substring(this._offset, this._offset + 1);
                    if (temp0 === "") {
                        address5 = null;
                    } else {
                        var klass2 = this.klass.SyntaxNode;
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
                    var klass3 = this.klass.SyntaxNode;
                    address3 = new klass3(text2, this._offset, elements2, labelled1, named1);
                    this._offset += text2.length;
                } else {
                    address3 = null;
                }
                if (address3) {
                } else {
                    this._offset = index3;
                    var temp1 = this._input.substring(this._offset, this._offset + 1);
                    var match0 = null;
                    if (match0 = temp1.match(/^[^`]/)) {
                        var klass4 = this.klass.SyntaxNode;
                        address3 = new klass4(match0[0], this._offset, []);
                        this._offset += 1;
                    } else {
                        address3 = null;
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
                var klass5 = this.klass.SyntaxNode;
                address2 = new klass5(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                var address6 = null;
                if (this._input.substring(this._offset, this._offset + 1) === "`") {
                    var klass6 = this.klass.SyntaxNode;
                    address6 = new klass6("`", this._offset, []);
                    this._offset += 1;
                } else {
                    address6 = null;
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
            var klass7 = null;
            if (Canopy.Compiler.CIString instanceof Function) {
                klass7 = Canopy.Compiler.CIString;
            } else {
                klass7 = this.klass.SyntaxNode;
            }
            address0 = new klass7(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.CIString instanceof Function)) {
                address0.extend(Canopy.Compiler.CIString);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.ci_string_expression[index0] = address0;
    },
    __consume__any_char_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.any_char_expression = this._nodeCache.any_char_expression || {};
        var cached = this._nodeCache.any_char_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        if (this._input.substring(this._offset, this._offset + 1) === ".") {
            var klass0 = null;
            if (Canopy.Compiler.AnyChar instanceof Function) {
                klass0 = Canopy.Compiler.AnyChar;
            } else {
                klass0 = this.klass.SyntaxNode;
            }
            address0 = new klass0(".", this._offset, []);
            if (!(Canopy.Compiler.AnyChar instanceof Function)) {
                address0.extend(Canopy.Compiler.AnyChar);
            }
            this._offset += 1;
        } else {
            address0 = null;
        }
        return this._nodeCache.any_char_expression[index0] = address0;
    },
    __consume__char_class_expression: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.char_class_expression = this._nodeCache.char_class_expression || {};
        var cached = this._nodeCache.char_class_expression[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "[") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("[", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var index2 = this._offset;
            if (this._input.substring(this._offset, this._offset + 1) === "^") {
                var klass1 = this.klass.SyntaxNode;
                address2 = new klass1("^", this._offset, []);
                this._offset += 1;
            } else {
                address2 = null;
            }
            if (address2) {
            } else {
                this._offset = index2;
                var klass2 = this.klass.SyntaxNode;
                address2 = new klass2("", this._offset, []);
                this._offset += 0;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                var address3 = null;
                var remaining0 = 1;
                var index3 = this._offset;
                var elements1 = [];
                var text1 = "";
                var address4 = true;
                while (address4) {
                    var index4 = this._offset;
                    var index5 = this._offset;
                    var elements2 = [];
                    var labelled1 = {};
                    var text2 = "";
                    var named1 = {};
                    var address5 = null;
                    if (this._input.substring(this._offset, this._offset + 1) === "\\") {
                        var klass3 = this.klass.SyntaxNode;
                        address5 = new klass3("\\", this._offset, []);
                        this._offset += 1;
                    } else {
                        address5 = null;
                    }
                    if (address5) {
                        elements2.push(address5);
                        text2 += address5.textValue;
                        var address6 = null;
                        var temp0 = this._input.substring(this._offset, this._offset + 1);
                        if (temp0 === "") {
                            address6 = null;
                        } else {
                            var klass4 = this.klass.SyntaxNode;
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
                        var klass5 = this.klass.SyntaxNode;
                        address4 = new klass5(text2, this._offset, elements2, labelled1, named1);
                        this._offset += text2.length;
                    } else {
                        address4 = null;
                    }
                    if (address4) {
                    } else {
                        this._offset = index4;
                        var temp1 = this._input.substring(this._offset, this._offset + 1);
                        var match0 = null;
                        if (match0 = temp1.match(/^[^\]]/)) {
                            var klass6 = this.klass.SyntaxNode;
                            address4 = new klass6(match0[0], this._offset, []);
                            this._offset += 1;
                        } else {
                            address4 = null;
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
                    var klass7 = this.klass.SyntaxNode;
                    address3 = new klass7(text1, this._offset, elements1);
                    this._offset += text1.length;
                } else {
                    address3 = null;
                }
                if (address3) {
                    elements0.push(address3);
                    text0 += address3.textValue;
                    var address7 = null;
                    if (this._input.substring(this._offset, this._offset + 1) === "]") {
                        var klass8 = this.klass.SyntaxNode;
                        address7 = new klass8("]", this._offset, []);
                        this._offset += 1;
                    } else {
                        address7 = null;
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
            var klass9 = null;
            if (Canopy.Compiler.CharClass instanceof Function) {
                klass9 = Canopy.Compiler.CharClass;
            } else {
                klass9 = this.klass.SyntaxNode;
            }
            address0 = new klass9(text0, this._offset, elements0, labelled0, named0);
            if (!(Canopy.Compiler.CharClass instanceof Function)) {
                address0.extend(Canopy.Compiler.CharClass);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.char_class_expression[index0] = address0;
    },
    __consume__label: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.label = this._nodeCache.label || {};
        var cached = this._nodeCache.label[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__identifier();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.identifier = address1;
            named0.identifier = named0.identifier || [];
            named0.identifier.push(address1);
            var address2 = null;
            if (this._input.substring(this._offset, this._offset + 1) === ":") {
                var klass0 = this.klass.SyntaxNode;
                address2 = new klass0(":", this._offset, []);
                this._offset += 1;
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
            var klass1 = this.klass.SyntaxNode;
            address0 = new klass1(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.label[index0] = address0;
    },
    __consume__object_identifier: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.object_identifier = this._nodeCache.object_identifier || {};
        var cached = this._nodeCache.object_identifier[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        address1 = this.__consume__identifier();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.identifier = address1;
            named0.identifier = named0.identifier || [];
            named0.identifier.push(address1);
            var address2 = null;
            var remaining0 = 0;
            var index2 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                var index3 = this._offset;
                var elements2 = [];
                var labelled1 = {};
                var text2 = "";
                var named1 = {};
                var address4 = null;
                if (this._input.substring(this._offset, this._offset + 1) === ".") {
                    var klass0 = this.klass.SyntaxNode;
                    address4 = new klass0(".", this._offset, []);
                    this._offset += 1;
                } else {
                    address4 = null;
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
                        named1.identifier = named1.identifier || [];
                        named1.identifier.push(address5);
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
                    var klass1 = this.klass.SyntaxNode;
                    address3 = new klass1(text2, this._offset, elements2, labelled1, named1);
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
                var klass2 = this.klass.SyntaxNode;
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
            var klass3 = this.klass.SyntaxNode;
            address0 = new klass3(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.object_identifier[index0] = address0;
    },
    __consume__identifier: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.identifier = this._nodeCache.identifier || {};
        var cached = this._nodeCache.identifier[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var named0 = {};
        var address1 = null;
        var temp0 = this._input.substring(this._offset, this._offset + 1);
        var match0 = null;
        if (match0 = temp0.match(/^[a-zA-Z_$]/)) {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0(match0[0], this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
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
                var temp1 = this._input.substring(this._offset, this._offset + 1);
                var match1 = null;
                if (match1 = temp1.match(/^[a-zA-Z0-9_$]/)) {
                    var klass1 = this.klass.SyntaxNode;
                    address3 = new klass1(match1[0], this._offset, []);
                    this._offset += 1;
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
                var klass2 = this.klass.SyntaxNode;
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
            var klass3 = this.klass.SyntaxNode;
            address0 = new klass3(text0, this._offset, elements0, labelled0, named0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.identifier[index0] = address0;
    },
    __consume__quantifier: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.quantifier = this._nodeCache.quantifier || {};
        var cached = this._nodeCache.quantifier[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        if (this._input.substring(this._offset, this._offset + 1) === "?") {
            var klass0 = this.klass.SyntaxNode;
            address0 = new klass0("?", this._offset, []);
            this._offset += 1;
        } else {
            address0 = null;
        }
        if (address0) {
        } else {
            this._offset = index1;
            if (this._input.substring(this._offset, this._offset + 1) === "*") {
                var klass1 = this.klass.SyntaxNode;
                address0 = new klass1("*", this._offset, []);
                this._offset += 1;
            } else {
                address0 = null;
            }
            if (address0) {
            } else {
                this._offset = index1;
                if (this._input.substring(this._offset, this._offset + 1) === "+") {
                    var klass2 = this.klass.SyntaxNode;
                    address0 = new klass2("+", this._offset, []);
                    this._offset += 1;
                } else {
                    address0 = null;
                }
                if (address0) {
                } else {
                    this._offset = index1;
                }
            }
        }
        return this._nodeCache.quantifier[index0] = address0;
    },
    __consume__space: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.space = this._nodeCache.space || {};
        var cached = this._nodeCache.space[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var temp0 = this._input.substring(this._offset, this._offset + 1);
        var match0 = null;
        if (match0 = temp0.match(/^[\s\n\r\t]/)) {
            var klass0 = this.klass.SyntaxNode;
            address0 = new klass0(match0[0], this._offset, []);
            this._offset += 1;
        } else {
            address0 = null;
        }
        return this._nodeCache.space[index0] = address0;
    }
});

Canopy.MetaGrammarParser = new JS.Class("Canopy.MetaGrammarParser", {
    include: Canopy.MetaGrammar,
    initialize: function(input) {
        this._input = input;
        this._offset = 0;
        this._nodeCache = {};
    },
    parse: function() {
        var result = this["__consume__" + this.root]();
        return this._offset === this._input.length ? result : null;
    },
    extend: {
        parse: function(input) {
            var parser = new this(input);
            return parser.parse();
        }
    }
});

Canopy.MetaGrammarParser.SyntaxNode = new JS.Class("Canopy.MetaGrammarParser.SyntaxNode", {
    include: JS.Enumerable,
    include: Canopy.Queries,
    initialize: function(textValue, offset, elements, properties, named) {
        this.textValue = textValue;
        this.offset    = offset;
        this.elements  = elements || [];
        this.__named__ = named || {};
        if (!properties) return;
        for (var key in properties) this[key] = properties[key];
    },
    forEach: function(block, context) {
        for (var i = 0, n = this.elements.length; i < n; i++)
            block.call(context, this.elements[i], i);
    }
});


Canopy.extend({
  Builder: new JS.Class({
    initialize: function(parent) {
      if (parent) {
        this._parent = parent;
        this._indentLevel = parent._indentLevel;
      } else {
        this._buffer = '';
        this._indentLevel = 0;
      }
      this._methodSeparator = '';
      this._varIndex = {};
    },
    
    serialize: function() {
      return this._buffer;
    },
    
    write: function(string) {
      if (this._parent) return this._parent.write(string);
      this._buffer += string;
    },
    
    indent_: function(block, context) {
      this._indentLevel += 1;
      block.call(context, this);
      this._indentLevel -= 1;
    },
    
    newline_: function() {
      this.write('\n');
      var i = this._indentLevel;
      while (i--) this.write('    ');
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
    
    slice_: function(length) {
      var input = this.input_(), of = this.offset_();
      return input + '.substring(' + of + ', ' + of + ' + ' + length + ')';
    },
    
    syntaxNode_: function(address, nodeType, expression, bump, elements, labelled, named) {
      elements = ', ' + (elements || '[]');
      labelled = labelled ? ', ' + labelled : '';
      named    = named ? ', ' + named : '';
      
      var klass, of = ', ' + this.offset_();
      
      if (nodeType) {
        klass = this.tempVar_('klass');
        this.if_(nodeType + ' instanceof Function', function(builder) {
          builder.line_(klass + ' = ' + nodeType);
        });
        this.else_(function(builder) {
          builder.line_(klass + ' = this.klass.SyntaxNode');
        });
      } else {
        klass = this.tempVar_('klass', 'this.klass.SyntaxNode');
      }
      
      this.line_(address + ' = new ' + klass + '(' + expression + of + elements + labelled + named + ')');
      this.extendNode_(address, nodeType);
      this.line_(this.offset_() + ' += ' + bump);
    },
    
    extendNode_: function(address, nodeType) {
      if (!nodeType) return;
      this.unless_(nodeType + ' instanceof Function', function(builder) {
        builder.line_(address + '.extend(' + nodeType + ')');
      });
    },
    
    failure_: function(address) {
      this.line_(address + ' = null');
    },
    
    nameSpace_: function(objectName) {
      var parts = objectName.split('.');
      this.line_('(function() {');
      this.indent_(function() {
        this.var_('namespace', 'this');
        for (var i = 0, n = parts.length; i < n - 1; i++)
          this.line_('namespace = namespace.' + parts[i] + ' = namespace.' + parts[i] + ' || {}');
        this.if_('typeof exports === "object"', function(builder) {
          builder.line_('exports.' + parts[0] + ' = this.' + parts[0]);
        });
      }, this);
      this.line_('})()');
    },
    
    module_: function(name, block, context) {
      this.newline_();
      this.write(name + ' = new JS.Module("' + name + '", {');
      new Canopy.Builder(this).indent_(block, context);
      this.newline_();
      this.write('});');
    },
    
    class_: function(name, block, context) {
      this.newline_();
      this.write(name + ' = new JS.Class("' + name + '", {');
      new Canopy.Builder(this).indent_(block, context);
      this.newline_();
      this.write('});');
    },
    
    include_: function(name) {
      this.delimitField_();
      this.newline_();
      this.write('include: ' + name);
    },
    
    classMethods_: function(block, context) {
      this.delimitField_();
      this.newline_();
      this.write('extend: {');
      new Canopy.Builder(this).indent_(block, context);
      this.newline_();
      this.write('}');
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
      this._varIndex = {};
      this.indent_(block, context);
      this.newline_();
      this.write('}');
    },
    
    ivar_: function(name, value) {
      this.line_('this._' + name + ' = ' + value);
    },
    
    var_: function() {
      for (var i = 0, n = arguments.length; i < n; i += 2)
        this.line_('var ' + arguments[i] + ' = ' + arguments[i+1]);
    },
    
    tempVar_: function(name, value) {
      this._varIndex[name] = this._varIndex[name] || 0;
      var varName = name + this._varIndex[name];
      this._varIndex[name] += 1;
      this.var_(varName, (value === undefined) ? 'null' : value);
      return varName;
    },
    
    conditional_: function(kwd, condition, block, context) {
      this.newline_();
      this.write(kwd + ' (' + condition + ') {');
      this.indent_(block, context);
      this.newline_();
      this.write('}');
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
    }
  })
});


Canopy.extend({
  Queries: new JS.Module({
    select: function(nodeType) {
      return (this.__named__[nodeType] || []).slice();
    }
  })
});


Canopy.extend({
  Compiler: new JS.Class({
    initialize: function(grammarText) {
      this._grammarText = grammarText;
    },
    
    parseTree: function() {
      return this._tree = this._tree ||
                          Canopy.MetaGrammarParser.parse(this._grammarText);
    },
    
    toSexp: function(tree) {
      return this.parseTree().toSexp();
    },
    
    toSource: function() {
      var builder = new Canopy.Builder();
      this.parseTree().compile(builder);
      return builder.serialize();
    }
  })
});


Canopy.Compiler.extend({
  Grammar: new JS.Module({
    grammarName: function() {
      return this.grammar_name.object_identifier.textValue
    },
    
    toSexp: function() {
      var sexp = ['grammar', this.grammarName()];
      this.rules.forEach(function(rule) {
        sexp.push(rule.grammar_rule.toSexp());
      });
      return sexp;
    },
    
    compile: function(builder) {
      builder.nameSpace_(this.grammarName());
      builder.newline_();
      
      builder.module_(this.grammarName(), function(builder) {
        builder.field_('root', '"' + this.rules.elements[0].grammar_rule.name() + '"');
        this.rules.forEach(function(rule) {
          rule.grammar_rule.compile(builder);
        });
      }, this);
      builder.newline_();
      
      builder.class_(this.grammarName() + 'Parser', function(builder) {
        builder.include_(this.grammarName());
        builder.method_('initialize', ['input'], function(builder) {
          builder.ivar_('input', 'input');
          builder.ivar_('offset', '0');
          builder.ivar_('nodeCache', '{}');
        });
        builder.method_('parse', [], function(builder) {
          builder.var_('result', 'this["__consume__" + this.root]()');
          builder.return_(builder.offset_() + ' === ' + builder.input_() + '.length ? result : null');
        });
        builder.classMethods_(function(builder) {
          builder.method_('parse', ['input'], function(builder) {
            builder.var_('parser', 'new this(input)');
            builder.return_('parser.parse()');
          });
        });
      }, this);
      builder.newline_();
      
      builder.class_(this.grammarName() + 'Parser.SyntaxNode', function(builder) {
        builder.include_('JS.Enumerable');
        builder.include_('Canopy.Queries');
        
        builder.method_('initialize', ['textValue', 'offset', 'elements', 'properties', 'named'], function(builder) {
          builder.line_('this.textValue = textValue');
          builder.line_('this.offset    = offset');
          builder.line_('this.elements  = elements || []');
          builder.line_('this.__named__ = named || {}');
          
          builder.line_('if (!properties) return');
          builder.line_('for (var key in properties) this[key] = properties[key]');
        });
        
        builder.method_('forEach', ['block', 'context'], function(builder) {
          builder.newline_();
          builder.write('for (var i = 0, n = this.elements.length; i < n; i++)');
          builder.indent_(function(builder) {
            builder.line_('block.call(context, this.elements[i], i)');
          });
        });
      });
      builder.newline_();
    }
  })
});


Canopy.Compiler.extend({
  GrammarRule: new JS.Module({
    name: function() {
      return this.identifier.textValue;
    },
    
    toSexp: function() {
      return ['rule', this.name(), this.parsing_expression.toSexp()];
    },
    
    compile: function(builder) {
      var name = this.name();
      
      builder.method_('__consume__' + name, ['input'], function() {
        var address   = builder.tempVar_('address'),
            offset    = builder.tempVar_('index', builder.offset_());
            cacheAddr = 'this._nodeCache.' + name + '[' + offset + ']';
        
        builder.line_('this._nodeCache.' + name + ' = this._nodeCache.' + name + ' || {}');
        builder.var_('cached', cacheAddr);
        
        builder.if_('cached', function(builder) {
          builder.line_(builder.offset_() + ' += cached.textValue.length');
          builder.return_('cached');
        }, this);
        
        this.parsing_expression.compile(builder, address);
        
        builder.return_(cacheAddr + ' = ' + address);
      }, this);
    }
  })
});


Canopy.Compiler.extend({
  Choice: new JS.Module({
    expressions: function() {
      if (this._expressions) return this._expressions;
      this._expressions = [this.first_part];
      this.rest.forEach(function(choice) {
        this._expressions.push(choice.expression);
      }, this);
      return this._expressions;
    },
    
    toSexp: function() {
      var sexp = ['choice'];
      Canopy.forEach(this.expressions(), function(expression) {
        sexp.push(expression.toSexp());
      });
      return sexp;
    },
    
    compile: function(builder, address, nodeType) {
      var startOffset = builder.tempVar_('index', builder.offset_());
      this._compileChoices(builder, 0, address, nodeType, startOffset);
    },
    
    _compileChoices: function(builder, index, address, nodeType, startOffset) {
      var expressions = this.expressions();
      if (index === expressions.length) return;
      
      expressions[index].compile(builder, address);
      
      builder.if_(address, function(builder) {
        builder.extendNode_(address, nodeType);
      });
      builder.else_(function(builder) {
        builder.line_(builder.offset_() + ' = ' + startOffset);
        this._compileChoices(builder, index + 1, address, nodeType, startOffset);
      }, this);
    }
  })
});


Canopy.Compiler.extend({
  ChoicePart: new JS.Module({
    nodeType: function() {
      var element = this.elements[1].type_expression;
      return element ? element.object_identifier.textValue : null;
    },
    
    toSexp: function() {
      var sexp = this.elements[0].toSexp(), type;
      if (type = this.nodeType()) sexp = ['type', type, sexp];
      return sexp;
    },
    
    compile: function(builder, address) {
      this.elements[0].compile(builder, address, this.nodeType());
    }
  })
});


Canopy.Compiler.extend({
  AnyChar: new JS.Module({
    toSexp: function() {
      return ['any-char'];
    },
    
    compile: function(builder, address, nodeType) {
      var temp = builder.tempVar_('temp', builder.slice_(1));
      
      builder.if_(temp + ' === ""', function(builder) {
        builder.failure_(address);
      });
      builder.else_(function(builder) {
        builder.syntaxNode_(address, nodeType, temp, 1);
      });
    }
  })
});


Canopy.Compiler.extend({
  CharClass: new JS.Module({
    toSexp: function() {
      return ['char-class', this.textValue];
    },
    
    compile: function(builder, address, nodeType) {
      var regex  = '/^' + this.textValue + '/',
          temp   = builder.tempVar_('temp', builder.slice_(1)),
          match  = builder.tempVar_('match');
      
      builder.if_(match + ' = ' + temp + '.match(' + regex + ')', function(builder) {
        builder.syntaxNode_(address, nodeType, match + '[0]', 1);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});


Canopy.Compiler.extend({
  String: new JS.Module({
    toSexp: function() {
      return ['string', eval(this.textValue)];
    },
    
    compile: function(builder, address, nodeType) {
      var string = this.textValue,
          length = eval(this.textValue).length;
      
      builder.if_(builder.slice_(length) + ' === ' + string, function(builder) {
        builder.syntaxNode_(address, nodeType, string, length);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});


Canopy.Compiler.extend({
  CIString: new JS.Module({
    toSexp: function() {
      return ['ci-string', this.stringValue()];
    },
    
    compile: function(builder, address, nodeType) {
      var string = this.stringValue(),
          length = string.length,
          temp   = builder.tempVar_('temp', builder.slice_(length)),
          tlc    = '.toLowerCase()';
      
      builder.if_(temp + tlc + ' === "' + string + '"' + tlc, function(builder) {
        builder.syntaxNode_(address, nodeType, temp, length);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    },
    
    stringValue: function() {
      var string = '"' + this.elements[1].textValue + '"';
      return eval(string);
    }
  })
});


Canopy.Compiler.extend({
  PredicatedAtom: new JS.Module({
    atomic: function() {
      var expression = this.atom;
      return expression.parsing_expression || expression;
    },
    
    toSexp: function() {
      var expression = this.atomic(),
          table      = {'&': 'and', '!': 'not'},
          predicate  = table[this.predicate.textValue];
      
      return [predicate, expression.toSexp()];
    },
    
    compile: function(builder, address, nodeType) {
      var startOffset = builder.tempVar_('index', builder.offset_()),
          table       = {'&': 'if_', '!': 'unless_'},
          branch      = table[this.predicate.textValue];
      
      this.atomic().compile(builder, address);
      builder.line_(builder.offset_() + ' = ' + startOffset);
      
      builder[branch](address, function(builder) {
        builder.syntaxNode_(address, nodeType, '""', 0);
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    }
  })
});


Canopy.Compiler.extend({
  Repeat: new JS.Module({
    QUANTITIES: {'*': 0, '+': 1},
    
    atomic: function() {
      var expression = this.atom;
      return expression.parsing_expression || expression;
    },
    
    toSexp: function() {
      var expression = this.atomic(),
          sexp = expression.toSexp();
      
      sexp = expression.toSexp();
      switch (this.quantifier.textValue) {
        case '*': sexp = ['repeat', 0, sexp]; break;
        case '+': sexp = ['repeat', 1, sexp]; break;
        case '?': sexp = ['maybe', sexp]; break;
      }
      return sexp;
    },
    
    compile: function(builder, address, nodeType) {
      var quantifier  = this.quantifier.textValue;
      
      if (quantifier === '?') return this._compileMaybe(builder, address, nodeType);
      
      var minimum     = this.QUANTITIES[quantifier],
          remaining   = builder.tempVar_('remaining', minimum),
          startOffset = builder.tempVar_('index', builder.offset_()),
          elements    = builder.tempVar_('elements', '[]'),
          textValue   = builder.tempVar_('text', '""'),
          elAddr      = builder.tempVar_('address', 'true');
      
      builder.while_(elAddr, function(builder) {
        this.atomic().compile(builder, elAddr);
        builder.if_(elAddr, function(builder) {
          builder.line_(elements + '.push(' + elAddr + ')');
          builder.line_(textValue + ' += ' + elAddr + '.textValue');
          builder.line_(remaining + ' -= 1');
        });
      }, this);
      
      builder.if_(remaining + ' <= 0', function(builder) {
        builder.line_(builder.offset_() + ' = ' + startOffset);
        builder.syntaxNode_(address, nodeType, textValue, textValue + '.length', elements);
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    },
    
    _compileMaybe: function(builder, address, nodeType) {
      var startOffset = builder.tempVar_('index', builder.offset_());
      
      this.atomic().compile(builder, address);
      
      builder.if_(address, function(builder) {
        builder.extendNode_(address, nodeType);
      });
      builder.else_(function(builder) {
        builder.line_(builder.offset_() + ' = ' + startOffset);
        builder.syntaxNode_(address, nodeType, '""', 0);
      });
    }
  })
});


Canopy.Compiler.extend({
  Sequence: new JS.Module({
    expressions: function() {
      if (this._expressions) return this._expressions;
      this._expressions = [this.first_part];
      this.rest.forEach(function(part) {
        this._expressions.push(part.expression);
      }, this);
      return this._expressions;
    },
    
    toSexp: function() {
      var sexp = ['sequence'];
      Canopy.forEach(this.expressions(), function(expression) {
        sexp.push(expression.toSexp());
      });
      return sexp;
    },
    
    compile: function(builder, address, nodeType) {
      this._startOffset = builder.tempVar_('index', builder.offset_());
      this._elements    = builder.tempVar_('elements', '[]');
      this._labelled    = builder.tempVar_('labelled', '{}');
      this._textValue   = builder.tempVar_('text', '""');
      this._namedNodes  = builder.tempVar_('named', '{}');
      
      this._compileExpressions(builder, 0);
      builder.if_(this._elements, function(builder) {
        builder.line_(builder.offset_() + ' = ' + this._startOffset);
        builder.syntaxNode_(address, nodeType, this._textValue,
                                               this._textValue + '.length',
                                               this._elements,
                                               this._labelled,
                                               this._namedNodes);
      }, this);
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    },
    
    _compileExpressions: function(builder, index) {
      var expressions = this.expressions();
      if (index === expressions.length) return;
      
      var expAddr = builder.tempVar_('address'),
          label   = expressions[index].label();
      
      expressions[index].compile(builder, expAddr);
      
      builder.if_(expAddr, function(builder) {
        builder.line_(this._elements + '.push(' + expAddr + ')');
        builder.line_(this._textValue + ' += ' + expAddr + '.textValue');
        if (label) {
          builder.line_(this._labelled + '.' + label + ' = ' + expAddr);
          builder.line_(this._namedNodes + '.' + label + ' = ' + this._namedNodes + '.' + label + ' || []');
          builder.line_(this._namedNodes + '.' + label + '.push(' + expAddr + ')');
        }
        
        this._compileExpressions(builder, index + 1);
        
      }, this);
      builder.else_(function(builder) {
        builder.line_(this._elements + ' = null');
        builder.line_(builder.offset_() + ' = ' + this._startOffset);
      }, this);
    }
  })
});


Canopy.Compiler.extend({
  SequencePart: new JS.Module({
    atomic: function() {
      var expression = this.expression;
      return expression.parsing_expression || expression;
    },
    
    label: function() {
      var element = this.elements[0].identifier,
          expression = this.atomic();
      
      if (element) return element.textValue;
      if (expression.referenceName) return expression.referenceName();
      
      return null;
    },
    
    toSexp: function() {
      var expression = this.atomic(),
          label = this.label(),
          sexp  = expression.toSexp();
      
      if (element = this.elements[0].identifier)
        sexp = ['label', label, sexp];
      
      return sexp;
    },
    
    compile: function(builder, address, nodeType) {
      return this.atomic().compile(builder, address, nodeType);
    }
  })
});


Canopy.Compiler.extend({
  Reference: new JS.Module({
    referenceName: function() {
      return this.identifier.textValue;
    },
    
    toSexp: function() {
      return ['reference', this.referenceName()];
    },
    
    compile: function(builder, address, nodeType) {
      builder.line_(address + ' = this.__consume__' + this.referenceName() + '()');
      builder.extendNode_(address, nodeType);
    }
  })
});