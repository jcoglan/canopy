(function() {
  for (var type in Canopy.Compiler)
    Canopy.MetaGrammarParser[type] = Canopy.Compiler[type];
  
  if (typeof module === 'object')
    module.exports = Canopy;
})();

