module ParseHelper
  def assert_parse(tuple, actual)
    assert_parse_inner(tuple, actual.elements[1])
  end

  def assert_parse_inner(tuple, actual)
    text, offset, elements, labelled = tuple

    assert_equal text, actual.text
    assert_equal offset, actual.offset

    if elements
      assert_equal elements.size, actual.elements.size

      elements.each_with_index do |elem, i|
        assert_parse_inner(elem, actual.elements[i])
      end
    end

    if labelled
      labelled.each do |key, value|
        assert_parse_inner(value, actual.__send__(key))
      end
    end
  end
end
