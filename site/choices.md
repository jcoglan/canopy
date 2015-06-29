---
layout: default
title: Ordered choices
---

## Ordered choices

Choices are used to denote places where there is more than one possible syntax
for the input to follow. For example the following grammar matches either the
string `"hello"` or the string `"world"`:

###### choice.peg

    grammar Choice
      root  <-  "hello" / "world"

The important thing about choices in PEG grammars is that they're *ordered*.
This means that the options are tried in order and the first choice that leads
to a successful parse is kept. If this choice results in a parsing error later
on in the input, the parser does not backtrack and try any other choices, the
parse simply fails.

The choice operator binds more loosely than the sequencing operator, for example
the following grammar matches either the string `"DouglasAdams"` or the string
`"HitchhikersGuide"`:

###### binding.peg

    grammar Binding
      root  <-  "Douglas" "Adams" / "Hitchhikers" "Guide"

If you just want the choice to be between the nodes right next to the `/`
operator, you need to parenthesize them. This grammar matches
`"DouglasAdamsGuide"` or `"DouglasHitchhikersGuide"`:

###### binding.peg

    grammar Binding
      root  <-  "Douglas" ("Adams" / "Hitchhikers") "Guide"
