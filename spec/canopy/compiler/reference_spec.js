Canopy.Compiler.ReferenceSpec = JS.Test.describe(Canopy.Compiler.Reference, function() {
  include(Canopy.SpecHelper)
  
  describe('with two rules and a reference', function() {
    describe('where the root only contains a reference', function() {
      before(function() {
        Canopy.compile('grammar OneRefTest\
          first <- second\
          second <- "bar"')
      })
      
      it('parses strings matching the referenced rule', function() {
        assertParse( ['bar', 0, []], OneRefTestParser.parse('bar') )
      })
      
      it('does not parse strings that do not match the referenced rule', function() {
        assertNull( OneRefTestParser.parse('foo') )
      })
    })
    
    describe('where the root contains the reference as part of a sequence', function() {
      before(function() {
        Canopy.compile('grammar OneRefWithSequenceTest\
          first <- second "end"\
          second <- "begin"')
      })
      
      it('presents the reference as a labelled element', function() {
        assertParse(['beginend', 0, [
                      ['begin', 0, []],
                      ['end', 5, []]], {
                      second: ['begin', 0, []]
                    }],
          
          OneRefWithSequenceTestParser.parse('beginend') )
      })
    })
    
    describe('where the root contains the reference as part of a sub-sequence', function() {
      before(function() {
        Canopy.compile('grammar OneRefWithSubSequenceTest\
          first <- (second "sub") "end"\
          second <- "begin"')
      })
      
      it('presents the reference as a labelled element in the subsequence', function() {
        assertParse(['beginsubend', 0, [
                      ['beginsub', 0, [
                        ['begin', 0, []],
                        ['sub', 5, []]], {
                        second: ['begin', 0, []]
                      }],
                      ['end', 8, []]]],
          
          OneRefWithSubSequenceTestParser.parse('beginsubend') )
      })
    })
    
    describe('when the root contains the reference as part of a choice', function() {
      before(function() {
        Canopy.compile('grammar OneRefWithChoice\
          first <- second / "end"\
          second <- "begin"')
      })
      
      it('parses the first branch of the choice', function() {
        assertParse( ['begin', 0, []], OneRefWithChoiceParser.parse('begin') )
      })
      
      it('parses the second branch of the choice', function() {
        assertParse( ['end', 0, []], OneRefWithChoiceParser.parse('end') )
      })
    })
  })
})

