'use strict';

var Compiler = require('./canopy/compiler');

module.exports = {
  builders: {
    java:       require('./canopy/builders/java'),
    javascript: require('./canopy/builders/javascript'),
    python:     require('./canopy/builders/python'),
    ruby:       require('./canopy/builders/ruby')
  },

  compile: function(grammar, builder) {
    var compiler = new Compiler(grammar, builder);
    return compiler.toSource();
  }
};
