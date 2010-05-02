Canopy
======

Canopy is a parser compiler for JavaScript, based on [Parsing Expression
Grammars][1] and heavily influenced by [Treetop][2].

[1]: http://en.wikipedia.org/wiki/Parsing_expression_grammar
[2]: http://treetop.rubyforge.org/


Download
--------

Canopy and the parsers it generates require [JS.Class][3] -- we're building
on top of this in order to support the composition and node typing features
of Treetop, to which Ruby's object system lends itself very well.

You can grap a stable build of Canopy from `bin/canopy-stable.js`; this
build is used to compile Canopy itself during development.

[3]: http://jsclass.jcoglan.com/


Usage
-----

Parsers are generated from grammar definitions; Canopy uses a fairly
standard notation for PEGs. You can create a parser by calling
`Canopy.compile()` with a string containing the grammar for the parser.
The parser's name will be the name of the grammar followed by `Parser`.
For example:

    Canopy.compile('grammar Integer\
      integer <- [1-9] [0-9]*')
    
    IntegerParser.parse('3178')
    
    // -> {textValue: '3178', offset: 0, elements: [
    //      {textValue: '3', offset: 0},
    //      {textValue: '178', offset: 1, elements: [
    //        {textValue: '1', offset: 1},
    //        {textValue: '7', offset: 2},
    //        {textValue: '8', offset: 3}
    //      ]}
    //    ]}

`Canopy.compile()` both evaluates and returns the source code for the
parser it has generated, so you can take that source and save it in a
file for later use. The `bin` directory contains a Rhino script that
generates parser files from grammar files, for example to compile
Canopy's own grammar parser, I do this:

    rhino bin/compile.js source/canopy/meta_grammar.peg


Grammar definitions
-------------------

The grammar definition syntax of Canopy is very straighforward and uses
common PEG idioms. In contrast to other parser compilers, it does not
allow inline code but instead allows you to specify named types for
syntax nodes; these types can refer to modules containing methods you
want to attach to the nodes. A good example grammar is Canopy's metagrammar,
which defines the grammar syntax using the syntax itself. See:

    source/canopy/meta_grammar.peg

A PEG file should contain the name of the grammar, followed by a list
of parsing rules. Each rule maps a name to a parsing expression, the
allowed elements of which are listed below. The first rule is assumed
to be the root of the parse tree, and can have any name you like.


### Strings

A string match produces a single syntax node when the input exactly matches
the string. Strings are enclosed in double quotes and may contain escape
characters.

    grammar StringTest
      root <- "Hello, world"
    
    StringTestParser.parse("Hello, world")
    // -> {textValue: "Hello, world", offset: 0}


### Wildcards

The wildcard character `.` matches any single character.

    grammar WildcardTest
      root <- .
    
    WildcardTestParser.parse("x")
    // -> {textValue: "x", offset: 0}


### Character classes

A character class is a list of characters enclosed in brackets, just like
you'd use in regular expressions. They can contain ranges like `[a-z]` and
are case sensitive.

    grammar CharClassTest
      root <- [0-9]
    
    CharClassTestParser.parse("5")
    // -> {textValue: "5", offset: 0}


### Repetition

Any expression may be followed by one of the repetition characters,
`?`, `*` or `+`, meaning "zero or one", "zero or more" and "one or more"
occurences of the preceeding expression. The `?` operator passes through
the match if one is found, or an empty-string node otherwise. The others
return nodes containing lists of their matches.

    grammar MaybeTest
      root <- "a"?
    
    MaybeTestParser.parse("a")
    // -> {textValue: "a", offset: 0}
    
    MaybeTestParser.parse("")
    // -> {textValue: "", offset: 0}
    
    MaybeTestParser.parse("b")
    // -> null


    grammar ZeroOrMoreTest
      root <- "a"*
    
    ZeroOrMoreTestParser.parse("")
    // -> {textValue: "", offset: 0, elements: []}
    
    ZeroOrMoreTestParser.parse("aa")
    // -> {textValue: "aa", offset: 0, elements: [
    //      {textValue: "a", offset: 0},
    //      {textValue: "a", offset: 1},
    //    ]}


    grammar OneOrMoreTest
      root <- "a"+
    
    OneOrMoreTestParser.parse("")
    // -> null
    
    OneOrMoreTestParser.parse("aa")
    // -> {textValue: "aa", offset: 0, elements: [
    //      {textValue: "a", offset: 0},
    //      {textValue: "a", offset: 1},
    //    ]}


### Lookaheads

Positive and negative lookaheads are denoted by placing `&` or `!` in
front of an expression. A lookahead works by inspecting the input for
a match and then proceeding without consuming input. For example,
the word `foo` followed a space could be written `"foo" &" "`, whereas
a non-space character could be written `!" " .`. If the lookahead fails
then `null` is returned, otherwise an empty-string node is produced.

Note that, for example, when the expression `"foo" &" "` is matched
against the string `"foo "`, the match succeeds but only the string
`"foo"` is consumed. The space remains unconsumed in the input.


### Sequences

A sequence is two or more expressions separated by spaces. The input
matches a sequence only if it matches each expression in the sequence
in turn.

    grammar SequenceTest
      root <- "foo" "bar"
    
    SequenceTestParser.parse("foobar")
    // -> {textValue: "foobar", offset: 0, elements: [
    //      {textValue: "foo", offset: 0},
    //      {textValue: "bar", offset: 3}
    //    ]}
    
    SequenceTestParser.parse("foo")
    // -> null

Items in sequences can be labelled to make the resulting parse tree
easier to navigate. To label an expression, prefix it with a name and
a colon (`:`). The `elements` array is still available, but some data
will be copied to named fields on the sequence node:

    grammar LabelTest
      root <- first:[a-z] (", " letter:[a-z])*
    
    LabelTestParser.parse("a, b, c")
    // -> {textValue: "a, b, c", offset: 0, elements: [
    //      {textValue: "a", offset: 0},
    //      {textValue: ", b, c", offset: 1, elements: [
    //        {textValue: ", b", offset: 1, elements: [
    //          {textValue: ", ", offset: 1},
    //          {textValue: "b", offset: 3}
    //        ],
    //          letter: {textValue: "b", offset: 3}
    //        },
    //        {textValue: ", c", offset: 4, elements: [
    //          {textValue: ", ", offset: 4},
    //          {textValue: "c", offset: 6}
    //        ],
    //          letter: {textValue: "c", offset: 6}
    //        }
    //      ]}
    //    ],
    //      first: {textValue: "a", offset: 0}
    //    }


### References

Referring to other rules is what gives grammars their expressive power,
allowing them to express recursive structures. To refer to another rule,
you just enter its name as part of an expression. When used as part of
a sequence, a reference creates labelled nodes in the output.

    grammar ReferenceTest
      first   <- second "done."
      second  <- "start."
    
    ReferenceTestParser.parse("start.done.")
    // -> {textValue: "start.done.", offset: 0, elements: [
    //      {textValue: "start." offset: 0},
    //      {textValue: "done.", offset: 6}
    //    ],
    //      second: {textValue: "start." offset: 0}
    //    }


### Choices

Choices are lists of expressions separated by " / " and denote a prioritized
choice between several alternatives. The input is matched against each
alternative in turn, and the first match to succeed is kept.

    grammar ChoiceTest
      root <- "foo" / "bar"
    
    ChoiceTestParser.parse("foo")
    // -> {textValue: "foo", offset: 0}
    
    ChoiceTestParser.parse("bar")
    // -> {textValue: "bar", offset: 0}
    
    ChoiceTestParser.parse("abc")
    // -> null

Note that once a choice has succeeded, no further inputs are tried, so
choices are unambiguous. This is true even if the choice causes later
matching to fail, so for example this grammar will never parse the string
`"foobar"` since we always pick the first branch of the choice.

    grammar ChoiceTest
      root <- ("f" / "foo") "bar"

Choices bind more loosely than sequences, for example the expression

    "foo" "bar" / "abc" "123"

should be interpreted as

    ("foo" "bar") / ("abc" "123")


### Type annotations

Expressions can be tagged with types, allowing you to use mixins to add
methods to syntax nodes. Type labels bind to sequences; if you want to
tag a choice then wrap the choice in parentheses.

    grammar TypeTest
      root <- first:"foo" second:"bar" <Extension>
    
    Extension = new JS.Module({
      convert: function() {
        return this.first.textValue +
               this.second.textValue.toUpperCase();
      }
    });
    
    TypeTestParser.parse("foobar").convert()
    // -> "fooBAR"


    grammar ChoiceTypeTest
      root    <- (alpha / beta) <Extension>
      alpha   <- first:"a" second:"z"
      beta    <- first:"j" second:"c"
    
    ChoiceTypeTestParser.parse("az").convert()
    // -> "aZ"
    
    ChoiceTypeTestParser.parse("jc").convert()
    // -> "jC"


License
-------

(The MIT License)

Copyright (c) 2010 James Coglan

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

