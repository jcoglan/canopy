---
layout: default
title: JavaScript
---

## JavaScript

To get an overview of how to use Canopy with JavaScript, consider this example
of a simplified grammar for URLs:

###### url.peg

    grammar URL
      url       <-  scheme "://" host pathname search hash?
      scheme    <-  "http" "s"?
      host      <-  hostname port?
      hostname  <-  segment ("." segment)*
      segment   <-  [a-z0-9-]+
      port      <-  ":" [0-9]+
      pathname  <-  "/" [^ ?]*
      search    <-  ("?" query:[^ #]*)?
      hash      <-  "#" [^ ]*

We can compile this grammar into a JavaScript module using `canopy`:

    $ canopy url.peg --lang js

This creates a file called `url.js` that contains all the parser logic, and it
works in Node and in the browser. The `--output` option can be used to override
the default location:

    $ canopy url.peg --lang js --output some/dir/url

This will write the generated parser into the file `some/dir/url.js`.

Let's try our parser out:

```js
const url = require('./url')

let tree = url.parse('http://example.com/search?q=hello#page=1')

for (let node of tree) {
  console.log(node.offset, node.text)
}

/*  prints:

    0 'http'
    4 '://'
    7 'example.com'
    18 '/search'
    25 '?q=hello'
    33 '#page=1'      */
```

This little example shows a few important things:

You invoke the parser by calling the module's `parse()` function with a string.
In the browser, you can call `URL.parse()` rather than using `require()`; Canopy
creates a global named after the grammar.

The `parse()` method returns a tree of *nodes*.

Each node has three properties:

* `text`, the snippet of the input text that node represents
* `offset`, the number of characters into the input text the node appears
* `elements`, an array of nodes matching the sub-expressions

## Walking the parse tree

You can use `elements` to walk into the structure of the tree:

```js
console.log(tree.elements[4].elements[1].text)
// -> 'q=hello'
```

Or, you can use the labels that Canopy generates, which can make your code
clearer:

```js
console.log(tree.search.query.text)
// -> 'q=hello'
```

## Parsing errors

If you give the parser an input text that does not match the grammar, a
`SyntaxError` is thrown. The error message will list any of the strings or
character classes the parser was expecting to find at the furthest position it
got to, along with the rule those expectations come from, and it will highlight
the line of the input where the syntax error occurs.

```js
url.parse('https://example.com./')

// SyntaxError: Line 1: expected one of:
//
//     - [a-z0-9-] from URL::segment
//
//      1 | https://example.com./
//                              ^
```

## Implementing actions

Say you have a grammar that uses action annotations, for example:

###### maps.peg

    grammar Maps
      map     <-  "{" string ":" value "}" %make_map
      string  <-  "'" [^']* "'" %make_string
      value   <-  list / number
      list    <-  "[" value ("," value)* "]" %make_list
      number  <-  [0-9]+ %make_number

In JavaScript, you give the action functions to the parser by using the
`actions` option, which should be an object implementing the named actions:

```js
const maps = require('./maps')

const actions = {
  make_map (input, start, end, [_, key, __, value]) {
    let map = {}
    map[key] = value
    return map
  },

  make_string (input, start, end, [_, string]) {
    return string.text
  },

  make_list (input, start, end, [_, first, rest]) {
    rest = [...rest].map((el) => el.value)
    return [first, ...rest]
  },

  make_number (input, start, end, _) {
    return parseInt(input.substring(start, end), 10)
  }
}

let result = maps.parse("{'ints':[1,2,3]}", { actions })

console.log(result)
// -> { ints: [ 1, 2, 3 ] }
```

## Extended node types

Say you have a grammar that contains type annotations:

###### words.peg

    grammar Words
      root  <-  first:"foo" second:"bar" <Extension>

To use this parser, you must pass in an object containing implementations of the
named types via the `types` option. Each defined type contains the methods that
will be added to the nodes.

```js
const words = require('./words')

const types = {
  Extension: {
    convert () {
      return this.first.text + this.second.text.toUpperCase()
    }
  }
}

words.parse('foobar', { types }).convert()
// -> 'fooBAR'
```
