Canopy.Compiler.StringSpec = JS.Test.describe("Canopy.Compiler.String",
function() { with(this) {
  include(Canopy.SpecHelper)
  
  before(function() { with(this) {
    Canopy.compile('grammar JS.ENV.StringTest\
      string <- "foo"')
  }})
  
  it('parses the string it contains', function() { with(this) {
    assertParse( ['foo', 0, []], StringTestParser.parse('foo') )
  }})
  
  it('does not parse other strings', function() { with(this) {
    assertThrows(Error, function() { StringTestParser.parse('FOO') })
    assertThrows(Error, function() { StringTestParser.parse('bar') })
  }})
  
  it('does not parse superstrings of itself', function() { with(this) {
    assertThrows(Error, function() { StringTestParser.parse('food') })
  }})
  
  it('does not parse the empty string', function() { with(this) {
    assertThrows(Error, function() { StringTestParser.parse('') })
  }})
  
  describe('case-insensitive strings', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.CIStringTest\
        string <- `foo`')
    }})
    
    it('parses the string it contains', function() { with(this) {
      assertParse( ['foo', 0, []], CIStringTestParser.parse('foo') )
      assertParse( ['FOO', 0, []], CIStringTestParser.parse('FOO') )
    }})
  }})
}})

