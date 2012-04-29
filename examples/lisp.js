var canopyLisp = require('./canopy/lisp'),
    pegjsLisp  = require('./pegjs/lisp'),
    benchmark  = require('./benchmark');

program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))';

benchmark('PEG.js parser', 5000, function() {
  pegjsLisp.parse(program);
});

benchmark('Canopy parser', 5000, function() {
  canopyLisp.parse(program);
});

