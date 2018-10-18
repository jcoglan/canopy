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

## Implementing actions

Say you have a grammar that uses action annotations, for example:

###### maps.peg

    grammar Maps
      map     <-  "{" string ":" value "}" %make_map
      string  <-  "'" [^']* "'" %make_string
      value   <-  list / number
      list    <-  "[" value ("," value)* "]" %make_list
      number  <-  [0-9]+ %make_number

In Python, you give the action functions to the parser by using the `actions`
keyword argument, which should be an object implementing the named actions:

```py
import maps

class Actions(object):
    def make_map(self, input, start, end, elements):
        return {elements[1]: elements[3]}

    def make_string(self, input, start, end, elements):
        return elements[1].text

    def make_list(self, input, start, end, elements):
        list = [elements[1]]
        for el in elements[2]:
            list.append(el.value)
        return list

    def make_number(self, input, start, end, elements):
        return int(input[start:end], 10)

result = maps.parse("{'ints':[1,2,3]}", actions=Actions())

print result
# -> {'ints': [1, 2, 3]}
```

## Extended node types

Say you have a grammar that contains type annotations:

###### words.peg

    grammar Words
      root  <-  first:"foo" second:"bar" <Extension>

To use this parse, you must pass in an object containing implementations of the
named types via the `types` option. Each defined type contains the methods that
will be added to the nodes.

You can import the types from a module:

```py
# node_types.py

class Extension(object):
    def convert(self):
        return self.first.text + self.second.text.upper()


# example.py

import words
import node_types

words.parse('foobar', types=node_types).convert()
# -> 'fooBAR'
```

Or, you can enclose the extension classes in another class that you pass to the
parser:

```py
import words

class Types:
    class Extension(object):
        def convert(self):
            return self.first.text + self.second.text.upper()

words.parse('foobar', types=Types).convert()
# -> 'fooBAR'
```
