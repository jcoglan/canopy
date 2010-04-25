Stake.CompilerSpec = JS.Test.describe(Stake.Compiler, function() { with(this) {
  describe('with an any-char rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar AnyChar                   \
          #any <- .                       \
      ')
    }})
    
    it('compiles an any-char-rule parser', function() { with(this) {
      assertEqual(['grammar', 'AnyChar',
                    ['rule', 'any',
                      ['any-char']]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a char-class rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar CharClass                 \
          #string <- [^0-9]               \
      ')
    }})
    
    it('compiles a char-class-rule parser', function() { with(this) {
      assertEqual(['grammar', 'CharClass',
                    ['rule', 'string',
                      ['char-class', '[^0-9]']]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar String                    \
          #string <- "foo"                \
      ')
    }})
    
    it('compiles a string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'String',
                    ['rule', 'string',
                      ['string', 'foo']]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a maybe string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar MaybeString               \
          #string <- "foo"?               \
      ')
    }})
    
    it('compiles a maybe string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'MaybeString',
                    ['rule', 'string',
                      ['maybe', ['string', 'foo']]]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a not string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar NotString                 \
          #string <- !"foo"               \
      ')
    }})
    
    it('compiles a not string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'NotString',
                    ['rule', 'string',
                      ['not', ['string', 'foo']]]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a repeat-0 string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar StarString                \
          #string <- "foo"*               \
      ')
    }})
    
    it('compiles a repeat-0 string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'StarString',
                    ['rule', 'string',
                      ['repeat', 0, ['string', 'foo']]]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a repeat-1 string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar PlusString                \
          #string <- "foo"+               \
      ')
    }})
    
    it('compiles a repeat-1 string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'PlusString',
                    ['rule', 'string',
                      ['repeat', 1, ['string', 'foo']]]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a choice rule', function() { with(this) {
    describe('containing strings', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('\
          grammar Choice                    \
            #choice <- "foo" / "bar"        \
        ')
      }})
      
      it('compiles a choice-rule parser', function() { with(this) {
        assertEqual(['grammar', 'Choice',
                      ['rule', 'choice',
                        ['choice',
                          ['string', 'foo'],
                          ['string', 'bar']]]],
            
            compiler.toSexp() )
      }})
    }})
    
    describe('containing sequences', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('  \
          grammar Choice                      \
            #choice <- "foo" "middle" / "bar" \
        ')
      }})
      
      it('compiles a choice-rule parser containing sequences', function() { with(this) {
        assertEqual(['grammar', 'Choice',
                      ['rule', 'choice',
                        ['choice',
                          ['sequence',
                            ['string', 'foo'],
                            ['string', 'middle']],
                          ['string', 'bar']]]],
            
            compiler.toSexp() )
      }})
    }})
  }})
  
  describe('with a sequence rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar Sequence                  \
          #sequence <- "foo" "bar"        \
      ')
    }})
    
    it('compiles a sequence-rule parser', function() { with(this) {
      assertEqual(['grammar', 'Sequence',
                    ['rule', 'sequence',
                      ['sequence',
                        ['string', 'foo'],
                        ['string', 'bar']]]],
          
          compiler.toSexp() )
    }})
    
    describe('containing a label', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('\
          grammar LabelledSequence          \
            #labelled <- "foo" end:"bar"    \
        ')
      }})
      
      it('includes the label in the parse tree', function() { with(this) {
        assertEqual(['grammar', 'LabelledSequence',
                      ['rule', 'labelled',
                        ['sequence',
                          ['string', 'foo'],
                          ['label', 'end',
                            ['string', 'bar']]]]],
            
            compiler.toSexp() )
      }})
    }})
  }})
  
  describe('with a referencing rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar References                \
          #first <- second                \
          #second <- "done"               \
      ')
    }})
    
    it('compiles a referencing-rule parser', function() { with(this) {
      assertEqual(['grammar', 'References',
                    ['rule', 'first',
                      ['reference', 'second']],
                    ['rule', 'second',
                      ['string', 'done']]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('type annotation', function() { with(this) {
    describe('on atomic nodes', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('\
          grammar TypedString               \
            #string <- "foo" <Mixin>        \
        ')
      }})
      
      it('wraps the node with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedString',
                      ['rule', 'string',
                        ['type', 'Mixin',
                          ['string', 'foo']]]],
            
            compiler.toSexp() )
      }})
    }})
    
    describe('on parenthesised choices', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('    \
          grammar TypedChoice                   \
            #choice <- ("foo" / "bar") <Mixin>  \
        ')
      }})
      
      it('wraps the choice node with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedChoice',
                      ['rule', 'choice',
                        ['type', 'Mixin',
                          ['choice',
                            ['string', 'foo'],
                            ['string', 'bar']]]]],
            
            compiler.toSexp() )
      }})
    }})
    
    describe('with namespaced types', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('\
          grammar TypedString               \
            #string <- "foo" <NS.Mixin>     \
        ')
      }})
      
      it('wraps the node with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedString',
                      ['rule', 'string',
                        ['type', 'NS.Mixin',
                          ['string', 'foo']]]],
            
            compiler.toSexp() )
      }})
    }})
    
    describe('on sequences', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Stake.Compiler('\
          grammar TypedSequence             \
            #string <- "foo" "bar" <Mixin>  \
        ')
      }})
      
      it('wraps the sequence with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedSequence',
                      ['rule', 'string',
                        ['type', 'Mixin',
                          ['sequence',
                            ['string', 'foo'],
                            ['string', 'bar']]]]],
            
            compiler.toSexp() )
      }})
    }})
    
    describe('on choices', function() { with(this) {
      describe('containing atoms', function() { with(this) {
        before(function() { with(this) {
          this.compiler = new Stake.Compiler('  \
            grammar TypedAtomChoice             \
              #string <- "foo" / "bar" <Mixin>  \
          ')
        }})
        
        it('wraps one choice with a type', function() { with(this) {
          assertEqual(['grammar', 'TypedAtomChoice',
                        ['rule', 'string',
                          ['choice',
                            ['string', 'foo'],
                            ['type', 'Mixin',
                              ['string', 'bar']]]]],
              
              compiler.toSexp() )
        }})
      }})
      
      describe('containing sequences', function() { with(this) {
        before(function() { with(this) {
          this.compiler = new Stake.Compiler('                          \
            grammar TypedSeqChoice                                      \
              #string <- "foo" "bar" <Branch> / "first" "second" <Fork> \
          ')
        }})
        
        it('wraps each choice with a type', function() { with(this) {
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
        }})
      }})
    }})
  }})
  
  describe('parentheses', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar Parens                    \
          #seq <- "foo" ("t" / .) "bar"   \
      ')
    }})
    
    it('creates nodes matching the parens content', function() { with(this) {
      assertEqual(['grammar', 'Parens',
                    ['rule', 'seq',
                      ['sequence',
                        ['string', 'foo'],
                        ['choice',
                          ['string', 't'],
                          ['any-char']],
                        ['string', 'bar']]]],
          
          compiler.toSexp() )
    }})
  }})
}})

