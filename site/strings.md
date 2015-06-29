---
layout: default
title: Matching strings
---

## Matching strings

The most basic type of node in PEG grammars is the literal string match. This
grammar will only match the string `"I like parsers"` and nothing else.

###### parsers.peg

    grammar Parsers
      root  <-  "I like parsers"

Strings are delimited with double quotes. A string node is a *terminal* -- it
has no child nodes.

```js
require('./parsers').parse('I like parsers')
   == { text: 'I like parsers',
        offset: 0,
        elements: [] }

require('./parsers').parse('this is not valid')
Error: Line 1: expected "I like parsers"
this is not valid
^

require('./parsers').parse('I like PARSERS')
Error: Line 1: expected "I like parsers"
I like PARSERS
^
```

As you can see from the last example, strings are case-sensitive. You can create
case-insensitive strings by quoting the string with backticks:

###### parsers.peg

    grammar Parsers
      root  <-  `I like parsers`

It will then match any casing of the input:

```js
require('./parsers').parse('I like PARSERS')
   == { text: 'I like PARSERS',
        offset: 0,
        elements: [] }
```
