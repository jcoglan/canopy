'use strict'

var canopy    = require('../source/canopy'),
    jsBuilder = require('../source/canopy/builders/javascript'),
    jstest    = require('jstest')

module.exports = new jstest.Module({
  assertParse: function(tuple, actual) {
    this.__wrapAssertion__(function() {
      this.assertEqual( tuple[0], actual.text )
      this.assertEqual( tuple[1], actual.offset )

      if (!tuple[2]) return;
      this.assertEqual( tuple[2].length, actual.elements.length )
      for (var i = 0, n = tuple[2].length; i < n; i++)
        this.assertParse( tuple[2][i], actual.elements[i] )

      if (!tuple[3]) return;
      for (var key in tuple[3])
        this.assertParse( tuple[3][key], actual[key] )
    })
  },

  extend: {
    compile: function(grammar) {
      var builder = jsBuilder.create('testfile')
      var source = canopy.compile(grammar, builder)
      eval(source.testfile)
    }
  }
})
