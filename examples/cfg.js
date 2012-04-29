var canopyPEG = require('./canopy/peg'),
    pegjsPEG  = require('./pegjs/peg'),
    benchmark = require('./benchmark');

program = require('fs').readFileSync(__dirname + '/canopy/peg.peg').toString();

benchmark('PEG.js parser', 200, function() {
  pegjsPEG.parse(program);
});

benchmark('Canopy parser', 200, function() {
  canopyPEG.parse(program);
});

