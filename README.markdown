Stake
=====

Stake is a parser generator for JavaScript. It's very alpha right
now, being a yak-shaving exercise to help me introduce Internet
Explorer to the gentle pleasures of XPath DOM queries. Hopefully
it'll end up in [Terminus][1], an attempt at a cross-browser
scripting driver for [Capybara][2].

[1]: http://github.com/jcoglan/terminus
[2]: http://github.com/jnicklas/capybara


Installation
------------

Stake requires [JS.Class][3]. There is no good reason for this
aside from some vague whim I have that it'll need to support Treetop
style mixins at some ill-defined point in the future. Actually its
inheritance stuff is kinda helping.

Also you need Rubygems and [Jake][4].

    $ git clone git://github.com/jcoglan/stake.git
    $ cd stake
    $ jake
    $ cp build/stake-min.js path/to/your/project

It should work in all browsers though I've not tried it yet. The
specs pass on SpiderMonkey and Rhino, I know that much.

[3]: http://jsclass.jcoglan.com
[4]: http://github.com/jcoglan/jake


Usage
-----

At present there is but the merest hint of an API. There is no grammar
definition language yet, but it supports various basic PEG-style
generations using s-expressions to generate parser combinators. For
example to make a parser that recognises the string "a":

    var aParser = Stake.Parser.fromSexp(['string', 'a'])

The full range of parsing expressions is:

* `['char-class', x]` makes a character class parser, for example
  `['char-class', '[0-9]']` makes a parser that recognizes any digit.
* `['choice', x ...]` takes one or more expressions and makes a parser
  that tries each subparser in turn until one works.
* `['maybe', x]` will parse `x` if it is present; it's the equivalent
  of a `?` operator in regular expressions.
* `['not', x]` makes a negative-lookahead parser that checks the input
  does not match `x` but does not consume any input.
* `['repeat', n, x]` takes a number and a parsing expression, and
  parses input that matches the subparser at least `n` times.
* `['sequence', x ...]` takes one or more expressions and makes a
  parser that accepts input that matches each subexpression in turn.
* `['string', x]` makes a parser that only matches the string `x`.

Parsing output is in the form of a tree of nodes, inspired by [Treetop][5].
For example, here's a parser that matches positive integers:

[5]: http://treetop.rubyforge.org/

    var intParser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['char-class', '[1-9]'],
                      ['repeat', 0, ['char-class', '[0-9]']]])

And here's what you get when you use it:

    intParser.parse('3718')
    
    {
      textValue: '3718',
      offset: 0,
      elements: [
        {textValue: '3', offset: 0, elements: []},
        {
          textValue: '718',
          offset: 1,
          elements: [
            {textValue: '7', offset: 1, elements: []},
            {textValue: '1', offset: 2, elements: []},
            {textValue: '8', offset: 3, elements: []}
          ]
        }
      ]
    }


License
-------

(The MIT License)

Copyright (c) 2010 James Coglan

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

