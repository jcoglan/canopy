Canopy.Compiler.SequenceSpec = JS.Test.describe(Canopy.Compiler.Sequence, function() {
  include(Canopy.SpecHelper)
  
  before(function() {
    Canopy.compile('grammar SequenceTest\
      sequence <- "foo" "bar"')
  })
  
  it('parses sequences matching its content', function() {
    assertParse(['foobar', 0, [
                  ['foo', 0, []],
                  ['bar', 3, []]]],
      
      SequenceTestParser.parse('foobar') )
  })
  
  it('does not parse nonmatching sequences', function() {
    assertNull( SequenceTestParser.parse('foobaz') )
    assertNull( SequenceTestParser.parse('doobar') )
  })
  
  it('does not parse if the first term is missing', function() {
    assertNull( SequenceTestParser.parse('bar') )
  })
  
  it('does not parse superstrings of itself', function() {
    assertNull( SequenceTestParser.parse('foobart') )
  })
  
  describe('labelling', function() {
    describe('a terminal node', function() {
      before(function() {
        Canopy.compile('grammar LabelTestA\
          root <- "first" middle:"second" "third"')
      })
      
      it('adds the label as an extra property to the parse tree', function() {
        assertParse(['firstsecondthird', 0, [
                      ['first', 0, []],
                      ['second', 5, []],
                      ['third', 11, []]], {
                      middle: ['second', 5, []]
                    }],
          
          LabelTestAParser.parse('firstsecondthird') )
      })
    })
    
    describe('a repetition node', function() {
      before(function() {
        Canopy.compile('grammar LabelTestB\
          root <- "first" middle:"a"+ "third"')
      })
      
      it('labels the node containing the repetition', function() {
        assertParse(['firstaathird', 0, [
                      ['first', 0, []],
                      ['aa', 5, [
                        ['a', 5, []],
                        ['a', 6, []]]],
                      ['third', 7, []]], {
                      middle: ['aa', 5, [
                        ['a', 5, []],
                        ['a', 6, []]]]
                    }],
          
          LabelTestBParser.parse('firstaathird') )
      })
      
      it('does not parse if the expression it labels does not parse', function() {
        assertNull( LabelTestBParser.parse('firstthird') )
      })
    })
    
    describe('nesting', function() {
      before(function() {
        Canopy.compile('grammar LabelTestC\
          root <- firstLetter:[a-z] restLetters:(", " letter:[a-z])*')
        
        this.rest = [', b, c', 1, [
                      [', b', 1, [
                        [', ', 1, []],
                        ['b', 3, []]], {
                        letter: ['b', 3, []]
                      }],
                      [', c', 4, [
                        [', ', 4, []],
                        ['c', 6, []]], {
                        letter: ['c', 6, []]
                      }]]]
      })
      
      it('applies labels to nested nodes', function() {
        assertParse(['a, b, c', 0, [
                      ['a', 0, []],
                      rest], {
                      firstLetter: ['a', 0, []],
                      restLetters: rest
                    }],
          
          LabelTestCParser.parse('a, b, c') )
      })
    })
  })
})

