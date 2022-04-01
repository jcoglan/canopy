var Parser = function(input, actions, types) {
  this._input = input;
  this._inputSize = input.length;
  this._actions = actions;
  this._types = types;
  this._offset = 0;
  this._cache = {};
  this._failure = 0;
  this._expected = [];
};

Parser.prototype.parse = function() {
  var tree = this._read_{{root}}();
  if (tree !== FAILURE && this._offset === this._inputSize) {
    return tree;
  }
  if (this._expected.length === 0) {
    this._failure = this._offset;
    this._expected.push([{{{grammar}}}, '<EOF>']);
  }
  this.constructor.lastError = { offset: this._offset, expected: this._expected };
  throw new SyntaxError(formatError(this._input, this._failure, this._expected));
};

Object.assign(Parser.prototype, Grammar);


function parse(input, options) {
  options = options || {};
  var parser = new Parser(input, options.actions, options.types);
  return parser.parse();
}

function formatError(input, offset, expected) {
  var lines = input.split(/\n/g),
      lineNo = 0,
      position = 0;

  while (position <= offset) {
    position += lines[lineNo].length + 1;
    lineNo += 1;
  }

  var line = lines[lineNo - 1],
      message = 'Line ' + lineNo + ': expected one of:\n\n';

  for (var i = 0; i < expected.length; i++) {
    message += '    - ' + expected[i][1] + ' from ' + expected[i][0] + '\n';
  }
  var number = lineNo.toString();
  while (number.length < 6) number = ' ' + number;
  message += '\n' + number + ' | ' + line + '\n';

  position -= line.length + 10;

  while (position < offset) {
    message += ' ';
    position += 1;
  }
  return message + '^';
}

function inherit(subclass, parent) {
  function chain () {};
  chain.prototype = parent.prototype;
  subclass.prototype = new chain();
  subclass.prototype.constructor = subclass;
}


var exported = { Grammar: Grammar, Parser: Parser, parse: parse };

if (typeof require === 'function' && typeof exports === 'object') {
  Object.assign(exports, exported);
} else {
  var ns = (typeof this === 'undefined') ? window : this;
{{#each namespace}}
  ns = ns.{{this}} = ns.{{this}} || {};
{{/each}}
  ns.{{name}} = exported;
}
