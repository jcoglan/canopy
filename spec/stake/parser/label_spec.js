Stake.Parser.LabelSpec = JS.Test.describe(Stake.Parser.Label, function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('labelling a terminal node', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['string', 'first'],
                      ['label', 'middle', ['string', 'second']],
                      ['string', 'third']])
    }})
    
    it('adds the label as an extra property to the parse tree', function() { with(this) {
      assertParse(['firstsecondthird', 0, [
                    ['first', 0, []],
                    ['second', 5, []],
                    ['third', 11, []]], {
                    middle: ['second', 5, []]
                  }],
        
        parser.parse('firstsecondthird') )
    }})
  }})
  
  describe('labelling a repetition node', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['string', 'first'],
                      ['label', 'middle',
                        ['repeat', 1,
                          ['string', 'a']]],
                      ['string', 'third']])
    }})
    
    it('labels the node containing the repetition', function() { with(this) {
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
        
        parser.parse('firstaathird') )
    }})
    
    it('does not parse if the expression it labels does not parse', function() { with(this) {
      assertNull( parser.parse('firstthird') )
    }})
  }})
  
  describe('nesting', function() { with(this) {
    before(function() { with(this) {
      // firstLetter:[a-z] restLetters:(', ' letter:[a-z])*
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['label', 'firstLetter',
                        ['char-class', '[a-z]']],
                      ['label', 'restLetters',
                        ['repeat', 0,
                          ['sequence',
                            ['string', ', '],
                            ['label', 'letter',
                              ['char-class', '[a-z]']]]]]])
      
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
    }})
    
    it('applies labels to nested nodes', function() { with(this) {
      assertParse(['a, b, c', 0, [
                    ['a', 0, []],
                    rest], {
                    firstLetter: ['a', 0, []],
                    restLetters: rest
                  }],
        
        parser.parse('a, b, c') )
    }})
  }})
}})

