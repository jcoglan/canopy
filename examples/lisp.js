load('lib/canopy.js');
load('examples/benchmark.js');
load('examples/pegjs/lisp.js');

grammar = 'grammar CompiledLisp                       \
                                                      \
    program   <- cell+                                \
    cell      <- space* data:(list / atom) space*     \
    list      <- "(" cells:cell+ ")"                  \
    atom      <- boolean / integer / string / symbol  \
    boolean   <- "#t" / "#f"                          \
    integer   <- [1-9] [0-9]*                         \
    string    <- "\\"" ("\\\\" . / [^"])* "\\""       \
    symbol    <- (!delimiter .)+                      \
    space     <- [\\s\\n\\r\\t]                       \
    paren     <- "(" / ")"                            \
    delimiter <- paren / space                        ';

Canopy.compile(grammar);

program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))';

benchmark('Canopy parser', 500, function() {
  CompiledLispParser.parse(program);
});

benchmark('PEG.js parser', 500, function() {
  LispParser.parse(program);
});

