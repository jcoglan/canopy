// Liberally borrowed from PEG.js
// Copyright (c) 2010 David Majda

require('./js.class');
require('./canopy-stable');

var fs  = require('fs'),
    sys = require('sys');

var startTime  = Number(new Date()),
    inputFile  = process.ARGV[2],
    outputFile = inputFile.replace(/\.peg$/, '.js');

fs.readFile(inputFile, function(err, grammar) {
  var parser   = Canopy.compile(grammar.toString()),
      endTime  = Number(new Date());
  
  fs.writeFile(outputFile, parser, function(err) {
    sys.puts('Completed in ' + ((endTime - startTime) / 1000) + 's');
  });
});

