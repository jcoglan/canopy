Stake.NotParserSpec = JS.Test.describe(Stake.NotParser, function() { with(this) {
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['sequence',
                    ['not', ['string', 'foo']],
                    ['string', 'bar']])
  }})
  
  it('parses text that does not begin with the negated pattern', function() { with(this) {
    assertEqual( {
        textValue: 'bar',
        offset: 0,
        elements: [
          {textValue: '', offset: 0, elements: []},
          {textValue: 'bar', offset: 0, elements: []}
        ]
      },
      parser.parse('bar') )
  }})
  
  it('does not parse text beginning with the negated pattern', function() { with(this) {
    assertNull( parser.parse('foobar') )
  }})
}})

