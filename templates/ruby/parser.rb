class Parser
  include Grammar

  def initialize(input, actions, types)
    @input = input
    @input_size = input.size
    @actions = actions
    @types = types
    @offset = 0
    @cache = Hash.new { |h,k| h[k] = {} }
    @failure = 0
    @expected = []
  end

  def parse
    tree = _read_{{root}}
    if tree != FAILURE and @offset == @input_size
      return tree
    end
    if @expected.empty?
      @failure = @offset
      @expected << "<EOF>"
    end
    raise ParseError, Parser.format_error(@input, @failure, @expected)
  end

  def self.format_error(input, offset, expected)
    lines, line_no, position = input.split(/\n/), 0, 0
    while position <= offset
      position += lines[line_no].size + 1
      line_no += 1
    end
    message, line = "Line #{line_no}: expected #{expected * ", "}\n", lines[line_no - 1]
    message += "#{line}\n"
    position -= line.size + 1
    message += " " * (offset - position)
    return message + "^"
  end
end

def self.parse(input, options = {})
  parser = Parser.new(input, options[:actions], options[:types])
  parser.parse
end
