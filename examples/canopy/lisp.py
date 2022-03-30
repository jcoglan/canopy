# This file was generated from examples/canopy/lisp.peg
# See https://canopy.jcoglan.com/ for documentation

from collections import defaultdict
import re


class TreeNode(object):
    def __init__(self, text, offset, elements):
        self.text = text
        self.offset = offset
        self.elements = elements

    def __iter__(self):
        for el in self.elements:
            yield el


class TreeNode1(TreeNode):
    def __init__(self, text, offset, elements):
        super(TreeNode1, self).__init__(text, offset, elements)
        self.data = elements[1]


class TreeNode2(TreeNode):
    def __init__(self, text, offset, elements):
        super(TreeNode2, self).__init__(text, offset, elements)
        self.cells = elements[1]


FAILURE = object()


class Grammar(object):
    REGEX_1 = re.compile('^[1-9]')
    REGEX_2 = re.compile('^[0-9]')
    REGEX_3 = re.compile('^[^"]')
    REGEX_4 = re.compile('^[\\s]')

    def _read_program(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['program'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0, address1 = self._offset, [], None
        while True:
            address1 = self._read_cell()
            if address1 is not FAILURE:
                elements0.append(address1)
            else:
                break
        if len(elements0) >= 1:
            address0 = TreeNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['program'][index0] = (address0, self._offset)
        return address0

    def _read_cell(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['cell'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        index2, elements1, address2 = self._offset, [], None
        while True:
            address2 = self._read_space()
            if address2 is not FAILURE:
                elements1.append(address2)
            else:
                break
        if len(elements1) >= 0:
            address1 = TreeNode(self._input[index2:self._offset], index2, elements1)
            self._offset = self._offset
        else:
            address1 = FAILURE
        if address1 is not FAILURE:
            elements0.append(address1)
            address3 = FAILURE
            index3 = self._offset
            address3 = self._read_list()
            if address3 is FAILURE:
                self._offset = index3
                address3 = self._read_atom()
                if address3 is FAILURE:
                    self._offset = index3
            if address3 is not FAILURE:
                elements0.append(address3)
                address4 = FAILURE
                index4, elements2, address5 = self._offset, [], None
                while True:
                    address5 = self._read_space()
                    if address5 is not FAILURE:
                        elements2.append(address5)
                    else:
                        break
                if len(elements2) >= 0:
                    address4 = TreeNode(self._input[index4:self._offset], index4, elements2)
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
        if elements0 is None:
            address0 = FAILURE
        else:
            address0 = TreeNode1(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        self._cache['cell'][index0] = (address0, self._offset)
        return address0

    def _read_list(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['list'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0, max0 = None, self._offset + 1
        if max0 <= self._input_size:
            chunk0 = self._input[self._offset:max0]
        if chunk0 == '(':
            address1 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
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
            index2, elements1, address3 = self._offset, [], None
            while True:
                address3 = self._read_cell()
                if address3 is not FAILURE:
                    elements1.append(address3)
                else:
                    break
            if len(elements1) >= 1:
                address2 = TreeNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address4 = FAILURE
                chunk1, max1 = None, self._offset + 1
                if max1 <= self._input_size:
                    chunk1 = self._input[self._offset:max1]
                if chunk1 == ')':
                    address4 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address4 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('")"')
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
        if elements0 is None:
            address0 = FAILURE
        else:
            address0 = TreeNode2(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        self._cache['list'][index0] = (address0, self._offset)
        return address0

    def _read_atom(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['atom'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_boolean_()
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_integer()
            if address0 is FAILURE:
                self._offset = index1
                address0 = self._read_string()
                if address0 is FAILURE:
                    self._offset = index1
                    address0 = self._read_symbol()
                    if address0 is FAILURE:
                        self._offset = index1
        self._cache['atom'][index0] = (address0, self._offset)
        return address0

    def _read_boolean_(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['boolean_'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        chunk0, max0 = None, self._offset + 2
        if max0 <= self._input_size:
            chunk0 = self._input[self._offset:max0]
        if chunk0 == '#t':
            address0 = TreeNode(self._input[self._offset:self._offset + 2], self._offset, [])
            self._offset = self._offset + 2
        else:
            address0 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"#t"')
        if address0 is FAILURE:
            self._offset = index1
            chunk1, max1 = None, self._offset + 2
            if max1 <= self._input_size:
                chunk1 = self._input[self._offset:max1]
            if chunk1 == '#f':
                address0 = TreeNode(self._input[self._offset:self._offset + 2], self._offset, [])
                self._offset = self._offset + 2
            else:
                address0 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"#f"')
            if address0 is FAILURE:
                self._offset = index1
        self._cache['boolean_'][index0] = (address0, self._offset)
        return address0

    def _read_integer(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['integer'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0, max0 = None, self._offset + 1
        if max0 <= self._input_size:
            chunk0 = self._input[self._offset:max0]
        if chunk0 is not None and Grammar.REGEX_1.search(chunk0):
            address1 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('[1-9]')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index2, elements1, address3 = self._offset, [], None
            while True:
                chunk1, max1 = None, self._offset + 1
                if max1 <= self._input_size:
                    chunk1 = self._input[self._offset:max1]
                if chunk1 is not None and Grammar.REGEX_2.search(chunk1):
                    address3 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address3 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('[0-9]')
                if address3 is not FAILURE:
                    elements1.append(address3)
                else:
                    break
            if len(elements1) >= 0:
                address2 = TreeNode(self._input[index2:self._offset], index2, elements1)
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
        if elements0 is None:
            address0 = FAILURE
        else:
            address0 = TreeNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        self._cache['integer'][index0] = (address0, self._offset)
        return address0

    def _read_string(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['string'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = FAILURE
        chunk0, max0 = None, self._offset + 1
        if max0 <= self._input_size:
            chunk0 = self._input[self._offset:max0]
        if chunk0 == '"':
            address1 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"\\""')
        if address1 is not FAILURE:
            elements0.append(address1)
            address2 = FAILURE
            index2, elements1, address3 = self._offset, [], None
            while True:
                index3 = self._offset
                index4, elements2 = self._offset, []
                address4 = FAILURE
                chunk1, max1 = None, self._offset + 1
                if max1 <= self._input_size:
                    chunk1 = self._input[self._offset:max1]
                if chunk1 == '\\':
                    address4 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
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
                        address5 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
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
                if elements2 is None:
                    address3 = FAILURE
                else:
                    address3 = TreeNode(self._input[index4:self._offset], index4, elements2)
                    self._offset = self._offset
                if address3 is FAILURE:
                    self._offset = index3
                    chunk2, max2 = None, self._offset + 1
                    if max2 <= self._input_size:
                        chunk2 = self._input[self._offset:max2]
                    if chunk2 is not None and Grammar.REGEX_3.search(chunk2):
                        address3 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
                        self._offset = self._offset + 1
                    else:
                        address3 = FAILURE
                        if self._offset > self._failure:
                            self._failure = self._offset
                            self._expected = []
                        if self._offset == self._failure:
                            self._expected.append('[^"]')
                    if address3 is FAILURE:
                        self._offset = index3
                if address3 is not FAILURE:
                    elements1.append(address3)
                else:
                    break
            if len(elements1) >= 0:
                address2 = TreeNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements0.append(address2)
                address6 = FAILURE
                chunk3, max3 = None, self._offset + 1
                if max3 <= self._input_size:
                    chunk3 = self._input[self._offset:max3]
                if chunk3 == '"':
                    address6 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address6 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('"\\""')
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
        if elements0 is None:
            address0 = FAILURE
        else:
            address0 = TreeNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        self._cache['string'][index0] = (address0, self._offset)
        return address0

    def _read_symbol(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['symbol'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0, address1 = self._offset, [], None
        while True:
            index2, elements1 = self._offset, []
            address2 = FAILURE
            index3 = self._offset
            address2 = self._read_delimiter()
            self._offset = index3
            if address2 is FAILURE:
                address2 = TreeNode(self._input[self._offset:self._offset], self._offset, [])
                self._offset = self._offset
            else:
                address2 = FAILURE
            if address2 is not FAILURE:
                elements1.append(address2)
                address3 = FAILURE
                if self._offset < self._input_size:
                    address3 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address3 = FAILURE
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('<any char>')
                if address3 is not FAILURE:
                    elements1.append(address3)
                else:
                    elements1 = None
                    self._offset = index2
            else:
                elements1 = None
                self._offset = index2
            if elements1 is None:
                address1 = FAILURE
            else:
                address1 = TreeNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            if address1 is not FAILURE:
                elements0.append(address1)
            else:
                break
        if len(elements0) >= 1:
            address0 = TreeNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = FAILURE
        self._cache['symbol'][index0] = (address0, self._offset)
        return address0

    def _read_space(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['space'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        chunk0, max0 = None, self._offset + 1
        if max0 <= self._input_size:
            chunk0 = self._input[self._offset:max0]
        if chunk0 is not None and Grammar.REGEX_4.search(chunk0):
            address0 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address0 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('[\\s]')
        self._cache['space'][index0] = (address0, self._offset)
        return address0

    def _read_paren(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['paren'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        chunk0, max0 = None, self._offset + 1
        if max0 <= self._input_size:
            chunk0 = self._input[self._offset:max0]
        if chunk0 == '(':
            address0 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address0 = FAILURE
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"("')
        if address0 is FAILURE:
            self._offset = index1
            chunk1, max1 = None, self._offset + 1
            if max1 <= self._input_size:
                chunk1 = self._input[self._offset:max1]
            if chunk1 == ')':
                address0 = TreeNode(self._input[self._offset:self._offset + 1], self._offset, [])
                self._offset = self._offset + 1
            else:
                address0 = FAILURE
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('")"')
            if address0 is FAILURE:
                self._offset = index1
        self._cache['paren'][index0] = (address0, self._offset)
        return address0

    def _read_delimiter(self):
        address0, index0 = FAILURE, self._offset
        cached = self._cache['delimiter'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_paren()
        if address0 is FAILURE:
            self._offset = index1
            address0 = self._read_space()
            if address0 is FAILURE:
                self._offset = index1
        self._cache['delimiter'][index0] = (address0, self._offset)
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
        tree = self._read_program()
        if tree is not FAILURE and self._offset == self._input_size:
            return tree
        if not self._expected:
            self._failure = self._offset
            self._expected.append('<EOF>')
        raise ParseError(format_error(self._input, self._failure, self._expected))


class ParseError(SyntaxError):
    pass


def parse(input, actions=None, types=None):
    parser = Parser(input, actions, types)
    return parser.parse()

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
