Stake.ChoiceParserSpec = JS.Test.describe(Stake.ChoiceParser, function() { with(this) {
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['choice',
                    ['string', 'foo'],
                    ['string', 'bar'],
                    ['string', 'baz']])
  }})
  
  it('parses the first choice', function() { with(this) {
    assertEqual( {textValue: 'foo', offset: 0, elements: []}, parser.parse('foo') )
  }})
  
  it('parses the second choice', function() { with(this) {
    assertEqual( {textValue: 'bar', offset: 0, elements: []}, parser.parse('bar') )
  }})
  
  it('parses the third choice', function() { with(this) {
    assertEqual( {textValue: 'baz', offset: 0, elements: []}, parser.parse('baz') )
  }})
  
  it('does not parse two choices together', function() { with(this) {
    assertNull( parser.parse('foobar') )
  }})
  
  it('does not parse a superstring of any choice', function() { with(this) {
    assertNull( parser.parse('foob') )
    assertNull( parser.parse('barb') )
    assertNull( parser.parse('bazb') )
  }})
  
  describe('when the choices are ambiguous', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['choice',
                      ['string', 'foxes love'],
                      ['sequence',
                        ['string', 'chunky'],
                        ['string', 'bacon']],
                      ['sequence',
                        ['string', 'chunkyb'],
                        ['string', 'acon']]])
    }})
    
    it('chooses the first matching path', function() { with(this) {
      assertEqual( {
          textValue: 'chunkybacon',
          offset: 0,
          elements: [
            {textValue: 'chunky', offset: 0, elements: []},
            {textValue: 'bacon', offset: 6, elements: []}
          ]
        },
        parser.parse('chunkybacon') )
    }})
  }})
}})

