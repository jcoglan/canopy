/**
 * This file was generated from examples/canopy/lisp.peg
 * See https://canopy.jcoglan.com/ for documentation
 */

package examples.canopy.lisp;

class CacheRecord {
    TreeNode node;
    int tail;

    CacheRecord(TreeNode node, int tail) {
        this.node = node;
        this.tail = tail;
    }
}
