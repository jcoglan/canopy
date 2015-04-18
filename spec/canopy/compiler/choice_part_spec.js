JS.ENV.Canopy.Compiler.ChoicePartSpec = JS.Test.describe("Canopy.Compiler.ChoicePart",
function() { with(this) {
  include(Canopy.SpecHelper)

  describe('when the node type is a mixin', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.ModuleTypeTest\
        rule <- "content" <NodeType>')

      ModuleTypeTest.Parser.NodeType = { custom: function() { return 'pass!' } }
    }})

    it('creates nodes using the named type', function() { with(this) {
      var result = ModuleTypeTest.parse('content')
      assertEqual( 'pass!', result.custom() )
      assertRespondTo( result, 'custom' )
    }})

    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], ModuleTypeTest.parse('content') )
    }})
  }})

  describe('when the underlying parser is a choice', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedChoiceTest\
        rule <- ("content" / "booya") <NodeType>')

      TypedChoiceTest.Parser.NodeType = { custom: function() { return 'pass!' } }
    }})

    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedChoiceTest.parse('content').custom() )
    }})
  }})

  describe('where the underlying parser is a reference', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedRefTest\
        first <- second <First>\
        second <- "bar" <Second>')

        TypedRefTest.Parser.First  = { first:  function() { return '1'} }
        TypedRefTest.Parser.Second = { second: function() { return '2'} }
    }})

    it('extends the chosen node with the root type', function() { with(this) {
      assertEqual( '2', TypedRefTest.parse('bar').second() )
    }})

    it('extends the chosen node with the reference type', function() { with(this) {
      assertEqual( '1', TypedRefTest.parse('bar').first() )
    }})
  }})

  describe('when the underlying parser is a repetition', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedRepeatTest\
        rule <- "content"+ <NodeType>')

      TypedRepeatTest.Parser.NodeType = { custom: function() { return 'pass!' } }
    }})

    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedRepeatTest.parse('contentcontent').custom() )
    }})
  }})

  describe('when the underlying parser is a maybe', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.TypedMaybeTest\
        rule <- "content"? <NodeType>')

      TypedMaybeTest.Parser.NodeType = { custom: function() { return 'pass!' } }
    }})

    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedMaybeTest.parse('content').custom() )
    }})
  }})

  describe('when the node type is namespaced', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.NamespacedTypeTest\
        rule <- "content" <NS.NodeType>')

      NamespacedTypeTest.Parser.NS = {
        NodeType: { custom: function() { return 'pass!' } }
      }
    }})

    it('creates nodes using the named type', function() { with(this) {
      assertEqual( 'pass!', NamespacedTypeTest.parse('content').custom() )
    }})
  }})
}})
