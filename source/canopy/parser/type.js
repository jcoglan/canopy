Canopy.Parser.extend({
  Type: new JS.Class(Canopy.Parser, {
    extend: {
      create: function(name, parser) {
        parser.nodeClass = name;
        return parser;
      }
    }
  })
});

