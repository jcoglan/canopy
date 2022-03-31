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
      @expected << [{{{grammar}}}, "<EOF>"]
    end
    raise ParseError, Parser.format_error(@input, @failure, @expected)
  end

  def self.format_error(input, offset, expected)
    lines = input.split(/\n/)
    line_no, position = 0, 0

    while position <= offset
      position += lines[line_no].size + 1
      line_no += 1
    end

    line = lines[line_no - 1]
    message = "Line #{line_no}: expected one of:\n\n"

    expected.each do |rule, term|
      message += "    - #{term} from #{rule}\n"
    end

    number = line_no.to_s
    number = " " + number until number.size == 6

    message += "\n#{number} | #{line}\n"
    message += " " * (line.size + 10 + offset - position)
    return message + "^"
  end
end

ParseError = Class.new(StandardError)

def self.parse(input, options = {})
  parser = Parser.new(input, options[:actions], options[:types])
  parser.parse
end
