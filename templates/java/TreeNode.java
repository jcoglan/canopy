import java.util.ArrayList;
import java.util.EnumMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class {{name}} implements Iterable<{{name}}> {
    public String text;
    public int offset;
    public List<{{name}}> elements;

    Map<Label, {{name}}> labelled;

    public {{name}}() {
        this("", -1, new ArrayList<{{name}}>(0));
    }

    public {{name}}(String text, int offset, List<{{name}}> elements) {
        this.text = text;
        this.offset = offset;
        this.elements = elements;
        this.labelled = new EnumMap<Label, {{name}}>(Label.class);
    }

    public {{name}} get(Label key) {
        return labelled.get(key);
    }

    public Iterator<{{name}}> iterator() {
        return elements.iterator();
    }
}
