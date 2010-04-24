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

