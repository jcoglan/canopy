Canopy.Parser.extend({
  Label: new JS.Class(Canopy.Parser, {
    extend: {
      create: function(name, parser) {
        parser.label = name;
        return parser;
      }
    }
  })
});

