Canopy.MetaGrammarParserSpec = JS.Test.describe(Canopy.MetaGrammarParser,
function() {
  describe('with an any-char rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar AnyChar                   \
          any <- .                        \
      ')
    })
    
    it('compiles an any-char-rule parser', function() {
      assertEqual(['grammar', 'AnyChar',
                    ['rule', 'any',
                      ['any-char']]],
          
          compiler.toSexp() )
    })
  })
  
  describe('with a char-class rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar CharClass                 \
          string <- [^0-9]                \
      ')
    })
    
    it('compiles a char-class-rule parser', function() {
      assertEqual(['grammar', 'CharClass',
                    ['rule', 'string',
                      ['char-class', '[^0-9]']]],
          
          compiler.toSexp() )
    })
    
    describe('containing escaped characters', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar CharClass                 \
            string <- [\\^\\]\\$\\n]        \
        ')
      })
      
      it('compiles a char-class-rule parser containing the characters', function() {
        assertEqual(['grammar', 'CharClass',
                      ['rule', 'string',
                        ['char-class', /[\^\]\$\n]/.source]]],
            
            compiler.toSexp() )
      })
    })
  })
  
  describe('with a string rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar String                    \
          string <- "foo"                 \
      ')
    })
    
    it('compiles a string-rule parser', function() {
      assertEqual(['grammar', 'String',
                    ['rule', 'string',
                      ['string', 'foo']]],
          
          compiler.toSexp() )
    })
    
    describe('containing escaped characters', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar String                    \
            string <- "\\"\\\\\\n"          \
        ')
      })
      
      it('compiles a string-rule parser containing the escaped characters', function() {
        assertEqual(['grammar', 'String',
                      ['rule', 'string',
                        ['string', '"\\\n']]],
            
            compiler.toSexp() )
      })
    })
  })
  
  describe('with a maybe string rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar MaybeString               \
          string <- "foo"?                \
      ')
    })
    
    it('compiles a maybe string-rule parser', function() {
      assertEqual(['grammar', 'MaybeString',
                    ['rule', 'string',
                      ['maybe', ['string', 'foo']]]],
          
          compiler.toSexp() )
    })
  })
  
  describe('with an and string rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar AndString                 \
          string <- &"foo"                \
      ')
    })
    
    it('compiles an and string-rule parser', function() {
      assertEqual(['grammar', 'AndString',
                    ['rule', 'string',
                      ['and', ['string', 'foo']]]],
          
          compiler.toSexp() )
    })
  })
  
  describe('with a not string rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar NotString                 \
          string <- !"foo"                \
      ')
    })
    
    it('compiles a not string-rule parser', function() {
      assertEqual(['grammar', 'NotString',
                    ['rule', 'string',
                      ['not', ['string', 'foo']]]],
          
          compiler.toSexp() )
    })
  })
  
  describe('with a repeat-0 string rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar StarString                \
          string <- "foo"*                \
      ')
    })
    
    it('compiles a repeat-0 string-rule parser', function() {
      assertEqual(['grammar', 'StarString',
                    ['rule', 'string',
                      ['repeat', 0, ['string', 'foo']]]],
          
          compiler.toSexp() )
    })
  })
  
  describe('with a repeat-1 string rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar PlusString                \
          string <- "foo"+                \
      ')
    })
    
    it('compiles a repeat-1 string-rule parser', function() {
      assertEqual(['grammar', 'PlusString',
                    ['rule', 'string',
                      ['repeat', 1, ['string', 'foo']]]],
          
          compiler.toSexp() )
    })
  })
  
  describe('with a choice rule', function() {
    describe('containing strings', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar Choice                    \
            choice <- "foo" / "bar"         \
        ')
      })
      
      it('compiles a choice-rule parser', function() {
        assertEqual(['grammar', 'Choice',
                      ['rule', 'choice',
                        ['choice',
                          ['string', 'foo'],
                          ['string', 'bar']]]],
            
            compiler.toSexp() )
      })
    })
    
    describe('containing sequences', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('  \
          grammar Choice                      \
            choice <- "foo" "middle" / "bar"  \
        ')
      })
      
      it('compiles a choice-rule parser containing sequences', function() {
        assertEqual(['grammar', 'Choice',
                      ['rule', 'choice',
                        ['choice',
                          ['sequence',
                            ['string', 'foo'],
                            ['string', 'middle']],
                          ['string', 'bar']]]],
            
            compiler.toSexp() )
      })
    })
  })
  
  describe('with a sequence rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar Sequence                  \
          sequence <- "foo" "bar"         \
      ')
    })
    
    it('compiles a sequence-rule parser', function() {
      assertEqual(['grammar', 'Sequence',
                    ['rule', 'sequence',
                      ['sequence',
                        ['string', 'foo'],
                        ['string', 'bar']]]],
          
          compiler.toSexp() )
    })
    
    describe('containing a label', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar LabelledSequence          \
            labelled <- "foo" end:"bar"     \
        ')
      })
      
      it('includes the label in the parse tree', function() {
        assertEqual(['grammar', 'LabelledSequence',
                      ['rule', 'labelled',
                        ['sequence',
                          ['string', 'foo'],
                          ['label', 'end',
                            ['string', 'bar']]]]],
            
            compiler.toSexp() )
      })
    })
  })
  
  describe('with a referencing rule', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar References                \
          first <- second                 \
          second <- "done"                \
      ')
    })
    
    it('compiles a referencing-rule parser', function() {
      assertEqual(['grammar', 'References',
                    ['rule', 'first',
                      ['reference', 'second']],
                    ['rule', 'second',
                      ['string', 'done']]],
          
          compiler.toSexp() )
    })
  })
  
  describe('type annotation', function() {
    describe('on atomic nodes', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar TypedString               \
            string <- "foo" <Mixin>         \
        ')
      })
      
      it('wraps the node with a type', function() {
        assertEqual(['grammar', 'TypedString',
                      ['rule', 'string',
                        ['type', 'Mixin',
                          ['string', 'foo']]]],
            
            compiler.toSexp() )
      })
    })
    
    describe('on parenthesised choices', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('    \
          grammar TypedChoice                   \
            choice <- ("foo" / "bar") <Mixin>   \
        ')
      })
      
      it('wraps the choice node with a type', function() {
        assertEqual(['grammar', 'TypedChoice',
                      ['rule', 'choice',
                        ['type', 'Mixin',
                          ['choice',
                            ['string', 'foo'],
                            ['string', 'bar']]]]],
            
            compiler.toSexp() )
      })
    })
    
    describe('with namespaced types', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar TypedString               \
            string <- "foo" <NS.Mixin>      \
        ')
      })
      
      it('wraps the node with a type', function() {
        assertEqual(['grammar', 'TypedString',
                      ['rule', 'string',
                        ['type', 'NS.Mixin',
                          ['string', 'foo']]]],
            
            compiler.toSexp() )
      })
    })
    
    describe('on sequences', function() {
      before(function() {
        this.compiler = new Canopy.Compiler('\
          grammar TypedSequence             \
            string <- "foo" "bar" <Mixin>   \
        ')
      })
      
      it('wraps the sequence with a type', function() {
        assertEqual(['grammar', 'TypedSequence',
                      ['rule', 'string',
                        ['type', 'Mixin',
                          ['sequence',
                            ['string', 'foo'],
                            ['string', 'bar']]]]],
            
            compiler.toSexp() )
      })
    })
    
    describe('on choices', function() {
      describe('containing atoms', function() {
        before(function() {
          this.compiler = new Canopy.Compiler('  \
            grammar TypedAtomChoice             \
              string <- "foo" / "bar" <Mixin>   \
          ')
        })
        
        it('wraps one choice with a type', function() {
          assertEqual(['grammar', 'TypedAtomChoice',
                        ['rule', 'string',
                          ['choice',
                            ['string', 'foo'],
                            ['type', 'Mixin',
                              ['string', 'bar']]]]],
              
              compiler.toSexp() )
        })
      })
      
      describe('containing sequences', function() {
        before(function() {
          this.compiler = new Canopy.Compiler('                          \
            grammar TypedSeqChoice                                      \
              string <- "foo" "bar" <Branch> / "first" "second" <Fork>  \
          ')
        })
        
        it('wraps each choice with a type', function() {
          assertEqual(['grammar', 'TypedSeqChoice',
                        ['rule', 'string',
                          ['choice',
                            ['type', 'Branch',
                              ['sequence',
                                ['string', 'foo'],
                                ['string', 'bar']]],
                            ['type', 'Fork',
                              ['sequence',
                                ['string', 'first'],
                                ['string', 'second']]]]]],
              
              compiler.toSexp() )
        })
      })
    })
  })
  
  describe('parentheses', function() {
    before(function() {
      this.compiler = new Canopy.Compiler('\
        grammar Parens                    \
          seq <- "foo" ("t" / .) "bar"    \
      ')
    })
    
    it('creates nodes matching the parens content', function() {
      assertEqual(['grammar', 'Parens',
                    ['rule', 'seq',
                      ['sequence',
                        ['string', 'foo'],
                        ['choice',
                          ['string', 't'],
                          ['any-char']],
                        ['string', 'bar']]]],
          
          compiler.toSexp() )
    })
  })
  
  describe('metagrammar', function() {
    it('has a choice rule', function() {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'choice_expression',
                      ['type', 'Canopy.Compiler.ChoiceExpression',
                        ['sequence',
                          ['label', 'first_expression',
                            ['reference', 'choice_part']],
                          ['label', 'rest_expressions',
                            ['repeat', 1,
                              ['sequence',
                                ['repeat', 1, ['reference', 'space']],
                                ['string', '/'],
                                ['repeat', 1, ['reference', 'space']],
                                ['label', 'expression',
                                  ['reference', 'choice_part']]]]]]]]],
          
          new Canopy.Compiler('\
            grammar MetaGrammar\
              choice_expression <- first_expression:choice_part\
                                   rest_expressions:(space+ "/" space+ expression:choice_part)+\
                                   <Canopy.Compiler.ChoiceExpression>\
          ').toSexp() )
    })
    
    it('has a choice part rule', function() {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'choice_part',
                      ['type', 'Canopy.Compiler.ChoicePart',
                        ['sequence',
                          ['choice',
                            ['reference', 'sequence_expression'],
                            ['reference', 'atom']],
                          ['maybe',
                            ['sequence',
                              ['repeat', 1, ['reference', 'space']],
                              ['reference', 'type_expression']]]]]]],
          
          new Canopy.Compiler('\
            grammar MetaGrammar\
              choice_part <- (sequence_expression / atom) (space+ type_expression)? <Canopy.Compiler.ChoicePart>\
          ').toSexp() )
    })
    
    it('has a string rule', function() {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'string_expression',
                      ['type', 'Canopy.Compiler.StringExpression',
                        ['sequence',
                          ['string', '"'],
                          ['repeat', 0,
                            ['choice',
                              ['sequence',
                                ['string', '\\'],
                                ['any-char']],
                              ['char-class', '[^"]']]],
                          ['string', '"']]]]],
          
          new Canopy.Compiler('\
            grammar MetaGrammar\
              string_expression <- "\\"" ("\\\\" . / [^"])* "\\""\
                                   <Canopy.Compiler.StringExpression>\
          ').toSexp() )
    })
    
    it('has a char-class rule', function() {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'char_class_expression',
                      ['type', 'Canopy.Compiler.CharClassExpression',
                        ['sequence',
                          ['string', '['],
                          ['maybe', ['string', '^']],
                          ['repeat', 1,
                            ['choice',
                              ['sequence',
                                ['string', '\\'],
                                ['any-char']],
                              ['char-class', '[^\\]]']]],
                          ['string', ']']]]]],
          
          new Canopy.Compiler('\
            grammar MetaGrammar\
              char_class_expression <- "[" "^"? ("\\\\" . / [^\\]])+ "]"\
                                       <Canopy.Compiler.CharClassExpression>\
          ').toSexp() )
    })
  })
})

