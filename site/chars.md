---
layout: default
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
   == { textValue: 'a', offset: 0, elements: [] }

require('./alphanum').parse('7')
   == { textValue: '7', offset: 0, elements: [] }

require('./alphanum').parse('!')
Error: Line 1: expected [A-Za-z0-9]
!
^
```

There is a special character class denoted by `.` (period). This matches any
character.

###### anything.peg

    grammar Anything
      root  <-  .

```js
require('./anything').parse('a')
   == { textValue: 'a', offset: 0, elements: [] }
```
