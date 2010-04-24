Stake.extend({
  TypeParser: new JS.Class(Stake.Parser, {
    extend: {
      create: function(name, parser) {
        parser.nodeClass = name;
        return parser;
      }
    }
  })
});

