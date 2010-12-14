Canopy.extend({
  Queries: new JS.Module({
    select: function(nodeType) {
      return (this.__named__[nodeType] || []).slice();
    }
  })
});

