module CanopyLisp
  class SyntaxNode
    include Enumerable
    attr_reader :text, :offset, :elements

    def initialize(text, offset, elements = [])
      @text = text
      @offset = offset
      @elements = elements
    end

    def each(&block)
      @elements.each(&block)
    end
  end

  class SyntaxNode1 < SyntaxNode
    attr_reader :data

    def initialize(text, offset, elements)
      super
      @data = elements[1]
    end
  end

  class SyntaxNode2 < SyntaxNode
    attr_reader :cells

    def initialize(text, offset, elements)
      super
      @cells = elements[1]
    end
  end

  ParseError = Struct.new(:input, :offset, :expected)
  FAILURE = Object.new

  module Grammar
    def _read_program
      address0, index0 = FAILURE, @offset
      cached = @cache[:program][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      remaining0, index1, elements0, address1 = 1, @offset, [], true
      until address1 == FAILURE
        address1 = _read_cell
        unless address1 == FAILURE
          elements0 << address1
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        address0 = SyntaxNode.new(@input[index1...@offset], index1, elements0)
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
      remaining0, index2, elements1, address2 = 0, @offset, [], true
      until address2 == FAILURE
        address2 = _read_space
        unless address2 == FAILURE
          elements1 << address2
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        address1 = SyntaxNode.new(@input[index2...@offset], index2, elements1)
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
          remaining1, index4, elements2, address5 = 0, @offset, [], true
          until address5 == FAILURE
            address5 = _read_space
            unless address5 == FAILURE
              elements2 << address5
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            address4 = SyntaxNode.new(@input[index4...@offset], index4, elements2)
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
      if elements0
        address0 = SyntaxNode1.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
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
      chunk0 = nil
      if @offset < @input_size
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "("
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"(\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 1, @offset, [], true
        until address3 == FAILURE
          address3 = _read_cell
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = SyntaxNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address4 = FAILURE
          chunk1 = nil
          if @offset < @input_size
            chunk1 = @input[@offset...@offset + 1]
          end
          if chunk1 == ")"
            address4 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
            @offset = @offset + 1
          else
            address4 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\")\""
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
      if elements0
        address0 = SyntaxNode2.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
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
      address0 = _read_boolean
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

    def _read_boolean
      address0, index0 = FAILURE, @offset
      cached = @cache[:boolean][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      chunk0 = nil
      if @offset < @input_size
        chunk0 = @input[@offset...@offset + 2]
      end
      if chunk0 == "#t"
        address0 = SyntaxNode.new(@input[@offset...@offset + 2], @offset)
        @offset = @offset + 2
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"#t\""
        end
      end
      if address0 == FAILURE
        @offset = index1
        chunk1 = nil
        if @offset < @input_size
          chunk1 = @input[@offset...@offset + 2]
        end
        if chunk1 == "#f"
          address0 = SyntaxNode.new(@input[@offset...@offset + 2], @offset)
          @offset = @offset + 2
        else
          address0 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"#f\""
          end
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:boolean][index0] = [address0, @offset]
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
      chunk0 = nil
      if @offset < @input_size
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 =~ /\A[1-9]/
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "[1-9]"
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          chunk1 = nil
          if @offset < @input_size
            chunk1 = @input[@offset...@offset + 1]
          end
          if chunk1 =~ /\A[0-9]/
            address3 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "[0-9]"
            end
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = SyntaxNode.new(@input[index2...@offset], index2, elements1)
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
      if elements0
        address0 = SyntaxNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
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
      chunk0 = nil
      if @offset < @input_size
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "\""
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"\\\"\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          index3 = @offset
          index4, elements2 = @offset, []
          address4 = FAILURE
          chunk1 = nil
          if @offset < @input_size
            chunk1 = @input[@offset...@offset + 1]
          end
          if chunk1 == "\\"
            address4 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
            @offset = @offset + 1
          else
            address4 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"\\\\\""
            end
          end
          unless address4 == FAILURE
            elements2 << address4
            address5 = FAILURE
            if @offset < @input_size
              address5 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
              @offset = @offset + 1
            else
              address5 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "<any char>"
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
          if elements2
            address3 = SyntaxNode.new(@input[index4...@offset], index4, elements2)
            @offset = @offset
          else
            address3 = FAILURE
          end
          if address3 == FAILURE
            @offset = index3
            chunk2 = nil
            if @offset < @input_size
              chunk2 = @input[@offset...@offset + 1]
            end
            if chunk2 =~ /\A[^"]/
              address3 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
              @offset = @offset + 1
            else
              address3 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "[^\"]"
              end
            end
            if address3 == FAILURE
              @offset = index3
            end
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = SyntaxNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address6 = FAILURE
          chunk3 = nil
          if @offset < @input_size
            chunk3 = @input[@offset...@offset + 1]
          end
          if chunk3 == "\""
            address6 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
            @offset = @offset + 1
          else
            address6 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"\\\"\""
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
      if elements0
        address0 = SyntaxNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
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
      remaining0, index1, elements0, address1 = 1, @offset, [], true
      until address1 == FAILURE
        index2, elements1 = @offset, []
        address2 = FAILURE
        index3 = @offset
        address2 = _read_delimiter
        @offset = index3
        if address2 == FAILURE
          address2 = SyntaxNode.new(@input[@offset...@offset], @offset)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements1 << address2
          address3 = FAILURE
          if @offset < @input_size
            address3 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "<any char>"
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
        if elements1
          address1 = SyntaxNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address1 = FAILURE
        end
        unless address1 == FAILURE
          elements0 << address1
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        address0 = SyntaxNode.new(@input[index1...@offset], index1, elements0)
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
      chunk0 = nil
      if @offset < @input_size
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 =~ /\A[\s]/
        address0 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
        @offset = @offset + 1
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "[\\s]"
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
      chunk0 = nil
      if @offset < @input_size
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "("
        address0 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
        @offset = @offset + 1
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"(\""
        end
      end
      if address0 == FAILURE
        @offset = index1
        chunk1 = nil
        if @offset < @input_size
          chunk1 = @input[@offset...@offset + 1]
        end
        if chunk1 == ")"
          address0 = SyntaxNode.new(@input[@offset...@offset + 1], @offset)
          @offset = @offset + 1
        else
          address0 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\")\""
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
        @expected << "<EOF>"
      end
      raise SyntaxError, Parser.format_error(@input, @failure, @expected)
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
end
