from collections import defaultdict
import re


class SyntaxNode(object):
    def __init__(self, text, offset, elements=None):
        self.text = text
        self.offset = offset
        self.elements = elements or []

    def __iter__(self):
        for el in self.elements:
            yield el


class SyntaxNode1(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode1, self).__init__(text, offset, elements)
        self.grammar_name = elements[1]
        self.rules = elements[2]


class SyntaxNode2(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode2, self).__init__(text, offset, elements)
        self.grammar_rule = elements[1]


class SyntaxNode3(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode3, self).__init__(text, offset, elements)
        self.object_identifier = elements[3]


class SyntaxNode4(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode4, self).__init__(text, offset, elements)
        self.identifier = elements[0]
        self.assignment = elements[1]
        self.parsing_expression = elements[2]


class SyntaxNode5(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode5, self).__init__(text, offset, elements)
        self.parsing_expression = elements[2]


class SyntaxNode6(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode6, self).__init__(text, offset, elements)
        self.first_part = elements[0]
        self.choice_part = elements[0]
        self.rest = elements[1]


class SyntaxNode7(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode7, self).__init__(text, offset, elements)
        self.expression = elements[3]
        self.choice_part = elements[3]


class SyntaxNode8(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode8, self).__init__(text, offset, elements)
        self.type_tag = elements[1]


class SyntaxNode9(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode9, self).__init__(text, offset, elements)
        self.actionable_expression = elements[0]
        self.action_tag = elements[2]


class SyntaxNode10(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode10, self).__init__(text, offset, elements)
        self.actionable_expression = elements[2]


class SyntaxNode11(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode11, self).__init__(text, offset, elements)
        self.identifier = elements[1]


class SyntaxNode12(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode12, self).__init__(text, offset, elements)
        self.object_identifier = elements[1]


class SyntaxNode13(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode13, self).__init__(text, offset, elements)
        self.first_part = elements[0]
        self.sequence_part = elements[0]
        self.rest = elements[1]


class SyntaxNode14(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode14, self).__init__(text, offset, elements)
        self.expression = elements[1]
        self.sequence_part = elements[1]


class SyntaxNode15(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode15, self).__init__(text, offset, elements)
        self.expression = elements[1]


class SyntaxNode16(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode16, self).__init__(text, offset, elements)
        self.atom = elements[0]


class SyntaxNode17(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode17, self).__init__(text, offset, elements)
        self.atom = elements[0]
        self.quantifier = elements[1]


class SyntaxNode18(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode18, self).__init__(text, offset, elements)
        self.predicate = elements[0]
        self.atom = elements[1]


class SyntaxNode19(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode19, self).__init__(text, offset, elements)
        self.identifier = elements[0]


class SyntaxNode20(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode20, self).__init__(text, offset, elements)
        self.identifier = elements[0]


class SyntaxNode21(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode21, self).__init__(text, offset, elements)
        self.identifier = elements[0]


class SyntaxNode22(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode22, self).__init__(text, offset, elements)
        self.identifier = elements[1]


class ParseError(SyntaxError):
    pass


FAILURE = object()


class Grammar(object):
    def _read_grammar(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['grammar'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        remaining0, index2, elements1, address2 = 0, self._offset, [], True
        while address2 is not FAILURE:
            address2 = self._read___()
            if address2 is not FAILURE:
                elements1.append(address2)
                remaining0 -= 1
        if remaining0 <= 0:
            address1 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
            self._offset = self._offset
        else:
            address1 = FAILURE
        if address1 is not FAILURE:
            elements0.append(address1)
            address3 = FAILURE
            address3 = self._read_grammar_name()
            if address3 is not FAILURE:
                elements0.append(address3)
                address4 = FAILURE
                remaining1, index3, elements2, address5 = 1, self._offset, [], True
                while address5 is not FAILURE:
                    index4, elements3 = self._offset, []
                    address6 = FAILURE
                    remaining2, index5, elements4, address7 = 0, self._offset, [], True
                    while address7 is not FAILURE:
                        address7 = self._read___()
                        if address7 is not FAILURE:
                            elements4.append(address7)
                            remaining2 -= 1
                    if remaining2 <= 0:
                        address6 = SyntaxNode(self._input[index5:self._offset], index5, elements4)
                        self._offset = self._offset
                    else:
                        address6 = FAILURE
                    if address6 is not FAILURE:
                        elements3.append(address6)
                        address8 = FAILURE
                        address8 = self._read_grammar_rule()
                        if address8 is not FAILURE:
                            elements3.append(address8)
                        else:
                            elements3 = None
                            self._offset = index4
                    else:
                        elements3 = None
                        self._offset = index4
                    if elements3:
                        address5 = SyntaxNode2(self._input[index4:self._offset], index4, elements3)
                        self._offset = self._offset
                    else:
                        address5 = FAILURE
                    if address5 is not FAILURE:
                        elements2.append(address5)
                        remaining1 -= 1
                if remaining1 <= 0:
                    address4 = SyntaxNode(self._input[index3:self._offset], index3, elements2)
                    self._offset = self._offset
                else:
                    address4 = FAILURE
                if address4 is not FAILURE:
                    elements0.append(address4)
                    address9 = FAILURE
                    remaining3, index6, elements5, address10 = 0, self._offset, [], True
                    while address10 is not FAILURE:
                        address10 = self._read___()
                        if address10 is not FAILURE:
                            elements5.append(address10)
                            remaining3 -= 1
                    if remaining3 <= 0:
                        address9 = SyntaxNode(self._input[index6:self._offset], index6, elements5)
                        self._offset = self._offset
                    else:
                        address9 = FAILURE
                    if address9 is not FAILURE:
                        elements0.append(address9)
                    else:
                        elements0 = None
                        self._offset = index1
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode1(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['grammar'][index0] = (address0, self._offset)
        return address0

    def _read_grammar_name(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['grammar_name'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 7]
        if chunk0.lower() == 'grammar'.lower():
            address1 = SyntaxNode(self._input[self._offset:self._offset + 7], self._offset)
            self._offset = self._offset + 7
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('`grammar`')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index2 = self._offset
            chunk1 = None
            if self._offset < self._input_size:
                chunk1 = self._input[self._offset:self._offset + 1]
            if chunk1 == ':':
                address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address2 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('":"')
            if address2 is FAILURE:
                address2 = SyntaxNode(self._input[index2:index2], index2)
                self._offset = index2
            if address2 is not FAILURE:
                elements0.append(address2)
                address3 = FAILURE
                remaining0, index3, elements1, address4 = 1, self._offset, [], True
                while address4 is not FAILURE:
                    address4 = self._read___()
                    if address4 is not FAILURE:
                        elements1.append(address4)
                        remaining0 -= 1
                if remaining0 <= 0:
                    address3 = SyntaxNode(self._input[index3:self._offset], index3, elements1)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is not FAILURE:
                    elements0.append(address3)
                    address5 = FAILURE
                    address5 = self._read_object_identifier()
                    if address5 is not FAILURE:
                        elements0.append(address5)
                    else:
                        elements0 = None
                        self._offset = index1
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode3(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['grammar_name'][index0] = (address0, self._offset)
        return address0

    def _read_grammar_rule(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['grammar_rule'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_identifier()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            address2 = self._read_assignment()
            if address2 is not FAILURE:
                elements0.append(address2)
                address3 = FAILURE
                address3 = self._read_parsing_expression()
                if address3 is not FAILURE:
                    elements0.append(address3)
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode4(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['grammar_rule'][index0] = (address0, self._offset)
        return address0

    def _read_assignment(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['assignment'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        remaining0, index2, elements1, address2 = 1, self._offset, [], True
        while address2 is not FAILURE:
            address2 = self._read___()
            if address2 is not FAILURE:
                elements1.append(address2)
                remaining0 -= 1
        if remaining0 <= 0:
            address1 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
            self._offset = self._offset
        else:
            address1 = FAILURE
        if address1 is not FAILURE:
            elements0.append(address1)
            address3 = FAILURE
            chunk0 = None
            if self._offset < self._input_size:
                chunk0 = self._input[self._offset:self._offset + 2]
            if chunk0 == '<-':
                address3 = SyntaxNode(self._input[self._offset:self._offset + 2], self._offset)
                self._offset = self._offset + 2
            else:
                address3 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"<-"')
            if address3 is not FAILURE:
                elements0.append(address3)
                address4 = FAILURE
                remaining1, index3, elements2, address5 = 1, self._offset, [], True
                while address5 is not FAILURE:
                    address5 = self._read___()
                    if address5 is not FAILURE:
                        elements2.append(address5)
                        remaining1 -= 1
                if remaining1 <= 0:
                    address4 = SyntaxNode(self._input[index3:self._offset], index3, elements2)
                    self._offset = self._offset
                else:
                    address4 = FAILURE
                if address4 is not FAILURE:
                    elements0.append(address4)
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['assignment'][index0] = (address0, self._offset)
        return address0

    def _read_parsing_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['parsing_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_choice_expression()
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_choice_part()
            if address0 is FAILURE:
                self._offset = index1
        self._cache['parsing_expression'][index0] = (address0, self._offset)
        return address0

    def _read_parenthesised_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['parenthesised_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '(':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"("')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                address3 = self._read___()
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address4 = FAILURE
                address4 = self._read_parsing_expression()
                if address4 is not FAILURE:
                    elements0.append(address4)
                    address5 = FAILURE
                    remaining1, index3, elements2, address6 = 0, self._offset, [], True
                    while address6 is not FAILURE:
                        address6 = self._read___()
                        if address6 is not FAILURE:
                            elements2.append(address6)
                            remaining1 -= 1
                    if remaining1 <= 0:
                        address5 = SyntaxNode(self._input[index3:self._offset], index3, elements2)
                        self._offset = self._offset
                    else:
                        address5 = FAILURE
                    if address5 is not FAILURE:
                        elements0.append(address5)
                        address7 = FAILURE
                        chunk1 = None
                        if self._offset < self._input_size:
                            chunk1 = self._input[self._offset:self._offset + 1]
                        if chunk1 == ')':
                            address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                            self._offset = self._offset + 1
                        else:
                            address7 = FAILURE
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('")"')
                        if address7 is not FAILURE:
                            elements0.append(address7)
                        else:
                            elements0 = None
                            self._offset = index1
                    else:
                        elements0 = None
                        self._offset = index1
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode5(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['parenthesised_expression'][index0] = (address0, self._offset)
        return address0

    def _read_choice_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['choice_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_choice_part()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 1, self._offset, [], True
            while address3 is not FAILURE:
                index3, elements2 = self._offset, []
                address4 = FAILURE
                remaining1, index4, elements3, address5 = 1, self._offset, [], True
                while address5 is not FAILURE:
                    address5 = self._read___()
                    if address5 is not FAILURE:
                        elements3.append(address5)
                        remaining1 -= 1
                if remaining1 <= 0:
                    address4 = SyntaxNode(self._input[index4:self._offset], index4, elements3)
                    self._offset = self._offset
                else:
                    address4 = FAILURE
                if address4 is not FAILURE:
                    elements2.append(address4)
                    address6 = FAILURE
                    chunk0 = None
                    if self._offset < self._input_size:
                        chunk0 = self._input[self._offset:self._offset + 1]
                    if chunk0 == '/':
                        address6 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address6 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"/"')
                    if address6 is not FAILURE:
                        elements2.append(address6)
                        address7 = FAILURE
                        remaining2, index5, elements4, address8 = 1, self._offset, [], True
                        while address8 is not FAILURE:
                            address8 = self._read___()
                            if address8 is not FAILURE:
                                elements4.append(address8)
                                remaining2 -= 1
                        if remaining2 <= 0:
                            address7 = SyntaxNode(self._input[index5:self._offset], index5, elements4)
                            self._offset = self._offset
                        else:
                            address7 = FAILURE
                        if address7 is not FAILURE:
                            elements2.append(address7)
                            address9 = FAILURE
                            address9 = self._read_choice_part()
                            if address9 is not FAILURE:
                                elements2.append(address9)
                            else:
                                elements2 = None
                                self._offset = index3
                        else:
                            elements2 = None
                            self._offset = index3
                    else:
                        elements2 = None
                        self._offset = index3
                else:
                    elements2 = None
                    self._offset = index3
                if elements2:
                    address3 = SyntaxNode7(self._input[index3:self._offset], index3, elements2)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode6(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['choice_expression'][index0] = (address0, self._offset)
        return address0

    def _read_choice_part(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['choice_part'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        index2 = self._offset
        address1 = self._read_action_expression()
        if address1 is FAILURE:
            self._offset = index2
            address1 = self._read_sequence_expression()
            if address1 is FAILURE:
                self._offset = index2
                address1 = self._read_sequence_part()
                if address1 is FAILURE:
                    self._offset = index2
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index3 = self._offset
            index4, elements1 = self._offset, []
            address3 = FAILURE
            remaining0, index5, elements2, address4 = 1, self._offset, [], True
            while address4 is not FAILURE:
                address4 = self._read___()
                if address4 is not FAILURE:
                    elements2.append(address4)
                    remaining0 -= 1
            if remaining0 <= 0:
                address3 = SyntaxNode(self._input[index5:self._offset], index5, elements2)
                self._offset = self._offset
            else:
                address3 = FAILURE
            if address3 is not FAILURE:
                elements1.append(address3)
                address5 = FAILURE
                address5 = self._read_type_tag()
                if address5 is not FAILURE:
                    elements1.append(address5)
                else:
                    elements1 = None
                    self._offset = index4
            else:
                elements1 = None
                self._offset = index4
            if elements1:
                address2 = SyntaxNode8(self._input[index4:self._offset], index4, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is FAILURE:
                address2 = SyntaxNode(self._input[index3:index3], index3)
                self._offset = index3
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['choice_part'][index0] = (address0, self._offset)
        return address0

    def _read_action_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['action_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_actionable_expression()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 1, self._offset, [], True
            while address3 is not FAILURE:
                address3 = self._read___()
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address4 = FAILURE
                address4 = self._read_action_tag()
                if address4 is not FAILURE:
                    elements0.append(address4)
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode9(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['action_expression'][index0] = (address0, self._offset)
        return address0

    def _read_actionable_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['actionable_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        index2, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '(':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"("')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index3, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                address3 = self._read___()
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index3:self._offset], index3, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address4 = FAILURE
                address4 = self._read_actionable_expression()
                if address4 is not FAILURE:
                    elements0.append(address4)
                    address5 = FAILURE
                    remaining1, index4, elements2, address6 = 0, self._offset, [], True
                    while address6 is not FAILURE:
                        address6 = self._read___()
                        if address6 is not FAILURE:
                            elements2.append(address6)
                            remaining1 -= 1
                    if remaining1 <= 0:
                        address5 = SyntaxNode(self._input[index4:self._offset], index4, elements2)
                        self._offset = self._offset
                    else:
                        address5 = FAILURE
                    if address5 is not FAILURE:
                        elements0.append(address5)
                        address7 = FAILURE
                        chunk1 = None
                        if self._offset < self._input_size:
                            chunk1 = self._input[self._offset:self._offset + 1]
                        if chunk1 == ')':
                            address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                            self._offset = self._offset + 1
                        else:
                            address7 = FAILURE
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('")"')
                        if address7 is not FAILURE:
                            elements0.append(address7)
                        else:
                            elements0 = None
                            self._offset = index2
                    else:
                        elements0 = None
                        self._offset = index2
                else:
                    elements0 = None
                    self._offset = index2
            else:
                elements0 = None
                self._offset = index2
        else:
            elements0 = None
            self._offset = index2
        if elements0:
            address0 = SyntaxNode10(self._input[index2:self._offset], index2, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_sequence_expression()
            if address0 is FAILURE:
                self._offset = index1
                address0 = self._read_repeated_atom()
                if address0 is FAILURE:
                    self._offset = index1
                    address0 = self._read_terminal_node()
                    if address0 is FAILURE:
                        self._offset = index1
        self._cache['actionable_expression'][index0] = (address0, self._offset)
        return address0

    def _read_action_tag(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['action_tag'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '%':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"%"')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            address2 = self._read_identifier()
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode11(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['action_tag'][index0] = (address0, self._offset)
        return address0

    def _read_type_tag(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['type_tag'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '<':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"<"')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            address2 = self._read_object_identifier()
            if address2 is not FAILURE:
                elements0.append(address2)
                address3 = FAILURE
                chunk1 = None
                if self._offset < self._input_size:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 == '>':
                    address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address3 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('">"')
                if address3 is not FAILURE:
                    elements0.append(address3)
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode12(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['type_tag'][index0] = (address0, self._offset)
        return address0

    def _read_sequence_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['sequence_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_sequence_part()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 1, self._offset, [], True
            while address3 is not FAILURE:
                index3, elements2 = self._offset, []
                address4 = FAILURE
                remaining1, index4, elements3, address5 = 1, self._offset, [], True
                while address5 is not FAILURE:
                    address5 = self._read___()
                    if address5 is not FAILURE:
                        elements3.append(address5)
                        remaining1 -= 1
                if remaining1 <= 0:
                    address4 = SyntaxNode(self._input[index4:self._offset], index4, elements3)
                    self._offset = self._offset
                else:
                    address4 = FAILURE
                if address4 is not FAILURE:
                    elements2.append(address4)
                    address6 = FAILURE
                    address6 = self._read_sequence_part()
                    if address6 is not FAILURE:
                        elements2.append(address6)
                    else:
                        elements2 = None
                        self._offset = index3
                else:
                    elements2 = None
                    self._offset = index3
                if elements2:
                    address3 = SyntaxNode14(self._input[index3:self._offset], index3, elements2)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode13(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['sequence_expression'][index0] = (address0, self._offset)
        return address0

    def _read_sequence_part(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['sequence_part'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        index2 = self._offset
        address1 = self._read_label()
        if address1 is FAILURE:
            address1 = SyntaxNode(self._input[index2:index2], index2)
            self._offset = index2
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index3 = self._offset
            address2 = self._read_maybe_atom()
            if address2 is FAILURE:
                self._offset = index3
                address2 = self._read_repeated_atom()
                if address2 is FAILURE:
                    self._offset = index3
                    address2 = self._read_atom()
                    if address2 is FAILURE:
                        self._offset = index3
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode15(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['sequence_part'][index0] = (address0, self._offset)
        return address0

    def _read_maybe_atom(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['maybe_atom'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_atom()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            chunk0 = None
            if self._offset < self._input_size:
                chunk0 = self._input[self._offset:self._offset + 1]
            if chunk0 == '?':
                address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address2 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"?"')
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode16(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['maybe_atom'][index0] = (address0, self._offset)
        return address0

    def _read_repeated_atom(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['repeated_atom'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_atom()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index2 = self._offset
            chunk0 = None
            if self._offset < self._input_size:
                chunk0 = self._input[self._offset:self._offset + 1]
            if chunk0 == '*':
                address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address2 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"*"')
            if address2 is FAILURE:
                self._offset = index2
                chunk1 = None
                if self._offset < self._input_size:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 == '+':
                    address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address2 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"+"')
                if address2 is FAILURE:
                    self._offset = index2
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode17(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['repeated_atom'][index0] = (address0, self._offset)
        return address0

    def _read_atom(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['atom'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_parenthesised_expression()
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_predicated_atom()
            if address0 is FAILURE:
                self._offset = index1
                address0 = self._read_reference_expression()
                if address0 is FAILURE:
                    self._offset = index1
                    address0 = self._read_terminal_node()
                    if address0 is FAILURE:
                        self._offset = index1
        self._cache['atom'][index0] = (address0, self._offset)
        return address0

    def _read_terminal_node(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['terminal_node'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_string_expression()
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_ci_string_expression()
            if address0 is FAILURE:
                self._offset = index1
                address0 = self._read_char_class_expression()
                if address0 is FAILURE:
                    self._offset = index1
                    address0 = self._read_any_char_expression()
                    if address0 is FAILURE:
                        self._offset = index1
        self._cache['terminal_node'][index0] = (address0, self._offset)
        return address0

    def _read_predicated_atom(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['predicated_atom'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        index2 = self._offset
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '&':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"&"')
        if address1 is FAILURE:
            self._offset = index2
            chunk1 = None
            if self._offset < self._input_size:
                chunk1 = self._input[self._offset:self._offset + 1]
            if chunk1 == '!':
                address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address1 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"!"')
            if address1 is FAILURE:
                self._offset = index2
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            address2 = self._read_atom()
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode18(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['predicated_atom'][index0] = (address0, self._offset)
        return address0

    def _read_reference_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['reference_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_identifier()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index2 = self._offset
            address2 = self._read_assignment()
            self._offset = index2
            if address2 is FAILURE:
                address2 = SyntaxNode(self._input[self._offset:self._offset], self._offset)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode19(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['reference_expression'][index0] = (address0, self._offset)
        return address0

    def _read_string_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['string_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        index2, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '"':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('\'"\'')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index3, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                index4 = self._offset
                index5, elements2 = self._offset, []
                address4 = FAILURE
                chunk1 = None
                if self._offset < self._input_size:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 == '\\':
                    address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address4 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"\\\\"')
                if address4 is not FAILURE:
                    elements2.append(address4)
                    address5 = FAILURE
                    if self._offset < self._input_size:
                        address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address5 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('<any char>')
                    if address5 is not FAILURE:
                        elements2.append(address5)
                    else:
                        elements2 = None
                        self._offset = index5
                else:
                    elements2 = None
                    self._offset = index5
                if elements2:
                    address3 = SyntaxNode(self._input[index5:self._offset], index5, elements2)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is FAILURE:
                    self._offset = index4
                    chunk2 = None
                    if self._offset < self._input_size:
                        chunk2 = self._input[self._offset:self._offset + 1]
                    if chunk2 is not None and re.match('^[^"]', chunk2):
                        address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address3 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('[^"]')
                    if address3 is FAILURE:
                        self._offset = index4
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index3:self._offset], index3, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address6 = FAILURE
                chunk3 = None
                if self._offset < self._input_size:
                    chunk3 = self._input[self._offset:self._offset + 1]
                if chunk3 == '"':
                    address6 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address6 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('\'"\'')
                if address6 is not FAILURE:
                    elements0.append(address6)
                else:
                    elements0 = None
                    self._offset = index2
            else:
                elements0 = None
                self._offset = index2
        else:
            elements0 = None
            self._offset = index2
        if elements0:
            address0 = SyntaxNode(self._input[index2:self._offset], index2, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        if address0 is FAILURE:
            self._offset = index1
            index6, elements3 = self._offset, []
            address7 = FAILURE
            chunk4 = None
            if self._offset < self._input_size:
                chunk4 = self._input[self._offset:self._offset + 1]
            if chunk4 == '\'':
                address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address7 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"\'"')
            if address7 is not FAILURE:
                elements3.append(address7)
                address8 = FAILURE
                remaining1, index7, elements4, address9 = 0, self._offset, [], True
                while address9 is not FAILURE:
                    index8 = self._offset
                    index9, elements5 = self._offset, []
                    address10 = FAILURE
                    chunk5 = None
                    if self._offset < self._input_size:
                        chunk5 = self._input[self._offset:self._offset + 1]
                    if chunk5 == '\\':
                        address10 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address10 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"\\\\"')
                    if address10 is not FAILURE:
                        elements5.append(address10)
                        address11 = FAILURE
                        if self._offset < self._input_size:
                            address11 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                            self._offset = self._offset + 1
                        else:
                            address11 = FAILURE
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('<any char>')
                        if address11 is not FAILURE:
                            elements5.append(address11)
                        else:
                            elements5 = None
                            self._offset = index9
                    else:
                        elements5 = None
                        self._offset = index9
                    if elements5:
                        address9 = SyntaxNode(self._input[index9:self._offset], index9, elements5)
                        self._offset = self._offset
                    else:
                        address9 = FAILURE
                    if address9 is FAILURE:
                        self._offset = index8
                        chunk6 = None
                        if self._offset < self._input_size:
                            chunk6 = self._input[self._offset:self._offset + 1]
                        if chunk6 is not None and re.match('^[^\']', chunk6):
                            address9 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                            self._offset = self._offset + 1
                        else:
                            address9 = FAILURE
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('[^\']')
                        if address9 is FAILURE:
                            self._offset = index8
                    if address9 is not FAILURE:
                        elements4.append(address9)
                        remaining1 -= 1
                if remaining1 <= 0:
                    address8 = SyntaxNode(self._input[index7:self._offset], index7, elements4)
                    self._offset = self._offset
                else:
                    address8 = FAILURE
                if address8 is not FAILURE:
                    elements3.append(address8)
                    address12 = FAILURE
                    chunk7 = None
                    if self._offset < self._input_size:
                        chunk7 = self._input[self._offset:self._offset + 1]
                    if chunk7 == '\'':
                        address12 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address12 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"\'"')
                    if address12 is not FAILURE:
                        elements3.append(address12)
                    else:
                        elements3 = None
                        self._offset = index6
                else:
                    elements3 = None
                    self._offset = index6
            else:
                elements3 = None
                self._offset = index6
            if elements3:
                address0 = SyntaxNode(self._input[index6:self._offset], index6, elements3)
                self._offset = self._offset
            else:
                address0 = FAILURE
            if address0 is FAILURE:
                self._offset = index1
        self._cache['string_expression'][index0] = (address0, self._offset)
        return address0

    def _read_ci_string_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['ci_string_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '`':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"`"')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                index3 = self._offset
                index4, elements2 = self._offset, []
                address4 = FAILURE
                chunk1 = None
                if self._offset < self._input_size:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 == '\\':
                    address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address4 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"\\\\"')
                if address4 is not FAILURE:
                    elements2.append(address4)
                    address5 = FAILURE
                    if self._offset < self._input_size:
                        address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address5 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('<any char>')
                    if address5 is not FAILURE:
                        elements2.append(address5)
                    else:
                        elements2 = None
                        self._offset = index4
                else:
                    elements2 = None
                    self._offset = index4
                if elements2:
                    address3 = SyntaxNode(self._input[index4:self._offset], index4, elements2)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is FAILURE:
                    self._offset = index3
                    chunk2 = None
                    if self._offset < self._input_size:
                        chunk2 = self._input[self._offset:self._offset + 1]
                    if chunk2 is not None and re.match('^[^`]', chunk2):
                        address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address3 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('[^`]')
                    if address3 is FAILURE:
                        self._offset = index3
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address6 = FAILURE
                chunk3 = None
                if self._offset < self._input_size:
                    chunk3 = self._input[self._offset:self._offset + 1]
                if chunk3 == '`':
                    address6 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address6 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"`"')
                if address6 is not FAILURE:
                    elements0.append(address6)
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['ci_string_expression'][index0] = (address0, self._offset)
        return address0

    def _read_any_char_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['any_char_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '.':
            address0 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address0 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"."')
        self._cache['any_char_expression'][index0] = (address0, self._offset)
        return address0

    def _read_char_class_expression(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['char_class_expression'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '[':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"["')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index2 = self._offset
            chunk1 = None
            if self._offset < self._input_size:
                chunk1 = self._input[self._offset:self._offset + 1]
            if chunk1 == '^':
                address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address2 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"^"')
            if address2 is FAILURE:
                address2 = SyntaxNode(self._input[index2:index2], index2)
                self._offset = index2
            if address2 is not FAILURE:
                elements0.append(address2)
                address3 = FAILURE
                remaining0, index3, elements1, address4 = 1, self._offset, [], True
                while address4 is not FAILURE:
                    index4 = self._offset
                    index5, elements2 = self._offset, []
                    address5 = FAILURE
                    chunk2 = None
                    if self._offset < self._input_size:
                        chunk2 = self._input[self._offset:self._offset + 1]
                    if chunk2 == '\\':
                        address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address5 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"\\\\"')
                    if address5 is not FAILURE:
                        elements2.append(address5)
                        address6 = FAILURE
                        if self._offset < self._input_size:
                            address6 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                            self._offset = self._offset + 1
                        else:
                            address6 = FAILURE
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('<any char>')
                        if address6 is not FAILURE:
                            elements2.append(address6)
                        else:
                            elements2 = None
                            self._offset = index5
                    else:
                        elements2 = None
                        self._offset = index5
                    if elements2:
                        address4 = SyntaxNode(self._input[index5:self._offset], index5, elements2)
                        self._offset = self._offset
                    else:
                        address4 = FAILURE
                    if address4 is FAILURE:
                        self._offset = index4
                        chunk3 = None
                        if self._offset < self._input_size:
                            chunk3 = self._input[self._offset:self._offset + 1]
                        if chunk3 is not None and re.match('^[^\\]]', chunk3):
                            address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                            self._offset = self._offset + 1
                        else:
                            address4 = FAILURE
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('[^\\]]')
                        if address4 is FAILURE:
                            self._offset = index4
                    if address4 is not FAILURE:
                        elements1.append(address4)
                        remaining0 -= 1
                if remaining0 <= 0:
                    address3 = SyntaxNode(self._input[index3:self._offset], index3, elements1)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is not FAILURE:
                    elements0.append(address3)
                    address7 = FAILURE
                    chunk4 = None
                    if self._offset < self._input_size:
                        chunk4 = self._input[self._offset:self._offset + 1]
                    if chunk4 == ']':
                        address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                        self._offset = self._offset + 1
                    else:
                        address7 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"]"')
                    if address7 is not FAILURE:
                        elements0.append(address7)
                    else:
                        elements0 = None
                        self._offset = index1
                else:
                    elements0 = None
                    self._offset = index1
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['char_class_expression'][index0] = (address0, self._offset)
        return address0

    def _read_label(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['label'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_identifier()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            chunk0 = None
            if self._offset < self._input_size:
                chunk0 = self._input[self._offset:self._offset + 1]
            if chunk0 == ':':
                address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                self._offset = self._offset + 1
            else:
                address2 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('":"')
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode20(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['label'][index0] = (address0, self._offset)
        return address0

    def _read_object_identifier(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['object_identifier'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        address1 = self._read_identifier()
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                index3, elements2 = self._offset, []
                address4 = FAILURE
                chunk0 = None
                if self._offset < self._input_size:
                    chunk0 = self._input[self._offset:self._offset + 1]
                if chunk0 == '.':
                    address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address4 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"."')
                if address4 is not FAILURE:
                    elements2.append(address4)
                    address5 = FAILURE
                    address5 = self._read_identifier()
                    if address5 is not FAILURE:
                        elements2.append(address5)
                    else:
                        elements2 = None
                        self._offset = index3
                else:
                    elements2 = None
                    self._offset = index3
                if elements2:
                    address3 = SyntaxNode22(self._input[index3:self._offset], index3, elements2)
                    self._offset = self._offset
                else:
                    address3 = FAILURE
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode21(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['object_identifier'][index0] = (address0, self._offset)
        return address0

    def _read_identifier(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['identifier'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 is not None and re.match('^[a-zA-Z_]', chunk0):
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('[a-zA-Z_]')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                chunk1 = None
                if self._offset < self._input_size:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 is not None and re.match('^[a-zA-Z0-9_]', chunk1):
                    address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address3 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('[a-zA-Z0-9_]')
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['identifier'][index0] = (address0, self._offset)
        return address0

    def _read___(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['__'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 is not None and re.match('^[\\s]', chunk0):
            address0 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address0 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('[\\s]')
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_comment()
            if address0 is FAILURE:
                self._offset = index1
        self._cache['__'][index0] = (address0, self._offset)
        return address0

    def _read_comment(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['comment'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0 = None
        if self._offset < self._input_size:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '#':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"#"')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not FAILURE:
                chunk1 = None
                if self._offset < self._input_size:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 is not None and re.match('^[^\\n]', chunk1):
                    address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset)
                    self._offset = self._offset + 1
                else:
                    address3 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('[^\\n]')
                if address3 is not FAILURE:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['comment'][index0] = (address0, self._offset)
        return address0


class Parser(Grammar):
    def __init__(self, input, actions, types):
        self._input = input
        self._input_size = len(input)
        self._actions = actions
        self._types = types
        self._offset = 0
        self._cache = defaultdict(dict)
        self._failure = 0
        self._expected = []

    def parse(self):
        tree = self._read_grammar()
        if tree is not FAILURE and self._offset == self._input_size:
            return tree
        if not self._expected:
            self._failure = self._offset
            self._expected.append('<EOF>')
        raise ParseError(format_error(self._input, self._failure, self._expected))


def format_error(input, offset, expected):
    lines, line_no, position = input.split('\n'), 0, 0
    while position <= offset:
        position += len(lines[line_no]) + 1
        line_no += 1
    message, line = 'Line ' + str(line_no) + ': expected ' + ', '.join(expected) + '\n', lines[line_no - 1]
    message += line + '\n'
    position -= len(line) + 1
    message += ' ' * (offset - position)
    return message + '^'

def parse(input, actions=None, types=None):
    parser = Parser(input, actions, types)
    return parser.parse()
