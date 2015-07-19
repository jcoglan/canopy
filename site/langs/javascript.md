---
layout: default
title: JavaScript
---

## JavaScript

To get an overview of how to use Canopy with JavaScript, consider this example
simplified grammar for URLs:

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
works in Node and in the browser. Let's try it out:

```js
var url = require('./url');

var tree = url.parse('http://example.com/search?q=hello#page=1');

tree.elements.forEach(function(node) {
  console.log(node.offset, node.text);
});

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
console.log(tree.elements[4].elements[1].text);
// -> 'q=hello'
```

Or, you can use the labels that Canopy generates, which can make your code
clearer:

```js
console.log(tree.search.query.text);
// -> 'q=hello'
```

## Parsing errors

If you give the parser an input text that does not match the grammar, a
`SyntaxError` is thrown:

```js
url.parse('https://example.com./');

/* SyntaxError: Line 1: expected [a-z0-9-]
   https://example.com./
                       ^                      */
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
var maps = require('./maps');

var actions = {
  make_map: function(input, start, end, elements) {
    var map = {};
    map[elements[1]] = elements[3];
    return map;
  },

  make_string: function(input, start, end, elements) {
    return elements[1].text;
  },

  make_list: function(input, start, end, elements) {
    var list = [elements[1]];
    elements[2].forEach(function(el) { list.push(el.value) });
    return list;
  },

  make_number: function(input, start, end, elements) {
    return parseInt(input.substring(start, end), 10);
  }
};

var result = maps.parse("{'ints':[1,2,3]}", {actions: actions});

console.log(result);
// -> { ints: [ 1, 2, 3 ] }
```

## Extended node types

Say you have a grammar that contains type annotations:

###### words.peg

    grammar Words
      root  <-  first:"foo" second:"bar" <Extension>

To use this parse, you must pass in an object containing implementations of the
named types via the `types` option. Each defined type contains the methods that
will be added to the nodes.

```js
var words = require('./words');

var types = {
  Extension: {
    convert: function() {
      return this.first.text + this.second.text.toUpperCase();
    }
  }
};

words.parse('foobar', {types: types}).convert()
// -> 'fooBAR'
```
