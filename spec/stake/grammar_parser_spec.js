Stake.GrammarParserSpec = JS.Test.describe(Stake.GrammarParser, function() { with(this) {
  describe('with one rule', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['grammar', 'OneRule',
                      ['rule', 'root',
                        ['string', 'foo']]])
    }})
    
    it('parses strings matching the rule', function() { with(this) {
      assertEqual( {textValue: 'foo', offset: 0, elements: []}, parser.parse('foo') )
    }})
    
    it('does not parse strings that do not match the rule', function() { with(this) {
      assertNull( parser.parse('bar') )
    }})
  }})
  
  describe('with two rules and a reference', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['grammar', 'OneRef',
                      ['rule', 'first',
                        ['reference', 'second']],
                      ['rule', 'second',
                        ['string', 'bar']]])
    }})
    
    it('parses strings matching the referenced rule', function() { with(this) {
      assertEqual( {textValue: 'bar', offset: 0, elements: []}, parser.parse('bar') )
    }})
    
    it('does not parse strings that do not match the referenced rule', function() { with(this) {
      assertNull( parser.parse('foo') )
    }})
  }})
}})

