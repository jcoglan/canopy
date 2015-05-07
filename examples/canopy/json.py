from collections import defaultdict
import re


class SyntaxNode(object):
    def __init__(self, text, offset, elements):
        self.text = text
        self.offset = offset
        self.elements = elements or []

    def __iter__(self):
        for el in self.elements:
            yield el


class SyntaxNode1(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode1, self).__init__(text, offset, elements)
        self.__ = elements[2]


class SyntaxNode2(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode2, self).__init__(text, offset, elements)
        self.pair = elements[1]


class SyntaxNode3(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode3, self).__init__(text, offset, elements)
        self.pair = elements[1]


class SyntaxNode4(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode4, self).__init__(text, offset, elements)
        self.__ = elements[1]


class SyntaxNode5(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode5, self).__init__(text, offset, elements)
        self.__ = elements[2]
        self.string = elements[1]
        self.value = elements[4]


class SyntaxNode6(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode6, self).__init__(text, offset, elements)
        self.value = elements[1]


class SyntaxNode7(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode7, self).__init__(text, offset, elements)
        self.value = elements[1]


class SyntaxNode8(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode8, self).__init__(text, offset, elements)
        self.__ = elements[1]


class SyntaxNode9(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode9, self).__init__(text, offset, elements)
        self.__ = elements[2]


class ParseError(SyntaxError):
    pass


class Grammar(object):
    def _read_document(self):
        address0, index0 = None, self._offset
        cached = self._cache['document'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        address1 = self._read___()
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            index2 = self._offset
            address2 = self._read_object()
            if not address2:
                self._offset = index2
                address2 = self._read_array()
                if not address2:
                    self._offset = index2
            if address2 is not None:
                elements0.append(address2)
                address3 = None
                address3 = self._read___()
                if address3 is not None:
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
            address0 = SyntaxNode1(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['document'][index0] = (address0, self._offset)
        return address0

    def _read_object(self):
        address0, index0 = None, self._offset
        cached = self._cache['object'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        index2, elements0 = self._offset, []
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '{':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"{"')
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            address2 = self._read_pair()
            if address2 is not None:
                elements0.append(address2)
                address3 = None
                remaining0, index3, elements1, address4 = 0, self._offset, [], True
                while address4 is not None:
                    index4, elements2 = self._offset, []
                    address5 = None
                    chunk1 = None
                    if len(self._input) > self._offset:
                        chunk1 = self._input[self._offset:self._offset + 1]
                    if chunk1 == ',':
                        address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address5 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('","')
                    if address5 is not None:
                        elements2.append(address5)
                        address6 = None
                        address6 = self._read_pair()
                        if address6 is not None:
                            elements2.append(address6)
                        else:
                            elements2 = None
                            self._offset = index4
                    else:
                        elements2 = None
                        self._offset = index4
                    if elements2:
                        address4 = SyntaxNode3(self._input[index4:self._offset], index4, elements2)
                        self._offset = self._offset
                    else:
                        address4 = None
                    if address4 is not None:
                        elements1.append(address4)
                        remaining0 -= 1
                if remaining0 <= 0:
                    address3 = SyntaxNode(self._input[index3:self._offset], index3, elements1)
                    self._offset = self._offset
                else:
                    address3 = None
                if address3 is not None:
                    elements0.append(address3)
                    address7 = None
                    chunk2 = None
                    if len(self._input) > self._offset:
                        chunk2 = self._input[self._offset:self._offset + 1]
                    if chunk2 == '}':
                        address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address7 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"}"')
                    if address7 is not None:
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
        if elements0:
            address0 = SyntaxNode2(self._input[index2:self._offset], index2, elements0)
            self._offset = self._offset
        else:
            address0 = None
        if not address0:
            self._offset = index1
            index5, elements3 = self._offset, []
            address8 = None
            chunk3 = None
            if len(self._input) > self._offset:
                chunk3 = self._input[self._offset:self._offset + 1]
            if chunk3 == '{':
                address8 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                self._offset = self._offset + 1
            else:
                address8 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"{"')
            if address8 is not None:
                elements3.append(address8)
                address9 = None
                address9 = self._read___()
                if address9 is not None:
                    elements3.append(address9)
                    address10 = None
                    chunk4 = None
                    if len(self._input) > self._offset:
                        chunk4 = self._input[self._offset:self._offset + 1]
                    if chunk4 == '}':
                        address10 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address10 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"}"')
                    if address10 is not None:
                        elements3.append(address10)
                    else:
                        elements3 = None
                        self._offset = index5
                else:
                    elements3 = None
                    self._offset = index5
            else:
                elements3 = None
                self._offset = index5
            if elements3:
                address0 = SyntaxNode4(self._input[index5:self._offset], index5, elements3)
                self._offset = self._offset
            else:
                address0 = None
            if not address0:
                self._offset = index1
        self._cache['object'][index0] = (address0, self._offset)
        return address0

    def _read_pair(self):
        address0, index0 = None, self._offset
        cached = self._cache['pair'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        address1 = self._read___()
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            address2 = self._read_string()
            if address2 is not None:
                elements0.append(address2)
                address3 = None
                address3 = self._read___()
                if address3 is not None:
                    elements0.append(address3)
                    address4 = None
                    chunk0 = None
                    if len(self._input) > self._offset:
                        chunk0 = self._input[self._offset:self._offset + 1]
                    if chunk0 == ':':
                        address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address4 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('":"')
                    if address4 is not None:
                        elements0.append(address4)
                        address5 = None
                        address5 = self._read_value()
                        if address5 is not None:
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
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            address0 = SyntaxNode5(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['pair'][index0] = (address0, self._offset)
        return address0

    def _read_array(self):
        address0, index0 = None, self._offset
        cached = self._cache['array'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        index2, elements0 = self._offset, []
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '[':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"["')
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            address2 = self._read_value()
            if address2 is not None:
                elements0.append(address2)
                address3 = None
                remaining0, index3, elements1, address4 = 0, self._offset, [], True
                while address4 is not None:
                    index4, elements2 = self._offset, []
                    address5 = None
                    chunk1 = None
                    if len(self._input) > self._offset:
                        chunk1 = self._input[self._offset:self._offset + 1]
                    if chunk1 == ',':
                        address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address5 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('","')
                    if address5 is not None:
                        elements2.append(address5)
                        address6 = None
                        address6 = self._read_value()
                        if address6 is not None:
                            elements2.append(address6)
                        else:
                            elements2 = None
                            self._offset = index4
                    else:
                        elements2 = None
                        self._offset = index4
                    if elements2:
                        address4 = SyntaxNode7(self._input[index4:self._offset], index4, elements2)
                        self._offset = self._offset
                    else:
                        address4 = None
                    if address4 is not None:
                        elements1.append(address4)
                        remaining0 -= 1
                if remaining0 <= 0:
                    address3 = SyntaxNode(self._input[index3:self._offset], index3, elements1)
                    self._offset = self._offset
                else:
                    address3 = None
                if address3 is not None:
                    elements0.append(address3)
                    address7 = None
                    chunk2 = None
                    if len(self._input) > self._offset:
                        chunk2 = self._input[self._offset:self._offset + 1]
                    if chunk2 == ']':
                        address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address7 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"]"')
                    if address7 is not None:
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
        if elements0:
            address0 = SyntaxNode6(self._input[index2:self._offset], index2, elements0)
            self._offset = self._offset
        else:
            address0 = None
        if not address0:
            self._offset = index1
            index5, elements3 = self._offset, []
            address8 = None
            chunk3 = None
            if len(self._input) > self._offset:
                chunk3 = self._input[self._offset:self._offset + 1]
            if chunk3 == '[':
                address8 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                self._offset = self._offset + 1
            else:
                address8 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"["')
            if address8 is not None:
                elements3.append(address8)
                address9 = None
                address9 = self._read___()
                if address9 is not None:
                    elements3.append(address9)
                    address10 = None
                    chunk4 = None
                    if len(self._input) > self._offset:
                        chunk4 = self._input[self._offset:self._offset + 1]
                    if chunk4 == ']':
                        address10 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address10 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"]"')
                    if address10 is not None:
                        elements3.append(address10)
                    else:
                        elements3 = None
                        self._offset = index5
                else:
                    elements3 = None
                    self._offset = index5
            else:
                elements3 = None
                self._offset = index5
            if elements3:
                address0 = SyntaxNode8(self._input[index5:self._offset], index5, elements3)
                self._offset = self._offset
            else:
                address0 = None
            if not address0:
                self._offset = index1
        self._cache['array'][index0] = (address0, self._offset)
        return address0

    def _read_value(self):
        address0, index0 = None, self._offset
        cached = self._cache['value'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        address1 = self._read___()
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            index2 = self._offset
            address2 = self._read_object()
            if not address2:
                self._offset = index2
                address2 = self._read_array()
                if not address2:
                    self._offset = index2
                    address2 = self._read_string()
                    if not address2:
                        self._offset = index2
                        address2 = self._read_number()
                        if not address2:
                            self._offset = index2
                            address2 = self._read_boolean()
                            if not address2:
                                self._offset = index2
                                address2 = self._read_null()
                                if not address2:
                                    self._offset = index2
            if address2 is not None:
                elements0.append(address2)
                address3 = None
                address3 = self._read___()
                if address3 is not None:
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
            address0 = SyntaxNode9(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['value'][index0] = (address0, self._offset)
        return address0

    def _read_string(self):
        address0, index0 = None, self._offset
        cached = self._cache['string'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '"':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('\'"\'')
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not None:
                index3 = self._offset
                index4, elements2 = self._offset, []
                address4 = None
                chunk1 = None
                if len(self._input) > self._offset:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 == '\\':
                    address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address4 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"\\\\"')
                if address4 is not None:
                    elements2.append(address4)
                    address5 = None
                    chunk2 = None
                    if len(self._input) > self._offset:
                        chunk2 = self._input[self._offset:self._offset + 1]
                    if chunk2 is None:
                        address5 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('<any char>')
                    else:
                        address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    if address5 is not None:
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
                    address3 = None
                if not address3:
                    self._offset = index3
                    chunk3 = None
                    if len(self._input) > self._offset:
                        chunk3 = self._input[self._offset:self._offset + 1]
                    if chunk3 is not None and re.match('^[^"]', chunk3):
                        address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address3 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('[^"]')
                    if not address3:
                        self._offset = index3
                if address3 is not None:
                    elements1.append(address3)
                    remaining0 -= 1
            if remaining0 <= 0:
                address2 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = None
            if address2 is not None:
                elements0.append(address2)
                address6 = None
                chunk4 = None
                if len(self._input) > self._offset:
                    chunk4 = self._input[self._offset:self._offset + 1]
                if chunk4 == '"':
                    address6 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address6 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('\'"\'')
                if address6 is not None:
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
            address0 = None
        self._cache['string'][index0] = (address0, self._offset)
        return address0

    def _read_number(self):
        address0, index0 = None, self._offset
        cached = self._cache['number'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        index2 = self._offset
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '-':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"-"')
        if not address1:
            address1 = SyntaxNode(self._input[index2:index2], index2, [])
            self._offset = index2
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            index3 = self._offset
            chunk1 = None
            if len(self._input) > self._offset:
                chunk1 = self._input[self._offset:self._offset + 1]
            if chunk1 == '0':
                address2 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                self._offset = self._offset + 1
            else:
                address2 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"0"')
            if not address2:
                self._offset = index3
                index4, elements1 = self._offset, []
                address3 = None
                chunk2 = None
                if len(self._input) > self._offset:
                    chunk2 = self._input[self._offset:self._offset + 1]
                if chunk2 is not None and re.match('^[1-9]', chunk2):
                    address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address3 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('[1-9]')
                if address3 is not None:
                    elements1.append(address3)
                    address4 = None
                    remaining0, index5, elements2, address5 = 0, self._offset, [], True
                    while address5 is not None:
                        chunk3 = None
                        if len(self._input) > self._offset:
                            chunk3 = self._input[self._offset:self._offset + 1]
                        if chunk3 is not None and re.match('^[0-9]', chunk3):
                            address5 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                            self._offset = self._offset + 1
                        else:
                            address5 = None
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('[0-9]')
                        if address5 is not None:
                            elements2.append(address5)
                            remaining0 -= 1
                    if remaining0 <= 0:
                        address4 = SyntaxNode(self._input[index5:self._offset], index5, elements2)
                        self._offset = self._offset
                    else:
                        address4 = None
                    if address4 is not None:
                        elements1.append(address4)
                    else:
                        elements1 = None
                        self._offset = index4
                else:
                    elements1 = None
                    self._offset = index4
                if elements1:
                    address2 = SyntaxNode(self._input[index4:self._offset], index4, elements1)
                    self._offset = self._offset
                else:
                    address2 = None
                if not address2:
                    self._offset = index3
            if address2 is not None:
                elements0.append(address2)
                address6 = None
                index6 = self._offset
                index7, elements3 = self._offset, []
                address7 = None
                chunk4 = None
                if len(self._input) > self._offset:
                    chunk4 = self._input[self._offset:self._offset + 1]
                if chunk4 == '.':
                    address7 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address7 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"."')
                if address7 is not None:
                    elements3.append(address7)
                    address8 = None
                    remaining1, index8, elements4, address9 = 1, self._offset, [], True
                    while address9 is not None:
                        chunk5 = None
                        if len(self._input) > self._offset:
                            chunk5 = self._input[self._offset:self._offset + 1]
                        if chunk5 is not None and re.match('^[0-9]', chunk5):
                            address9 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                            self._offset = self._offset + 1
                        else:
                            address9 = None
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('[0-9]')
                        if address9 is not None:
                            elements4.append(address9)
                            remaining1 -= 1
                    if remaining1 <= 0:
                        address8 = SyntaxNode(self._input[index8:self._offset], index8, elements4)
                        self._offset = self._offset
                    else:
                        address8 = None
                    if address8 is not None:
                        elements3.append(address8)
                    else:
                        elements3 = None
                        self._offset = index7
                else:
                    elements3 = None
                    self._offset = index7
                if elements3:
                    address6 = SyntaxNode(self._input[index7:self._offset], index7, elements3)
                    self._offset = self._offset
                else:
                    address6 = None
                if not address6:
                    address6 = SyntaxNode(self._input[index6:index6], index6, [])
                    self._offset = index6
                if address6 is not None:
                    elements0.append(address6)
                    address10 = None
                    index9 = self._offset
                    index10, elements5 = self._offset, []
                    address11 = None
                    index11 = self._offset
                    chunk6 = None
                    if len(self._input) > self._offset:
                        chunk6 = self._input[self._offset:self._offset + 1]
                    if chunk6 == 'e':
                        address11 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address11 = None
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('"e"')
                    if not address11:
                        self._offset = index11
                        chunk7 = None
                        if len(self._input) > self._offset:
                            chunk7 = self._input[self._offset:self._offset + 1]
                        if chunk7 == 'E':
                            address11 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                            self._offset = self._offset + 1
                        else:
                            address11 = None
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('"E"')
                        if not address11:
                            self._offset = index11
                    if address11 is not None:
                        elements5.append(address11)
                        address12 = None
                        index12 = self._offset
                        chunk8 = None
                        if len(self._input) > self._offset:
                            chunk8 = self._input[self._offset:self._offset + 1]
                        if chunk8 == '+':
                            address12 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                            self._offset = self._offset + 1
                        else:
                            address12 = None
                            if self._offset > self._failure:
                                self._failure = self._offset
                                self._expected = []
                            if self._offset == self._failure:
                                self._expected.append('"+"')
                        if not address12:
                            self._offset = index12
                            chunk9 = None
                            if len(self._input) > self._offset:
                                chunk9 = self._input[self._offset:self._offset + 1]
                            if chunk9 == '-':
                                address12 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                                self._offset = self._offset + 1
                            else:
                                address12 = None
                                if self._offset > self._failure:
                                    self._failure = self._offset
                                    self._expected = []
                                if self._offset == self._failure:
                                    self._expected.append('"-"')
                            if not address12:
                                self._offset = index12
                                chunk10 = None
                                if len(self._input) > self._offset:
                                    chunk10 = self._input[self._offset:self._offset + 0]
                                if chunk10 == '':
                                    address12 = SyntaxNode(self._input[self._offset:self._offset + 0], self._offset, [])
                                    self._offset = self._offset + 0
                                else:
                                    address12 = None
                                    if self._offset > self._failure:
                                        self._failure = self._offset
                                        self._expected = []
                                    if self._offset == self._failure:
                                        self._expected.append('""')
                                if not address12:
                                    self._offset = index12
                        if address12 is not None:
                            elements5.append(address12)
                            address13 = None
                            remaining2, index13, elements6, address14 = 1, self._offset, [], True
                            while address14 is not None:
                                chunk11 = None
                                if len(self._input) > self._offset:
                                    chunk11 = self._input[self._offset:self._offset + 1]
                                if chunk11 is not None and re.match('^[0-9]', chunk11):
                                    address14 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                                    self._offset = self._offset + 1
                                else:
                                    address14 = None
                                    if self._offset > self._failure:
                                        self._failure = self._offset
                                        self._expected = []
                                    if self._offset == self._failure:
                                        self._expected.append('[0-9]')
                                if address14 is not None:
                                    elements6.append(address14)
                                    remaining2 -= 1
                            if remaining2 <= 0:
                                address13 = SyntaxNode(self._input[index13:self._offset], index13, elements6)
                                self._offset = self._offset
                            else:
                                address13 = None
                            if address13 is not None:
                                elements5.append(address13)
                            else:
                                elements5 = None
                                self._offset = index10
                        else:
                            elements5 = None
                            self._offset = index10
                    else:
                        elements5 = None
                        self._offset = index10
                    if elements5:
                        address10 = SyntaxNode(self._input[index10:self._offset], index10, elements5)
                        self._offset = self._offset
                    else:
                        address10 = None
                    if not address10:
                        address10 = SyntaxNode(self._input[index9:index9], index9, [])
                        self._offset = index9
                    if address10 is not None:
                        elements0.append(address10)
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
            address0 = None
        self._cache['number'][index0] = (address0, self._offset)
        return address0

    def _read_boolean(self):
        address0, index0 = None, self._offset
        cached = self._cache['boolean'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 4]
        if chunk0 == 'true':
            address0 = SyntaxNode(self._input[self._offset:self._offset + 4], self._offset, [])
            self._offset = self._offset + 4
        else:
            address0 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"true"')
        if not address0:
            self._offset = index1
            chunk1 = None
            if len(self._input) > self._offset:
                chunk1 = self._input[self._offset:self._offset + 5]
            if chunk1 == 'false':
                address0 = SyntaxNode(self._input[self._offset:self._offset + 5], self._offset, [])
                self._offset = self._offset + 5
            else:
                address0 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"false"')
            if not address0:
                self._offset = index1
        self._cache['boolean'][index0] = (address0, self._offset)
        return address0

    def _read_null(self):
        address0, index0 = None, self._offset
        cached = self._cache['null'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 4]
        if chunk0 == 'null':
            address0 = SyntaxNode(self._input[self._offset:self._offset + 4], self._offset, [])
            self._offset = self._offset + 4
        else:
            address0 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"null"')
        self._cache['null'][index0] = (address0, self._offset)
        return address0

    def _read___(self):
        address0, index0 = None, self._offset
        cached = self._cache['__'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        remaining0, index1, elements0, address1 = 0, self._offset, [], True
        while address1 is not None:
            chunk0 = None
            if len(self._input) > self._offset:
                chunk0 = self._input[self._offset:self._offset + 1]
            if chunk0 is not None and re.match('^[\\s]', chunk0):
                address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                self._offset = self._offset + 1
            else:
                address1 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('[\\s]')
            if address1 is not None:
                elements0.append(address1)
                remaining0 -= 1
        if remaining0 <= 0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['__'][index0] = (address0, self._offset)
        return address0


class Parser(Grammar):
    def __init__(self, input, actions, types):
        self._input = input
        self._actions = actions
        self._types = types
        self._offset = 0
        self._cache = defaultdict(dict)
        self._failure = 0
        self._expected = []

    def parse(self):
        tree = self._read_document()
        if tree and self._offset == len(self._input):
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
