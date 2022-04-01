---
layout: default
title: Java
---

## Java

To get an overview of how to use Canopy with Java, consider this example of a
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

We can compile this grammar into a Java package using `canopy`:

    $ canopy url.peg --lang java

This creates a package called `url` that contains all the parser logic. The
package name is based on the path to the `.peg` file when you run `canopy`, for
example if you run:

    $ canopy com/jcoglan/canopy/url.peg --lang java

then you will get a package named `com.jcoglan.canopy.url`. The `--output`
option can be used to override this:

    $ canopy com/jcoglan/canopy/url.peg --lang java --output some/dir/url

This will write the generated files into the directory `some/dir/url` with the
package name `some.dir.url`.

Let's try out our parser:

```java
import url.URL;
import url.TreeNode;
import url.ParseError;

public class Example {
    public static void main(String[] args) throws ParseError {
        TreeNode tree = URL.parse("http://example.com/search?q=hello#page=1");

        for (TreeNode node : tree.elements) {
            System.out.println(node.offset + ", " + node.text);
        }

        /*  prints:

            0, http
            4, ://
            7, example.com
            18, /search
            25, ?q=hello
            33, #page=1       */
    }
}
```

This little example shows a few important things:

You invoke the parser by calling the module's `parse()` function with a string.

The `parse()` method returns a tree of *nodes*.

Each node has three properties:

* `String text`, the snippet of the input text that node represents
* `int offset`, the number of characters into the input text the node appears
* `List<TreeNode> elements`, an array of nodes matching the sub-expressions

## Walking the parse tree

You can use `elements` to walk into the structure of the tree, or, you can use
the labels that Canopy generates, which can make your code clearer:

```java
import url.URL;
import url.TreeNode;
import url.ParseError;
import url.Label;

public class Example {
    public static void main(String[] args) throws ParseError {
        TreeNode tree = URL.parse("http://example.com/search?q=hello#page=1");

        System.out.println(tree.elements.get(4).elements.get(1).text);
        // -> 'q=hello'

        System.out.println(tree.get(Label.search).get(Label.query).text);
        // -> 'q=hello'
    }
}
```

## Parsing errors

If you give the parser an input text that does not match the grammar, a
`url.ParseError` is thrown. The error message will list any of the strings or
character classes the parser was expecting to find at the furthest position it
got to, along with the rule those expectations come from, and it will highlight
the line of the input where the syntax error occurs.

```java
import url.URL;
import url.TreeNode;
import url.ParseError;

public class Example {
    public static void main(String[] args) throws ParseError {
        TreeNode tree = URL.parse("https://example.com./");
    }
}

// url.ParseError: Line 1: expected one of:
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

In Java, compiling the above grammar produces a package called `maps` that
contains classes called `Maps`, `TreeNode` and `ParseError`, an enum called
`Label` and an interface called `Actions`. You supply the action functions to
the parser by implementing the `Actions` interface, which has one method for
each action named in the grammar, each of which must return a `TreeNode`.
`TreeNode` has a no-argument constructor so making subclasses of it is
relatively easy.

The following example parses the input `{'ints':[1,2,3]}`. It defines one
`TreeNode` subclass for each kind of value in the tree:

* `Pair` wraps a `Map<String, List<Integer>>`
* `Text` wraps a `String`
* `Array` wraps a `List<Integer>`
* `Number` wraps an `int`

It then implements the `Actions` interface to generate values of these types
from the parser matches.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import maps.Actions;
import maps.Label;
import maps.Maps;
import maps.ParseError;
import maps.TreeNode;

class Pair extends TreeNode {
    Map<String, List<Integer>> pair;

    Pair(String key, List<Integer> value) {
        pair = new HashMap<String, List<Integer>>();
        pair.put(key, value);
    }
}

class Text extends TreeNode {
    String string;

    Text(String string) {
        this.string = string;
    }
}

class Array extends TreeNode {
    List<Integer> list;

    Array(List<Integer> list) {
        this.list = list;
    }
}

class Number extends TreeNode {
    int number;

    Number(int number) {
        this.number = number;
    }
}

class MapsActions implements Actions {
    public Pair make_map(String input, int start, int end, List<TreeNode> elements) {
        Text string = (Text)elements.get(1);
        Array array = (Array)elements.get(3);
        return new Pair(string.string, array.list);
    }

    public Text make_string(String input, int start, int end, List<TreeNode> elements) {
        return new Text(elements.get(1).text);
    }

    public Array make_list(String input, int start, int end, List<TreeNode> elements) {
        List<Integer> list = new ArrayList<Integer>();
        list.add(((Number)elements.get(1)).number);
        for (TreeNode el : elements.get(2)) {
            Number number = (Number)el.get(Label.value);
            list.add(number.number);
        }
        return new Array(list);
    }

    public Number make_number(String input, int start, int end, List<TreeNode> elements) {
        return new Number(Integer.parseInt(input.substring(start, end), 10));
    }
}

public class Example {
    public static void main(String[] args) throws ParseError {
        Pair result = (Pair)Maps.parse("{'ints':[1,2,3]}", new MapsActions());

        System.out.println(result.pair);
        // -> {ints=[1, 2, 3]}
    }
}
```

## Extended node types

Using the `<Type>` grammar annotation is not supported in the Java version.
