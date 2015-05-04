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
        self.data = elements[1]


class SyntaxNode2(SyntaxNode):
    def __init__(self, text, offset, elements):
        super(SyntaxNode2, self).__init__(text, offset, elements)
        self.cells = elements[1]


class ParseError(SyntaxError):
    pass


class Grammar(object):
    def _read_program(self):
        address0, index0 = None, self._offset
        cached = self._cache['program'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        remaining0, index1, elements0, address1 = 1, self._offset, [], True
        while address1 is not None:
            address1 = self._read_cell()
            if address1 is not None:
                elements0.append(address1)
                remaining0 -= 1
        if remaining0 <= 0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['program'][index0] = (address0, self._offset)
        return address0

    def _read_cell(self):
        address0, index0 = None, self._offset
        cached = self._cache['cell'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        remaining0, index2, elements1, address2 = 0, self._offset, [], True
        while address2 is not None:
            address2 = self._read_space()
            if address2 is not None:
                elements1.append(address2)
                remaining0 -= 1
        if remaining0 <= 0:
            address1 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
            self._offset = self._offset
        else:
            address1 = None
        if address1 is not None:
            elements0.append(address1)
            address3 = None
            index3 = self._offset
            address3 = self._read_list()
            if not address3:
                self._offset = index3
                address3 = self._read_atom()
                if not address3:
                    self._offset = index3
            if address3 is not None:
                elements0.append(address3)
                address4 = None
                remaining1, index4, elements2, address5 = 0, self._offset, [], True
                while address5 is not None:
                    address5 = self._read_space()
                    if address5 is not None:
                        elements2.append(address5)
                        remaining1 -= 1
                if remaining1 <= 0:
                    address4 = SyntaxNode(self._input[index4:self._offset], index4, elements2)
                    self._offset = self._offset
                else:
                    address4 = None
                if address4 is not None:
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
            address0 = SyntaxNode1(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['cell'][index0] = (address0, self._offset)
        return address0

    def _read_list(self):
        address0, index0 = None, self._offset
        cached = self._cache['list'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '(':
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"("')
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            remaining0, index2, elements1, address3 = 1, self._offset, [], True
            while address3 is not None:
                address3 = self._read_cell()
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
                address4 = None
                chunk1 = None
                if len(self._input) > self._offset:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 == ')':
                    address4 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address4 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('")"')
                if address4 is not None:
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
            address0 = SyntaxNode2(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['list'][index0] = (address0, self._offset)
        return address0

    def _read_atom(self):
        address0, index0 = None, self._offset
        cached = self._cache['atom'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_boolean()
        if not address0:
            self._offset = index1
            address0 = self._read_integer()
            if not address0:
                self._offset = index1
                address0 = self._read_string()
                if not address0:
                    self._offset = index1
                    address0 = self._read_symbol()
                    if not address0:
                        self._offset = index1
        self._cache['atom'][index0] = (address0, self._offset)
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
            chunk0 = self._input[self._offset:self._offset + 2]
        if chunk0 == '#t':
            address0 = SyntaxNode(self._input[self._offset:self._offset + 2], self._offset, [])
            self._offset = self._offset + 2
        else:
            address0 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"#t"')
        if not address0:
            self._offset = index1
            chunk1 = None
            if len(self._input) > self._offset:
                chunk1 = self._input[self._offset:self._offset + 2]
            if chunk1 == '#f':
                address0 = SyntaxNode(self._input[self._offset:self._offset + 2], self._offset, [])
                self._offset = self._offset + 2
            else:
                address0 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('"#f"')
            if not address0:
                self._offset = index1
        self._cache['boolean'][index0] = (address0, self._offset)
        return address0

    def _read_integer(self):
        address0, index0 = None, self._offset
        cached = self._cache['integer'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1, elements0 = self._offset, []
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 is not None and re.match('^[1-9]', chunk0):
            address1 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address1 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('[1-9]')
        if address1 is not None:
            elements0.append(address1)
            address2 = None
            remaining0, index2, elements1, address3 = 0, self._offset, [], True
            while address3 is not None:
                chunk1 = None
                if len(self._input) > self._offset:
                    chunk1 = self._input[self._offset:self._offset + 1]
                if chunk1 is not None and re.match('^[0-9]', chunk1):
                    address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                else:
                    address3 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('[0-9]')
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
        self._cache['integer'][index0] = (address0, self._offset)
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
                self._expected.append('"\\""')
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
                        self._expected.append('"\\""')
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

    def _read_symbol(self):
        address0, index0 = None, self._offset
        cached = self._cache['symbol'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        remaining0, index1, elements0, address1 = 1, self._offset, [], True
        while address1 is not None:
            index2, elements1 = self._offset, []
            address2 = None
            index3 = self._offset
            address2 = self._read_delimiter()
            self._offset = index3
            if not address2:
                address2 = SyntaxNode(self._input[self._offset:self._offset], self._offset, [])
                self._offset = self._offset
            else:
                address2 = None
            if address2 is not None:
                elements1.append(address2)
                address3 = None
                chunk0 = None
                if len(self._input) > self._offset:
                    chunk0 = self._input[self._offset:self._offset + 1]
                if chunk0 is None:
                    address3 = None
                    if self._offset > self._failure:
                        self._failure = self._offset
                        self._expected = []
                    if self._offset == self._failure:
                        self._expected.append('<any char>')
                else:
                    address3 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                    self._offset = self._offset + 1
                if address3 is not None:
                    elements1.append(address3)
                else:
                    elements1 = None
                    self._offset = index2
            else:
                elements1 = None
                self._offset = index2
            if elements1:
                address1 = SyntaxNode(self._input[index2:self._offset], index2, elements1)
                self._offset = self._offset
            else:
                address1 = None
            if address1 is not None:
                elements0.append(address1)
                remaining0 -= 1
        if remaining0 <= 0:
            address0 = SyntaxNode(self._input[index1:self._offset], index1, elements0)
            self._offset = self._offset
        else:
            address0 = None
        self._cache['symbol'][index0] = (address0, self._offset)
        return address0

    def _read_space(self):
        address0, index0 = None, self._offset
        cached = self._cache['space'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 is not None and re.match('^[\\s]', chunk0):
            address0 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address0 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('[\\s]')
        self._cache['space'][index0] = (address0, self._offset)
        return address0

    def _read_paren(self):
        address0, index0 = None, self._offset
        cached = self._cache['paren'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:self._offset + 1]
        if chunk0 == '(':
            address0 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
            self._offset = self._offset + 1
        else:
            address0 = None
            if self._offset > self._failure:
                self._failure = self._offset
                self._expected = []
            if self._offset == self._failure:
                self._expected.append('"("')
        if not address0:
            self._offset = index1
            chunk1 = None
            if len(self._input) > self._offset:
                chunk1 = self._input[self._offset:self._offset + 1]
            if chunk1 == ')':
                address0 = SyntaxNode(self._input[self._offset:self._offset + 1], self._offset, [])
                self._offset = self._offset + 1
            else:
                address0 = None
                if self._offset > self._failure:
                    self._failure = self._offset
                    self._expected = []
                if self._offset == self._failure:
                    self._expected.append('")"')
            if not address0:
                self._offset = index1
        self._cache['paren'][index0] = (address0, self._offset)
        return address0

    def _read_delimiter(self):
        address0, index0 = None, self._offset
        cached = self._cache['delimiter'].get(index0)
        if cached:
            self._offset = cached[1]
            return cached[0]
        index1 = self._offset
        address0 = self._read_paren()
        if not address0:
            self._offset = index1
            address0 = self._read_space()
            if not address0:
                self._offset = index1
        self._cache['delimiter'][index0] = (address0, self._offset)
        return address0


class Parser(Grammar):
    def __init__(self, input, actions):
        self._input = input
        self._actions = actions
        self._offset = 0
        self._cache = defaultdict(dict)
        self._failure = 0
        self._expected = []

    def parse(self):
        tree = self._read_program()
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

def parse(input, actions=None):
    parser = Parser(input, actions)
    return parser.parse()
