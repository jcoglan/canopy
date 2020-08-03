/**
 * This file was generated from examples/canopy/json.peg
 * See http://canopy.jcoglan.com/ for documentation.
 */

package examples.canopy.json;

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

    private static Pattern REGEX_1 = Pattern.compile("\\A[^\"]");
    private static Pattern REGEX_2 = Pattern.compile("\\A[1-9]");
    private static Pattern REGEX_3 = Pattern.compile("\\A[0-9]");
    private static Pattern REGEX_4 = Pattern.compile("\\A[0-9]");
    private static Pattern REGEX_5 = Pattern.compile("\\A[0-9]");
    private static Pattern REGEX_6 = Pattern.compile("\\A[\\s]");

    TreeNode _read_document() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.document);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.document, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            address1 = _read___();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index2 = offset;
                address2 = _read_object();
                if (address2 == FAILURE) {
                    offset = index2;
                    address2 = _read_array();
                    if (address2 == FAILURE) {
                        offset = index2;
                    }
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    address3 = _read___();
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
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

    TreeNode _read_object() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.object);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.object, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            int index2 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(4);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, input.length()));
            }
            if (chunk0 != null && chunk0.equals("{")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"{\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_pair();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    int remaining0 = 0;
                    int index3 = offset;
                    List<TreeNode> elements1 = new ArrayList<TreeNode>();
                    TreeNode address4 = new TreeNode("", -1, new ArrayList<TreeNode>());
                    while (address4 != FAILURE) {
                        int index4 = offset;
                        List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                        TreeNode address5 = FAILURE;
                        String chunk1 = null;
                        if (offset < inputSize) {
                            chunk1 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk1 != null && chunk1.equals(",")) {
                            address5 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address5 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\",\"");
                            }
                        }
                        if (address5 != FAILURE) {
                            elements2.add(0, address5);
                            TreeNode address6 = FAILURE;
                            address6 = _read_pair();
                            if (address6 != FAILURE) {
                                elements2.add(1, address6);
                            } else {
                                elements2 = null;
                                offset = index4;
                            }
                        } else {
                            elements2 = null;
                            offset = index4;
                        }
                        if (elements2 == null) {
                            address4 = FAILURE;
                        } else {
                            address4 = new TreeNode3(input.substring(index4, offset), index4, elements2);
                            offset = offset;
                        }
                        if (address4 != FAILURE) {
                            elements1.add(address4);
                            --remaining0;
                        }
                    }
                    if (remaining0 <= 0) {
                        address3 = new TreeNode(input.substring(index3, offset), index3, elements1);
                        offset = offset;
                    } else {
                        address3 = FAILURE;
                    }
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
                        TreeNode address7 = FAILURE;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk2 != null && chunk2.equals("}")) {
                            address7 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address7 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"}\"");
                            }
                        }
                        if (address7 != FAILURE) {
                            elements0.add(3, address7);
                        } else {
                            elements0 = null;
                            offset = index2;
                        }
                    } else {
                        elements0 = null;
                        offset = index2;
                    }
                } else {
                    elements0 = null;
                    offset = index2;
                }
            } else {
                elements0 = null;
                offset = index2;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode2(input.substring(index2, offset), index2, elements0);
                offset = offset;
            }
            if (address0 == FAILURE) {
                offset = index1;
                int index5 = offset;
                List<TreeNode> elements3 = new ArrayList<TreeNode>(3);
                TreeNode address8 = FAILURE;
                String chunk3 = null;
                if (offset < inputSize) {
                    chunk3 = input.substring(offset, Math.min(offset + 1, input.length()));
                }
                if (chunk3 != null && chunk3.equals("{")) {
                    address8 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                    offset = offset + 1;
                } else {
                    address8 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"{\"");
                    }
                }
                if (address8 != FAILURE) {
                    elements3.add(0, address8);
                    TreeNode address9 = FAILURE;
                    address9 = _read___();
                    if (address9 != FAILURE) {
                        elements3.add(1, address9);
                        TreeNode address10 = FAILURE;
                        String chunk4 = null;
                        if (offset < inputSize) {
                            chunk4 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk4 != null && chunk4.equals("}")) {
                            address10 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address10 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"}\"");
                            }
                        }
                        if (address10 != FAILURE) {
                            elements3.add(2, address10);
                        } else {
                            elements3 = null;
                            offset = index5;
                        }
                    } else {
                        elements3 = null;
                        offset = index5;
                    }
                } else {
                    elements3 = null;
                    offset = index5;
                }
                if (elements3 == null) {
                    address0 = FAILURE;
                } else {
                    address0 = new TreeNode4(input.substring(index5, offset), index5, elements3);
                    offset = offset;
                }
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_pair() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.pair);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.pair, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(5);
            TreeNode address1 = FAILURE;
            address1 = _read___();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_string();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    address3 = _read___();
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
                        TreeNode address4 = FAILURE;
                        String chunk0 = null;
                        if (offset < inputSize) {
                            chunk0 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk0 != null && chunk0.equals(":")) {
                            address4 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address4 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\":\"");
                            }
                        }
                        if (address4 != FAILURE) {
                            elements0.add(3, address4);
                            TreeNode address5 = FAILURE;
                            address5 = _read_value();
                            if (address5 != FAILURE) {
                                elements0.add(4, address5);
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
                address0 = new TreeNode5(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_array() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.array);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.array, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            int index2 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(4);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, input.length()));
            }
            if (chunk0 != null && chunk0.equals("[")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"[\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_value();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    int remaining0 = 0;
                    int index3 = offset;
                    List<TreeNode> elements1 = new ArrayList<TreeNode>();
                    TreeNode address4 = new TreeNode("", -1, new ArrayList<TreeNode>());
                    while (address4 != FAILURE) {
                        int index4 = offset;
                        List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                        TreeNode address5 = FAILURE;
                        String chunk1 = null;
                        if (offset < inputSize) {
                            chunk1 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk1 != null && chunk1.equals(",")) {
                            address5 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address5 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\",\"");
                            }
                        }
                        if (address5 != FAILURE) {
                            elements2.add(0, address5);
                            TreeNode address6 = FAILURE;
                            address6 = _read_value();
                            if (address6 != FAILURE) {
                                elements2.add(1, address6);
                            } else {
                                elements2 = null;
                                offset = index4;
                            }
                        } else {
                            elements2 = null;
                            offset = index4;
                        }
                        if (elements2 == null) {
                            address4 = FAILURE;
                        } else {
                            address4 = new TreeNode7(input.substring(index4, offset), index4, elements2);
                            offset = offset;
                        }
                        if (address4 != FAILURE) {
                            elements1.add(address4);
                            --remaining0;
                        }
                    }
                    if (remaining0 <= 0) {
                        address3 = new TreeNode(input.substring(index3, offset), index3, elements1);
                        offset = offset;
                    } else {
                        address3 = FAILURE;
                    }
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
                        TreeNode address7 = FAILURE;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk2 != null && chunk2.equals("]")) {
                            address7 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address7 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"]\"");
                            }
                        }
                        if (address7 != FAILURE) {
                            elements0.add(3, address7);
                        } else {
                            elements0 = null;
                            offset = index2;
                        }
                    } else {
                        elements0 = null;
                        offset = index2;
                    }
                } else {
                    elements0 = null;
                    offset = index2;
                }
            } else {
                elements0 = null;
                offset = index2;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode6(input.substring(index2, offset), index2, elements0);
                offset = offset;
            }
            if (address0 == FAILURE) {
                offset = index1;
                int index5 = offset;
                List<TreeNode> elements3 = new ArrayList<TreeNode>(3);
                TreeNode address8 = FAILURE;
                String chunk3 = null;
                if (offset < inputSize) {
                    chunk3 = input.substring(offset, Math.min(offset + 1, input.length()));
                }
                if (chunk3 != null && chunk3.equals("[")) {
                    address8 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                    offset = offset + 1;
                } else {
                    address8 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"[\"");
                    }
                }
                if (address8 != FAILURE) {
                    elements3.add(0, address8);
                    TreeNode address9 = FAILURE;
                    address9 = _read___();
                    if (address9 != FAILURE) {
                        elements3.add(1, address9);
                        TreeNode address10 = FAILURE;
                        String chunk4 = null;
                        if (offset < inputSize) {
                            chunk4 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk4 != null && chunk4.equals("]")) {
                            address10 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address10 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"]\"");
                            }
                        }
                        if (address10 != FAILURE) {
                            elements3.add(2, address10);
                        } else {
                            elements3 = null;
                            offset = index5;
                        }
                    } else {
                        elements3 = null;
                        offset = index5;
                    }
                } else {
                    elements3 = null;
                    offset = index5;
                }
                if (elements3 == null) {
                    address0 = FAILURE;
                } else {
                    address0 = new TreeNode8(input.substring(index5, offset), index5, elements3);
                    offset = offset;
                }
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read_value() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.value);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.value, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            address1 = _read___();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index2 = offset;
                address2 = _read_object();
                if (address2 == FAILURE) {
                    offset = index2;
                    address2 = _read_array();
                    if (address2 == FAILURE) {
                        offset = index2;
                        address2 = _read_string();
                        if (address2 == FAILURE) {
                            offset = index2;
                            address2 = _read_number();
                            if (address2 == FAILURE) {
                                offset = index2;
                                address2 = _read_boolean_();
                                if (address2 == FAILURE) {
                                    offset = index2;
                                    address2 = _read_null_();
                                    if (address2 == FAILURE) {
                                        offset = index2;
                                    }
                                }
                            }
                        }
                    }
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    address3 = _read___();
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
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
                address0 = new TreeNode9(input.substring(index1, offset), index1, elements0);
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
                chunk0 = input.substring(offset, Math.min(offset + 1, input.length()));
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
                    expected.add("'\"'");
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
                        chunk1 = input.substring(offset, Math.min(offset + 1, input.length()));
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
                            chunk2 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk2 != null && REGEX_1.matcher(chunk2).matches()) {
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
                        chunk3 = input.substring(offset, Math.min(offset + 1, input.length()));
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
                            expected.add("'\"'");
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

    TreeNode _read_number() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.number);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.number, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(4);
            TreeNode address1 = FAILURE;
            int index2 = offset;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 1, input.length()));
            }
            if (chunk0 != null && chunk0.equals("-")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"-\"");
                }
            }
            if (address1 == FAILURE) {
                address1 = new TreeNode(input.substring(index2, index2), index2, new ArrayList<TreeNode>());
                offset = index2;
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index3 = offset;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, Math.min(offset + 1, input.length()));
                }
                if (chunk1 != null && chunk1.equals("0")) {
                    address2 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                    offset = offset + 1;
                } else {
                    address2 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"0\"");
                    }
                }
                if (address2 == FAILURE) {
                    offset = index3;
                    int index4 = offset;
                    List<TreeNode> elements1 = new ArrayList<TreeNode>(2);
                    TreeNode address3 = FAILURE;
                    String chunk2 = null;
                    if (offset < inputSize) {
                        chunk2 = input.substring(offset, Math.min(offset + 1, input.length()));
                    }
                    if (chunk2 != null && REGEX_2.matcher(chunk2).matches()) {
                        address3 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address3 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("[1-9]");
                        }
                    }
                    if (address3 != FAILURE) {
                        elements1.add(0, address3);
                        TreeNode address4 = FAILURE;
                        int remaining0 = 0;
                        int index5 = offset;
                        List<TreeNode> elements2 = new ArrayList<TreeNode>();
                        TreeNode address5 = new TreeNode("", -1, new ArrayList<TreeNode>());
                        while (address5 != FAILURE) {
                            String chunk3 = null;
                            if (offset < inputSize) {
                                chunk3 = input.substring(offset, Math.min(offset + 1, input.length()));
                            }
                            if (chunk3 != null && REGEX_3.matcher(chunk3).matches()) {
                                address5 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                                offset = offset + 1;
                            } else {
                                address5 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("[0-9]");
                                }
                            }
                            if (address5 != FAILURE) {
                                elements2.add(address5);
                                --remaining0;
                            }
                        }
                        if (remaining0 <= 0) {
                            address4 = new TreeNode(input.substring(index5, offset), index5, elements2);
                            offset = offset;
                        } else {
                            address4 = FAILURE;
                        }
                        if (address4 != FAILURE) {
                            elements1.add(1, address4);
                        } else {
                            elements1 = null;
                            offset = index4;
                        }
                    } else {
                        elements1 = null;
                        offset = index4;
                    }
                    if (elements1 == null) {
                        address2 = FAILURE;
                    } else {
                        address2 = new TreeNode(input.substring(index4, offset), index4, elements1);
                        offset = offset;
                    }
                    if (address2 == FAILURE) {
                        offset = index3;
                    }
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address6 = FAILURE;
                    int index6 = offset;
                    int index7 = offset;
                    List<TreeNode> elements3 = new ArrayList<TreeNode>(2);
                    TreeNode address7 = FAILURE;
                    String chunk4 = null;
                    if (offset < inputSize) {
                        chunk4 = input.substring(offset, Math.min(offset + 1, input.length()));
                    }
                    if (chunk4 != null && chunk4.equals(".")) {
                        address7 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                        offset = offset + 1;
                    } else {
                        address7 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\".\"");
                        }
                    }
                    if (address7 != FAILURE) {
                        elements3.add(0, address7);
                        TreeNode address8 = FAILURE;
                        int remaining1 = 1;
                        int index8 = offset;
                        List<TreeNode> elements4 = new ArrayList<TreeNode>();
                        TreeNode address9 = new TreeNode("", -1, new ArrayList<TreeNode>());
                        while (address9 != FAILURE) {
                            String chunk5 = null;
                            if (offset < inputSize) {
                                chunk5 = input.substring(offset, Math.min(offset + 1, input.length()));
                            }
                            if (chunk5 != null && REGEX_4.matcher(chunk5).matches()) {
                                address9 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                                offset = offset + 1;
                            } else {
                                address9 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("[0-9]");
                                }
                            }
                            if (address9 != FAILURE) {
                                elements4.add(address9);
                                --remaining1;
                            }
                        }
                        if (remaining1 <= 0) {
                            address8 = new TreeNode(input.substring(index8, offset), index8, elements4);
                            offset = offset;
                        } else {
                            address8 = FAILURE;
                        }
                        if (address8 != FAILURE) {
                            elements3.add(1, address8);
                        } else {
                            elements3 = null;
                            offset = index7;
                        }
                    } else {
                        elements3 = null;
                        offset = index7;
                    }
                    if (elements3 == null) {
                        address6 = FAILURE;
                    } else {
                        address6 = new TreeNode(input.substring(index7, offset), index7, elements3);
                        offset = offset;
                    }
                    if (address6 == FAILURE) {
                        address6 = new TreeNode(input.substring(index6, index6), index6, new ArrayList<TreeNode>());
                        offset = index6;
                    }
                    if (address6 != FAILURE) {
                        elements0.add(2, address6);
                        TreeNode address10 = FAILURE;
                        int index9 = offset;
                        int index10 = offset;
                        List<TreeNode> elements5 = new ArrayList<TreeNode>(3);
                        TreeNode address11 = FAILURE;
                        int index11 = offset;
                        String chunk6 = null;
                        if (offset < inputSize) {
                            chunk6 = input.substring(offset, Math.min(offset + 1, input.length()));
                        }
                        if (chunk6 != null && chunk6.equals("e")) {
                            address11 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                            offset = offset + 1;
                        } else {
                            address11 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"e\"");
                            }
                        }
                        if (address11 == FAILURE) {
                            offset = index11;
                            String chunk7 = null;
                            if (offset < inputSize) {
                                chunk7 = input.substring(offset, Math.min(offset + 1, input.length()));
                            }
                            if (chunk7 != null && chunk7.equals("E")) {
                                address11 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                                offset = offset + 1;
                            } else {
                                address11 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("\"E\"");
                                }
                            }
                            if (address11 == FAILURE) {
                                offset = index11;
                            }
                        }
                        if (address11 != FAILURE) {
                            elements5.add(0, address11);
                            TreeNode address12 = FAILURE;
                            int index12 = offset;
                            String chunk8 = null;
                            if (offset < inputSize) {
                                chunk8 = input.substring(offset, Math.min(offset + 1, input.length()));
                            }
                            if (chunk8 != null && chunk8.equals("+")) {
                                address12 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                                offset = offset + 1;
                            } else {
                                address12 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("\"+\"");
                                }
                            }
                            if (address12 == FAILURE) {
                                offset = index12;
                                String chunk9 = null;
                                if (offset < inputSize) {
                                    chunk9 = input.substring(offset, Math.min(offset + 1, input.length()));
                                }
                                if (chunk9 != null && chunk9.equals("-")) {
                                    address12 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                                    offset = offset + 1;
                                } else {
                                    address12 = FAILURE;
                                    if (offset > failure) {
                                        failure = offset;
                                        expected = new ArrayList<String>();
                                    }
                                    if (offset == failure) {
                                        expected.add("\"-\"");
                                    }
                                }
                                if (address12 == FAILURE) {
                                    offset = index12;
                                    String chunk10 = null;
                                    if (offset < inputSize) {
                                        chunk10 = input.substring(offset, Math.min(offset + 0, input.length()));
                                    }
                                    if (chunk10 != null && chunk10.equals("")) {
                                        address12 = new TreeNode(input.substring(offset, offset + 0), offset, new ArrayList<TreeNode>());
                                        offset = offset + 0;
                                    } else {
                                        address12 = FAILURE;
                                        if (offset > failure) {
                                            failure = offset;
                                            expected = new ArrayList<String>();
                                        }
                                        if (offset == failure) {
                                            expected.add("\"\"");
                                        }
                                    }
                                    if (address12 == FAILURE) {
                                        offset = index12;
                                    }
                                }
                            }
                            if (address12 != FAILURE) {
                                elements5.add(1, address12);
                                TreeNode address13 = FAILURE;
                                int remaining2 = 1;
                                int index13 = offset;
                                List<TreeNode> elements6 = new ArrayList<TreeNode>();
                                TreeNode address14 = new TreeNode("", -1, new ArrayList<TreeNode>());
                                while (address14 != FAILURE) {
                                    String chunk11 = null;
                                    if (offset < inputSize) {
                                        chunk11 = input.substring(offset, Math.min(offset + 1, input.length()));
                                    }
                                    if (chunk11 != null && REGEX_5.matcher(chunk11).matches()) {
                                        address14 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                                        offset = offset + 1;
                                    } else {
                                        address14 = FAILURE;
                                        if (offset > failure) {
                                            failure = offset;
                                            expected = new ArrayList<String>();
                                        }
                                        if (offset == failure) {
                                            expected.add("[0-9]");
                                        }
                                    }
                                    if (address14 != FAILURE) {
                                        elements6.add(address14);
                                        --remaining2;
                                    }
                                }
                                if (remaining2 <= 0) {
                                    address13 = new TreeNode(input.substring(index13, offset), index13, elements6);
                                    offset = offset;
                                } else {
                                    address13 = FAILURE;
                                }
                                if (address13 != FAILURE) {
                                    elements5.add(2, address13);
                                } else {
                                    elements5 = null;
                                    offset = index10;
                                }
                            } else {
                                elements5 = null;
                                offset = index10;
                            }
                        } else {
                            elements5 = null;
                            offset = index10;
                        }
                        if (elements5 == null) {
                            address10 = FAILURE;
                        } else {
                            address10 = new TreeNode(input.substring(index10, offset), index10, elements5);
                            offset = offset;
                        }
                        if (address10 == FAILURE) {
                            address10 = new TreeNode(input.substring(index9, index9), index9, new ArrayList<TreeNode>());
                            offset = index9;
                        }
                        if (address10 != FAILURE) {
                            elements0.add(3, address10);
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
                chunk0 = input.substring(offset, Math.min(offset + 4, input.length()));
            }
            if (chunk0 != null && chunk0.equals("true")) {
                address0 = new TreeNode(input.substring(offset, offset + 4), offset, new ArrayList<TreeNode>());
                offset = offset + 4;
            } else {
                address0 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"true\"");
                }
            }
            if (address0 == FAILURE) {
                offset = index1;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, Math.min(offset + 5, input.length()));
                }
                if (chunk1 != null && chunk1.equals("false")) {
                    address0 = new TreeNode(input.substring(offset, offset + 5), offset, new ArrayList<TreeNode>());
                    offset = offset + 5;
                } else {
                    address0 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"false\"");
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

    TreeNode _read_null_() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.null_);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.null_, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, Math.min(offset + 4, input.length()));
            }
            if (chunk0 != null && chunk0.equals("null")) {
                address0 = new TreeNode(input.substring(offset, offset + 4), offset, new ArrayList<TreeNode>());
                offset = offset + 4;
            } else {
                address0 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"null\"");
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    TreeNode _read___() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.__);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.__, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int remaining0 = 0;
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>();
            TreeNode address1 = new TreeNode("", -1, new ArrayList<TreeNode>());
            while (address1 != FAILURE) {
                String chunk0 = null;
                if (offset < inputSize) {
                    chunk0 = input.substring(offset, Math.min(offset + 1, input.length()));
                }
                if (chunk0 != null && REGEX_6.matcher(chunk0).matches()) {
                    address1 = new TreeNode(input.substring(offset, offset + 1), offset, new ArrayList<TreeNode>());
                    offset = offset + 1;
                } else {
                    address1 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("[\\s]");
                    }
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
}
