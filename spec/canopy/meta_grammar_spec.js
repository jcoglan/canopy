JS.ENV.Canopy.MetaGrammarSpec = JS.Test.describe("Canopy.MetaGrammar",
function() { with(this) {
  describe('with an any-char rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar AnyChar                   \
          any <- .                        \
      ')
    }})

    it('compiles an any-char-rule parser', function() { with(this) {
      assertEqual(['grammar', 'AnyChar',
                    ['rule', 'any',
                      ['any-char']]],

          compiler.toSexp() )
    }})
  }})

  describe('with a char-class rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar CharClass                 \
          string <- [^0-9]                \
      ')
    }})

    it('compiles a char-class-rule parser', function() { with(this) {
      assertEqual(['grammar', 'CharClass',
                    ['rule', 'string',
                      ['char-class', '[^0-9]']]],

          compiler.toSexp() )
    }})

    describe('containing escaped characters', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar CharClass                 \
            string <- [\\^\\]\\$\\n]        \
        ')
      }})

      it('compiles a char-class-rule parser containing the characters', function() { with(this) {
        assertEqual(['grammar', 'CharClass',
                      ['rule', 'string',
                        ['char-class', /[\^\]\$\n]/.source]]],

            compiler.toSexp() )
      }})
    }})
  }})

  describe('with a string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar String                    \
          string <- "foo"                 \
      ')
    }})

    it('compiles a string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'String',
                    ['rule', 'string',
                      ['string', 'foo']]],

          compiler.toSexp() )
    }})

    describe('containing escaped characters', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar String                    \
            string <- "\\"\\\\\\n"          \
        ')
      }})

      it('compiles a string-rule parser containing the escaped characters', function() { with(this) {
        assertEqual(['grammar', 'String',
                      ['rule', 'string',
                        ['string', '"\\\n']]],

            compiler.toSexp() )
      }})
    }})
  }})

  describe('with a case-insensitive string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar String                    \
          string <- `foo`                 \
      ')
    }})

    it('compiles a ci-string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'String',
                    ['rule', 'string',
                      ['ci-string', 'foo']]],

          compiler.toSexp() )
    }})
  }})

  describe('with a maybe string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar MaybeString               \
          string <- "foo"?                \
      ')
    }})

    it('compiles a maybe string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'MaybeString',
                    ['rule', 'string',
                      ['maybe', ['string', 'foo']]]],

          compiler.toSexp() )
    }})
  }})

  describe('with an and string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar AndString                 \
          string <- &"foo"                \
      ')
    }})

    it('compiles an and string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'AndString',
                    ['rule', 'string',
                      ['and', ['string', 'foo']]]],

          compiler.toSexp() )
    }})
  }})

  describe('with a not string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar NotString                 \
          string <- !"foo"                \
      ')
    }})

    it('compiles a not string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'NotString',
                    ['rule', 'string',
                      ['not', ['string', 'foo']]]],

          compiler.toSexp() )
    }})
  }})

  describe('with a repeat-0 string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar StarString                \
          string <- "foo"*                \
      ')
    }})

    it('compiles a repeat-0 string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'StarString',
                    ['rule', 'string',
                      ['repeat', 0, ['string', 'foo']]]],

          compiler.toSexp() )
    }})
  }})

  describe('with a repeat-1 string rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar PlusString                \
          string <- "foo"+                \
      ')
    }})

    it('compiles a repeat-1 string-rule parser', function() { with(this) {
      assertEqual(['grammar', 'PlusString',
                    ['rule', 'string',
                      ['repeat', 1, ['string', 'foo']]]],

          compiler.toSexp() )
    }})
  }})

  describe('with a choice rule', function() { with(this) {
    describe('containing strings', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar Choice                    \
            choice <- "foo" / "bar"         \
        ')
      }})

      it('compiles a choice-rule parser', function() { with(this) {
        assertEqual(['grammar', 'Choice',
                      ['rule', 'choice',
                        ['choice',
                          ['string', 'foo'],
                          ['string', 'bar']]]],

            compiler.toSexp() )
      }})
    }})

    describe('containing sequences', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('  \
          grammar Choice                      \
            choice <- "foo" "middle" / "bar"  \
        ')
      }})

      it('compiles a choice-rule parser containing sequences', function() { with(this) {
        assertEqual(['grammar', 'Choice',
                      ['rule', 'choice',
                        ['choice',
                          ['sequence',
                            ['string', 'foo'],
                            ['string', 'middle']],
                          ['string', 'bar']]]],

            compiler.toSexp() )
      }})
    }})
  }})

  describe('with a sequence rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar Sequence                  \
          sequence <- "foo" "bar"         \
      ')
    }})

    it('compiles a sequence-rule parser', function() { with(this) {
      assertEqual(['grammar', 'Sequence',
                    ['rule', 'sequence',
                      ['sequence',
                        ['string', 'foo'],
                        ['string', 'bar']]]],

          compiler.toSexp() )
    }})

    describe('containing a label', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar LabelledSequence          \
            labelled <- "foo" end:"bar"     \
        ')
      }})

      it('includes the label in the parse tree', function() { with(this) {
        assertEqual(['grammar', 'LabelledSequence',
                      ['rule', 'labelled',
                        ['sequence',
                          ['string', 'foo'],
                          ['label', 'end',
                            ['string', 'bar']]]]],

            compiler.toSexp() )
      }})
    }})
  }})

  describe('with a referencing rule', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar References                \
          first <- second                 \
          second <- "done"                \
      ')
    }})

    it('compiles a referencing-rule parser', function() { with(this) {
      assertEqual(['grammar', 'References',
                    ['rule', 'first',
                      ['reference', 'second']],
                    ['rule', 'second',
                      ['string', 'done']]],

          compiler.toSexp() )
    }})
  }})

  describe('type annotation', function() { with(this) {
    describe('on atomic nodes', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar TypedString               \
            string <- "foo" <Mixin>         \
        ')
      }})

      it('wraps the node with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedString',
                      ['rule', 'string',
                        ['type', 'Mixin',
                          ['string', 'foo']]]],

            compiler.toSexp() )
      }})
    }})

    describe('on parenthesised choices', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('    \
          grammar TypedChoice                   \
            choice <- ("foo" / "bar") <Mixin>   \
        ')
      }})

      it('wraps the choice node with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedChoice',
                      ['rule', 'choice',
                        ['type', 'Mixin',
                          ['choice',
                            ['string', 'foo'],
                            ['string', 'bar']]]]],

            compiler.toSexp() )
      }})
    }})

    describe('with namespaced types', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar TypedString               \
            string <- "foo" <NS.Mixin>      \
        ')
      }})

      it('wraps the node with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedString',
                      ['rule', 'string',
                        ['type', 'NS.Mixin',
                          ['string', 'foo']]]],

            compiler.toSexp() )
      }})
    }})

    describe('on sequences', function() { with(this) {
      before(function() { with(this) {
        this.compiler = new Canopy.Compiler('\
          grammar TypedSequence             \
            string <- "foo" "bar" <Mixin>   \
        ')
      }})

      it('wraps the sequence with a type', function() { with(this) {
        assertEqual(['grammar', 'TypedSequence',
                      ['rule', 'string',
                        ['type', 'Mixin',
                          ['sequence',
                            ['string', 'foo'],
                            ['string', 'bar']]]]],

            compiler.toSexp() )
      }})
    }})

    describe('on choices', function() { with(this) {
      describe('containing atoms', function() { with(this) {
        before(function() { with(this) {
          this.compiler = new Canopy.Compiler('  \
            grammar TypedAtomChoice             \
              string <- "foo" / "bar" <Mixin>   \
          ')
        }})

        it('wraps one choice with a type', function() { with(this) {
          assertEqual(['grammar', 'TypedAtomChoice',
                        ['rule', 'string',
                          ['choice',
                            ['string', 'foo'],
                            ['type', 'Mixin',
                              ['string', 'bar']]]]],

              compiler.toSexp() )
        }})
      }})

      describe('containing sequences', function() { with(this) {
        before(function() { with(this) {
          this.compiler = new Canopy.Compiler('                          \
            grammar TypedSeqChoice                                      \
              string <- "foo" "bar" <Branch> / "first" "second" <Fork>  \
          ')
        }})

        it('wraps each choice with a type', function() { with(this) {
          assertEqual(['grammar', 'TypedSeqChoice',
                        ['rule', 'string',
                          ['choice',
                            ['type', 'Branch',
                              ['sequence',
                                ['string', 'foo'],
                                ['string', 'bar']]],
                            ['type', 'Fork',
                              ['sequence',
                                ['string', 'first'],
                                ['string', 'second']]]]]],

              compiler.toSexp() )
        }})
      }})
    }})
  }})

  describe('parentheses', function() { with(this) {
    before(function() { with(this) {
      this.compiler = new Canopy.Compiler('\
        grammar Parens                    \
          seq <- "foo" ("t" / .) "bar"    \
      ')
    }})

    it('creates nodes matching the parens content', function() { with(this) {
      assertEqual(['grammar', 'Parens',
                    ['rule', 'seq',
                      ['sequence',
                        ['string', 'foo'],
                        ['choice',
                          ['string', 't'],
                          ['any-char']],
                        ['string', 'bar']]]],

          compiler.toSexp() )
    }})
  }})

  describe('metagrammar', function() { with(this) {
    it('has a choice rule', function() { with(this) {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'choice_expression',
                      ['type', 'Canopy.Compiler.ChoiceExpression',
                        ['sequence',
                          ['label', 'first_expression',
                            ['reference', 'choice_part']],
                          ['label', 'rest_expressions',
                            ['repeat', 1,
                              ['sequence',
                                ['repeat', 1, ['reference', 'space']],
                                ['string', '/'],
                                ['repeat', 1, ['reference', 'space']],
                                ['label', 'expression',
                                  ['reference', 'choice_part']]]]]]]]],

          new Canopy.Compiler('\
            grammar MetaGrammar\
              choice_expression <- first_expression:choice_part\
                                   rest_expressions:(space+ "/" space+ expression:choice_part)+\
                                   <Canopy.Compiler.ChoiceExpression>\
          ').toSexp() )
    }})

    it('has a choice part rule', function() { with(this) {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'choice_part',
                      ['type', 'Canopy.Compiler.ChoicePart',
                        ['sequence',
                          ['choice',
                            ['reference', 'sequence_expression'],
                            ['reference', 'atom']],
                          ['maybe',
                            ['sequence',
                              ['repeat', 1, ['reference', 'space']],
                              ['reference', 'type_expression']]]]]]],

          new Canopy.Compiler('\
            grammar MetaGrammar\
              choice_part <- (sequence_expression / atom) (space+ type_expression)? <Canopy.Compiler.ChoicePart>\
          ').toSexp() )
    }})

    it('has a string rule', function() { with(this) {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'string_expression',
                      ['type', 'Canopy.Compiler.StringExpression',
                        ['sequence',
                          ['string', '"'],
                          ['repeat', 0,
                            ['choice',
                              ['sequence',
                                ['string', '\\'],
                                ['any-char']],
                              ['char-class', '[^"]']]],
                          ['string', '"']]]]],

          new Canopy.Compiler('\
            grammar MetaGrammar\
              string_expression <- "\\"" ("\\\\" . / [^"])* "\\""\
                                   <Canopy.Compiler.StringExpression>\
          ').toSexp() )
    }})

    it('has a char-class rule', function() { with(this) {
      assertEqual(['grammar', 'MetaGrammar',
                    ['rule', 'char_class_expression',
                      ['type', 'Canopy.Compiler.CharClassExpression',
                        ['sequence',
                          ['string', '['],
                          ['maybe', ['string', '^']],
                          ['repeat', 1,
                            ['choice',
                              ['sequence',
                                ['string', '\\'],
                                ['any-char']],
                              ['char-class', '[^\\]]']]],
                          ['string', ']']]]]],

          new Canopy.Compiler('\
            grammar MetaGrammar\
              char_class_expression <- "[" "^"? ("\\\\" . / [^\\]])+ "]"\
                                       <Canopy.Compiler.CharClassExpression>\
          ').toSexp() )
    }})
  }})
}})
