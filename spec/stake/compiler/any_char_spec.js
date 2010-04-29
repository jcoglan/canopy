Stake.Compiler.AnyCharSpec = JS.Test.describe(Stake.Compiler.AnyChar, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    Stake.compile('grammar AnyCharTest\
      anyChar <- .')
  }})
  
  it('parses a single character', function() { with(this) {
    assertParse( ['x', 0, []], AnyCharTestParser.parse('x') )
  }})
  
  it('does not parse the empty string', function() { with(this) {
    assertNull( AnyCharTestParser.parse('') )
  }})
}})

