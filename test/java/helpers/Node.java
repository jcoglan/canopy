package helpers;

import java.util.List;

public interface Node {
    public String text();
    public int offset();
    public List<Node> elements();

    default void toMatch(NodeSpec spec) {
        spec.assertMatches(this);
    }
}
