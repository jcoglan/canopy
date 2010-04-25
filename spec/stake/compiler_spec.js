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
}})

