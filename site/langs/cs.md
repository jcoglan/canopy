---
layout: default
title: .Net
---

## .Net

To get an overview of how to use Canopy with .Net/C#, consider this example of a
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

We can compile this grammar into a C# namespace using `canopy`:

    $ canopy url.peg --lang cs

This creates a folder called `url` that contains all the parser logic. The
folder name and location is based on the path to the `.peg` file when you run `canopy`, for
example if you run:

    $ canopy com/jcoglan/canopy/url.peg --lang cs

then you will get the files at the `com/jcoglan/canopy/url` folder under the namespace `canopy.com.jcoglan.canopy.url`. The `--output` option can be used to override this:

    $ canopy com/jcoglan/canopy/url.peg --lang cs --output some/dir/url

This will write the generated files into the directory `some/dir/url`.

Let's try out our parser:

```cs
using System;
using canopy.url;

namespace Example
{
    class CanopyExample {         
        static void Main(string[] args)
        {
            TreeNode tree = URL.parse("http://example.com/search?q=hello#page=1");

            foreach (TreeNode node in tree.elements) {
                System.Console.WriteLine(node.offset + ", " + node.text);
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

```cs
using System;
using canopy.url;

namespace Example
{
    class CanopyExample {         
        static void Main(string[] args)
        {

        TreeNode tree = URL.parse("http://example.com/search?q=hello#page=1");

        System.Console.WriteLine(tree.elements[4].elements[1].text);
        // -> 'q=hello'

        System.Console.WriteLine(tree.get(Label.peg_search).get(Label.peg_query).text);
        // -> 'q=hello'
        }
    }
}
```

## Parsing errors

If you give the parser an input text that does not match the grammar, a
`url.ParseError` is thrown. The error message will list any of the strings or
character classes the parser was expecting to find at the furthest position it
got to, along with the rule those expectations come from, and it will highlight
the line of the input where the syntax error occurs.

```cs
using System;
using canopy.url;

namespace Example
{
    class CanopyExample {         
        static void Main(string[] args)
        {
            TreeNode tree = URL.parse("https://example.com./");
        }
    }
}

/* Unhandled exception. canopy.url.ParseError: Line 1: expected one of:

    - [a-z0-9-] from URL::segment

     1 | https://example.com./ ^ */
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

In C#, compiling the above grammar produces a namespace called `canopy.maps` that
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

```cs
using System;
using System.Collections;
using System.Collections.Generic;
using canopy.maps;

namespace Example
{
    
    public class Pair : TreeNode {
        public Dictionary<String, List<int>> pair;

        public Pair(String key, List<int> value) {
            pair = new Dictionary<String, List<int>>();
            pair[key] = value;
        }

        public override string ToString()
        {
            String ret="{";
            foreach (var kvp in pair) {
                List<String> values = kvp.Value.ConvertAll<string>(x => x.ToString());
                ret += string.Format("{0}=[{1}],", kvp.Key, string.Join( ",", values));
            }
            return ret+"}";
        }
    }

    public class Text : TreeNode {
        public String str;

       public  Text(String str) {
            this.str = str;
        }
    }

    public class Array : TreeNode {
        public List<int> list;

        public Array(List<int> list) {
            this.list = list;
        }
    }

    public class Number : TreeNode {
        public int number;

        public Number(int number) {
            this.number = number;
        }
    }

    public class MapsActions : Actions {
        public TreeNode make_map(String input, int start, int end, List<TreeNode> elements) {
            Text str = (Text)elements[1];
            Array array = (Array)elements[3];
            return new Pair(str.str, array.list);
        }

        public TreeNode make_string(String input, int start, int end, List<TreeNode> elements) {
            return new Text(elements[1].text);
        }

        public TreeNode make_list(String input, int start, int end, List<TreeNode> elements) {
            List<int> list = new List<int>();
            list.Add(((Number)elements[1]).number);
            foreach (TreeNode el in elements[2]) {
                Number number = (Number)el.get(Label.peg_value);
                list.Add(number.number);
            }
            return new Array(list);
        }

        public TreeNode make_number(String input, int start, int end, List<TreeNode> elements) {
            return new Number(Int32.Parse(input.Substring(start, end-start)));
        }
    }

    public class CanopyExample {
        static void Main(string[] args){
            Pair result = (Pair)Maps.parse("{'ints':[1,2,3]}", new MapsActions());
            System.Console.WriteLine(result);
            // -> {ints=[1, 2, 3],}
        }
    }
}
```

## Extended node types

Using the `<Type>` grammar annotation is not supported in the C# version.
