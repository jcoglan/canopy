package examples.canopy.lisp;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class TreeNode implements Iterable<TreeNode> {
    public String text;
    public int offset;
    public List<TreeNode> elements;

    Map<Label, TreeNode> labelled;

    public TreeNode() {
        this("", -1, new ArrayList<TreeNode>(0));
    }

    public TreeNode(String text, int offset) {
        this(text, offset, new ArrayList<TreeNode>(0));
    }

    public TreeNode(String text, int offset, List<TreeNode> elements) {
        this.text = text;
        this.offset = offset;
        this.elements = elements;
        this.labelled = new EnumMap<Label, TreeNode>(Label.class);
    }

    public TreeNode get(Label key) {
        return labelled.get(key);
    }

    public Iterator<TreeNode> iterator() {
        return elements.iterator();
    }
}

class TreeNode1 extends TreeNode {
    TreeNode1(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.data, elements.get(1));
    }
}

class TreeNode2 extends TreeNode {
    TreeNode2(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.cells, elements.get(1));
    }
}
