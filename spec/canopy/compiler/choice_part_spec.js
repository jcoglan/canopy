Canopy.Compiler.ChoicePartSpec = JS.Test.describe("Canopy.Compiler.ChoicePart",
function() { with(this) {
  include(Canopy.SpecHelper)
  
  describe('when the node type is a class', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar ClassTypeTest\
        rule <- "content" <NodeType>')
      
      ClassTypeTestParser.NodeType = function(text, offset, children) {
        this.textValue = text
        this.offset    = 0
        this.elements  = children
      }
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertKindOf( ClassTypeTestParser.NodeType,
                    ClassTypeTestParser.parse('content') )
    }})
    
    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], ClassTypeTestParser.parse('content') )
    }})
  }})
  
  describe('when the node type is a mixin', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar ModuleTypeTest\
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
      Canopy.compile('grammar TypedChoiceTest\
        rule <- ("content" / "booya") <NodeType>')
      
      TypedChoiceTestParser.NodeType = { custom: function() { return 'pass!' } }
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedChoiceTestParser.parse('content').custom() )
    }})
  }})
  
  describe('when the underlying parser is a maybe', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar TypedMaybeTest\
        rule <- "content"? <NodeType>')
      
      TypedMaybeTestParser.NodeType = { custom: function() { return 'pass!' } }
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedMaybeTestParser.parse('content').custom() )
    }})
  }})
  
  describe('when the node type is namespaced', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar NamespacedTypeTest\
        rule <- "content" <NS.NodeType>')
      
      NamespacedTypeTestParser.NS = {
        NodeType : new JS.Class(NamespacedTypeTestParser.SyntaxNode)
      }
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertKindOf( NamespacedTypeTestParser.NS.NodeType,
                    NamespacedTypeTestParser.parse('content') )
    }})
  }})
}})

