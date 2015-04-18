var canopyPEG = require('./canopy/peg'),
    pegjsPEG  = require('./pegjs/peg'),
    benchmark = require('benchmark');

var program = require('fs').readFileSync(__dirname + '/canopy/peg.peg').toString(),
    suite   = new benchmark.Suite();

suite.add('Canopy', function() { canopyPEG.parse(program) });

suite.add('PEG.js', function() { pegjsPEG.parse(program) });

suite.on('complete', function() {
  this.forEach(function(result) { console.log(result.toString()) });
});

suite.run();
