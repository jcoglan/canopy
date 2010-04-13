Stake.RepeatParserSpec = JS.Test.describe(Stake.RepeatParser, function() { with(this) {
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['repeat', ['string', 'foo']])
  }})
  
  it('matches zero occurences of the pattern', function() { with(this) {
    assertEqual( {textValue: '', offset: 0, elements: []}, parser.parse('') )
  }})
  
  it('matches one occurence of the pattern', function() { with(this) {
    assertEqual( {
        textValue: 'foo',
        offset: 0,
        elements: [
          {textValue: 'foo', offset: 0, elements: []}
        ]
      },
      parser.parse('foo') )
  }})
  
  it('matches more than one occurence of the pattern', function() { with(this) {
    assertEqual( {
        textValue: 'foofoofoo',
        offset: 0,
        elements: [
          {textValue: 'foo', offset: 0, elements: []},
          {textValue: 'foo', offset: 3, elements: []},
          {textValue: 'foo', offset: 6, elements: []}
        ]
      },
      parser.parse('foofoofoo') )
  }})
  
  it('does not match superstrings of the repeated pattern', function() { with(this) {
    assertNull( parser.parse('foofood') )
  }})
  
  describe('followed by more of the repeated pattern', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['repeat', ['string', 'foo']],
                      ['string', 'foo']])
    }})
    
    it('does not parse any number of occurences', function() { with(this) {
      assertNull( parser.parse('') )
      assertNull( parser.parse('foo') )
      assertNull( parser.parse('foofoo') )
    }})
  }})
}})

