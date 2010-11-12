Canopy.Compiler.StringSpec = JS.Test.describe(Canopy.Compiler.String, function() {
  include(Canopy.SpecHelper)
  
  before(function() {
    Canopy.compile('grammar StringTest\
      string <- "foo"')
  })
  
  it('parses the string it contains', function() {
    assertParse( ['foo', 0, []], StringTestParser.parse('foo') )
  })
  
  it('does not parse other strings', function() {
    assertNull( StringTestParser.parse('FOO') )
    assertNull( StringTestParser.parse('bar') )
  })
  
  it('does not parse superstrings of itself', function() {
    assertNull( StringTestParser.parse('food') )
  })
  
  it('does not parse the empty string', function() {
    assertNull( StringTestParser.parse('') )
  })
  
  describe('case-insensitive strings', function() {
    before(function() {
      Canopy.compile('grammar CIStringTest\
        string <- `foo`')
    })
    
    it('parses the string it contains', function() {
      assertParse( ['foo', 0, []], CIStringTestParser.parse('foo') )
      assertParse( ['FOO', 0, []], CIStringTestParser.parse('FOO') )
    })
  })
})

