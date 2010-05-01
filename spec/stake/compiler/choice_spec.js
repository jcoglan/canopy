Stake.Compiler.ChoiceSpec = JS.Test.describe(Stake.Compiler.Choice, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    Stake.compile('grammar ChoiceTest\
      choice <- "foo" / "bar" / "baz"')
  }})
  
  it('parses the first choice', function() { with(this) {
    assertParse( ['foo', 0, []], ChoiceTestParser.parse('foo') )
  }})
  
  it('parses the second choice', function() { with(this) {
    assertParse( ['bar', 0, []], ChoiceTestParser.parse('bar') )
  }})
  
  it('parses the third choice', function() { with(this) {
    assertParse( ['baz', 0, []], ChoiceTestParser.parse('baz') )
  }})
  
  it('does not parse two choices together', function() { with(this) {
    assertNull( ChoiceTestParser.parse('foobar') )
  }})
  
  it('does not parse a superstring of any choice', function() { with(this) {
    assertNull( ChoiceTestParser.parse('foob') )
    assertNull( ChoiceTestParser.parse('barb') )
    assertNull( ChoiceTestParser.parse('bazb') )
  }})
  
  describe('when the choices are ambiguous', function() { with(this) {
    before(function() { with(this) {
      Stake.compile('grammar AmbiguousChoiceTest\
        choice <- "foxes love" / "chunky" "bacon" / "chunkyb" "acon"')
    }})
    
    it('chooses the first matching path', function() { with(this) {
      assertParse(['chunkybacon', 0, [
                    ['chunky', 0, []],
                    ['bacon', 6, []]]],
        
        AmbiguousChoiceTestParser.parse('chunkybacon') )
    }})
  }})
  
  describe('backtracking', function() { with(this) {
    before(function() { with(this) {
      Stake.compile('grammar BacktrackingChoiceTest\
        choice <- "foob" / "foo"')
    }})
    
    it('chooses the first path if it completes the input', function() { with(this) {
      assertParse( ['foob', 0, []], BacktrackingChoiceTestParser.parse('foob') )
    }})
    
    it('chooses the second path otherwise', function() { with(this) {
      assertParse( ['foo', 0, []], BacktrackingChoiceTestParser.parse('foo') )
    }})
    
    describe('within a sequence', function() { with(this) {
      before(function() { with(this) {
        Stake.compile('grammar BacktrackingSequenceChoice\
          choice <- ("word" "type" / "word") "bar"')
      }})
      
      it('parses the long version', function() { with(this) {
        assertParse(['wordtypebar', 0, [
                      ['wordtype', 0, [
                        ['word', 0, []],
                        ['type', 4, []]]],
                      ['bar', 8, []]]],
          
          BacktrackingSequenceChoiceParser.parse('wordtypebar') )
      }})
      
      it('parses the short version', function() { with(this) {
        assertParse(['wordbar', 0, [
                      ['word', 0, []],
                      ['bar', 4, []]]],
          
          BacktrackingSequenceChoiceParser.parse('wordbar') )
      }})
    }})
  }})
}})

