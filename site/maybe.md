---
layout: default
title: Optional nodes
---

## Optional nodes

To make a node optional, follow it immediately with a `?`, with no space between
the node and the `?` symbol.

Here's a grammar that matches `"future"` or the empty string:

###### future.peg

    grammar Future
      root  <-  "future"?

Here's a grammar that matches any digit or the empty string:

###### digit.peg

    grammar Digit
      root  <-  [0-9]?

If the optional node is not found in the input, an empty syntax node is
returned. Remember an optional node either matches the node or nothing at all;
other input will cause an error.

```js
require('./future').parse('future')
   == { text: 'future', offset: 0, elements: [] }

require('./future').parse('')
   == { text: '', offset: 0, elements: [] }

require('./future').parse('perfect')
SyntaxError: Line 1: expected one of:

    - "future" from Future::root

     1 | perfect
         ^
```
