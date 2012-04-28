(function() {
  for (var type in Canopy.Compiler) {
    if (/^[A-Z]/.test(type))
      Canopy.MetaGrammarParser[type] = Canopy.Compiler[type];
  }
  
  if (typeof module === 'object')
    module.exports = Canopy;
})();

