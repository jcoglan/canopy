Stake.MaybeParserSpec = JS.Test.describe(Stake.MaybeParser, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['maybe', ['string', 'jc']])
  }})
  
  it('parses if its pattern is present', function() { with(this) {
    assertParse( ['jc', 0, []], parser.parse('jc') )
  }})
  
  it('parses if no input is given', function() { with(this) {
    assertParse( ['', 0, []], parser.parse('') )
  }})
  
  it('does not parse if different input is given', function() { with(this) {
    assertNull( parser.parse('gc') )
  }})
}})

