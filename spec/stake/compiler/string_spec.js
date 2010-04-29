Stake.Compiler.StringSpec = JS.Test.describe(Stake.Compiler.String,
function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    Stake.compile('grammar Test\
      root <- "foo"')
  }})
  
  it('parses the specified string', function() { with(this) {
    assertParse( ['foo', 0, []], TestParser.parse('foo') )
  }})
  
  it('does not parse different strings', function() { with(this) {
    assertNull( TestParser.parse('bar') )
  }})
  
  it('does not parse strings beginning with the specified string', function() { with(this) {
    assertNull( TestParser.parse('food') )
  }})
}})

