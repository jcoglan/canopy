---
layout: default
title: Repeated nodes
---

## Repeated nodes

Canopy offers the well-known `*` and `+` operators from regular expressions,
meaning "zero or more" and "one or more" respectively. Placing them after a node
allows the node to repeat the desired number of times.

Here's a grammar that matches the word `badger` one or more times:

###### badger.peg

    grammar Badger
      root  <-  "badger"+

When a repetition matches the input, you get one node for the repetition itself,
and one child node for each *instance* in the repetition. If there aren't enough
repetitions (for example if there's not at least one match for a `+` rule)
you'll get an error.

```js
require('./badger').parse('badgerbadgerbadger')
   == { text: 'badgerbadgerbadger',
        offset: 0,
        elements: [
          { text: 'badger', offset: 0, elements: [] },
          { text: 'badger', offset: 6, elements: [] },
          { text: 'badger', offset: 12, elements: [] }
        ] }

require('./badger').parse('bad')
SyntaxError: Line 1: expected one of:

    - "badger" from Badger::root

     1 | bad
         ^
```

Canopy also supports numeric repetition, which takes the following forms:

- `expr{n}` matches `expr` exactly `n` times
- `expr{n,}` matches `expr` at least `n` times
- `expr{n,m}` matches `expr` at least `n` times and at most `m` times

For example, this grammar accepts the word `badger` repeated 3, 4 or 5 times:

###### badger.peg

    grammar Badger
      root  <-  "badger"{3,5}
