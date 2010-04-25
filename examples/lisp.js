load('vendor/js.class/build/min/core.js');
load('build/stake-min.js');

LispParser = Stake.compile('                          \
  grammar Lisp                                        \
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
    delimiter <- paren / space                        \
');

