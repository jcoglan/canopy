Stake.Parser.GrammarSpec = JS.Test.describe(Stake.Parser.Grammar, function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('with one rule', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['grammar', 'OneRule',
                      ['rule', 'root',
                        ['string', 'foo']]])
    }})
    
    it('parses strings matching the rule', function() { with(this) {
      assertParse( ['foo', 0, []], parser.parse('foo') )
    }})
    
    it('does not parse strings that do not match the rule', function() { with(this) {
      assertNull( parser.parse('bar') )
    }})
  }})
  
  describe('with two rules and a reference', function() { with(this) {
    describe('where the root only contains a reference', function() { with(this) {
      before(function() { with(this) {
        this.parser = Stake.Parser.fromSexp(
                      ['grammar', 'OneRef',
                        ['rule', 'first',
                          ['reference', 'second']],
                        ['rule', 'second',
                          ['string', 'bar']]])
      }})
      
      it('parses strings matching the referenced rule', function() { with(this) {
        assertParse( ['bar', 0, []], parser.parse('bar') )
      }})
      
      it('does not parse strings that do not match the referenced rule', function() { with(this) {
        assertNull( parser.parse('foo') )
      }})
    }})
    
    describe('where the root contains the reference as part of a sequence', function() { with(this) {
      before(function() { with(this) {
        this.parser = Stake.Parser.fromSexp(
                      ['grammar', 'OneRefWithSequence',
                        ['rule', 'first',
                          ['sequence',
                            ['reference', 'second'],
                            ['string', 'end']]],
                        ['rule', 'second',
                          ['string', 'begin']]])
      }})
      
      it('presents the reference as a labelled element', function() { with(this) {
        assertParse(['beginend', 0, [
                      ['begin', 0, []],
                      ['end', 5, []]], {
                      second: ['begin', 0, []]
                    }],
          
          parser.parse('beginend') )
      }})
    }})
    
    describe('where the root contains the reference as part of a sub-sequence', function() { with(this) {
      before(function() { with(this) {
        this.parser = Stake.Parser.fromSexp(
                      ['grammar', 'OneRefWithSubSequence',
                        ['rule', 'first',
                          ['sequence',
                            ['sequence',
                              ['reference', 'second'],
                              ['string', 'sub']],
                            ['string', 'end']]],
                        ['rule', 'second',
                          ['string', 'begin']]])
      }})
      
      it('presents the reference as a labelled element in the subsequence', function() { with(this) {
        assertParse(['beginsubend', 0, [
                      ['beginsub', 0, [
                        ['begin', 0, []],
                        ['sub', 5, []]], {
                        second: ['begin', 0, []]
                      }],
                      ['end', 8, []]]],
          
          parser.parse('beginsubend') )
      }})
    }})
    
    describe('when the root contains the reference as part of a choice', function() { with(this) {
      before(function() { with(this) {
        this.parser = Stake.Parser.fromSexp(
                      ['grammar', 'OneRefWithChoice',
                        ['rule', 'first',
                          ['choice',
                            ['reference', 'second'],
                            ['string', 'end']]],
                        ['rule', 'second',
                          ['string', 'begin']]])
      }})
      
      it('parses the first branch of the choice', function() { with(this) {
        assertParse( ['begin', 0, []], parser.parse('begin') )
      }})
      
      it('parses the second branch of the choice', function() { with(this) {
        assertParse( ['end', 0, []], parser.parse('end') )
      }})
    }})
  }})
}})

