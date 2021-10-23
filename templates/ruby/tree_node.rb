class {{name}}
  include Enumerable
  attr_reader :text, :offset, :elements

  def initialize(text, offset, elements)
    @text = text
    @offset = offset
    @elements = elements
  end

  def each(&block)
    @elements.each(&block)
  end
end
