JS.ENV.Canopy.Compiler.ChoicePartSpec = JS.Test.describe("Canopy.Compiler.ChoicePart",
function() { with(this) {
  include(Canopy.SpecHelper)

  describe('action tags', function() { with(this) {
    describe('constructing a string node', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.StringActionTest\
          rule <- "begin" %begin')

        this.actions = {
          begin: function() { return {type: 'tBEGIN'} }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( {type: 'tBEGIN'}, StringActionTest.parse('begin', actions) )
      }})
    }})

    describe('constructing a case-insensitive string node', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.CIStringActionTest\
          rule <- `begin` %begin')

        this.actions = {
          begin: function() { return {type: 'tBEGIN'} }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( {type: 'tBEGIN'}, CIStringActionTest.parse('BeGiN', actions) )
      }})
    }})

    describe('constructing a character class node', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.ClassActionTest\
          rule <- [a-z] %make_char')

        this.actions = {
          make_char: function(input) { return input.toUpperCase() }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( 'Q', ClassActionTest.parse('q', actions) )
      }})
    }})

    describe('constructing an any-char node', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.AnyActionTest\
          rule <- . %char_code')

        this.actions = {
          char_code: function(input) { return input.charCodeAt(0).toString(16) }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( '41', AnyActionTest.parse('A', actions) )
      }})
    }})

    describe('constructing a parenthesised node', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.ParenActionTest\
          rule <-  ( ( ( ( . ) ) ) ) %char_code')

        this.actions = {
          char_code: function(input, start) { return input.charCodeAt(start).toString(16) }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( '41', ParenActionTest.parse('A', actions) )
      }})
    }})

    describe('constructing a repeated node', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.IntActionTest\
          rule <- [0-9]* %to_int')

        this.actions = {
          to_int: function(input, start, end, elements) {
            return parseInt(input.substring(start, end), 10)
          }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( 3, IntActionTest.parse('3', actions) )
      }})
    }})

    describe('constructing a sequence', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.MathActionTest\
          addition <- int " "* "+" " "* int %add\
          int      <- [0-9]* %an_int')

        this.actions = {
          add: function(input, start, end, elements) {
            return [elements[2].text, elements[0], elements[4]];
          },
          an_int: function(input, start, end, elements) {
            return parseInt(input.substring(start, end), 10)
          }
        }
      }})

      it('creates nodes using the named action', function() { with(this) {
        assertEqual( ['+', 4, 5], MathActionTest.parse('4 + 5', actions) )
      }})

      it('treats falsey nodes as successes', function() { with(this) {
        assertEqual( ['+', 0, 1], MathActionTest.parse('0+1', actions) )
      }})
    }})

  }})

  describe('type annotations', function() { with(this) {
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
}})
