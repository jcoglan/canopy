Canopy.Compiler.ChoiceSpec = JS.Test.describe(Canopy.Compiler.Choice, function() {
  include(Canopy.SpecHelper)
  
  before(function() {
    Canopy.compile('grammar ChoiceTest\
      choice <- "foo" / "bar" / "baz"')
  })
  
  it('parses the first choice', function() {
    assertParse( ['foo', 0, []], ChoiceTestParser.parse('foo') )
  })
  
  it('parses the second choice', function() {
    assertParse( ['bar', 0, []], ChoiceTestParser.parse('bar') )
  })
  
  it('parses the third choice', function() {
    assertParse( ['baz', 0, []], ChoiceTestParser.parse('baz') )
  })
  
  it('does not parse two choices together', function() {
    assertNull( ChoiceTestParser.parse('foobar') )
  })
  
  it('does not parse a superstring of any choice', function() {
    assertNull( ChoiceTestParser.parse('foob') )
    assertNull( ChoiceTestParser.parse('barb') )
    assertNull( ChoiceTestParser.parse('bazb') )
  })
  
  describe('when the choices are ambiguous', function() {
    before(function() {
      Canopy.compile('grammar AmbiguousChoiceTest\
        choice <- "foxes love" / "chunky" "bacon" / "chunkyb" "acon"')
    })
    
    it('chooses the first matching path', function() {
      assertParse(['chunkybacon', 0, [
                    ['chunky', 0, []],
                    ['bacon', 6, []]]],
        
        AmbiguousChoiceTestParser.parse('chunkybacon') )
    })
  })
  
  describe('backtracking', function() {
    before(function() {
      Canopy.compile('grammar BacktrackingChoiceTest\
        choice <- "foob" / "foo"')
    })
    
    it('chooses the first path if it completes the input', function() {
      assertParse( ['foob', 0, []], BacktrackingChoiceTestParser.parse('foob') )
    })
    
    it('chooses the second path otherwise', function() {
      assertParse( ['foo', 0, []], BacktrackingChoiceTestParser.parse('foo') )
    })
    
    describe('within a sequence', function() {
      before(function() {
        Canopy.compile('grammar BacktrackingSequenceChoice\
          choice <- ("word" "type" / "word") "bar"')
      })
      
      it('parses the long version', function() {
        assertParse(['wordtypebar', 0, [
                      ['wordtype', 0, [
                        ['word', 0, []],
                        ['type', 4, []]]],
                      ['bar', 8, []]]],
          
          BacktrackingSequenceChoiceParser.parse('wordtypebar') )
      })
      
      it('parses the short version', function() {
        assertParse(['wordbar', 0, [
                      ['word', 0, []],
                      ['bar', 4, []]]],
          
          BacktrackingSequenceChoiceParser.parse('wordbar') )
      })
    })
  })
})

