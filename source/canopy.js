<%= license %>

if (typeof Canopy === 'undefined')
  Canopy = new JS.Module('Canopy');

Canopy.extend({
  compile: function(grammar) {
    var compiler = new this.Compiler(grammar),
        source   = compiler.toSource();
    
    eval(source);
    return source;
  },
  
  forEach: function(list, block, context) {
    for (var i = 0, n = list.length; i < n; i++)
      block.call(context, list[i], i);
  },
  
  formatError: function(error) {
    var lines    = error.input.split(/\n/g),
        lineNo   = 0,
        offset   = 0;
    
    while (offset < error.offset) {
      offset += lines[lineNo].length;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  }
});

