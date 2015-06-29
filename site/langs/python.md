---
layout: default
title: Python
---

## Python

To get an overview of how to use Canopy with Python, consider this example
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

We can compile this grammar into a Python module using `canopy`:

    $ canopy url.peg --lang python

This creates a file called `url.py` that contains all the parser logic. Let's
try it out:

```py
import url

tree = url.parse('http://example.com/search?q=hello#page=1')

for node in tree.elements:
    print node.offset, node.text

#   prints:

#   0 http
#   4 ://
#   7 example.com
#   18 /search
#   25 ?q=hello
#   33 #page=1
```

This little example shows a few important things:

You invoke the parser by calling the module's `parse()` function with a string.

The `parse()` method returns a tree of *nodes*.

Each node has three properties:

* `text`, the snippet of the input text that node represents
* `offset`, the number of characters into the input text the node appears
* `elements`, an array of nodes matching the sub-expressions

## Walking the parse tree

You can use `elements` to walk into the structure of the tree:

```py
print tree.elements[4].elements[1].text
# -> 'q=hello'
```

Or, you can use the labels that Canopy generates, which can make your code
clearer:

```py
print tree.search.query.text
# -> 'q=hello'
```

## Parsing errors

If you give the parser an input text that does not match the grammar, a
`ParseError` is thrown:

```py
url.parse('https://example.com./')

#   url.ParseError: Line 1: expected [a-z0-9-]
#   https://example.com./
#                       ^
```
