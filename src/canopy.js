'use strict';

var Compiler = require('./compiler');

module.exports = {
  builders: {
    java:       require('./builders/java'),
    javascript: require('./builders/javascript'),
    python:     require('./builders/python'),
    ruby:       require('./builders/ruby')
  },

  compile (grammar, builder) {
    var compiler = new Compiler(grammar, builder);
    return compiler.toSource();
  }
};
