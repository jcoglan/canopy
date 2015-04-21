module CanopyLisp
  class SyntaxNode
    include Enumerable
    attr_reader :text, :offset, :elements

    def initialize(text, offset, elements)
      @text = text
      @offset = offset
      @elements = elements || []
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

  module Grammar
    def _read_program
      address0, index0 = nil, @offset
      if @cache[:program].has_key?(index0)
        cached = @cache[:program][index0]
        @offset += cached.text.size if cached
        return cached
      end
      remaining0, index1, elements0, text0, address1 = 1, @offset, [], "", true
      until address1 == nil
        address1 = _read_cell
        if address1
          elements0 << address1
          text0 << address1.text
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        @offset = index1
        address0 = SyntaxNode.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:program][index0] = address0
    end

    def _read_cell
      address0, index0 = nil, @offset
      if @cache[:cell].has_key?(index0)
        cached = @cache[:cell][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      remaining0, index2, elements1, text1, address2 = 0, @offset, [], "", true
      until address2 == nil
        address2 = _read_space
        if address2
          elements1 << address2
          text1 << address2.text
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        @offset = index2
        address1 = SyntaxNode.new(text1, @offset, elements1)
        @offset += text1.size
      else
        address1 = nil
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address3 = nil
        index3 = @offset
        address3 = _read_list
        unless address3
          @offset = index3
          address3 = _read_atom
          unless address3
            @offset = index3
          end
        end
        if address3
          elements0 << address3
          text0 << address3.text
          address4 = nil
          remaining1, index4, elements2, text2, address5 = 0, @offset, [], "", true
          until address5 == nil
            address5 = _read_space
            if address5
              elements2 << address5
              text2 << address5.text
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            @offset = index4
            address4 = SyntaxNode.new(text2, @offset, elements2)
            @offset += text2.size
          else
            address4 = nil
          end
          if address4
            elements0 << address4
            text0 << address4.text
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
        @offset = index1
        address0 = SyntaxNode1.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:cell][index0] = address0
    end

    def _read_list
      address0, index0 = nil, @offset
      if @cache[:list].has_key?(index0)
        cached = @cache[:list][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "("
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        unless @error and @error.offset > @offset
          @error = ParseError.new(@input, @offset, "\"(\"")
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 1, @offset, [], "", true
        until address3 == nil
          address3 = _read_cell
          if address3
            elements1 << address3
            text1 << address3.text
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          @offset = index2
          address2 = SyntaxNode.new(text1, @offset, elements1)
          @offset += text1.size
        else
          address2 = nil
        end
        if address2
          elements0 << address2
          text0 << address2.text
          address4 = nil
          chunk1 = nil
          if @input.size > @offset
            chunk1 = @input[@offset...(@offset + 1)]
          end
          if chunk1 == ")"
            address4 = SyntaxNode.new(chunk1, @offset, [])
            @offset += 1
          else
            address4 = nil
            unless @error and @error.offset > @offset
              @error = ParseError.new(@input, @offset, "\")\"")
            end
          end
          if address4
            elements0 << address4
            text0 << address4.text
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
        @offset = index1
        address0 = SyntaxNode2.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:list][index0] = address0
    end

    def _read_atom
      address0, index0 = nil, @offset
      if @cache[:atom].has_key?(index0)
        cached = @cache[:atom][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      address0 = _read_boolean
      unless address0
        @offset = index1
        address0 = _read_integer
        unless address0
          @offset = index1
          address0 = _read_string
          unless address0
            @offset = index1
            address0 = _read_symbol
            unless address0
              @offset = index1
            end
          end
        end
      end
      return @cache[:atom][index0] = address0
    end

    def _read_boolean
      address0, index0 = nil, @offset
      if @cache[:boolean].has_key?(index0)
        cached = @cache[:boolean][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 2)]
      end
      if chunk0 == "#t"
        address0 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 2
      else
        address0 = nil
        unless @error and @error.offset > @offset
          @error = ParseError.new(@input, @offset, "\"#t\"")
        end
      end
      unless address0
        @offset = index1
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...(@offset + 2)]
        end
        if chunk1 == "#f"
          address0 = SyntaxNode.new(chunk1, @offset, [])
          @offset += 2
        else
          address0 = nil
          unless @error and @error.offset > @offset
            @error = ParseError.new(@input, @offset, "\"#f\"")
          end
        end
        unless address0
          @offset = index1
        end
      end
      return @cache[:boolean][index0] = address0
    end

    def _read_integer
      address0, index0 = nil, @offset
      if @cache[:integer].has_key?(index0)
        cached = @cache[:integer][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 and chunk0 =~ /^[1-9]/
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        unless @error and @error.offset > @offset
          @error = ParseError.new(@input, @offset, "[1-9]")
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 0, @offset, [], "", true
        until address3 == nil
          chunk1 = nil
          if @input.size > @offset
            chunk1 = @input[@offset...(@offset + 1)]
          end
          if chunk1 and chunk1 =~ /^[0-9]/
            address3 = SyntaxNode.new(chunk1, @offset, [])
            @offset += 1
          else
            address3 = nil
            unless @error and @error.offset > @offset
              @error = ParseError.new(@input, @offset, "[0-9]")
            end
          end
          if address3
            elements1 << address3
            text1 << address3.text
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          @offset = index2
          address2 = SyntaxNode.new(text1, @offset, elements1)
          @offset += text1.size
        else
          address2 = nil
        end
        if address2
          elements0 << address2
          text0 << address2.text
        else
          elements0 = nil
          @offset = index1
        end
      else
        elements0 = nil
        @offset = index1
      end
      if elements0
        @offset = index1
        address0 = SyntaxNode.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:integer][index0] = address0
    end

    def _read_string
      address0, index0 = nil, @offset
      if @cache[:string].has_key?(index0)
        cached = @cache[:string][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "\""
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        unless @error and @error.offset > @offset
          @error = ParseError.new(@input, @offset, "\"\\\"\"")
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 0, @offset, [], "", true
        until address3 == nil
          index3 = @offset
          index4, elements2, text2 = @offset, [], ""
          address4 = nil
          chunk1 = nil
          if @input.size > @offset
            chunk1 = @input[@offset...(@offset + 1)]
          end
          if chunk1 == "\\"
            address4 = SyntaxNode.new(chunk1, @offset, [])
            @offset += 1
          else
            address4 = nil
            unless @error and @error.offset > @offset
              @error = ParseError.new(@input, @offset, "\"\\\\\"")
            end
          end
          if address4
            elements2 << address4
            text2 << address4.text
            address5 = nil
            chunk2 = nil
            if @input.size > @offset
              chunk2 = @input[@offset...(@offset + 1)]
            end
            if chunk2.nil?
              address5 = nil
              unless @error and @error.offset > @offset
                @error = ParseError.new(@input, @offset, "<any char>")
              end
            else
              address5 = SyntaxNode.new(chunk2, @offset, [])
              @offset += 1
            end
            if address5
              elements2 << address5
              text2 << address5.text
            else
              elements2 = nil
              @offset = index4
            end
          else
            elements2 = nil
            @offset = index4
          end
          if elements2
            @offset = index4
            address3 = SyntaxNode.new(text2, @offset, elements2)
            @offset += text2.size
          else
            address3 = nil
          end
          unless address3
            @offset = index3
            chunk3 = nil
            if @input.size > @offset
              chunk3 = @input[@offset...(@offset + 1)]
            end
            if chunk3 and chunk3 =~ /^[^"]/
              address3 = SyntaxNode.new(chunk3, @offset, [])
              @offset += 1
            else
              address3 = nil
              unless @error and @error.offset > @offset
                @error = ParseError.new(@input, @offset, "[^\"]")
              end
            end
            unless address3
              @offset = index3
            end
          end
          if address3
            elements1 << address3
            text1 << address3.text
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          @offset = index2
          address2 = SyntaxNode.new(text1, @offset, elements1)
          @offset += text1.size
        else
          address2 = nil
        end
        if address2
          elements0 << address2
          text0 << address2.text
          address6 = nil
          chunk4 = nil
          if @input.size > @offset
            chunk4 = @input[@offset...(@offset + 1)]
          end
          if chunk4 == "\""
            address6 = SyntaxNode.new(chunk4, @offset, [])
            @offset += 1
          else
            address6 = nil
            unless @error and @error.offset > @offset
              @error = ParseError.new(@input, @offset, "\"\\\"\"")
            end
          end
          if address6
            elements0 << address6
            text0 << address6.text
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
        @offset = index1
        address0 = SyntaxNode.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:string][index0] = address0
    end

    def _read_symbol
      address0, index0 = nil, @offset
      if @cache[:symbol].has_key?(index0)
        cached = @cache[:symbol][index0]
        @offset += cached.text.size if cached
        return cached
      end
      remaining0, index1, elements0, text0, address1 = 1, @offset, [], "", true
      until address1 == nil
        index2, elements1, text1 = @offset, [], ""
        address2 = nil
        index3 = @offset
        address2 = _read_delimiter
        @offset = index3
        unless address2
          address2 = SyntaxNode.new("", @offset, [])
          @offset += 0
        else
          address2 = nil
        end
        if address2
          elements1 << address2
          text1 << address2.text
          address3 = nil
          chunk0 = nil
          if @input.size > @offset
            chunk0 = @input[@offset...(@offset + 1)]
          end
          if chunk0.nil?
            address3 = nil
            unless @error and @error.offset > @offset
              @error = ParseError.new(@input, @offset, "<any char>")
            end
          else
            address3 = SyntaxNode.new(chunk0, @offset, [])
            @offset += 1
          end
          if address3
            elements1 << address3
            text1 << address3.text
          else
            elements1 = nil
            @offset = index2
          end
        else
          elements1 = nil
          @offset = index2
        end
        if elements1
          @offset = index2
          address1 = SyntaxNode.new(text1, @offset, elements1)
          @offset += text1.size
        else
          address1 = nil
        end
        if address1
          elements0 << address1
          text0 << address1.text
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        @offset = index1
        address0 = SyntaxNode.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:symbol][index0] = address0
    end

    def _read_space
      address0, index0 = nil, @offset
      if @cache[:space].has_key?(index0)
        cached = @cache[:space][index0]
        @offset += cached.text.size if cached
        return cached
      end
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 and chunk0 =~ /^[\s]/
        address0 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address0 = nil
        unless @error and @error.offset > @offset
          @error = ParseError.new(@input, @offset, "[\\s]")
        end
      end
      return @cache[:space][index0] = address0
    end

    def _read_paren
      address0, index0 = nil, @offset
      if @cache[:paren].has_key?(index0)
        cached = @cache[:paren][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "("
        address0 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address0 = nil
        unless @error and @error.offset > @offset
          @error = ParseError.new(@input, @offset, "\"(\"")
        end
      end
      unless address0
        @offset = index1
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...(@offset + 1)]
        end
        if chunk1 == ")"
          address0 = SyntaxNode.new(chunk1, @offset, [])
          @offset += 1
        else
          address0 = nil
          unless @error and @error.offset > @offset
            @error = ParseError.new(@input, @offset, "\")\"")
          end
        end
        unless address0
          @offset = index1
        end
      end
      return @cache[:paren][index0] = address0
    end

    def _read_delimiter
      address0, index0 = nil, @offset
      if @cache[:delimiter].has_key?(index0)
        cached = @cache[:delimiter][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      address0 = _read_paren
      unless address0
        @offset = index1
        address0 = _read_space
        unless address0
          @offset = index1
        end
      end
      return @cache[:delimiter][index0] = address0
    end
  end

  class Parser
    include Grammar

    def initialize(input)
      @input = input
      @offset = 0
      @cache = Hash.new { |h,k| h[k] = {} }
    end

    def parse
      tree = _read_program
      if tree and @offset == @input.size
        return tree
      end
      @error ||= ParseError.new(@input, @offset, "<EOF>")
      raise SyntaxError, Parser.format_error(@error)
    end

    def self.format_error(error)
      lines, line_no, offset = error.input.split(/\n/), 0, 0
      while offset <= error.offset
        offset += lines[line_no].size + 1
        line_no += 1
      end
      message, line = "Line #{line_no}: expected #{error.expected}\n", lines[line_no - 1]
      message += "#{line}\n"
      offset -= line.size + 1
      message += " " * (error.offset - offset)
      return message + "^"
    end
  end

  def self.parse(input)
    parser = Parser.new(input)
    parser.parse
  end
end
