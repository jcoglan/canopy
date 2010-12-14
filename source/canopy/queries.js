Canopy.extend({
  Queries: new JS.Module({
    select: function(nodeType, results) {
      results = results || [];
      
      if (this.__name__ === nodeType) {
        results.push(this);
        
      } else if (!this.__name__) {
        this.forEach(function(childNode) {
          childNode.select(nodeType, results);
        });
      }
      return results;
    }
  })
});

