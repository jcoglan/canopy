using System.Collections.Generic;
using System.Collections;
using System;

public class {{name}} : IEnumerable<{{name}}> {
    public String text;
    public int offset;
    public List<{{name}}> elements;

    public Dictionary<Label, {{name}}> labelled;

    public {{name}}() : this("", -1, new List<{{name}}>(0)) {
        
    }

    public {{name}}(String text, int offset, List<{{name}}> elements) {
        this.text = text;
        this.offset = offset;
        this.elements = elements;
        this.labelled = new Dictionary<Label, {{name}}>();
    }

    public {{name}}? get(Label key) {
        {{name}}? ret;
        labelled.TryGetValue(key, out ret);
        return ret;
    }

    public IEnumerator<{{name}}> iterator() {
        foreach(var items in elements)
        { 
            // Returning the element after every iteration
            yield return items;
        }
    }

    public IEnumerator<{{name}}> GetEnumerator() {
        foreach(var items in elements)
        { 
            // Returning the element after every iteration
            yield return items;
        }
    }
    System.Collections.IEnumerator
    System.Collections.IEnumerable.GetEnumerator()
  {
    // Invoke IEnumerator<string> GetEnumerator() above.
    return GetEnumerator();
  }
}
