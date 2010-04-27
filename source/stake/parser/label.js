Stake.Parser.extend({
  Label: new JS.Class(Stake.Parser, {
    extend: {
      create: function(name, parser) {
        parser.label = name;
        return parser;
      }
    }
  })
});

