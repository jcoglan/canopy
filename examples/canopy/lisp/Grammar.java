/**
 * This file was generated from examples/canopy/lisp.peg
 * See http://canopy.jcoglan.com/ for documentation.
 */

package examples.canopy.lisp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

abstract class Grammar {
    static TreeNode FAILURE = new TreeNode();

    int inputSize, offset, failure;
    String input;
    List<String> expected;
    Map<Label, Map<Integer, CacheRecord>> cache;
    Actions actions;

    private static Pattern REGEX_1 = Pattern.compile("\\A[1-9]");
    private static Pattern REGEX_2 = Pattern.compile("\\A[0-9]");
    private static Pattern REGEX_3 = Pattern.compile("\\A[^\"]");
    private static Pattern REGEX_4 = Pattern.compile("\\A[\\s]");

    TreeNode _read_program() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.program);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.program, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int remaining0 = 1;
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>();
            TreeNode address1 = new TreeNode("", -1, new ArrayList<TreeNode>());
            while (address1 != FAILURE) {
                address1 = _read_cell();
                if (address1 != FAILURE) {
                    elements0.add(address1);
                    --remaining0;
                }
            }
            if (remaining0 <= 0) {
                address0 = new TreeNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            } else {
                address0 = FAILURE;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_cell() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.cell);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.cell, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            int remaining0 = 0;
            int index2 = offset;
            List<TreeNode> elements1 = new ArrayList<TreeNode>();
            TreeNode address2 = new TreeNode("", -1, new ArrayList<TreeNode>());
            while (address2 != FAILURE) {
                address2 = _read_space();
                if (address2 != FAILURE) {
                    elements1.add(address2);
                    --remaining0;
                }
            }
            if (remaining0 <= 0) {
                address1 = new TreeNode(input.substring(index2, offset), index2, elements1);
                offset = offset;
            } else {
                address1 = FAILURE;
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address3 = FAILURE;
                int index3 = offset;
                address3 = _read_list();
                if (address3 == FAILURE) {
                    offset = index3;
                    address3 = _read_atom();
                    if (address3 == FAILURE) {
                        offset = index3;
                    }
                }
                if (address3 != FAILURE) {
                    elements0.add(1, address3);
                    TreeNode address4 = FAILURE;
                    int remaining1 = 0;
                    int index4 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>();
                    TreeNode address5 = new TreeNode("", -1, new ArrayList<TreeNode>());
                    while (address5 != FAILURE) {
                        address5 = _read_space();
                        if (address5 != FAILURE) {
                            elements2.add(address5);
                            --remaining1;
                        }
                    }
                    if (remaining1 <= 0) {
                        address4 = new TreeNode(input.substring(index4, offset), index4, elements2);
                        offset = offset;
                    } else {
                        address4 = FAILURE;
                    }
                    if (address4 != FAILURE) {
                        elements0.add(2, address4);
                    } else {
                        elements0 = null;
                        offset = index1;
                    }
                } else {
                    elements0 = null;
                    offset = index1;
                }
            } else {
                elements0 = null;
                offset = index1;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode1(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_list() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.list);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.list, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, inputSize));
            }
            if (chunk0 != null && chunk0.equals("(")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"(\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 1;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1, new ArrayList<TreeNode>());
                while (address3 != FAILURE) {
                    address3 = _read_cell();
                    if (address3 != FAILURE) {
                        elements1.add(address3);
                        --remaining0;
                    }
                }
                if (remaining0 <= 0) {
                    address2 = new TreeNode(input.substring(index2, offset), index2, elements1);
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address4 = FAILURE;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, Math.min(offset + 1, inputSize));
                    }
                    if (chunk1 != null && chunk1.equals(")")) {
                        address4 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address4 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\")\"");
                        }
                    }
                    if (address4 != FAILURE) {
                        elements0.add(2, address4);
                    } else {
                        elements0 = null;
                        offset = index1;
                    }
                } else {
                    elements0 = null;
                    offset = index1;
                }
            } else {
                elements0 = null;
                offset = index1;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode2(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_atom() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.atom);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.atom, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            address0 = _read_boolean_();
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_integer();
                if (address0 == FAILURE) {
                    offset = index1;
                    address0 = _read_string();
                    if (address0 == FAILURE) {
                        offset = index1;
                        address0 = _read_symbol();
                        if (address0 == FAILURE) {
                            offset = index1;
                        }
                    }
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_boolean_() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.boolean_);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.boolean_, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 2, inputSize));
            }
            if (chunk0 != null && chunk0.equals("#t")) {
                address0 = new TreeNode(input.substring(offset, offset + 2), offset, new ArrayList<TreeNode>());
                offset = offset + 2;
            } else {
                address0 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"#t\"");
                }
            }
            if (address0 == FAILURE) {
                offset = index1;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, Math.min(offset + 2, inputSize));
                }
                if (chunk1 != null && chunk1.equals("#f")) {
                    address0 = new TreeNode(input.substring(offset, offset + 2), offset, new ArrayList<TreeNode>());
                    offset = offset + 2;
                } else {
                    address0 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"#f\"");
                    }
                }
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_integer() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.integer);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.integer, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, inputSize));
            }
            if (chunk0 != null && REGEX_1.matcher(chunk0).matches()) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("[1-9]");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1, new ArrayList<TreeNode>());
                while (address3 != FAILURE) {
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, Math.min(offset + 1, inputSize));
                    }
                    if (chunk1 != null && REGEX_2.matcher(chunk1).matches()) {
                        address3 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address3 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("[0-9]");
                        }
                    }
                    if (address3 != FAILURE) {
                        elements1.add(address3);
                        --remaining0;
                    }
                }
                if (remaining0 <= 0) {
                    address2 = new TreeNode(input.substring(index2, offset), index2, elements1);
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                } else {
                    elements0 = null;
                    offset = index1;
                }
            } else {
                elements0 = null;
                offset = index1;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_string() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.string);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.string, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, inputSize));
            }
            if (chunk0 != null && chunk0.equals("\"")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"\\\"\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1, new ArrayList<TreeNode>());
                while (address3 != FAILURE) {
                    int index3 = offset;
                    int index4 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                    TreeNode address4 = FAILURE;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, Math.min(offset + 1, inputSize));
                    }
                    if (chunk1 != null && chunk1.equals("\\")) {
                        address4 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address4 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\"\\\\\"");
                        }
                    }
                    if (address4 != FAILURE) {
                        elements2.add(0, address4);
                        TreeNode address5 = FAILURE;
                        if (offset < inputSize) {
                            address5 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address5 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("<any char>");
                            }
                        }
                        if (address5 != FAILURE) {
                            elements2.add(1, address5);
                        } else {
                            elements2 = null;
                            offset = index4;
                        }
                    } else {
                        elements2 = null;
                        offset = index4;
                    }
                    if (elements2 == null) {
                        address3 = FAILURE;
                    } else {
                        address3 = new TreeNode(input.substring(index4, offset), index4, elements2);
                        offset = offset;
                    }
                    if (address3 == FAILURE) {
                        offset = index3;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, Math.min(offset + 1, inputSize));
                        }
                        if (chunk2 != null && REGEX_3.matcher(chunk2).matches()) {
                            address3 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address3 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("[^\"]");
                            }
                        }
                        if (address3 == FAILURE) {
                            offset = index3;
                        }
                    }
                    if (address3 != FAILURE) {
                        elements1.add(address3);
                        --remaining0;
                    }
                }
                if (remaining0 <= 0) {
                    address2 = new TreeNode(input.substring(index2, offset), index2, elements1);
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address6 = FAILURE;
                    String chunk3 = null;
                    if (offset < inputSize) {
                        chunk3 = input.substring(offset, Math.min(offset + 1, inputSize));
                    }
                    if (chunk3 != null && chunk3.equals("\"")) {
                        address6 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address6 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\"\\\"\"");
                        }
                    }
                    if (address6 != FAILURE) {
                        elements0.add(2, address6);
                    } else {
                        elements0 = null;
                        offset = index1;
                    }
                } else {
                    elements0 = null;
                    offset = index1;
                }
            } else {
                elements0 = null;
                offset = index1;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_symbol() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.symbol);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.symbol, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int remaining0 = 1;
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>();
            TreeNode address1 = new TreeNode("", -1, new ArrayList<TreeNode>());
            while (address1 != FAILURE) {
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>(2);
                TreeNode address2 = FAILURE;
                int index3 = offset;
                address2 = _read_delimiter();
                offset = index3;
                if (address2 == FAILURE) {
                    address2 = new TreeNode(input.substring(offset, offset), offset, new ArrayList<TreeNode>());
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements1.add(0, address2);
                    TreeNode address3 = FAILURE;
                    if (offset < inputSize) {
                        address3 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address3 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("<any char>");
                        }
                    }
                    if (address3 != FAILURE) {
                        elements1.add(1, address3);
                    } else {
                        elements1 = null;
                        offset = index2;
                    }
                } else {
                    elements1 = null;
                    offset = index2;
                }
                if (elements1 == null) {
                    address1 = FAILURE;
                } else {
                    address1 = new TreeNode(input.substring(index2, offset), index2, elements1);
                    offset = offset;
                }
                if (address1 != FAILURE) {
                    elements0.add(address1);
                    --remaining0;
                }
            }
            if (remaining0 <= 0) {
                address0 = new TreeNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            } else {
                address0 = FAILURE;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_space() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.space);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.space, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, inputSize));
            }
            if (chunk0 != null && REGEX_4.matcher(chunk0).matches()) {
                address0 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address0 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("[\\s]");
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_paren() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.paren);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.paren, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, inputSize));
            }
            if (chunk0 != null && chunk0.equals("(")) {
                address0 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address0 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"(\"");
                }
            }
            if (address0 == FAILURE) {
                offset = index1;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, Math.min(offset + 1, inputSize));
                }
                if (chunk1 != null && chunk1.equals(")")) {
                    address0 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                    offset = offset + 1;
                } else {
                    address0 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\")\"");
                    }
                }
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_delimiter() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.delimiter);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.delimiter, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            address0 = _read_paren();
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_space();
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }
}
