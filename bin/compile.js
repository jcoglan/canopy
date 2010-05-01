// Liberally borrowed from PEG.js
// Copyright (c) 2010 David Majda

importPackage(java.io);
importPackage(java.lang);

load('vendor/js.class/build/min/core.js');
load('build/stake-min.js');

function readFile(file) {
  var f = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
  
  var result = '', line = '';
  try {
    while ((line = f.readLine()) !== null) {
      result += line + '\n';
    }
  } finally { f.close() }
  
  return result;
}

function writeFile(file, text) {
  var f = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file)));
  try { f.write(text) } finally { f.close() }
}

var startTime  = Number(new Date()),
    inputFile  = arguments[0],
    outputFile = inputFile.replace(/\.peg$/, '.js'),
    grammar    = readFile(inputFile),
    parser     = Stake.compile(grammar),
    endTime    = Number(new Date());

System.out.println('Completed in ' + ((endTime - startTime) / 1000) + 's');
writeFile(outputFile, parser);

