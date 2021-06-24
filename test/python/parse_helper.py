class ParseHelper:
    def assertParse(self, tuple, actual):
        self.assertParseInner(tuple, actual.elements[1])

    def assertParseInner(self, tuple, actual):
        text, offset = tuple

        self.assertEqual(text, actual.text)
        self.assertEqual(offset, actual.offset)
