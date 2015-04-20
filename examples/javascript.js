var canopyLisp = require('./canopy/lisp'),
    pegjsLisp  = require('./pegjs/lisp'),
    canopyPEG  = require('./canopy/peg'),
    pegjsPEG   = require('./pegjs/peg'),
    benchmark  = require('benchmark');

var program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))',
    grammar = require('fs').readFileSync(__dirname + '/canopy/peg.peg').toString(),
    suite   = new benchmark.Suite();

suite.add('Canopy Lisp', function() { canopyLisp.parse(program) });
suite.add('PEG.js Lisp', function() { pegjsLisp.parse(program) });

suite.add('Canopy PEG', function() { canopyPEG.parse(grammar) });
suite.add('PEG.js PEG', function() { pegjsPEG.parse(grammar) });

suite.on('complete', function() {
  this.forEach(function(result) { console.log(result.toString()) });
});

suite.run();
