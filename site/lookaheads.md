---
layout: default
---

## Lookaheads

Lookaheads, denoted by the `&` and `!` characters, can be used to check the next
piece of input without consuming it. The expression `&expr` matches if the next
piece of input matches `expr`, and `!expr` matches if the input does *not* match
`expr`.

For example, this rule matches the word `television` followed by a colon, but
does not consume the colon:

    tv   <-  "television" &":"

This rule matches any number of non-space characters, by first checking the next
character using a negative lookahead and then consuming it with the wildcard
operator:

    nonspace   <-  (!" " .)*

The lookahead operators do not have to be followed by strings, they can be used
with any other type of parsing expression.
