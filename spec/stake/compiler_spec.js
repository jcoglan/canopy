Stake.CompilerSpec = JS.Test.describe(Stake.Compiler, function() { with(this) {
  describe('with a string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Stake.Compiler('\
        grammar String                    \
          #string <- "foo"                \
      ');
    }})
    
    it('compiles a single-rule grammar', function() { with(this) {
      assertEqual(['grammar', 'String',
                    ['rule', 'string',
                      ['string', 'foo']]],
          
          compiler.toSexp() )
    }})
  }})
}})

