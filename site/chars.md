---
layout: default
title: Character classes
---

## Character classes

Character classes work just like their counterparts from regular expressions,
in fact they literally get compiled into identical regexes in the parser.

For example, this grammar matches a single alphanumeric character:

###### alphanum.peg

    grammar Alphanum
      root  <-  [A-Za-z0-9]

This will parse any character matched by the class, and no others:

```js
require('./alphanum').parse('a')
   == { text: 'a', offset: 0, elements: [] }

require('./alphanum').parse('7')
   == { text: '7', offset: 0, elements: [] }

require('./alphanum').parse('!')
SyntaxError: Line 1: expected one of:

    - [A-Za-z0-9] from Alphanum::root

     1 | !
         ^
```

There is a special character class denoted by `.` (period). This matches any
character.

###### anything.peg

    grammar Anything
      root  <-  .

```js
require('./anything').parse('a')
   == { text: 'a', offset: 0, elements: [] }
```
