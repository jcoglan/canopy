Canopy.Compiler.AnyCharSpec = JS.Test.describe(Canopy.Compiler.AnyChar, function() {
  include(Canopy.SpecHelper)
  
  before(function() {
    Canopy.compile('grammar AnyCharTest\
      anyChar <- .')
  })
  
  it('parses a single character', function() {
    assertParse( ['x', 0, []], AnyCharTestParser.parse('x') )
  })
  
  it('does not parse the empty string', function() {
    assertNull( AnyCharTestParser.parse('') )
  })
})

