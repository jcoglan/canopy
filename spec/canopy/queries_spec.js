Canopy.QueriesSpec = JS.Test.describe('queries', function() {
  include(Canopy.SpecHelper)
  
  before(function() {
    Canopy.compile('grammar Query     \
      value  <- mixup / nested        \
      mixup  <- letter digit letter   \
      nested <- digit number digit    \
                                      \
      letter <- [a-z]                 \
      digit  <- [0-9]                 \
      number <- digit digit digit     ')
  })
  
  describe('select', function() {
    it('selects matches with the given name', function() {
      var match   = QueryParser.parse('m4a'),
          letters = match.select('letter')
          
      assertEqual( 2, letters.length )
      
      assertParse( ['m', 0, []], letters[0] )
      assertParse( ['a', 2, []], letters[1] )
    })
    
    it('only selects named nodes that appear literally in the match rule', function() {
      var match   = QueryParser.parse('12345'),
          digits  = match.select('digit')
          
      assertEqual( 2, digits.length )
      
      assertParse( ['1', 0, []], digits[0] )
      assertParse( ['5', 4, []], digits[1] )
    })
  })
})

