---
layout: default
title: Ruby
---

## Ruby

To get an overview of how to use Canopy with Ruby, consider this example
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

We can compile this grammar into a Ruby module using `canopy`:

    $ canopy url.peg --lang ruby

This creates a file called `url.rb` that contains all the parser logic. Let's
try it out:

```rb
require './url'

tree = URL.parse('http://example.com/search?q=hello#page=1')

tree.elements.each do |node|
  puts node.offset, node.text
end

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

```rb
puts tree.elements[4].elements[1].text
# -> 'q=hello'
```

Or, you can use the labels that Canopy generates, which can make your code
clearer:

```rb
puts tree.search.query.text
# -> 'q=hello'
```

## Parsing errors

If you give the parser an input text that does not match the grammar, a
`ParseError` is thrown:

```rb
URL.parse('https://example.com./')

#   Line 1: expected [a-z0-9-] (URL::ParseError)
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

In Ruby, you give the action functions to the parser by using the `actions`
option, which should be an object implementing the named actions:

```rb
require './maps'

class Actions
  def make_map(input, start, _end, elements)
    {elements[1] => elements[3]}
  end

  def make_string(input, start, _end, elements)
    elements[1].text
  end

  def make_list(input, start, _end, elements)
    list = [elements[1]]
    elements[2].each { |el| list << el.value }
    list
  end

  def make_number(input, start, _end, elements)
    input[start..._end].to_i(10)
  end
end

result = Maps.parse("{'ints':[1,2,3]}", :actions => Actions.new)

p result
# -> {"ints"=>[1, 2, 3]}
```

## Extended node types

Say you have a grammar that contains type annotations:

###### words.peg

    grammar Words
      root  <-  first:"foo" second:"bar" <Extension>

To use this parser, you must pass in a module containing implementations of the
named types via the `types` option. Each defined type contains the methods that
will be added to the nodes.

```rb
require './words'

module Types
  module Extension
    def convert
      first.text + second.text.upcase
    end
  end
end

Words.parse('foobar', :types => Types).convert
# -> 'fooBAR'
```
