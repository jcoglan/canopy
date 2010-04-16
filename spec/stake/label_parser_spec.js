Stake.LabelParserSpec = JS.Test.describe(Stake.LabelParser, function() { with(this) {
  describe('labelling a terminal node', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['string', 'first'],
                      ['label', 'middle', ['string', 'second']],
                      ['string', 'third']])
    }})
    
    it('adds the label as an extra property to the parse tree', function() { with(this) {
      assertEqual( {
          textValue: 'firstsecondthird',
          offset: 0,
          elements: [
            {textValue: 'first', offset: 0, elements: []},
            {textValue: 'second', offset: 5, elements: []},
            {textValue: 'third', offset: 11, elements: []}
          ],
          middle: {textValue: 'second', offset: 5, elements: []}
        },
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
      assertEqual( {
          textValue: 'firstaathird',
          offset: 0,
          elements: [
            {textValue: 'first', offset: 0, elements: []},
            {
              textValue: 'aa',
              offset: 5,
              elements: [
                {textValue: 'a', offset: 5, elements: []},
                {textValue: 'a', offset: 6, elements: []}
              ]
            },
            {textValue: 'third', offset: 7, elements: []}
          ],
          middle: {
            textValue: 'aa',
            offset: 5,
            elements: [
              {textValue: 'a', offset: 5, elements: []},
              {textValue: 'a', offset: 6, elements: []}
            ]
          }
        },
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
      
      this.rest = {
        textValue: ', b, c',
        offset: 1,
        elements: [
          {
            textValue: ', b',
            offset: 1,
            elements: [
              {textValue: ', ', offset: 1, elements: []},
              {textValue: 'b', offset: 3, elements: []}
            ],
            letter: {textValue: 'b', offset: 3, elements: []}
          }, {
            textValue: ', c',
            offset: 4,
            elements: [
              {textValue: ', ', offset: 4, elements: []},
              {textValue: 'c', offset: 6, elements: []}
            ],
            letter: {textValue: 'c', offset: 6, elements: []}
          }
        ]
      }
    }})
    
    it('applies labels to nested nodes', function() { with(this) {
      assertEqual( {
          textValue: 'a, b, c',
          offset: 0,
          elements: [
            {textValue: 'a', offset: 0, elements: []},
            rest
          ],
          firstLetter: {textValue: 'a', offset: 0, elements: []},
          restLetters: rest
        },
        parser.parse('a, b, c') )
    }})
  }})
}})

