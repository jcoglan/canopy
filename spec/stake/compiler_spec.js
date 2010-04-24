Stake.CompilerSpec = JS.Test.describe(Stake.Compiler, function() { with(this) {
  describe('with a string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar String                    \
          #string <- "foo"                \
      ')
    }})
    
    it('compiles a string-rule grammar', function() { with(this) {
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
    
    it('compiles a maybe string-rule grammar', function() { with(this) {
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
    
    it('compiles a not string-rule grammar', function() { with(this) {
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
    
    it('compiles a repeat-0 string-rule grammar', function() { with(this) {
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
    
    it('compiles a repeat-1 string-rule grammar', function() { with(this) {
      assertEqual(['grammar', 'PlusString',
                    ['rule', 'string',
                      ['repeat', 1, ['string', 'foo']]]],
          
          compiler.toSexp() )
    }})
  }})
  
  describe('with a sequence rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar Sequence                  \
          #sequence <- "foo" "bar"        \
      ')
    }})
    
    it('compiles a sequence-rule grammar', function() { with(this) {
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
}})

