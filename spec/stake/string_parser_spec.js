Stake.StringParserSpec = JS.Test.describe(Stake.StringParser, function() { with(this) {
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(['string', 'foo'])
  }})
  
  it('parses the string it contains', function() { with(this) {
    assertEqual( {textValue: 'foo', offset: 0, elements: []}, parser.parse('foo') )
  }})
  
  it('does not parse other strings', function() { with(this) {
    assertNull( parser.parse('bar') )
  }})
  
  it('does not parse superstrings of itself', function() { with(this) {
    assertNull( parser.parse('food') )
  }})
  
  it('does not parse the empty string', function() { with(this) {
    assertNull( parser.parse('') )
  }})
}})

