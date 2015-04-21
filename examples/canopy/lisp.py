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
        if index0 in self._cache['program']:
            cached = self._cache['program'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        remaining0, index1, elements0, text0, address1 = 1, self._offset, [], '', True
        while address1 is not None:
            address1 = self._read_cell()
            if address1:
                elements0.append(address1)
                text0 += address1.text
                remaining0 -= 1
        if remaining0 <= 0:
            self._offset = index1
            address0 = SyntaxNode(text0, self._offset, elements0)
            self._offset += len(text0)
        else:
            address0 = None
        self._cache['program'][index0] = address0
        return address0

    def _read_cell(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['cell']:
            cached = self._cache['cell'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1, elements0, text0 = self._offset, [], ''
        address1 = None
        remaining0, index2, elements1, text1, address2 = 0, self._offset, [], '', True
        while address2 is not None:
            address2 = self._read_space()
            if address2:
                elements1.append(address2)
                text1 += address2.text
                remaining0 -= 1
        if remaining0 <= 0:
            self._offset = index2
            address1 = SyntaxNode(text1, self._offset, elements1)
            self._offset += len(text1)
        else:
            address1 = None
        if address1:
            elements0.append(address1)
            text0 += address1.text
            address3 = None
            index3 = self._offset
            address3 = self._read_list()
            if not address3:
                self._offset = index3
                address3 = self._read_atom()
                if not address3:
                    self._offset = index3
            if address3:
                elements0.append(address3)
                text0 += address3.text
                address4 = None
                remaining1, index4, elements2, text2, address5 = 0, self._offset, [], '', True
                while address5 is not None:
                    address5 = self._read_space()
                    if address5:
                        elements2.append(address5)
                        text2 += address5.text
                        remaining1 -= 1
                if remaining1 <= 0:
                    self._offset = index4
                    address4 = SyntaxNode(text2, self._offset, elements2)
                    self._offset += len(text2)
                else:
                    address4 = None
                if address4:
                    elements0.append(address4)
                    text0 += address4.text
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
            self._offset = index1
            address0 = SyntaxNode1(text0, self._offset, elements0)
            self._offset += len(text0)
        else:
            address0 = None
        self._cache['cell'][index0] = address0
        return address0

    def _read_list(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['list']:
            cached = self._cache['list'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1, elements0, text0 = self._offset, [], ''
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:(self._offset + 1)]
        if chunk0 == '(':
            address1 = SyntaxNode(chunk0, self._offset, [])
            self._offset += 1
        else:
            address1 = None
            if not self._error or self._error[1] <= self._offset:
                self._error = (self._input, self._offset, '"("')
        if address1:
            elements0.append(address1)
            text0 += address1.text
            address2 = None
            remaining0, index2, elements1, text1, address3 = 1, self._offset, [], '', True
            while address3 is not None:
                address3 = self._read_cell()
                if address3:
                    elements1.append(address3)
                    text1 += address3.text
                    remaining0 -= 1
            if remaining0 <= 0:
                self._offset = index2
                address2 = SyntaxNode(text1, self._offset, elements1)
                self._offset += len(text1)
            else:
                address2 = None
            if address2:
                elements0.append(address2)
                text0 += address2.text
                address4 = None
                chunk1 = None
                if len(self._input) > self._offset:
                    chunk1 = self._input[self._offset:(self._offset + 1)]
                if chunk1 == ')':
                    address4 = SyntaxNode(chunk1, self._offset, [])
                    self._offset += 1
                else:
                    address4 = None
                    if not self._error or self._error[1] <= self._offset:
                        self._error = (self._input, self._offset, '")"')
                if address4:
                    elements0.append(address4)
                    text0 += address4.text
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
            self._offset = index1
            address0 = SyntaxNode2(text0, self._offset, elements0)
            self._offset += len(text0)
        else:
            address0 = None
        self._cache['list'][index0] = address0
        return address0

    def _read_atom(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['atom']:
            cached = self._cache['atom'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
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
        self._cache['atom'][index0] = address0
        return address0

    def _read_boolean(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['boolean']:
            cached = self._cache['boolean'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1 = self._offset
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:(self._offset + 2)]
        if chunk0 == '#t':
            address0 = SyntaxNode(chunk0, self._offset, [])
            self._offset += 2
        else:
            address0 = None
            if not self._error or self._error[1] <= self._offset:
                self._error = (self._input, self._offset, '"#t"')
        if not address0:
            self._offset = index1
            chunk1 = None
            if len(self._input) > self._offset:
                chunk1 = self._input[self._offset:(self._offset + 2)]
            if chunk1 == '#f':
                address0 = SyntaxNode(chunk1, self._offset, [])
                self._offset += 2
            else:
                address0 = None
                if not self._error or self._error[1] <= self._offset:
                    self._error = (self._input, self._offset, '"#f"')
            if not address0:
                self._offset = index1
        self._cache['boolean'][index0] = address0
        return address0

    def _read_integer(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['integer']:
            cached = self._cache['integer'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1, elements0, text0 = self._offset, [], ''
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:(self._offset + 1)]
        if chunk0 and re.match('^[1-9]', chunk0):
            address1 = SyntaxNode(chunk0, self._offset, [])
            self._offset += 1
        else:
            address1 = None
            if not self._error or self._error[1] <= self._offset:
                self._error = (self._input, self._offset, '[1-9]')
        if address1:
            elements0.append(address1)
            text0 += address1.text
            address2 = None
            remaining0, index2, elements1, text1, address3 = 0, self._offset, [], '', True
            while address3 is not None:
                chunk1 = None
                if len(self._input) > self._offset:
                    chunk1 = self._input[self._offset:(self._offset + 1)]
                if chunk1 and re.match('^[0-9]', chunk1):
                    address3 = SyntaxNode(chunk1, self._offset, [])
                    self._offset += 1
                else:
                    address3 = None
                    if not self._error or self._error[1] <= self._offset:
                        self._error = (self._input, self._offset, '[0-9]')
                if address3:
                    elements1.append(address3)
                    text1 += address3.text
                    remaining0 -= 1
            if remaining0 <= 0:
                self._offset = index2
                address2 = SyntaxNode(text1, self._offset, elements1)
                self._offset += len(text1)
            else:
                address2 = None
            if address2:
                elements0.append(address2)
                text0 += address2.text
            else:
                elements0 = None
                self._offset = index1
        else:
            elements0 = None
            self._offset = index1
        if elements0:
            self._offset = index1
            address0 = SyntaxNode(text0, self._offset, elements0)
            self._offset += len(text0)
        else:
            address0 = None
        self._cache['integer'][index0] = address0
        return address0

    def _read_string(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['string']:
            cached = self._cache['string'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1, elements0, text0 = self._offset, [], ''
        address1 = None
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:(self._offset + 1)]
        if chunk0 == '"':
            address1 = SyntaxNode(chunk0, self._offset, [])
            self._offset += 1
        else:
            address1 = None
            if not self._error or self._error[1] <= self._offset:
                self._error = (self._input, self._offset, '"\\""')
        if address1:
            elements0.append(address1)
            text0 += address1.text
            address2 = None
            remaining0, index2, elements1, text1, address3 = 0, self._offset, [], '', True
            while address3 is not None:
                index3 = self._offset
                index4, elements2, text2 = self._offset, [], ''
                address4 = None
                chunk1 = None
                if len(self._input) > self._offset:
                    chunk1 = self._input[self._offset:(self._offset + 1)]
                if chunk1 == '\\':
                    address4 = SyntaxNode(chunk1, self._offset, [])
                    self._offset += 1
                else:
                    address4 = None
                    if not self._error or self._error[1] <= self._offset:
                        self._error = (self._input, self._offset, '"\\\\"')
                if address4:
                    elements2.append(address4)
                    text2 += address4.text
                    address5 = None
                    chunk2 = None
                    if len(self._input) > self._offset:
                        chunk2 = self._input[self._offset:(self._offset + 1)]
                    if chunk2 is None:
                        address5 = None
                        if not self._error or self._error[1] <= self._offset:
                            self._error = (self._input, self._offset, '<any char>')
                    else:
                        address5 = SyntaxNode(chunk2, self._offset, [])
                        self._offset += 1
                    if address5:
                        elements2.append(address5)
                        text2 += address5.text
                    else:
                        elements2 = None
                        self._offset = index4
                else:
                    elements2 = None
                    self._offset = index4
                if elements2:
                    self._offset = index4
                    address3 = SyntaxNode(text2, self._offset, elements2)
                    self._offset += len(text2)
                else:
                    address3 = None
                if not address3:
                    self._offset = index3
                    chunk3 = None
                    if len(self._input) > self._offset:
                        chunk3 = self._input[self._offset:(self._offset + 1)]
                    if chunk3 and re.match('^[^"]', chunk3):
                        address3 = SyntaxNode(chunk3, self._offset, [])
                        self._offset += 1
                    else:
                        address3 = None
                        if not self._error or self._error[1] <= self._offset:
                            self._error = (self._input, self._offset, '[^"]')
                    if not address3:
                        self._offset = index3
                if address3:
                    elements1.append(address3)
                    text1 += address3.text
                    remaining0 -= 1
            if remaining0 <= 0:
                self._offset = index2
                address2 = SyntaxNode(text1, self._offset, elements1)
                self._offset += len(text1)
            else:
                address2 = None
            if address2:
                elements0.append(address2)
                text0 += address2.text
                address6 = None
                chunk4 = None
                if len(self._input) > self._offset:
                    chunk4 = self._input[self._offset:(self._offset + 1)]
                if chunk4 == '"':
                    address6 = SyntaxNode(chunk4, self._offset, [])
                    self._offset += 1
                else:
                    address6 = None
                    if not self._error or self._error[1] <= self._offset:
                        self._error = (self._input, self._offset, '"\\""')
                if address6:
                    elements0.append(address6)
                    text0 += address6.text
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
            self._offset = index1
            address0 = SyntaxNode(text0, self._offset, elements0)
            self._offset += len(text0)
        else:
            address0 = None
        self._cache['string'][index0] = address0
        return address0

    def _read_symbol(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['symbol']:
            cached = self._cache['symbol'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        remaining0, index1, elements0, text0, address1 = 1, self._offset, [], '', True
        while address1 is not None:
            index2, elements1, text1 = self._offset, [], ''
            address2 = None
            index3 = self._offset
            address2 = self._read_delimiter()
            self._offset = index3
            if not address2:
                address2 = SyntaxNode('', self._offset, [])
                self._offset += 0
            else:
                address2 = None
            if address2:
                elements1.append(address2)
                text1 += address2.text
                address3 = None
                chunk0 = None
                if len(self._input) > self._offset:
                    chunk0 = self._input[self._offset:(self._offset + 1)]
                if chunk0 is None:
                    address3 = None
                    if not self._error or self._error[1] <= self._offset:
                        self._error = (self._input, self._offset, '<any char>')
                else:
                    address3 = SyntaxNode(chunk0, self._offset, [])
                    self._offset += 1
                if address3:
                    elements1.append(address3)
                    text1 += address3.text
                else:
                    elements1 = None
                    self._offset = index2
            else:
                elements1 = None
                self._offset = index2
            if elements1:
                self._offset = index2
                address1 = SyntaxNode(text1, self._offset, elements1)
                self._offset += len(text1)
            else:
                address1 = None
            if address1:
                elements0.append(address1)
                text0 += address1.text
                remaining0 -= 1
        if remaining0 <= 0:
            self._offset = index1
            address0 = SyntaxNode(text0, self._offset, elements0)
            self._offset += len(text0)
        else:
            address0 = None
        self._cache['symbol'][index0] = address0
        return address0

    def _read_space(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['space']:
            cached = self._cache['space'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:(self._offset + 1)]
        if chunk0 and re.match('^[\s]', chunk0):
            address0 = SyntaxNode(chunk0, self._offset, [])
            self._offset += 1
        else:
            address0 = None
            if not self._error or self._error[1] <= self._offset:
                self._error = (self._input, self._offset, '[\\s]')
        self._cache['space'][index0] = address0
        return address0

    def _read_paren(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['paren']:
            cached = self._cache['paren'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1 = self._offset
        chunk0 = None
        if len(self._input) > self._offset:
            chunk0 = self._input[self._offset:(self._offset + 1)]
        if chunk0 == '(':
            address0 = SyntaxNode(chunk0, self._offset, [])
            self._offset += 1
        else:
            address0 = None
            if not self._error or self._error[1] <= self._offset:
                self._error = (self._input, self._offset, '"("')
        if not address0:
            self._offset = index1
            chunk1 = None
            if len(self._input) > self._offset:
                chunk1 = self._input[self._offset:(self._offset + 1)]
            if chunk1 == ')':
                address0 = SyntaxNode(chunk1, self._offset, [])
                self._offset += 1
            else:
                address0 = None
                if not self._error or self._error[1] <= self._offset:
                    self._error = (self._input, self._offset, '")"')
            if not address0:
                self._offset = index1
        self._cache['paren'][index0] = address0
        return address0

    def _read_delimiter(self):
        address0, index0 = None, self._offset
        if index0 in self._cache['delimiter']:
            cached = self._cache['delimiter'][index0]
            if cached:
                self._offset += len(cached.text)
            return cached
        index1 = self._offset
        address0 = self._read_paren()
        if not address0:
            self._offset = index1
            address0 = self._read_space()
            if not address0:
                self._offset = index1
        self._cache['delimiter'][index0] = address0
        return address0


class Parser(Grammar):
    def __init__(self, input):
        self._input = input
        self._offset = 0
        self._cache = defaultdict(dict)
        self._error = None

    def parse(self):
        tree = self._read_program()
        if tree and self._offset == len(self._input):
            return tree
        if not self._error:
            self._error = (self._input, self._offset, '<EOF>')
        raise ParseError(format_error(self._error))


def parse(input):
    parser = Parser(input)
    return parser.parse()
