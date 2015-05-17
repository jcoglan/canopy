package examples.canopy.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

abstract class Grammar {
    static SyntaxNode FAILURE = new SyntaxNode("", -1);

    int inputSize, offset, failure;
    String input;
    List<String> expected;
    Map<Label, Map<Integer, CacheRecord>> cache;

    protected SyntaxNode _read_document() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(3);
            SyntaxNode address1 = FAILURE;
            address1 = _read___();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                SyntaxNode address2 = FAILURE;
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
                    SyntaxNode address3 = FAILURE;
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
                address0 = new SyntaxNode1(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected SyntaxNode _read_object() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(4);
            SyntaxNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("{")) {
                address1 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                SyntaxNode address2 = FAILURE;
                address2 = _read_pair();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    SyntaxNode address3 = FAILURE;
                    int remaining0 = 0;
                    int index3 = offset;
                    List<SyntaxNode> elements1 = new ArrayList<SyntaxNode>();
                    SyntaxNode address4 = new SyntaxNode("", -1);
                    while (address4 != FAILURE) {
                        int index4 = offset;
                        List<SyntaxNode> elements2 = new ArrayList<SyntaxNode>(2);
                        SyntaxNode address5 = FAILURE;
                        String chunk1 = null;
                        if (offset < inputSize) {
                            chunk1 = input.substring(offset, offset + 1);
                        }
                        if (chunk1 != null && chunk1.equals(",")) {
                            address5 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                            SyntaxNode address6 = FAILURE;
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
                            address4 = new SyntaxNode3(input.substring(index4, offset), index4, elements2);
                            offset = offset;
                        }
                        if (address4 != FAILURE) {
                            elements1.add(address4);
                            --remaining0;
                        }
                    }
                    if (remaining0 <= 0) {
                        address3 = new SyntaxNode(input.substring(index3, offset), index3, elements1);
                        offset = offset;
                    } else {
                        address3 = FAILURE;
                    }
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
                        SyntaxNode address7 = FAILURE;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, offset + 1);
                        }
                        if (chunk2 != null && chunk2.equals("}")) {
                            address7 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                address0 = new SyntaxNode2(input.substring(index2, offset), index2, elements0);
                offset = offset;
            }
            if (address0 == FAILURE) {
                offset = index1;
                int index5 = offset;
                List<SyntaxNode> elements3 = new ArrayList<SyntaxNode>(3);
                SyntaxNode address8 = FAILURE;
                String chunk3 = null;
                if (offset < inputSize) {
                    chunk3 = input.substring(offset, offset + 1);
                }
                if (chunk3 != null && chunk3.equals("{")) {
                    address8 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                    SyntaxNode address9 = FAILURE;
                    address9 = _read___();
                    if (address9 != FAILURE) {
                        elements3.add(1, address9);
                        SyntaxNode address10 = FAILURE;
                        String chunk4 = null;
                        if (offset < inputSize) {
                            chunk4 = input.substring(offset, offset + 1);
                        }
                        if (chunk4 != null && chunk4.equals("}")) {
                            address10 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                    address0 = new SyntaxNode4(input.substring(index5, offset), index5, elements3);
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

    protected SyntaxNode _read_pair() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(5);
            SyntaxNode address1 = FAILURE;
            address1 = _read___();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                SyntaxNode address2 = FAILURE;
                address2 = _read_string();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    SyntaxNode address3 = FAILURE;
                    address3 = _read___();
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
                        SyntaxNode address4 = FAILURE;
                        String chunk0 = null;
                        if (offset < inputSize) {
                            chunk0 = input.substring(offset, offset + 1);
                        }
                        if (chunk0 != null && chunk0.equals(":")) {
                            address4 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                            SyntaxNode address5 = FAILURE;
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
                address0 = new SyntaxNode5(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected SyntaxNode _read_array() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(4);
            SyntaxNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("[")) {
                address1 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                SyntaxNode address2 = FAILURE;
                address2 = _read_value();
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    SyntaxNode address3 = FAILURE;
                    int remaining0 = 0;
                    int index3 = offset;
                    List<SyntaxNode> elements1 = new ArrayList<SyntaxNode>();
                    SyntaxNode address4 = new SyntaxNode("", -1);
                    while (address4 != FAILURE) {
                        int index4 = offset;
                        List<SyntaxNode> elements2 = new ArrayList<SyntaxNode>(2);
                        SyntaxNode address5 = FAILURE;
                        String chunk1 = null;
                        if (offset < inputSize) {
                            chunk1 = input.substring(offset, offset + 1);
                        }
                        if (chunk1 != null && chunk1.equals(",")) {
                            address5 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                            SyntaxNode address6 = FAILURE;
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
                            address4 = new SyntaxNode7(input.substring(index4, offset), index4, elements2);
                            offset = offset;
                        }
                        if (address4 != FAILURE) {
                            elements1.add(address4);
                            --remaining0;
                        }
                    }
                    if (remaining0 <= 0) {
                        address3 = new SyntaxNode(input.substring(index3, offset), index3, elements1);
                        offset = offset;
                    } else {
                        address3 = FAILURE;
                    }
                    if (address3 != FAILURE) {
                        elements0.add(2, address3);
                        SyntaxNode address7 = FAILURE;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, offset + 1);
                        }
                        if (chunk2 != null && chunk2.equals("]")) {
                            address7 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                address0 = new SyntaxNode6(input.substring(index2, offset), index2, elements0);
                offset = offset;
            }
            if (address0 == FAILURE) {
                offset = index1;
                int index5 = offset;
                List<SyntaxNode> elements3 = new ArrayList<SyntaxNode>(3);
                SyntaxNode address8 = FAILURE;
                String chunk3 = null;
                if (offset < inputSize) {
                    chunk3 = input.substring(offset, offset + 1);
                }
                if (chunk3 != null && chunk3.equals("[")) {
                    address8 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                    SyntaxNode address9 = FAILURE;
                    address9 = _read___();
                    if (address9 != FAILURE) {
                        elements3.add(1, address9);
                        SyntaxNode address10 = FAILURE;
                        String chunk4 = null;
                        if (offset < inputSize) {
                            chunk4 = input.substring(offset, offset + 1);
                        }
                        if (chunk4 != null && chunk4.equals("]")) {
                            address10 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                    address0 = new SyntaxNode8(input.substring(index5, offset), index5, elements3);
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

    protected SyntaxNode _read_value() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(3);
            SyntaxNode address1 = FAILURE;
            address1 = _read___();
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                SyntaxNode address2 = FAILURE;
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
                    SyntaxNode address3 = FAILURE;
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
                address0 = new SyntaxNode9(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected SyntaxNode _read_string() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(3);
            SyntaxNode address1 = FAILURE;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("\"")) {
                address1 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                SyntaxNode address2 = FAILURE;
                int remaining0 = 0;
                int index2 = offset;
                List<SyntaxNode> elements1 = new ArrayList<SyntaxNode>();
                SyntaxNode address3 = new SyntaxNode("", -1);
                while (address3 != FAILURE) {
                    int index3 = offset;
                    int index4 = offset;
                    List<SyntaxNode> elements2 = new ArrayList<SyntaxNode>(2);
                    SyntaxNode address4 = FAILURE;
                    String chunk1 = null;
                    if (offset < inputSize) {
                        chunk1 = input.substring(offset, offset + 1);
                    }
                    if (chunk1 != null && chunk1.equals("\\")) {
                        address4 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                        SyntaxNode address5 = FAILURE;
                        if (offset < inputSize) {
                            address5 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                        address3 = new SyntaxNode(input.substring(index4, offset), index4, elements2);
                        offset = offset;
                    }
                    if (address3 == FAILURE) {
                        offset = index3;
                        String chunk2 = null;
                        if (offset < inputSize) {
                            chunk2 = input.substring(offset, offset + 1);
                        }
                        if (chunk2 != null && Pattern.matches("\\A[^\"]", chunk2)) {
                            address3 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                    address2 = new SyntaxNode(input.substring(index2, offset), index2, elements1);
                    offset = offset;
                } else {
                    address2 = FAILURE;
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    SyntaxNode address6 = FAILURE;
                    String chunk3 = null;
                    if (offset < inputSize) {
                        chunk3 = input.substring(offset, offset + 1);
                    }
                    if (chunk3 != null && chunk3.equals("\"")) {
                        address6 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                address0 = new SyntaxNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected SyntaxNode _read_number() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>(4);
            SyntaxNode address1 = FAILURE;
            int index2 = offset;
            String chunk0 = null;
            if (offset < inputSize) {
                chunk0 = input.substring(offset, offset + 1);
            }
            if (chunk0 != null && chunk0.equals("-")) {
                address1 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                address1 = new SyntaxNode(input.substring(index2, index2), index2);
                offset = index2;
            }
            if (address1 != FAILURE) {
                elements0.add(0, address1);
                SyntaxNode address2 = FAILURE;
                int index3 = offset;
                String chunk1 = null;
                if (offset < inputSize) {
                    chunk1 = input.substring(offset, offset + 1);
                }
                if (chunk1 != null && chunk1.equals("0")) {
                    address2 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                    List<SyntaxNode> elements1 = new ArrayList<SyntaxNode>(2);
                    SyntaxNode address3 = FAILURE;
                    String chunk2 = null;
                    if (offset < inputSize) {
                        chunk2 = input.substring(offset, offset + 1);
                    }
                    if (chunk2 != null && Pattern.matches("\\A[1-9]", chunk2)) {
                        address3 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                        SyntaxNode address4 = FAILURE;
                        int remaining0 = 0;
                        int index5 = offset;
                        List<SyntaxNode> elements2 = new ArrayList<SyntaxNode>();
                        SyntaxNode address5 = new SyntaxNode("", -1);
                        while (address5 != FAILURE) {
                            String chunk3 = null;
                            if (offset < inputSize) {
                                chunk3 = input.substring(offset, offset + 1);
                            }
                            if (chunk3 != null && Pattern.matches("\\A[0-9]", chunk3)) {
                                address5 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                            address4 = new SyntaxNode(input.substring(index5, offset), index5, elements2);
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
                        address2 = new SyntaxNode(input.substring(index4, offset), index4, elements1);
                        offset = offset;
                    }
                    if (address2 == FAILURE) {
                        offset = index3;
                    }
                }
                if (address2 != FAILURE) {
                    elements0.add(1, address2);
                    SyntaxNode address6 = FAILURE;
                    int index6 = offset;
                    int index7 = offset;
                    List<SyntaxNode> elements3 = new ArrayList<SyntaxNode>(2);
                    SyntaxNode address7 = FAILURE;
                    String chunk4 = null;
                    if (offset < inputSize) {
                        chunk4 = input.substring(offset, offset + 1);
                    }
                    if (chunk4 != null && chunk4.equals(".")) {
                        address7 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                        SyntaxNode address8 = FAILURE;
                        int remaining1 = 1;
                        int index8 = offset;
                        List<SyntaxNode> elements4 = new ArrayList<SyntaxNode>();
                        SyntaxNode address9 = new SyntaxNode("", -1);
                        while (address9 != FAILURE) {
                            String chunk5 = null;
                            if (offset < inputSize) {
                                chunk5 = input.substring(offset, offset + 1);
                            }
                            if (chunk5 != null && Pattern.matches("\\A[0-9]", chunk5)) {
                                address9 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                            address8 = new SyntaxNode(input.substring(index8, offset), index8, elements4);
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
                        address6 = new SyntaxNode(input.substring(index7, offset), index7, elements3);
                        offset = offset;
                    }
                    if (address6 == FAILURE) {
                        address6 = new SyntaxNode(input.substring(index6, index6), index6);
                        offset = index6;
                    }
                    if (address6 != FAILURE) {
                        elements0.add(2, address6);
                        SyntaxNode address10 = FAILURE;
                        int index9 = offset;
                        int index10 = offset;
                        List<SyntaxNode> elements5 = new ArrayList<SyntaxNode>(3);
                        SyntaxNode address11 = FAILURE;
                        int index11 = offset;
                        String chunk6 = null;
                        if (offset < inputSize) {
                            chunk6 = input.substring(offset, offset + 1);
                        }
                        if (chunk6 != null && chunk6.equals("e")) {
                            address11 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                                chunk7 = input.substring(offset, offset + 1);
                            }
                            if (chunk7 != null && chunk7.equals("E")) {
                                address11 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                            SyntaxNode address12 = FAILURE;
                            int index12 = offset;
                            String chunk8 = null;
                            if (offset < inputSize) {
                                chunk8 = input.substring(offset, offset + 1);
                            }
                            if (chunk8 != null && chunk8.equals("+")) {
                                address12 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                                    chunk9 = input.substring(offset, offset + 1);
                                }
                                if (chunk9 != null && chunk9.equals("-")) {
                                    address12 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                                        chunk10 = input.substring(offset, offset + 0);
                                    }
                                    if (chunk10 != null && chunk10.equals("")) {
                                        address12 = new SyntaxNode(input.substring(offset, offset + 0), offset);
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
                                SyntaxNode address13 = FAILURE;
                                int remaining2 = 1;
                                int index13 = offset;
                                List<SyntaxNode> elements6 = new ArrayList<SyntaxNode>();
                                SyntaxNode address14 = new SyntaxNode("", -1);
                                while (address14 != FAILURE) {
                                    String chunk11 = null;
                                    if (offset < inputSize) {
                                        chunk11 = input.substring(offset, offset + 1);
                                    }
                                    if (chunk11 != null && Pattern.matches("\\A[0-9]", chunk11)) {
                                        address14 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                                    address13 = new SyntaxNode(input.substring(index13, offset), index13, elements6);
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
                            address10 = new SyntaxNode(input.substring(index10, offset), index10, elements5);
                            offset = offset;
                        }
                        if (address10 == FAILURE) {
                            address10 = new SyntaxNode(input.substring(index9, index9), index9);
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
                address0 = new SyntaxNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }

    protected SyntaxNode _read_boolean_() {
        SyntaxNode address0 = FAILURE;
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
                chunk0 = input.substring(offset, offset + 4);
            }
            if (chunk0 != null && chunk0.equals("true")) {
                address0 = new SyntaxNode(input.substring(offset, offset + 4), offset);
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
                    chunk1 = input.substring(offset, offset + 5);
                }
                if (chunk1 != null && chunk1.equals("false")) {
                    address0 = new SyntaxNode(input.substring(offset, offset + 5), offset);
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

    protected SyntaxNode _read_null_() {
        SyntaxNode address0 = FAILURE;
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
                chunk0 = input.substring(offset, offset + 4);
            }
            if (chunk0 != null && chunk0.equals("null")) {
                address0 = new SyntaxNode(input.substring(offset, offset + 4), offset);
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

    protected SyntaxNode _read___() {
        SyntaxNode address0 = FAILURE;
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
            List<SyntaxNode> elements0 = new ArrayList<SyntaxNode>();
            SyntaxNode address1 = new SyntaxNode("", -1);
            while (address1 != FAILURE) {
                String chunk0 = null;
                if (offset < inputSize) {
                    chunk0 = input.substring(offset, offset + 1);
                }
                if (chunk0 != null && Pattern.matches("\\A[\\s]", chunk0)) {
                    address1 = new SyntaxNode(input.substring(offset, offset + 1), offset);
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
                address0 = new SyntaxNode(input.substring(index1, offset), index1, elements0);
                offset = offset;
            } else {
                address0 = FAILURE;
            }
            rule.put(index0, new CacheRecord(address0, offset));
        }
        return address0;
    }
}
