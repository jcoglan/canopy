var canopyLisp = require('./canopy/lisp'),
    pegjsLisp  = require('./pegjs/lisp'),
    benchmark  = require('benchmark');

var program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))',
    suite   = new benchmark.Suite();

suite.add('Canopy', function() { canopyLisp.parse(program) });

suite.add('PEG.js', function() { pegjsLisp.parse(program) });

suite.on('complete', function() {
  this.forEach(function(result) { console.log(result.toString()) });
});

suite.run();
