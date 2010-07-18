Canopy.Compiler.CharClassSpec = JS.Test.describe(Canopy.Compiler.CharClass,
function() {
  include(Canopy.SpecHelper)
  
  describe('positive', function() {
    before(function() {
      Canopy.compile('grammar PositiveCharClassTest\
        charClass <- [a-z]')
    })
    
    it('parses characters within the class', function() {
      assertParse( ['a', 0, []], PositiveCharClassTestParser.parse('a') )
    })
    
    it('does not parse characters outside the class', function() {
      assertNull( PositiveCharClassTestParser.parse('7') )
    })
    
    it('does not parse characters within the class appearing too late', function() {
      assertNull( PositiveCharClassTestParser.parse('7a') )
    })
  })
  
  describe('negative', function() {
    before(function() {
      Canopy.compile('grammar NegativeCharClassTest\
        charClass <- [^a-z]')
    })
    
    it('parses characters within the class', function() {
      assertParse( ['7', 0, []], NegativeCharClassTestParser.parse('7') )
    })
    
    it('does not parse characters outside the class', function() {
      assertNull( NegativeCharClassTestParser.parse('a') )
    })
    
    it('does not parse characters within the class appearing too late', function() {
      assertNull( NegativeCharClassTestParser.parse('a7') )
    })
  })
  
  describe('with sequencing and repetition', function() {
    before(function() {
      Canopy.compile('grammar RepeatCharClassTest\
        root <- [1-9] [0-9]*')
    })
    
    it('parses integers', function() {
      assertParse(['3718', 0, [
                    ['3', 0, []],
                    ['718', 1, [
                      ['7', 1, []],
                      ['1', 2, []],
                      ['8', 3, []]]]]],
        
        RepeatCharClassTestParser.parse('3718') )
    })
    
    it('does not parse floats', function() {
      assertNull( RepeatCharClassTestParser.parse('7.4') )
    })
    
    it('does not parse octal', function() {
      assertNull( RepeatCharClassTestParser.parse('0644') )
    })
  })
})

