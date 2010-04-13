Stake.MaybeParserSpec = JS.Test.describe(Stake.MaybeParser, function() { with(this) {
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['maybe', ['string', 'jc']])
  }})
  
  it('parses if its pattern is present', function() { with(this) {
    assertEqual( {textValue: 'jc', offset: 0, elements: []}, parser.parse('jc') )
  }})
  
  it('parses if no input is given', function() { with(this) {
    assertEqual( {textValue: '', offset: 0, elements: []}, parser.parse('') )
  }})
  
  it('does not parse if different input is given', function() { with(this) {
    assertNull( parser.parse('gc') )
  }})
}})

