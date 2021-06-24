module ParseHelper
  def assert_parse(tuple, actual)
    assert_parse_inner(tuple, actual.elements[1])
  end

  def assert_parse_inner(tuple, actual)
    text, offset = tuple

    assert_equal text, actual.text
    assert_equal offset, actual.offset
  end
end
