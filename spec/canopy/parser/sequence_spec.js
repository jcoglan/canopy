Canopy.Parser.SequenceSpec = JS.Test.describe(Canopy.Parser.Sequence, function() { with(this) {
  include(Canopy.SpecHelper)
  
  before(function() { with(this) {
    this.parser = Canopy.Parser.fromSexp(
                  ['sequence',
                    ['string', 'foo'],
                    ['string', 'bar']])
  }})
  
  it('parses sequences matching its content', function() { with(this) {
    assertParse(['foobar', 0, [
                  ['foo', 0, []],
                  ['bar', 3, []]]],
      
      parser.parse('foobar') )
  }})
  
  it('does not parse nonmatching sequences', function() { with(this) {
    assertNull( parser.parse('foobaz') )
    assertNull( parser.parse('doobar') )
  }})
  
  it('does not parse if the first term is missing', function() { with(this) {
    assertNull( parser.parse('bar') )
  }})
  
  it('does not parse superstrings of itself', function() { with(this) {
    assertNull( parser.parse('foobart') )
  }})
}})

