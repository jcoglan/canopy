package examples.canopy.lisp;

class CacheRecord {
    SyntaxNode node;
    int tail;

    CacheRecord(SyntaxNode node, int tail) {
        this.node = node;
        this.tail = tail;
    }
}
