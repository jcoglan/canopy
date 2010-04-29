Stake.Compiler.StringSpec = JS.Test.describe(Stake.Compiler.String, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    Stake.compile('grammar StringTest\
      string <- "foo"')
  }})
  
  it('parses the string it contains', function() { with(this) {
    assertParse( ['foo', 0, []], StringTestParser.parse('foo') )
  }})
  
  it('does not parse other strings', function() { with(this) {
    assertNull( StringTestParser.parse('bar') )
  }})
  
  it('does not parse superstrings of itself', function() { with(this) {
    assertNull( StringTestParser.parse('food') )
  }})
  
  it('does not parse the empty string', function() { with(this) {
    assertNull( StringTestParser.parse('') )
  }})
}})

