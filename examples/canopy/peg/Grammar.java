package examples.canopy.peg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

abstract class Grammar {
    static TreeNode FAILURE = new TreeNode("", -1);

    int inputSize, offset, failure;
    String input;
    List<String> expected;
    Map<Label, Map<Integer, CacheRecord>> cache;

    protected TreeNode _read_grammar() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.grammar);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.grammar, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(4);
            TreeNode address1 = FAILURE;
            int remaining0 = 0;
            int index2 = offset;
            List<TreeNode> elements1 = new ArrayList<TreeNode>();
            TreeNode address2 = new TreeNode("", -1);
            while (address2 != FAILURE) {
                address2 = _read___();
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
                address3 = _read_grammar_name();
                if (address3 != FAILURE) {
                    elements0.add(1, address3);
                    TreeNode address4 = FAILURE;
                    int remaining1 = 1;
                    int index3 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>();
                    TreeNode address5 = new TreeNode("", -1);
                    while (address5 != FAILURE) {
                        int index4 = offset;
                        List<TreeNode> elements3 = new ArrayList<TreeNode>(2);
                        TreeNode address6 = FAILURE;
                        int remaining2 = 0;
                        int index5 = offset;
                        List<TreeNode> elements4 = new ArrayList<TreeNode>();
                        TreeNode address7 = new TreeNode("", -1);
                        while (address7 != FAILURE) {
                            address7 = _read___();
                            if (address7 != FAILURE) {
                                elements4.add(address7);
                                --remaining2;
                            }
                        }
                        if (remaining2 <= 0) {
                            address6 = new TreeNode(input.substring(index5, offset), index5, elements4);
                            offset = offset;
                        } else {
                            address6 = FAILURE;
                        }
                        if (address6 != FAILURE) {
                            elements3.add(0, address6);
                            TreeNode address8 = FAILURE;
                            address8 = _read_grammar_rule();
                            if (address8 != FAILURE) {
                                elements3.add(1, address8);
                            } else {
                                elements3 = null;
                                offset = index4;
                            }
                        } else {
                            elements3 = null;
                            offset = index4;
                        }
                        if (elements3 == null) {
                            address5 = FAILURE;
                        } else {
                            address5 = new TreeNode2(input.substring(index4, offset), index4, elements3);
                            offset = offset;
                        }
                        if (address5 != FAILURE) {
                            elements2.add(address5);
                            --remaining1;
                        }
                    }
                    if (remaining1 <= 0) {
                        address4 = new TreeNode(input.substring(index3, offset), index3, elements2);
                        offset = offset;
                    } else {
                        address4 = FAILURE;
                    }
                    if (address4 != FAILURE) {
                        elements0.add(2, address4);
                        TreeNode address9 = FAILURE;
                        int remaining3 = 0;
                        int index6 = offset;
                        List<TreeNode> elements5 = new ArrayList<TreeNode>();
                        TreeNode address10 = new TreeNode("", -1);
                        while (address10 != FAILURE) {
                            address10 = _read___();
                            if (address10 != FAILURE) {
                                elements5.add(address10);
                                --remaining3;
                            }
                        }
                        if (remaining3 <= 0) {
                            address9 = new TreeNode(input.substring(index6, offset), index6, elements5);
                            offset = offset;
                        } else {
                            address9 = FAILURE;
                        }
                        if (address9 != FAILURE) {
                            elements0.add(3, address9);
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
                address0 = new TreeNode1(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_grammar_name() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.grammar_name);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.grammar_name, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(4);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 7);
            }
            if (chunk0 != null && chunk0.toLowerCase().equals("grammar".toLowerCase())) {
                address1 = new TreeNode(input.substring(offset, offset + 7), offset);
                offset = offset + 7;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("`grammar`");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index2 = offset;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, offset + 1);
                }
                if (chunk1 != null && chunk1.equals(":")) {
                    address2 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address2 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\":\"");
                    }
                }
                if (address2 == FAILURE) {
                    address2 = new TreeNode(input.substring(index2, index2), index2);
                    offset = index2;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    int remaining0 = 1;
                    int index3 = offset;
                    List<TreeNode> elements1 = new ArrayList<TreeNode>();
                    TreeNode address4 = new TreeNode("", -1);
                    while (address4 != FAILURE) {
                        address4 = _read___();
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
                        TreeNode address5 = FAILURE;
                        address5 = _read_object_identifier();
                        if (address5 != FAILURE) {
                            elements0.add(3, address5);
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
                address0 = new TreeNode3(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_grammar_rule() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.grammar_rule);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.grammar_rule, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            address1 = _read_identifier();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_assignment();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    address3 = _read_parsing_expression();
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
                address0 = new TreeNode4(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_assignment() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.assignment);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.assignment, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            int remaining0 = 1;
            int index2 = offset;
            List<TreeNode> elements1 = new ArrayList<TreeNode>();
            TreeNode address2 = new TreeNode("", -1);
            while (address2 != FAILURE) {
                address2 = _read___();
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
                String chunk0 = null;
                if (offset < inputSize) {
                    chunk0 = input.substring(offset, offset + 2);
                }
                if (chunk0 != null && chunk0.equals("<-")) {
                    address3 = new TreeNode(input.substring(offset, offset + 2), offset);
                    offset = offset + 2;
                } else {
                    address3 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"<-\"");
                    }
                }
                if (address3 != FAILURE) {
                    elements0.add(1, address3);
                    TreeNode address4 = FAILURE;
                    int remaining1 = 1;
                    int index3 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>();
                    TreeNode address5 = new TreeNode("", -1);
                    while (address5 != FAILURE) {
                        address5 = _read___();
                        if (address5 != FAILURE) {
                            elements2.add(address5);
                            --remaining1;
                        }
                    }
                    if (remaining1 <= 0) {
                        address4 = new TreeNode(input.substring(index3, offset), index3, elements2);
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
                address0 = new TreeNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_parsing_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.parsing_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.parsing_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            address0 = _read_choice_expression();
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_choice_part();
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_parenthesised_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.parenthesised_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.parenthesised_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(5);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("(")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    address3 = _read___();
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
                    address4 = _read_parsing_expression();
                    if (address4 != FAILURE) {
                        elements0.add(2, address4);
                        TreeNode address5 = FAILURE;
                        int remaining1 = 0;
                        int index3 = offset;
                        List<TreeNode> elements2 = new ArrayList<TreeNode>();
                        TreeNode address6 = new TreeNode("", -1);
                        while (address6 != FAILURE) {
                            address6 = _read___();
                            if (address6 != FAILURE) {
                                elements2.add(address6);
                                --remaining1;
                            }
                        }
                        if (remaining1 <= 0) {
                            address5 = new TreeNode(input.substring(index3, offset), index3, elements2);
                            offset = offset;
                        } else {
                            address5 = FAILURE;
                        }
                        if (address5 != FAILURE) {
                            elements0.add(3, address5);
                            TreeNode address7 = FAILURE;
                            String chunk1 = null;
                            if (offset < inputSize) {
                                chunk1 = input.substring(offset, offset + 1);
                            }
                            if (chunk1 != null && chunk1.equals(")")) {
                                address7 = new TreeNode(input.substring(offset, offset + 1), offset);
                                offset = offset + 1;
                            } else {
                                address7 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("\")\"");
                                }
                            }
                            if (address7 != FAILURE) {
                                elements0.add(4, address7);
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

    protected TreeNode _read_choice_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.choice_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.choice_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_choice_part();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 1;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    int index3 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>(4);
                    TreeNode address4 = FAILURE;
                    int remaining1 = 1;
                    int index4 = offset;
                    List<TreeNode> elements3 = new ArrayList<TreeNode>();
                    TreeNode address5 = new TreeNode("", -1);
                    while (address5 != FAILURE) {
                        address5 = _read___();
                        if (address5 != FAILURE) {
                            elements3.add(address5);
                            --remaining1;
                        }
                    }
                    if (remaining1 <= 0) {
                        address4 = new TreeNode(input.substring(index4, offset), index4, elements3);
                        offset = offset;
                    } else {
                        address4 = FAILURE;
                    }
                    if (address4 != FAILURE) {
                        elements2.add(0, address4);
                        TreeNode address6 = FAILURE;
                        String chunk0 = null;
                        if (offset < inputSize) {
                            chunk0 = input.substring(offset, offset + 1);
                        }
                        if (chunk0 != null && chunk0.equals("/")) {
                            address6 = new TreeNode(input.substring(offset, offset + 1), offset);
                            offset = offset + 1;
                        } else {
                            address6 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"/\"");
                            }
                        }
                        if (address6 != FAILURE) {
                            elements2.add(1, address6);
                            TreeNode address7 = FAILURE;
                            int remaining2 = 1;
                            int index5 = offset;
                            List<TreeNode> elements4 = new ArrayList<TreeNode>();
                            TreeNode address8 = new TreeNode("", -1);
                            while (address8 != FAILURE) {
                                address8 = _read___();
                                if (address8 != FAILURE) {
                                    elements4.add(address8);
                                    --remaining2;
                                }
                            }
                            if (remaining2 <= 0) {
                                address7 = new TreeNode(input.substring(index5, offset), index5, elements4);
                                offset = offset;
                            } else {
                                address7 = FAILURE;
                            }
                            if (address7 != FAILURE) {
                                elements2.add(2, address7);
                                TreeNode address9 = FAILURE;
                                address9 = _read_choice_part();
                                if (address9 != FAILURE) {
                                    elements2.add(3, address9);
                                } else {
                                    elements2 = null;
                                    offset = index3;
                                }
                            } else {
                                elements2 = null;
                                offset = index3;
                            }
                        } else {
                            elements2 = null;
                            offset = index3;
                        }
                    } else {
                        elements2 = null;
                        offset = index3;
                    }
                    if (elements2 == null) {
                        address3 = FAILURE;
                    } else {
                        address3 = new TreeNode7(input.substring(index3, offset), index3, elements2);
                        offset = offset;
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
                address0 = new TreeNode6(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_choice_part() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.choice_part);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.choice_part, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            int index2 = offset;
            address1 = _read_action_expression();
            if (address1 == FAILURE) {
                offset = index2;
                address1 = _read_sequence_expression();
                if (address1 == FAILURE) {
                    offset = index2;
                    address1 = _read_sequence_part();
                    if (address1 == FAILURE) {
                        offset = index2;
                    }
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index3 = offset;
                int index4 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>(2);
                TreeNode address3 = FAILURE;
                int remaining0 = 1;
                int index5 = offset;
                List<TreeNode> elements2 = new ArrayList<TreeNode>();
                TreeNode address4 = new TreeNode("", -1);
                while (address4 != FAILURE) {
                    address4 = _read___();
                    if (address4 != FAILURE) {
                        elements2.add(address4);
                        --remaining0;
                    }
                }
                if (remaining0 <= 0) {
                    address3 = new TreeNode(input.substring(index5, offset), index5, elements2);
                    offset = offset;
                } else {
                    address3 = FAILURE;
                }
                if (address3 != FAILURE) {
                    elements1.add(0, address3);
                    TreeNode address5 = FAILURE;
                    address5 = _read_type_tag();
                    if (address5 != FAILURE) {
                        elements1.add(1, address5);
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
                    address2 = new TreeNode8(input.substring(index4, offset), index4, elements1);
                    offset = offset;
                }
                if (address2 == FAILURE) {
                    address2 = new TreeNode(input.substring(index3, index3), index3);
                    offset = index3;
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

    protected TreeNode _read_action_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.action_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.action_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            address1 = _read_actionable_expression();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 1;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    address3 = _read___();
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
                    address4 = _read_action_tag();
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
                address0 = new TreeNode9(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_actionable_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.actionable_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.actionable_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            int index2 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(5);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("(")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                int remaining0 = 0;
                int index3 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    address3 = _read___();
                    if (address3 != FAILURE) {
                        elements1.add(address3);
                        --remaining0;
                    }
                }
                if (remaining0 <= 0) {
                    address2 = new TreeNode(input.substring(index3, offset), index3, elements1);
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address4 = FAILURE;
                    address4 = _read_actionable_expression();
                    if (address4 != FAILURE) {
                        elements0.add(2, address4);
                        TreeNode address5 = FAILURE;
                        int remaining1 = 0;
                        int index4 = offset;
                        List<TreeNode> elements2 = new ArrayList<TreeNode>();
                        TreeNode address6 = new TreeNode("", -1);
                        while (address6 != FAILURE) {
                            address6 = _read___();
                            if (address6 != FAILURE) {
                                elements2.add(address6);
                                --remaining1;
                            }
                        }
                        if (remaining1 <= 0) {
                            address5 = new TreeNode(input.substring(index4, offset), index4, elements2);
                            offset = offset;
                        } else {
                            address5 = FAILURE;
                        }
                        if (address5 != FAILURE) {
                            elements0.add(3, address5);
                            TreeNode address7 = FAILURE;
                            String chunk1 = null;
                            if (offset < inputSize) {
                                chunk1 = input.substring(offset, offset + 1);
                            }
                            if (chunk1 != null && chunk1.equals(")")) {
                                address7 = new TreeNode(input.substring(offset, offset + 1), offset);
                                offset = offset + 1;
                            } else {
                                address7 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("\")\"");
                                }
                            }
                            if (address7 != FAILURE) {
                                elements0.add(4, address7);
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
            } else {
                elements0 = null;
                offset = index2;
            }
            if (elements0 == null) {
                address0 = FAILURE;
            } else {
                address0 = new TreeNode10(input.substring(index2, offset), index2, elements0);
                offset = offset;
            }
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_sequence_expression();
                if (address0 == FAILURE) {
                    offset = index1;
                    address0 = _read_repeated_atom();
                    if (address0 == FAILURE) {
                        offset = index1;
                        address0 = _read_terminal_node();
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

    protected TreeNode _read_action_tag() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.action_tag);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.action_tag, rule);
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
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("%")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"%\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_identifier();
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
                address0 = new TreeNode11(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_type_tag() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.type_tag);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.type_tag, rule);
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
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("<")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"<\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_object_identifier();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && chunk1.equals(">")) {
                        address3 = new TreeNode(input.substring(offset, offset + 1), offset);
                        offset = offset + 1;
                    } else {
                        address3 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\">\"");
                        }
                    }
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
                address0 = new TreeNode12(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_sequence_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.sequence_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.sequence_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_sequence_part();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 1;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    int index3 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                    TreeNode address4 = FAILURE;
                    int remaining1 = 1;
                    int index4 = offset;
                    List<TreeNode> elements3 = new ArrayList<TreeNode>();
                    TreeNode address5 = new TreeNode("", -1);
                    while (address5 != FAILURE) {
                        address5 = _read___();
                        if (address5 != FAILURE) {
                            elements3.add(address5);
                            --remaining1;
                        }
                    }
                    if (remaining1 <= 0) {
                        address4 = new TreeNode(input.substring(index4, offset), index4, elements3);
                        offset = offset;
                    } else {
                        address4 = FAILURE;
                    }
                    if (address4 != FAILURE) {
                        elements2.add(0, address4);
                        TreeNode address6 = FAILURE;
                        address6 = _read_sequence_part();
                        if (address6 != FAILURE) {
                            elements2.add(1, address6);
                        } else {
                            elements2 = null;
                            offset = index3;
                        }
                    } else {
                        elements2 = null;
                        offset = index3;
                    }
                    if (elements2 == null) {
                        address3 = FAILURE;
                    } else {
                        address3 = new TreeNode14(input.substring(index3, offset), index3, elements2);
                        offset = offset;
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
                address0 = new TreeNode13(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_sequence_part() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.sequence_part);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.sequence_part, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            int index2 = offset;
            address1 = _read_label();
            if (address1 == FAILURE) {
                address1 = new TreeNode(input.substring(index2, index2), index2);
                offset = index2;
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index3 = offset;
                address2 = _read_maybe_atom();
                if (address2 == FAILURE) {
                    offset = index3;
                    address2 = _read_repeated_atom();
                    if (address2 == FAILURE) {
                        offset = index3;
                        address2 = _read_atom();
                        if (address2 == FAILURE) {
                            offset = index3;
                        }
                    }
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
                address0 = new TreeNode15(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_maybe_atom() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.maybe_atom);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.maybe_atom, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_atom();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                String chunk0 = null;
                if (offset < inputSize) {
                    chunk0 = input.substring(offset, offset + 1);
                }
                if (chunk0 != null && chunk0.equals("?")) {
                    address2 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address2 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"?\"");
                    }
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
                address0 = new TreeNode16(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_repeated_atom() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.repeated_atom);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.repeated_atom, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_atom();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index2 = offset;
                String chunk0 = null;
                if (offset < inputSize) {
                    chunk0 = input.substring(offset, offset + 1);
                }
                if (chunk0 != null && chunk0.equals("*")) {
                    address2 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address2 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"*\"");
                    }
                }
                if (address2 == FAILURE) {
                    offset = index2;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && chunk1.equals("+")) {
                        address2 = new TreeNode(input.substring(offset, offset + 1), offset);
                        offset = offset + 1;
                    } else {
                        address2 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\"+\"");
                        }
                    }
                    if (address2 == FAILURE) {
                        offset = index2;
                    }
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
                address0 = new TreeNode17(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_atom() {
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
            address0 = _read_parenthesised_expression();
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_predicated_atom();
                if (address0 == FAILURE) {
                    offset = index1;
                    address0 = _read_reference_expression();
                    if (address0 == FAILURE) {
                        offset = index1;
                        address0 = _read_terminal_node();
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

    protected TreeNode _read_terminal_node() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.terminal_node);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.terminal_node, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            address0 = _read_string_expression();
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_ci_string_expression();
                if (address0 == FAILURE) {
                    offset = index1;
                    address0 = _read_char_class_expression();
                    if (address0 == FAILURE) {
                        offset = index1;
                        address0 = _read_any_char_expression();
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

    protected TreeNode _read_predicated_atom() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.predicated_atom);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.predicated_atom, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            int index2 = offset;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("&")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"&\"");
                }
            }
            if (address1 == FAILURE) {
                offset = index2;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, offset + 1);
                }
                if (chunk1 != null && chunk1.equals("!")) {
                    address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address1 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"!\"");
                    }
                }
                if (address1 == FAILURE) {
                    offset = index2;
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                address2 = _read_atom();
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
                address0 = new TreeNode18(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_reference_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.reference_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.reference_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_identifier();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int index2 = offset;
                address2 = _read_assignment();
                offset = index2;
                if (address2 == FAILURE) {
                    address2 = new TreeNode(input.substring(offset, offset), offset);
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
                address0 = new TreeNode19(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_string_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.string_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.string_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            int index2 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(3);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("\"")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                int index3 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    int index4 = offset;
                    int index5 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                    TreeNode address4 = FAILURE;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && chunk1.equals("\\")) {
                        address4 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                            address5 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                            offset = index5;
                        }
                    } else {
                        elements2 = null;
                        offset = index5;
                    }
                    if (elements2 == null) {
                        address3 = FAILURE;
                    } else {
                        address3 = new TreeNode(input.substring(index5, offset), index5, elements2);
                        offset = offset;
                    }
                    if (address3 == FAILURE) {
                        offset = index4;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, offset + 1);
                        }
                        if (chunk2 != null && Pattern.matches("\\A[^\"]", chunk2)) {
                            address3 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                            offset = index4;
                        }
                    }
                    if (address3 != FAILURE) {
                        elements1.add(address3);
                        --remaining0;
                    }
                }
                if (remaining0 <= 0) {
                    address2 = new TreeNode(input.substring(index3, offset), index3, elements1);
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address6 = FAILURE;
                    String chunk3 = null;
                    if (offset < inputSize) {
                        chunk3 = input.substring(offset, offset + 1);
                    }
                    if (chunk3 != null && chunk3.equals("\"")) {
                        address6 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                address0 = new TreeNode(input.substring(index2, offset), index2, elements0);
                offset = offset;
            }
            if (address0 == FAILURE) {
                offset = index1;
                int index6 = offset;
                List<TreeNode> elements3 = new ArrayList<TreeNode>(3);
                TreeNode address7 = FAILURE;
                String chunk4 = null;
                if (offset < inputSize) {
                    chunk4 = input.substring(offset, offset + 1);
                }
                if (chunk4 != null && chunk4.equals("'")) {
                    address7 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address7 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"'\"");
                    }
                }
                if (address7 != FAILURE) {
                    elements3.add(0, address7);
                    TreeNode address8 = FAILURE;
                    int remaining1 = 0;
                    int index7 = offset;
                    List<TreeNode> elements4 = new ArrayList<TreeNode>();
                    TreeNode address9 = new TreeNode("", -1);
                    while (address9 != FAILURE) {
                        int index8 = offset;
                        int index9 = offset;
                        List<TreeNode> elements5 = new ArrayList<TreeNode>(2);
                        TreeNode address10 = FAILURE;
                        String chunk5 = null;
                        if (offset < inputSize) {
                            chunk5 = input.substring(offset, offset + 1);
                        }
                        if (chunk5 != null && chunk5.equals("\\")) {
                            address10 = new TreeNode(input.substring(offset, offset + 1), offset);
                            offset = offset + 1;
                        } else {
                            address10 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"\\\\\"");
                            }
                        }
                        if (address10 != FAILURE) {
                            elements5.add(0, address10);
                            TreeNode address11 = FAILURE;
                            if (offset < inputSize) {
                                address11 = new TreeNode(input.substring(offset, offset + 1), offset);
                                offset = offset + 1;
                            } else {
                                address11 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("<any char>");
                                }
                            }
                            if (address11 != FAILURE) {
                                elements5.add(1, address11);
                            } else {
                                elements5 = null;
                                offset = index9;
                            }
                        } else {
                            elements5 = null;
                            offset = index9;
                        }
                        if (elements5 == null) {
                            address9 = FAILURE;
                        } else {
                            address9 = new TreeNode(input.substring(index9, offset), index9, elements5);
                            offset = offset;
                        }
                        if (address9 == FAILURE) {
                            offset = index8;
                            String chunk6 = null;
                            if (offset < inputSize) {
                                chunk6 = input.substring(offset, offset + 1);
                            }
                            if (chunk6 != null && Pattern.matches("\\A[^']", chunk6)) {
                                address9 = new TreeNode(input.substring(offset, offset + 1), offset);
                                offset = offset + 1;
                            } else {
                                address9 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("[^']");
                                }
                            }
                            if (address9 == FAILURE) {
                                offset = index8;
                            }
                        }
                        if (address9 != FAILURE) {
                            elements4.add(address9);
                            --remaining1;
                        }
                    }
                    if (remaining1 <= 0) {
                        address8 = new TreeNode(input.substring(index7, offset), index7, elements4);
                        offset = offset;
                    } else {
                        address8 = FAILURE;
                    }
                    if (address8 != FAILURE) {
                        elements3.add(1, address8);
                        TreeNode address12 = FAILURE;
                        String chunk7 = null;
                        if (offset < inputSize) {
                            chunk7 = input.substring(offset, offset + 1);
                        }
                        if (chunk7 != null && chunk7.equals("'")) {
                            address12 = new TreeNode(input.substring(offset, offset + 1), offset);
                            offset = offset + 1;
                        } else {
                            address12 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"'\"");
                            }
                        }
                        if (address12 != FAILURE) {
                            elements3.add(2, address12);
                        } else {
                            elements3 = null;
                            offset = index6;
                        }
                    } else {
                        elements3 = null;
                        offset = index6;
                    }
                } else {
                    elements3 = null;
                    offset = index6;
                }
                if (elements3 == null) {
                    address0 = FAILURE;
                } else {
                    address0 = new TreeNode(input.substring(index6, offset), index6, elements3);
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

    protected TreeNode _read_ci_string_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.ci_string_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.ci_string_expression, rule);
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
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("`")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"`\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    int index3 = offset;
                    int index4 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                    TreeNode address4 = FAILURE;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && chunk1.equals("\\")) {
                        address4 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                            address5 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                            chunk2 = input.substring(offset, offset + 1);
                        }
                        if (chunk2 != null && Pattern.matches("\\A[^`]", chunk2)) {
                            address3 = new TreeNode(input.substring(offset, offset + 1), offset);
                            offset = offset + 1;
                        } else {
                            address3 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("[^`]");
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
                        chunk3 = input.substring(offset, offset + 1);
                    }
                    if (chunk3 != null && chunk3.equals("`")) {
                        address6 = new TreeNode(input.substring(offset, offset + 1), offset);
                        offset = offset + 1;
                    } else {
                        address6 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\"`\"");
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

    protected TreeNode _read_any_char_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.any_char_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.any_char_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals(".")) {
                address0 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address0 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\".\"");
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_char_class_expression() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.char_class_expression);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.char_class_expression, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(4);
            TreeNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("[")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
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
                int index2 = offset;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, offset + 1);
                }
                if (chunk1 != null && chunk1.equals("^")) {
                    address2 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address2 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\"^\"");
                    }
                }
                if (address2 == FAILURE) {
                    address2 = new TreeNode(input.substring(index2, index2), index2);
                    offset = index2;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    TreeNode address3 = FAILURE;
                    int remaining0 = 1;
                    int index3 = offset;
                    List<TreeNode> elements1 = new ArrayList<TreeNode>();
                    TreeNode address4 = new TreeNode("", -1);
                    while (address4 != FAILURE) {
                        int index4 = offset;
                        int index5 = offset;
                        List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                        TreeNode address5 = FAILURE;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, offset + 1);
                        }
                        if (chunk2 != null && chunk2.equals("\\")) {
                            address5 = new TreeNode(input.substring(offset, offset + 1), offset);
                            offset = offset + 1;
                        } else {
                            address5 = FAILURE;
                            if (offset > failure) {
                                failure = offset;
                                expected = new ArrayList<String>();
                            }
                            if (offset == failure) {
                                expected.add("\"\\\\\"");
                            }
                        }
                        if (address5 != FAILURE) {
                            elements2.add(0, address5);
                            TreeNode address6 = FAILURE;
                            if (offset < inputSize) {
                                address6 = new TreeNode(input.substring(offset, offset + 1), offset);
                                offset = offset + 1;
                            } else {
                                address6 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("<any char>");
                                }
                            }
                            if (address6 != FAILURE) {
                                elements2.add(1, address6);
                            } else {
                                elements2 = null;
                                offset = index5;
                            }
                        } else {
                            elements2 = null;
                            offset = index5;
                        }
                        if (elements2 == null) {
                            address4 = FAILURE;
                        } else {
                            address4 = new TreeNode(input.substring(index5, offset), index5, elements2);
                            offset = offset;
                        }
                        if (address4 == FAILURE) {
                            offset = index4;
                            String chunk3 = null;
                            if (offset < inputSize) {
                                chunk3 = input.substring(offset, offset + 1);
                            }
                            if (chunk3 != null && Pattern.matches("\\A[^\\]]", chunk3)) {
                                address4 = new TreeNode(input.substring(offset, offset + 1), offset);
                                offset = offset + 1;
                            } else {
                                address4 = FAILURE;
                                if (offset > failure) {
                                    failure = offset;
                                    expected = new ArrayList<String>();
                                }
                                if (offset == failure) {
                                    expected.add("[^\\]]");
                                }
                            }
                            if (address4 == FAILURE) {
                                offset = index4;
                            }
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
                        String chunk4 = null;
                        if (offset < inputSize) {
                            chunk4 = input.substring(offset, offset + 1);
                        }
                        if (chunk4 != null && chunk4.equals("]")) {
                            address7 = new TreeNode(input.substring(offset, offset + 1), offset);
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

    protected TreeNode _read_label() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.label);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.label, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_identifier();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                String chunk0 = null;
                if (offset < inputSize) {
                    chunk0 = input.substring(offset, offset + 1);
                }
                if (chunk0 != null && chunk0.equals(":")) {
                    address2 = new TreeNode(input.substring(offset, offset + 1), offset);
                    offset = offset + 1;
                } else {
                    address2 = FAILURE;
                    if (offset > failure) {
                        failure = offset;
                        expected = new ArrayList<String>();
                    }
                    if (offset == failure) {
                        expected.add("\":\"");
                    }
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
                address0 = new TreeNode20(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_object_identifier() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.object_identifier);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.object_identifier, rule);
        }
        if (rule.containsKey(offset)) {
            address0 = rule.get(offset).node;
            offset = rule.get(offset).tail;
        } else {
            int index1 = offset;
            List<TreeNode> elements0 = new ArrayList<TreeNode>(2);
            TreeNode address1 = FAILURE;
            address1 = _read_identifier();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    int index3 = offset;
                    List<TreeNode> elements2 = new ArrayList<TreeNode>(2);
                    TreeNode address4 = FAILURE;
                    String chunk0 = null;
                    if (offset < inputSize) {
                        chunk0 = input.substring(offset, offset + 1);
                    }
                    if (chunk0 != null && chunk0.equals(".")) {
                        address4 = new TreeNode(input.substring(offset, offset + 1), offset);
                        offset = offset + 1;
                    } else {
                        address4 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("\".\"");
                        }
                    }
                    if (address4 != FAILURE) {
                        elements2.add(0, address4);
                        TreeNode address5 = FAILURE;
                        address5 = _read_identifier();
                        if (address5 != FAILURE) {
                            elements2.add(1, address5);
                        } else {
                            elements2 = null;
                            offset = index3;
                        }
                    } else {
                        elements2 = null;
                        offset = index3;
                    }
                    if (elements2 == null) {
                        address3 = FAILURE;
                    } else {
                        address3 = new TreeNode22(input.substring(index3, offset), index3, elements2);
                        offset = offset;
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
                address0 = new TreeNode21(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_identifier() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.identifier);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.identifier, rule);
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
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && Pattern.matches("\\A[a-zA-Z_]", chunk0)) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("[a-zA-Z_]");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && Pattern.matches("\\A[a-zA-Z0-9_]", chunk1)) {
                        address3 = new TreeNode(input.substring(offset, offset + 1), offset);
                        offset = offset + 1;
                    } else {
                        address3 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("[a-zA-Z0-9_]");
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

    protected TreeNode _read___() {
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
            int index1 = offset;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && Pattern.matches("\\A[\\s]", chunk0)) {
                address0 = new TreeNode(input.substring(offset, offset + 1), offset);
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
            if (address0 == FAILURE) {
                offset = index1;
                address0 = _read_comment();
                if (address0 == FAILURE) {
                    offset = index1;
                }
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected TreeNode _read_comment() {
        TreeNode address0 = FAILURE;
        int index0 = offset;
        Map<Integer, CacheRecord> rule = cache.get(Label.comment);
        if (rule == null) {
            rule = new HashMap<Integer, CacheRecord>();
            cache.put(Label.comment, rule);
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
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("#")) {
                address1 = new TreeNode(input.substring(offset, offset + 1), offset);
                offset = offset + 1;
            } else {
                address1 = FAILURE;
                if (offset > failure) {
                    failure = offset;
                    expected = new ArrayList<String>();
                }
                if (offset == failure) {
                    expected.add("\"#\"");
                }
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                TreeNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<TreeNode> elements1 = new ArrayList<TreeNode>();
                TreeNode address3 = new TreeNode("", -1);
                while (address3 != FAILURE) {
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && Pattern.matches("\\A[^\\n]", chunk1)) {
                        address3 = new TreeNode(input.substring(offset, offset + 1), offset);
                        offset = offset + 1;
                    } else {
                        address3 = FAILURE;
                        if (offset > failure) {
                            failure = offset;
                            expected = new ArrayList<String>();
                        }
                        if (offset == failure) {
                            expected.add("[^\\n]");
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
}
