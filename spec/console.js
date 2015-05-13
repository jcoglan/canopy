if (this.ActiveXObject)
  load = function(path) {
    var fso = new ActiveXObject('Scripting.FileSystemObject'), file, runner
    try {
      file   = fso.OpenTextFile(path)
      runner = function() { eval(file.ReadAll()) }
      runner()
    } finally {
      try { if (file) file.Close() } catch (e) {}
    }
  };

if (typeof require === 'function') {
  global.JS = require('../node_modules/jstest/jstest')
  JS.ENV.Canopy = require('../lib/canopy')
  require('./runner')
} else {
  load('node_modules/jstest/jstest.js')
  load('lib/canopy-min.js')
  load('spec/runner.js')
}
