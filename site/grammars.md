---
layout: default
---

## Grammar syntax

Canopy grammar definitions are written using standard
[PEG](http://en.wikipedia.org/wiki/Parsing_expression_grammar notation) notation
and stored in files with the `.peg` extension. They _only_ specify the static
grammar of the language and do not contain inline processing code. However, you
can add additional methods to parse trees by [extending nodes](/types.html).

A grammar must have as its first line the word `grammar`, followed by one space
and the name of the grammar. This is followed by a list of rules that define the
grammar; a rule is a name, followed by `<-`, followed by the rule's definition.
A rule name can be any valid ASCII JavaScript variable name. The first rule in
the grammar is the *root*; a document must match this rule to be parsed
correctly.

The details of types of expressions you can use within grammar rules are covered
in detail in the other articles linked on the left.

For example, here's a simple grammar that matches any sequence of digits:

###### digits.peg

    grammar Digits
      digits  <-  [0-9]*

A grammar file is converted into a JavaScript module using the `canopy`
command-line tool:

    $ canopy digits.peg

Rules can contain references to other rules; this is what allows PEG parsers to
process recursive syntaxes. For example, this grammar matches a number
surrounded by any number of *matched* parentheses - this is not possible with
regular expressions.

###### parens.peg

    grammar Parens
      value   <-  "(" value ")" / number
      number  <-  [0-9]+

This generates a parser that processes the language, and throws an error on
invalid input:

```js
var parens = require('./parens')

parens.parse('94')
   == { textValue: '94',
        offset: 0,
        elements: 
         [ { textValue: '9', offset: 0, elements: [] },
           { textValue: '4', offset: 1, elements: [] } ] }

parens.parse('(94)')
   == { textValue: '(94)',
        offset: 0,
        elements: 
         [ { textValue: '(', offset: 0, elements: [] },
           { textValue: '94', offset: 1, elements: [...] },
           { textValue: ')', offset: 3, elements: [] } ] }

parens.parse('(((94)')
Error: Line 1: expected ")"
(((94)
      ^
```

[Read more about cross-references](/references.html).
