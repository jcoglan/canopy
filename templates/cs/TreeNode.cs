using System.Collections.Generic;
using System.Collections;


public class {{name}} : IEnumerable<{{name}}> {
    public String text;
    public int offset;
    public List<{{name}}> elements;

    Dictionary<Label, {{name}}> labelled;

    public {{name}}() {
        this("", -1, new ArrayList<{{name}}>(0));
    }

    public {{name}}(String text, int offset, List<{{name}}> elements) {
        this.text = text;
        this.offset = offset;
        this.elements = elements;
        this.labelled = new Dictionary<Label, {{name}}>();
    }

    public {{name}} get(Label key) {
        return labelled[key];
    }

    public IEnumerable<{{name}}> iterator() {
        foreach(var items in elements)
        { 
            // Returning the element after every iteration
            yield return items;
        }
    }

    public IEnumerable<{{name}}> GetEnumerator() {
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
