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
    this._expected.push('<EOF>');
  }
  this.constructor.lastError = {offset: this._offset, expected: this._expected};
  throw new SyntaxError(formatError(this._input, this._failure, this._expected));
};

var parse = function(input, options) {
  options = options || {};
  var parser = new Parser(input, options.actions, options.types);
  return parser.parse();
};
Object.assign(Parser.prototype, Grammar);

var exported = {Grammar: Grammar, Parser: Parser, parse: parse};

if (typeof require === 'function' && typeof exports === 'object') {
  Object.assign(exports, exported);
} else {
  var ns = (typeof this !== 'undefined') ? this : window;
{{#each namespace}}
  ns = ns.{{this}} = ns.{{this}} || {};
{{/each}}
  ns.{{name}} = exported;
}
