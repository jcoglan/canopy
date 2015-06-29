---
layout: default
title: Building parse trees
---

## Building parse trees

The syntax nodes produced by Canopy by default are all of the same 'type'.  They
all have a `text`, an `offset` and a (possibly empty) list of `elements`. But
you can add your own methods to them to add new functionality to the parse tree.

This is done by annotating parsing expressions with types. A type is any valid
JavaScript object name like `Foo.Bar` surrounded with pointy brackets. When
the input matches this expression, the generated syntax node will be augmented
with the methods from the named type.

Let's take a simple example: matching a string literal:

###### strings.peg

    grammar Strings
      root  <-  "hello" <HelloNode>

```js
var strings = require('./strings');

strings.Parser.HelloNode = {
  upcase: function() {
    return this.text.toUpperCase();
  }
};

var tree = strings.parse('hello');
console.log(tree.upcase());
```

What we're doing here is saying, in the grammar, that a node matching `hello`
is of type `HelloNode`. Then in our JavaScript code, we add the `HelloNode`
module to the parser, and use the parser to process a string.

Because the string matches our typed rule, it gains the methods from the
`HelloNode` module, and we can invoke those methods on the node.

Let's run this script:

    $ node strings_test.js
    HELLO

Notice how the `HelloNode` module is added to the parser, rather than being a
global. This makes sure it works properly in CommonJS environments without
introducing global variables. In the browser, the `grammar Strings` line means
the parser is referred to as `StringsParser`, and you'd add your node types to
that:

```js
StringsParser.HelloNode = {
  upcase: function() { ... }
};

var tree = StringsParser.parse('hello');
```

In the grammar syntax, type annotations bind to sequences. That is, a type
annotation may only appear at the end of a sequence expression, and binds
tighter than choice expressions.

For example the following means that a node matching the sequence
`"foo" "bar"` will be augmented with the `Extension` methods.

###### types.peg

    grammar Types
      root  <-  first:"foo" second:"bar" <Extension>

The extension methods have access to the labelled node from the sequence.

```js
var types = require('./types');

types.Parser.Extension = {
  convert: function() {
    return this.first.text +
           this.second.text.toUpperCase();
  }
};

types.parse('foobar').convert()
   == 'fooBAR'
```

Because type annotations bind to sequences rather than to choices, the
following matches either the string `"abc"` which gains the `Foo` type, or
`"123"` which gains the `Bar` type:

###### sequences.peg

    grammar Choice
      root  <-  "a" "b" "c" <Foo> / "1" "2" "3" <Bar>

If you want all the branches of a choice to be augmented with the same type,
you need to parenthesize the choice and place the type afterward.

###### choices.peg

    grammar Choices
      root    <-  (alpha / beta) <Extension>
      alpha   <-  first:"a" second:"z"
      beta    <-  first:"j" second:"c"

```js
var choices = require('./choices');

choices.Parser.Extension = {
  convert: function() {
    return this.first.text +
           this.second.text.toUpperCase();
  }
};

choices.parse('az').convert()
   == 'aZ'

choices.parse('jc').convert()
   == 'jC'
```
