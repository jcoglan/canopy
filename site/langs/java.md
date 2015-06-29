---
layout: default
title: Java
---

## Java

To get an overview of how to use Canopy with Java, consider this example
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

then you will get a package named `com.jcoglan.canopy.url`. Let's try it out:

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
`ParseError` is thrown:

```java
import url.URL;
import url.TreeNode;
import url.ParseError;

public class Example {
    public static void main(String[] args) throws ParseError {
        TreeNode tree = URL.parse("https://example.com./");
    }
}

/*  prints:

    url.ParseError: Line 1: expected [[a-z0-9-]]
    https://example.com./
                        ^                             */
```
