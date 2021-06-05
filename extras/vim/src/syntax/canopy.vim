" Vim syntax file for canopy
" Language:         canopy
" Maintainer:       Brendan

" Quit when a syntax file was already loaded
if exists("b:current_syntax")
  finish
endif

syn keyword canopyKeyword               grammar

syn match   canopyDelimeter             "/" display
syn match   canopyOperator              "[+@!&\*?\.]" display
syn match   canopyOperator              "['\"\]]i\>" display
syn match   canopyLabel                 "\(\h\w*\)\?:" display
syn match   canopyAction                "%\w\+" display
syn match   canopyType                  "<[^>]\+>" display

syn match   canopyRuleOperator          "<-" display contained
syn match   canopyRule                  "\h\w*\s*<-\s*" display contains=canopyRuleOperator
syn match   canopyRule                  "\h\w*["'][^"']*["']\s*<-\s*"
            \ display contains=canopyRuleOperator


syn keyword canopyTodo                  FIXME NOTE NOTES TODO XXX CONSIDER contained
syn match   canopyComment	            "#.*$" contains=canopyTodo,@Spell

syn match   canopyEscape	            +\\[nrt'"\\]+ contained

syn match   canopyRegexOperator         "[+@!?\.]" display contained
syn match   canopyRegexRangeOperator    "[@\.\^\$\-]" display contained
syn region  canopyRegexRange            start="\[" end="\]"
            \ contains=canopyEscape,canopyRegexOperator,canopyRegexRangeOperator

syn region  canopyCaseInsensitiveString start="\z\(`\)" end="\z1"
            \ contains=canopyEscape,@Spell
syn region  canopyString                start="\z\(['\"]\)" end="\z1"
            \ contains=canopyEscape,@Spell

"syn region  canopyOptional              start="\[" end="\]" contains=ALL
syn region  canopyOptional              start="{" end="}" contains=ALL
syn region  canopyGroup                 start="(" end=")" contains=ALL


hi def link canopyRuleOperator		    Operator
hi def link canopyRule                  Function
hi def link canopyLabel                 Keyword
hi def link canopyKeyword               Keyword
hi def link canopyAction		        Function
hi def link canopyType		            Type

hi def link canopyEscape		        Special
hi def link canopyString		        String
hi def link canopyCaseInsensitiveString String

hi def link canopyRegexRange		    SpecialChar
hi def link canopyRegexOperator		    Operator

hi def link canopyOperator		        Operator
hi def link canopyDelimeter		        Delimeter

hi def link canopyTodo			        Todo
hi def link canopyComment		        Comment


let b:current_syntax = "canopy"
