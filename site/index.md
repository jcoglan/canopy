---
layout: default
title: A parser compiler
---

## Canopy, a parser compiler

Canopy is a self-hosting
[PEG](http://en.wikipedia.org/wiki/Parsing_expression_grammar) parser compiler
for JavaScript. It lets you describe the grammar of the language you're trying
to parse using a simple, terse syntax, and it generates a parser for the
language from this definition. Its API and the parse tree format it generates
are heavily influenced by [Treetop](http://treetop.rubyforge.org/).

You can install the command-line tools through `npm`:

    $ npm install -g canopy
