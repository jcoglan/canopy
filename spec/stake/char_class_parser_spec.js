Stake.CharClassParserSpec = JS.Test.describe(Stake.CharClassParser,
function() { with(this) {
  describe('positive', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['char-class', '[a-z]'])
    }})
    
    it('parses characters within the class', function() { with(this) {
      assertEqual( {textValue: 'a', offset: 0, elements: []}, parser.parse('a') )
    }})
    
    it('does not parse characters outside the class', function() { with(this) {
      assertNull( parser.parse('7') )
    }})
    
    it('does not parse characters within the class appearing too late', function() { with(this) {
      assertNull( parser.parse('7a') )
    }})
  }})
  
  describe('negative', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['char-class', '[^a-z]'])
    }})
    
    it('parses characters within the class', function() { with(this) {
      assertEqual( {textValue: '7', offset: 0, elements: []}, parser.parse('7') )
    }})
    
    it('does not parse characters outside the class', function() { with(this) {
      assertNull( parser.parse('a') )
    }})
    
    it('does not parse characters within the class appearing too late', function() { with(this) {
      assertNull( parser.parse('a7') )
    }})
  }})
  
  describe('with sequencing and repetion', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['char-class', '[1-9]'],
                      ['repeat', 0, ['char-class', '[0-9]']]])
    }})
    
    it('parses integers', function() { with(this) {
      assertEqual( {
          textValue: '3718',
          offset: 0,
          elements: [
            {textValue: '3', offset: 0, elements: []},
            {
              textValue: '718',
              offset: 1,
              elements: [
                {textValue: '7', offset: 1, elements: []},
                {textValue: '1', offset: 2, elements: []},
                {textValue: '8', offset: 3, elements: []}
              ]
            }
          ]
        },
        parser.parse('3718') )
    }})
    
    it('does not parse floats', function() { with(this) {
      assertNull( parser.parse('7.4') )
    }})
    
    it('does not parse octal', function() { with(this) {
      assertNull( parser.parse('0644') )
    }})
  }})
}})

