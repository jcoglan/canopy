load('vendor/js.class/build/min/core.js');
load('build/stake-min.js');
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

Stake.compile(grammar);
CombinatorLispParser = Stake.generate(grammar);

program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))';

benchmark('Compiled parser', 20, function() {
  CompiledLispParser.parse(program);
});

benchmark('Combinator parser', 20, function() {
  CombinatorLispParser.parse(program);
});

benchmark('PEG.js parser', 20, function() {
  LispParser.parse(program);
});

