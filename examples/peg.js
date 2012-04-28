load('lib/canopy.js');
load('examples/benchmark.js');
load('examples/pegjs/peg.js');

grammar = 'grammar CompiledPEG\
  \
  grammar             <- space* grammar_name\
                         rules:(space* grammar_rule)+ space*\
  \
  grammar_name        <- "grammar " object_identifier\
  \
  grammar_rule        <- identifier assignment parsing_expression\
  \
  assignment          <- space+ "<-" space+\
  \
  parsing_expression  <- choice_expression / choice_part\
  \
  parenthesised_expression <- "(" space* parsing_expression space* ")"\
  \
  choice_expression   <- first_expression:choice_part\
                         rest_expressions:(space+ "/" space+ expression:choice_part)+\
  \
  choice_part         <- (sequence_expression / sequence_part)\
                         (space+ type_expression)?\
  \
  type_expression     <- "<" object_identifier ">"\
  \
  sequence_expression <- first_expression:sequence_part\
                         rest_expressions:(space+ sequence_part)+\
  \
  sequence_part       <- label? expression:(quantified_atom / atom)\
  \
  quantified_atom     <- atom quantifier\
  \
  atom                <- parenthesised_expression\
                       / predicated_atom\
                       / reference_expression\
                       / string_expression\
                       / any_char_expression\
                       / char_class_expression\
  \
  predicated_atom     <- predicate:("&" / "!") atom\
  \
  reference_expression <- identifier !assignment\
  \
  string_expression   <- "\\"" ("\\\\" . / [^"])* "\\""\
  \
  any_char_expression <- "."\
  \
  char_class_expression <- "[" "^"? ("\\\\" . / [^\\]])+ "]"\
  \
  label               <- identifier ":"\
  \
  object_identifier   <- identifier ("." identifier)*\
  \
  identifier          <- [a-zA-Z_$] [a-zA-Z0-9_$]*\
  \
  quantifier          <- "?" / "*" / "+"\
  \
  space               <- [\\s\\n\\r\\t]';

Canopy.compile(grammar);

benchmark('Canopy parser', 20, function() {
  CompiledPEGParser.parse(grammar);
});

benchmark('PEG.js parser', 20, function() {
  PEGParser.parse(grammar);
});

