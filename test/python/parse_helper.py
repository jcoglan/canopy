class ParseHelper:
    def assertParse(self, tuple, actual):
        self.assertParseInner(tuple, actual.elements[1])

    def assertParseInner(self, tuple, actual):
        text, offset = tuple[0:2]

        self.assertEqual(text, actual.text)
        self.assertEqual(offset, actual.offset)

        if len(tuple) > 2:
            elements = tuple[2]
            self.assertEqual(len(elements), len(actual.elements))

            for i, elem in enumerate(elements):
                self.assertParseInner(elem, actual.elements[i])
