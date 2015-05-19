---
layout: default
---

## Cross-references

The ability to refer to other parser rules is what gives PEG parsers their
power. A rule can refer to any other rule in the grammar by name, and this has
the effect of using the named rule to match the next piece of input. Here's a
simplified example of using rules to match an email address:

###### email.peg

    grammar Email
      email     <-  username "@" host
      username  <-  [a-z]+ ("." [a-z]+)*
      host      <-  [a-z]+ "." ("com" / "co.uk" / "org" / "net")

```js
require('./email').parse('bob@example.com')
// -> { textValue: 'bob@example.com',
        offset: 0,
        elements: 
         [ { textValue: 'bob', offset: 0, elements: [...] },
           { textValue: '@', offset: 3, elements: [] },
           { textValue: 'example.com', offset: 4, elements: [...] } ],
        username: { textValue: 'bob', offset: 0, elements: [...] },
        host: 
         { textValue: 'example.com',
           offset: 4,
           elements: [...] } }

As you can see in the above parse tree, the rules referenced by the @email@ rule
add named nodes called @username@ and @host@ to the parse tree. This gives you
an easier way to traverse the tree than using the @elements@ array.

```js
var tree = require('./email').parse('bob@example.com');
tree.username.textValue // -> 'bob'
tree.host.textValue     // -> 'example.com'

References allow you to create recursive matchers, which is why PEGs can match
languages that regular expressions typically can't. Here's a grammar for
matching nested lists of numbers:

###### lists.peg

    grammar Lists
      value   <-  list / number
      list    <-  "[" value ("," value)* "]" 
      number  <-  [0-9]

We can parse a string using this grammar and browse the tree it generates:

```js
var tree = require('./lists').parse('[[1,2],3]')

tree.textValue
// -> '[[1,2],3]'

tree.elements[1].textValue
// -> '[1,2]'

tree.elements[1].elements[2].elements[0].elements[1].textValue
// -> '2'
```
