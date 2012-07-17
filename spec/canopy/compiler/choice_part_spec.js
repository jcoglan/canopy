JS.ENV.Canopy.Compiler.ChoicePartSpec = JS.Test.describe("Canopy.Compiler.ChoicePart",
function() { with(this) {
  include(Canopy.SpecHelper)
  
  describe('when the node type is a mixin', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.ModuleTypeTest\
        rule <- "content" <NodeType>')
      
      ModuleTypeTestParser.NodeType = { custom: function() { return 'pass!' } }
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      var result = ModuleTypeTestParser.parse('content')
      assertEqual( 'pass!', result.custom() )
      assertRespondTo( result, 'custom' )
    }})
    
    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], ModuleTypeTestParser.parse('content') )
    }})
  }})
  
  describe('when the underlying parser is a choice', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedChoiceTest\
        rule <- ("content" / "booya") <NodeType>')
      
      TypedChoiceTestParser.NodeType = { custom: function() { return 'pass!' } }
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedChoiceTestParser.parse('content').custom() )
    }})
  }})
  
  describe('where the underlying parser is a reference', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedRefTest\
        first <- second <First>\
        second <- "bar" <Second>')
        
        TypedRefTestParser.First  = { first:  function() { return '1'} }
        TypedRefTestParser.Second = { second: function() { return '2'} }
    }})
    
    it('extends the chosen node with the root type', function() { with(this) {
      assertEqual( '2', TypedRefTestParser.parse('bar').second() )
    }})
    
    it('extends the chosen node with the reference type', function() { with(this) {
      assertEqual( '1', TypedRefTestParser.parse('bar').first() )
    }})
  }})
  
  describe('when the underlying parser is a repetition', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedRepeatTest\
        rule <- "content"+ <NodeType>')
      
      TypedRepeatTestParser.NodeType = { custom: function() { return 'pass!' } }
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedRepeatTestParser.parse('contentcontent').custom() )
    }})
  }})
  
  describe('when the underlying parser is a maybe', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedMaybeTest\
        rule <- "content"? <NodeType>')
      
      TypedMaybeTestParser.NodeType = { custom: function() { return 'pass!' } }
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedMaybeTestParser.parse('content').custom() )
    }})
  }})
  
  describe('when the node type is namespaced', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.NamespacedTypeTest\
        rule <- "content" <NS.NodeType>')
      
      NamespacedTypeTestParser.NS = {
        NodeType: { custom: function() { return 'pass!' } }
      }
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertEqual( 'pass!', NamespacedTypeTestParser.parse('content').custom() )
    }})
  }})
}})

