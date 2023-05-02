---
layout: default
title: Sequences
---

## Sequences

A sequence is just what is sounds like: one or more nodes, listed one after the
other, separated by at least one whitespace character. A sequence matches the
input if the input contains matches for each of the sequence's nodes, in order.

For example, here's a grammar that matches an optional word followed by two more
required words:

###### hamlet.peg

    grammar Hamlet
      root  <-  "not "? "to be"

The sequence here is formed of two nodes: `"not "?` and `"to be"`. Here's the
resulting parses of the possible inputs:

```js
require('./hamlet').parse('to be')
   == { text: 'to be',
        offset: 0,
        elements: [
          { text: '', offset: 0, elements: [] },
          { text: 'to be', offset: 0, elements: [] }
        ] }

require('./hamlet').parse('not to be')
   == { text: 'not to be',
        offset: 0,
        elements: [
          { text: 'not ', offset: 0, elements: [] },
          { text: 'to be', offset: 4, elements: [] }
        ] }

require('./hamlet').parse('or not to be')
SyntaxError: Line 1: expected one of:

    - "not " from Hamlet::root
    - "to be" from Hamlet::root

     1 | or not to be
         ^
```

## Labelled nodes

Sequences have a special property: their child nodes can be labelled. You can
explicitly add a label to any item within a sequence, and
[cross-references](/references.html) are implicitly labelled with the name of
the reference. For example, take the following example that matches documents
that look like `{'abc' => 123}`:

###### hash.peg

    grammar Hash
      object  <-  "{" string " => " number:[0-9]+ "}"
      string  <-  "'" [^']* "'"

The `object` rule is a sequence containing five children:

* `"{"`
* `string`
* `" => "`
* `number:[0-9]+`
* `"}"`

The `string` node is a reference to another rule, and `number:[0-9]+` is a
labelled expression that matches one or more digits. These two children create
labelled nodes in the output:

```js
let tree = require('./hash').parse("{'foo' => 36}")

   == { text: "{'foo' => 36}",
        offset: 0,
        elements: [
          { text: '{', offset: 0, elements: [] },
          { text: "'foo'", offset: 1, elements: [...] },
          { text: ' => ', offset: 6, elements: [] },
          { text: '36', offset: 10, elements: [...] },
          { text: '}', offset: 12, elements: [] }
        ],
        string: { text: "'foo'", offset: 1, elements: [...] },
        number: { text: '36', offset: 10, elements: [...] } }

tree.string.text
   == "'foo'"

tree.number.text
   == "36"
```

Here we see that `tree.string` is the same as `tree.elements[1]`, and
`tree.number` is the same as `tree.elements[3]`. These labels make it much
easier to navigate the tree, and reduce the amount you need to change your code
if elements are added or removed from a sequence.

## Muting

To make it more convenient to work with parse trees, we can label expressions in
the grammar as _muted_, meaning they won't generate nodes in the output. For
example, in the grammar above, the `"{"`, `" => "` and `"}"` items don't contain
meaningful information and we can mute them by placing a `@` symbol before them.

###### hash.peg

    grammar Hash
      object  <-  @"{" string @" => " number:[0-9]+ @"}"
      string  <-  "'" [^']* "'"

Now, the nodes for those elements will be excluded from the parse tree.

```js
require('./hash').parse("{'foo' => 36}")

   == { text: "{'foo' => 36}",
        offset: 0,
        elements: [
          { text: "'foo'", offset: 1, elements: [...] },
          { text: '36', offset: 10, elements: [...] }
        ],
        string: { text: "'foo'", offset: 1, elements: [...] },
        number: { text: '36', offset: 10, elements: [...] } }
```

Muted items are also excluded from the `elements` array that is passed to
[tree-building functions](/types.html).
