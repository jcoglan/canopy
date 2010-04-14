Stake.NotParserSpec = JS.Test.describe(Stake.NotParser, function() { with(this) {
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['sequence',
                    ['not', ['string', 'foo']],
                    ['string', 'bar']])
  }})
  
  it('parses text that does not begin with the negated pattern', function() { with(this) {
    assertEqual( {
        textValue: 'bar',
        offset: 0,
        elements: [
          {textValue: '', offset: 0, elements: []},
          {textValue: 'bar', offset: 0, elements: []}
        ]
      },
      parser.parse('bar') )
  }})
  
  it('does not parse text beginning with the negated pattern', function() { with(this) {
    assertNull( parser.parse('foobar') )
  }})
  
  describe('combined with repetition', function() { with(this) {
    before(function() { with(this) {
      // (!" " .)+ " "
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['repeat', 1,
                        ['sequence',
                          ['not', ['string', ' ']],
                          ['any-char']]],
                      ['string', ' ']])
    }})
    
    it('mathces a word followed by a space', function() { with(this) {
      assertEqual( {
          textValue: 'fun ',
          offset: 0,
          elements: [
            {
              textValue: 'fun',
              offset: 0,
              elements: [
                {textValue: 'f', offset: 0, elements: [
                    {textValue: '', offset: 0, elements: []},
                    {textValue: 'f', offset: 0, elements: []}
                  ]},
                {textValue: 'u', offset: 1, elements: [
                    {textValue: '', offset: 1, elements: []},
                    {textValue: 'u', offset: 1, elements: []}
                  ]},
                {textValue: 'n', offset: 2, elements: [
                    {textValue: '', offset: 2, elements: []},
                    {textValue: 'n', offset: 2, elements: []}
                  ]}
              ]
            },
            {textValue: ' ', offset: 3, elements: []}
          ]
        },
        parser.parse('fun ') )
    }})
    
    it('does not match a word with no space', function() { with(this) {
      assertNull( parser.parse('chunky') )
    }})
    
    it('does not match multiple words', function() { with(this) {
      assertNull( parser.parse('chunky bacon ') )
    }})
  }})
}})

