require('./js.class');
require('./canopy-stable');

var fs  = require('fs'),
    sys = require('sys');

var startTime  = Number(new Date()),
    inputFile  = process.ARGV[2],
    outputFile = inputFile.replace(/\.peg$/, '.js');

fs.readFile(inputFile, function(err, grammar) {
  if (err) return sys.puts('Could not read source file: ' + inputFile);
  
  var parser   = Canopy.compile(grammar.toString()),
      endTime  = Number(new Date());
  
  fs.writeFile(outputFile, parser, function(err) {
    if (err) return sys.puts('Could not write to output file: ' + outputFile);
    
    sys.puts('Generated parser in ' + outputFile);
    sys.puts('Completed in ' + ((endTime - startTime) / 1000) + 's');
  });
});

