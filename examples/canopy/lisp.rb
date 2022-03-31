# This file was generated from examples/canopy/lisp.peg
# See https://canopy.jcoglan.com/ for documentation

module CanopyLisp
  class TreeNode
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

  class TreeNode1 < TreeNode
    attr_reader :data

    def initialize(text, offset, elements)
      super
      @data = elements[1]
    end
  end

  class TreeNode2 < TreeNode
    attr_reader :cells

    def initialize(text, offset, elements)
      super
      @cells = elements[1]
    end
  end

  FAILURE = Object.new

  module Grammar
    def _read_program
      address0, index0 = FAILURE, @offset
      cached = @cache[:program][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0, address1 = @offset, [], nil
      loop do
        address1 = _read_cell
        unless address1 == FAILURE
          elements0 << address1
        else
          break
        end
      end
      if elements0.size >= 1
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
      end
      @cache[:program][index0] = [address0, @offset]
      return address0
    end

    def _read_cell
      address0, index0 = FAILURE, @offset
      cached = @cache[:cell][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      index2, elements1, address2 = @offset, [], nil
      loop do
        address2 = _read_space
        unless address2 == FAILURE
          elements1 << address2
        else
          break
        end
      end
      if elements1.size >= 0
        address1 = TreeNode.new(@input[index2...@offset], index2, elements1)
        @offset = @offset
      else
        address1 = FAILURE
      end
      unless address1 == FAILURE
        elements0 << address1
        address3 = FAILURE
        index3 = @offset
        address3 = _read_list
        if address3 == FAILURE
          @offset = index3
          address3 = _read_atom
          if address3 == FAILURE
            @offset = index3
          end
        end
        unless address3 == FAILURE
          elements0 << address3
          address4 = FAILURE
          index4, elements2, address5 = @offset, [], nil
          loop do
            address5 = _read_space
            unless address5 == FAILURE
              elements2 << address5
            else
              break
            end
          end
          if elements2.size >= 0
            address4 = TreeNode.new(@input[index4...@offset], index4, elements2)
            @offset = @offset
          else
            address4 = FAILURE
          end
          unless address4 == FAILURE
            elements0 << address4
          else
            elements0 = nil
            @offset = index1
          end
        else
          elements0 = nil
          @offset = index1
        end
      else
        elements0 = nil
        @offset = index1
      end
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode1.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:cell][index0] = [address0, @offset]
      return address0
    end

    def _read_list
      address0, index0 = FAILURE, @offset
      cached = @cache[:list][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "("
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyLisp::list", "\"(\""]
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2, elements1, address3 = @offset, [], nil
        loop do
          address3 = _read_cell
          unless address3 == FAILURE
            elements1 << address3
          else
            break
          end
        end
        if elements1.size >= 1
          address2 = TreeNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address4 = FAILURE
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 == ")"
            address4 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address4 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyLisp::list", "\")\""]
            end
          end
          unless address4 == FAILURE
            elements0 << address4
          else
            elements0 = nil
            @offset = index1
          end
        else
          elements0 = nil
          @offset = index1
        end
      else
        elements0 = nil
        @offset = index1
      end
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode2.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:list][index0] = [address0, @offset]
      return address0
    end

    def _read_atom
      address0, index0 = FAILURE, @offset
      cached = @cache[:atom][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      address0 = _read_boolean_
      if address0 == FAILURE
        @offset = index1
        address0 = _read_integer
        if address0 == FAILURE
          @offset = index1
          address0 = _read_string
          if address0 == FAILURE
            @offset = index1
            address0 = _read_symbol
            if address0 == FAILURE
              @offset = index1
            end
          end
        end
      end
      @cache[:atom][index0] = [address0, @offset]
      return address0
    end

    def _read_boolean_
      address0, index0 = FAILURE, @offset
      cached = @cache[:boolean_][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      chunk0, max0 = nil, @offset + 2
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "#t"
        address0 = TreeNode.new(@input[@offset...@offset + 2], @offset, [])
        @offset = @offset + 2
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyLisp::boolean_", "\"#t\""]
        end
      end
      if address0 == FAILURE
        @offset = index1
        chunk1, max1 = nil, @offset + 2
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == "#f"
          address0 = TreeNode.new(@input[@offset...@offset + 2], @offset, [])
          @offset = @offset + 2
        else
          address0 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyLisp::boolean_", "\"#f\""]
          end
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:boolean_][index0] = [address0, @offset]
      return address0
    end

    def _read_integer
      address0, index0 = FAILURE, @offset
      cached = @cache[:integer][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 =~ /\A[1-9]/
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyLisp::integer", "[1-9]"]
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2, elements1, address3 = @offset, [], nil
        loop do
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 =~ /\A[0-9]/
            address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyLisp::integer", "[0-9]"]
            end
          end
          unless address3 == FAILURE
            elements1 << address3
          else
            break
          end
        end
        if elements1.size >= 0
          address2 = TreeNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
        else
          elements0 = nil
          @offset = index1
        end
      else
        elements0 = nil
        @offset = index1
      end
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:integer][index0] = [address0, @offset]
      return address0
    end

    def _read_string
      address0, index0 = FAILURE, @offset
      cached = @cache[:string][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "\""
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyLisp::string", "\"\\\"\""]
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2, elements1, address3 = @offset, [], nil
        loop do
          index3 = @offset
          index4, elements2 = @offset, []
          address4 = FAILURE
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 == "\\"
            address4 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address4 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyLisp::string", "\"\\\\\""]
            end
          end
          unless address4 == FAILURE
            elements2 << address4
            address5 = FAILURE
            if @offset < @input_size
              address5 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address5 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyLisp::string", "<any char>"]
              end
            end
            unless address5 == FAILURE
              elements2 << address5
            else
              elements2 = nil
              @offset = index4
            end
          else
            elements2 = nil
            @offset = index4
          end
          if elements2.nil?
            address3 = FAILURE
          else
            address3 = TreeNode.new(@input[index4...@offset], index4, elements2)
            @offset = @offset
          end
          if address3 == FAILURE
            @offset = index3
            chunk2, max2 = nil, @offset + 1
            if max2 <= @input_size
              chunk2 = @input[@offset...max2]
            end
            if chunk2 =~ /\A[^"]/
              address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address3 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyLisp::string", "[^\"]"]
              end
            end
            if address3 == FAILURE
              @offset = index3
            end
          end
          unless address3 == FAILURE
            elements1 << address3
          else
            break
          end
        end
        if elements1.size >= 0
          address2 = TreeNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address6 = FAILURE
          chunk3, max3 = nil, @offset + 1
          if max3 <= @input_size
            chunk3 = @input[@offset...max3]
          end
          if chunk3 == "\""
            address6 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address6 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyLisp::string", "\"\\\"\""]
            end
          end
          unless address6 == FAILURE
            elements0 << address6
          else
            elements0 = nil
            @offset = index1
          end
        else
          elements0 = nil
          @offset = index1
        end
      else
        elements0 = nil
        @offset = index1
      end
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:string][index0] = [address0, @offset]
      return address0
    end

    def _read_symbol
      address0, index0 = FAILURE, @offset
      cached = @cache[:symbol][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0, address1 = @offset, [], nil
      loop do
        index2, elements1 = @offset, []
        address2 = FAILURE
        index3 = @offset
        address2 = _read_delimiter
        @offset = index3
        if address2 == FAILURE
          address2 = TreeNode.new(@input[@offset...@offset], @offset, [])
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements1 << address2
          address3 = FAILURE
          if @offset < @input_size
            address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyLisp::symbol", "<any char>"]
            end
          end
          unless address3 == FAILURE
            elements1 << address3
          else
            elements1 = nil
            @offset = index2
          end
        else
          elements1 = nil
          @offset = index2
        end
        if elements1.nil?
          address1 = FAILURE
        else
          address1 = TreeNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        end
        unless address1 == FAILURE
          elements0 << address1
        else
          break
        end
      end
      if elements0.size >= 1
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
      end
      @cache[:symbol][index0] = [address0, @offset]
      return address0
    end

    def _read_space
      address0, index0 = FAILURE, @offset
      cached = @cache[:space][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 =~ /\A[\s]/
        address0 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyLisp::space", "[\\s]"]
        end
      end
      @cache[:space][index0] = [address0, @offset]
      return address0
    end

    def _read_paren
      address0, index0 = FAILURE, @offset
      cached = @cache[:paren][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "("
        address0 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyLisp::paren", "\"(\""]
        end
      end
      if address0 == FAILURE
        @offset = index1
        chunk1, max1 = nil, @offset + 1
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == ")"
          address0 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address0 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyLisp::paren", "\")\""]
          end
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:paren][index0] = [address0, @offset]
      return address0
    end

    def _read_delimiter
      address0, index0 = FAILURE, @offset
      cached = @cache[:delimiter][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      address0 = _read_paren
      if address0 == FAILURE
        @offset = index1
        address0 = _read_space
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:delimiter][index0] = [address0, @offset]
      return address0
    end
  end

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
      tree = _read_program
      if tree != FAILURE and @offset == @input_size
        return tree
      end
      if @expected.empty?
        @failure = @offset
        @expected << ["CanopyLisp", "<EOF>"]
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
end
