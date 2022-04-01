function {{name}} (text, offset, elements) {
  this.text = text;
  this.offset = offset;
  this.elements = elements;
}

{{name}}.prototype.forEach = function (block, context) {
  for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
    block.call(context, el[i], i, el);
  }
};

if (typeof Symbol !== 'undefined' && Symbol.iterator) {
  {{name}}.prototype[Symbol.iterator] = function () {
    return this.elements[Symbol.iterator]();
  };
}
