package helpers;

import java.util.List;

public interface Node<L> {
    public String text();
    public int offset();
    public List<Node<L>> elements();
    public Node<L> get(L label);

    default void toMatch(NodeSpec<L> spec) {
        spec.assertMatches(this);
    }
}
