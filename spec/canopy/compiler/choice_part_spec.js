Canopy.Compiler.ChoicePartSpec = JS.Test.describe(Canopy.Compiler.ChoicePart,
function() {
  include(Canopy.SpecHelper)
  
  describe('when the node type is a class', function() {
    before(function() {
      Canopy.compile('grammar ClassTypeTest\
        rule <- "content" <NodeType>')
      
      NodeType = new JS.Class(ClassTypeTestParser.SyntaxNode)
    })
    
    it('creates nodes using the named type', function() {
      assertKindOf( NodeType, ClassTypeTestParser.parse('content') )
    })
    
    it('contains the parse results in the returned node', function() {
      assertParse( ['content', 0, []], ClassTypeTestParser.parse('content') )
    })
  })
  
  describe('when the node type is a mixin', function() {
    before(function() {
      NodeType = new JS.Module({ custom: function(){} })
      
      Canopy.compile('grammar ModuleTypeTest\
        rule <- "content" <NodeType>')
    })
    
    it('creates nodes using the named type', function() {
      var result = ModuleTypeTestParser.parse('content')
      assertKindOf( NodeType, result )
      assertRespondTo( result, 'custom' )
    })
    
    it('contains the parse results in the returned node', function() {
      assertParse( ['content', 0, []], ModuleTypeTestParser.parse('content') )
    })
  })
  
  describe('when the underlying parser is a choice', function() {
    before(function() {
      NodeType = new JS.Module({ custom: function(){} })
      
      Canopy.compile('grammar TypedChoiceTest\
        rule <- ("content" / "booya") <NodeType>')
    })
    
    it('extends the chosen node with the mixin', function() {
      assertKindOf( NodeType, TypedChoiceTestParser.parse('booya') )
    })
  })
  
  describe('when the underlying parser is a maybe', function() {
    before(function() {
      NodeType = new JS.Module({ custom: function(){} })
      
      Canopy.compile('grammar TypedMaybeTest\
        rule <- "content"? <NodeType>')
    })
    
    it('extends the chosen node with the mixin', function() {
      assertKindOf( NodeType, TypedMaybeTestParser.parse('content') )
    })
  })
  
  describe('when the node type is namespaced', function() {
    before(function() {
      Canopy.compile('grammar NamespacedTypeTest\
        rule <- "content" <NS.NodeType>')
      
      NS = { NodeType : new JS.Class(NamespacedTypeTestParser.SyntaxNode) }
    })
    
    it('creates nodes using the named type', function() {
      assertKindOf( NS.NodeType, NamespacedTypeTestParser.parse('content') )
    })
  })
})

