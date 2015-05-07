module CanopyJson
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
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[2]
    end
  end

  class SyntaxNode2 < SyntaxNode
    attr_reader :pair

    def initialize(text, offset, elements)
      super
      @pair = elements[1]
    end
  end

  class SyntaxNode3 < SyntaxNode
    attr_reader :pair

    def initialize(text, offset, elements)
      super
      @pair = elements[1]
    end
  end

  class SyntaxNode4 < SyntaxNode
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[1]
    end
  end

  class SyntaxNode5 < SyntaxNode
    attr_reader :__, :string, :value

    def initialize(text, offset, elements)
      super
      @__ = elements[2]
      @string = elements[1]
      @value = elements[4]
    end
  end

  class SyntaxNode6 < SyntaxNode
    attr_reader :value

    def initialize(text, offset, elements)
      super
      @value = elements[1]
    end
  end

  class SyntaxNode7 < SyntaxNode
    attr_reader :value

    def initialize(text, offset, elements)
      super
      @value = elements[1]
    end
  end

  class SyntaxNode8 < SyntaxNode
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[1]
    end
  end

  class SyntaxNode9 < SyntaxNode
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[2]
    end
  end

  ParseError = Struct.new(:input, :offset, :expected)

  module Grammar
    def _read_document
      address0, index0 = nil, @offset
      cached = @cache[:document][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = nil
      address1 = _read___
      unless address1.nil?
        elements0 << address1
        address2 = nil
        index2 = @offset
        address2 = _read_object
        if address2.nil?
          @offset = index2
          address2 = _read_array
          if address2.nil?
            @offset = index2
          end
        end
        unless address2.nil?
          elements0 << address2
          address3 = nil
          address3 = _read___
          unless address3.nil?
            elements0 << address3
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
        address0 = nil
      end
      @cache[:document][index0] = [address0, @offset]
      return address0
    end

    def _read_object
      address0, index0 = nil, @offset
      cached = @cache[:object][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      index2, elements0 = @offset, []
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "{"
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"{\""
        end
      end
      unless address1.nil?
        elements0 << address1
        address2 = nil
        address2 = _read_pair
        unless address2.nil?
          elements0 << address2
          address3 = nil
          remaining0, index3, elements1, address4 = 0, @offset, [], true
          until address4 == nil
            index4, elements2 = @offset, []
            address5 = nil
            chunk1 = nil
            if @input.size > @offset
              chunk1 = @input[@offset...@offset + 1]
            end
            if chunk1 == ","
              address5 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address5 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\",\""
              end
            end
            unless address5.nil?
              elements2 << address5
              address6 = nil
              address6 = _read_pair
              unless address6.nil?
                elements2 << address6
              else
                elements2 = nil
                @offset = index4
              end
            else
              elements2 = nil
              @offset = index4
            end
            if elements2
              address4 = SyntaxNode3.new(@input[index4...@offset], index4, elements2)
              @offset = @offset
            else
              address4 = nil
            end
            unless address4.nil?
              elements1 << address4
              remaining0 -= 1
            end
          end
          if remaining0 <= 0
            address3 = SyntaxNode.new(@input[index3...@offset], index3, elements1)
            @offset = @offset
          else
            address3 = nil
          end
          unless address3.nil?
            elements0 << address3
            address7 = nil
            chunk2 = nil
            if @input.size > @offset
              chunk2 = @input[@offset...@offset + 1]
            end
            if chunk2 == "}"
              address7 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address7 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"}\""
              end
            end
            unless address7.nil?
              elements0 << address7
            else
              elements0 = nil
              @offset = index2
            end
          else
            elements0 = nil
            @offset = index2
          end
        else
          elements0 = nil
          @offset = index2
        end
      else
        elements0 = nil
        @offset = index2
      end
      if elements0
        address0 = SyntaxNode2.new(@input[index2...@offset], index2, elements0)
        @offset = @offset
      else
        address0 = nil
      end
      if address0.nil?
        @offset = index1
        index5, elements3 = @offset, []
        address8 = nil
        chunk3 = nil
        if @input.size > @offset
          chunk3 = @input[@offset...@offset + 1]
        end
        if chunk3 == "{"
          address8 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address8 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"{\""
          end
        end
        unless address8.nil?
          elements3 << address8
          address9 = nil
          address9 = _read___
          unless address9.nil?
            elements3 << address9
            address10 = nil
            chunk4 = nil
            if @input.size > @offset
              chunk4 = @input[@offset...@offset + 1]
            end
            if chunk4 == "}"
              address10 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address10 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"}\""
              end
            end
            unless address10.nil?
              elements3 << address10
            else
              elements3 = nil
              @offset = index5
            end
          else
            elements3 = nil
            @offset = index5
          end
        else
          elements3 = nil
          @offset = index5
        end
        if elements3
          address0 = SyntaxNode4.new(@input[index5...@offset], index5, elements3)
          @offset = @offset
        else
          address0 = nil
        end
        if address0.nil?
          @offset = index1
        end
      end
      @cache[:object][index0] = [address0, @offset]
      return address0
    end

    def _read_pair
      address0, index0 = nil, @offset
      cached = @cache[:pair][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = nil
      address1 = _read___
      unless address1.nil?
        elements0 << address1
        address2 = nil
        address2 = _read_string
        unless address2.nil?
          elements0 << address2
          address3 = nil
          address3 = _read___
          unless address3.nil?
            elements0 << address3
            address4 = nil
            chunk0 = nil
            if @input.size > @offset
              chunk0 = @input[@offset...@offset + 1]
            end
            if chunk0 == ":"
              address4 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address4 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\":\""
              end
            end
            unless address4.nil?
              elements0 << address4
              address5 = nil
              address5 = _read_value
              unless address5.nil?
                elements0 << address5
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
        else
          elements0 = nil
          @offset = index1
        end
      else
        elements0 = nil
        @offset = index1
      end
      if elements0
        address0 = SyntaxNode5.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = nil
      end
      @cache[:pair][index0] = [address0, @offset]
      return address0
    end

    def _read_array
      address0, index0 = nil, @offset
      cached = @cache[:array][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      index2, elements0 = @offset, []
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "["
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"[\""
        end
      end
      unless address1.nil?
        elements0 << address1
        address2 = nil
        address2 = _read_value
        unless address2.nil?
          elements0 << address2
          address3 = nil
          remaining0, index3, elements1, address4 = 0, @offset, [], true
          until address4 == nil
            index4, elements2 = @offset, []
            address5 = nil
            chunk1 = nil
            if @input.size > @offset
              chunk1 = @input[@offset...@offset + 1]
            end
            if chunk1 == ","
              address5 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address5 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\",\""
              end
            end
            unless address5.nil?
              elements2 << address5
              address6 = nil
              address6 = _read_value
              unless address6.nil?
                elements2 << address6
              else
                elements2 = nil
                @offset = index4
              end
            else
              elements2 = nil
              @offset = index4
            end
            if elements2
              address4 = SyntaxNode7.new(@input[index4...@offset], index4, elements2)
              @offset = @offset
            else
              address4 = nil
            end
            unless address4.nil?
              elements1 << address4
              remaining0 -= 1
            end
          end
          if remaining0 <= 0
            address3 = SyntaxNode.new(@input[index3...@offset], index3, elements1)
            @offset = @offset
          else
            address3 = nil
          end
          unless address3.nil?
            elements0 << address3
            address7 = nil
            chunk2 = nil
            if @input.size > @offset
              chunk2 = @input[@offset...@offset + 1]
            end
            if chunk2 == "]"
              address7 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address7 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"]\""
              end
            end
            unless address7.nil?
              elements0 << address7
            else
              elements0 = nil
              @offset = index2
            end
          else
            elements0 = nil
            @offset = index2
          end
        else
          elements0 = nil
          @offset = index2
        end
      else
        elements0 = nil
        @offset = index2
      end
      if elements0
        address0 = SyntaxNode6.new(@input[index2...@offset], index2, elements0)
        @offset = @offset
      else
        address0 = nil
      end
      if address0.nil?
        @offset = index1
        index5, elements3 = @offset, []
        address8 = nil
        chunk3 = nil
        if @input.size > @offset
          chunk3 = @input[@offset...@offset + 1]
        end
        if chunk3 == "["
          address8 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address8 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"[\""
          end
        end
        unless address8.nil?
          elements3 << address8
          address9 = nil
          address9 = _read___
          unless address9.nil?
            elements3 << address9
            address10 = nil
            chunk4 = nil
            if @input.size > @offset
              chunk4 = @input[@offset...@offset + 1]
            end
            if chunk4 == "]"
              address10 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address10 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"]\""
              end
            end
            unless address10.nil?
              elements3 << address10
            else
              elements3 = nil
              @offset = index5
            end
          else
            elements3 = nil
            @offset = index5
          end
        else
          elements3 = nil
          @offset = index5
        end
        if elements3
          address0 = SyntaxNode8.new(@input[index5...@offset], index5, elements3)
          @offset = @offset
        else
          address0 = nil
        end
        if address0.nil?
          @offset = index1
        end
      end
      @cache[:array][index0] = [address0, @offset]
      return address0
    end

    def _read_value
      address0, index0 = nil, @offset
      cached = @cache[:value][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = nil
      address1 = _read___
      unless address1.nil?
        elements0 << address1
        address2 = nil
        index2 = @offset
        address2 = _read_object
        if address2.nil?
          @offset = index2
          address2 = _read_array
          if address2.nil?
            @offset = index2
            address2 = _read_string
            if address2.nil?
              @offset = index2
              address2 = _read_number
              if address2.nil?
                @offset = index2
                address2 = _read_boolean
                if address2.nil?
                  @offset = index2
                  address2 = _read_null
                  if address2.nil?
                    @offset = index2
                  end
                end
              end
            end
          end
        end
        unless address2.nil?
          elements0 << address2
          address3 = nil
          address3 = _read___
          unless address3.nil?
            elements0 << address3
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
        address0 = SyntaxNode9.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = nil
      end
      @cache[:value][index0] = [address0, @offset]
      return address0
    end

    def _read_string
      address0, index0 = nil, @offset
      cached = @cache[:string][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "\""
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "'\"'"
        end
      end
      unless address1.nil?
        elements0 << address1
        address2 = nil
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == nil
          index3 = @offset
          index4, elements2 = @offset, []
          address4 = nil
          chunk1 = nil
          if @input.size > @offset
            chunk1 = @input[@offset...@offset + 1]
          end
          if chunk1 == "\\"
            address4 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address4 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"\\\\\""
            end
          end
          unless address4.nil?
            elements2 << address4
            address5 = nil
            chunk2 = nil
            if @input.size > @offset
              chunk2 = @input[@offset...@offset + 1]
            end
            if chunk2.nil?
              address5 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "<any char>"
              end
            else
              address5 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            end
            unless address5.nil?
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
            address3 = nil
          end
          if address3.nil?
            @offset = index3
            chunk3 = nil
            if @input.size > @offset
              chunk3 = @input[@offset...@offset + 1]
            end
            if chunk3 =~ /\A[^"]/
              address3 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address3 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "[^\"]"
              end
            end
            if address3.nil?
              @offset = index3
            end
          end
          unless address3.nil?
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = SyntaxNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = nil
        end
        unless address2.nil?
          elements0 << address2
          address6 = nil
          chunk4 = nil
          if @input.size > @offset
            chunk4 = @input[@offset...@offset + 1]
          end
          if chunk4 == "\""
            address6 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address6 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "'\"'"
            end
          end
          unless address6.nil?
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
        address0 = nil
      end
      @cache[:string][index0] = [address0, @offset]
      return address0
    end

    def _read_number
      address0, index0 = nil, @offset
      cached = @cache[:number][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = nil
      index2 = @offset
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...@offset + 1]
      end
      if chunk0 == "-"
        address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"-\""
        end
      end
      if address1.nil?
        address1 = SyntaxNode.new(@input[index2...index2], index2, [])
        @offset = index2
      end
      unless address1.nil?
        elements0 << address1
        address2 = nil
        index3 = @offset
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...@offset + 1]
        end
        if chunk1 == "0"
          address2 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"0\""
          end
        end
        if address2.nil?
          @offset = index3
          index4, elements1 = @offset, []
          address3 = nil
          chunk2 = nil
          if @input.size > @offset
            chunk2 = @input[@offset...@offset + 1]
          end
          if chunk2 =~ /\A[1-9]/
            address3 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "[1-9]"
            end
          end
          unless address3.nil?
            elements1 << address3
            address4 = nil
            remaining0, index5, elements2, address5 = 0, @offset, [], true
            until address5 == nil
              chunk3 = nil
              if @input.size > @offset
                chunk3 = @input[@offset...@offset + 1]
              end
              if chunk3 =~ /\A[0-9]/
                address5 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address5 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "[0-9]"
                end
              end
              unless address5.nil?
                elements2 << address5
                remaining0 -= 1
              end
            end
            if remaining0 <= 0
              address4 = SyntaxNode.new(@input[index5...@offset], index5, elements2)
              @offset = @offset
            else
              address4 = nil
            end
            unless address4.nil?
              elements1 << address4
            else
              elements1 = nil
              @offset = index4
            end
          else
            elements1 = nil
            @offset = index4
          end
          if elements1
            address2 = SyntaxNode.new(@input[index4...@offset], index4, elements1)
            @offset = @offset
          else
            address2 = nil
          end
          if address2.nil?
            @offset = index3
          end
        end
        unless address2.nil?
          elements0 << address2
          address6 = nil
          index6 = @offset
          index7, elements3 = @offset, []
          address7 = nil
          chunk4 = nil
          if @input.size > @offset
            chunk4 = @input[@offset...@offset + 1]
          end
          if chunk4 == "."
            address7 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address7 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\".\""
            end
          end
          unless address7.nil?
            elements3 << address7
            address8 = nil
            remaining1, index8, elements4, address9 = 1, @offset, [], true
            until address9 == nil
              chunk5 = nil
              if @input.size > @offset
                chunk5 = @input[@offset...@offset + 1]
              end
              if chunk5 =~ /\A[0-9]/
                address9 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address9 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "[0-9]"
                end
              end
              unless address9.nil?
                elements4 << address9
                remaining1 -= 1
              end
            end
            if remaining1 <= 0
              address8 = SyntaxNode.new(@input[index8...@offset], index8, elements4)
              @offset = @offset
            else
              address8 = nil
            end
            unless address8.nil?
              elements3 << address8
            else
              elements3 = nil
              @offset = index7
            end
          else
            elements3 = nil
            @offset = index7
          end
          if elements3
            address6 = SyntaxNode.new(@input[index7...@offset], index7, elements3)
            @offset = @offset
          else
            address6 = nil
          end
          if address6.nil?
            address6 = SyntaxNode.new(@input[index6...index6], index6, [])
            @offset = index6
          end
          unless address6.nil?
            elements0 << address6
            address10 = nil
            index9 = @offset
            index10, elements5 = @offset, []
            address11 = nil
            index11 = @offset
            chunk6 = nil
            if @input.size > @offset
              chunk6 = @input[@offset...@offset + 1]
            end
            if chunk6 == "e"
              address11 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address11 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"e\""
              end
            end
            if address11.nil?
              @offset = index11
              chunk7 = nil
              if @input.size > @offset
                chunk7 = @input[@offset...@offset + 1]
              end
              if chunk7 == "E"
                address11 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address11 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "\"E\""
                end
              end
              if address11.nil?
                @offset = index11
              end
            end
            unless address11.nil?
              elements5 << address11
              address12 = nil
              index12 = @offset
              chunk8 = nil
              if @input.size > @offset
                chunk8 = @input[@offset...@offset + 1]
              end
              if chunk8 == "+"
                address12 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address12 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "\"+\""
                end
              end
              if address12.nil?
                @offset = index12
                chunk9 = nil
                if @input.size > @offset
                  chunk9 = @input[@offset...@offset + 1]
                end
                if chunk9 == "-"
                  address12 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
                  @offset = @offset + 1
                else
                  address12 = nil
                  if @offset > @failure
                    @failure = @offset
                    @expected = []
                  end
                  if @offset == @failure
                    @expected << "\"-\""
                  end
                end
                if address12.nil?
                  @offset = index12
                  chunk10 = nil
                  if @input.size > @offset
                    chunk10 = @input[@offset...@offset + 0]
                  end
                  if chunk10 == ""
                    address12 = SyntaxNode.new(@input[@offset...@offset + 0], @offset, [])
                    @offset = @offset + 0
                  else
                    address12 = nil
                    if @offset > @failure
                      @failure = @offset
                      @expected = []
                    end
                    if @offset == @failure
                      @expected << "\"\""
                    end
                  end
                  if address12.nil?
                    @offset = index12
                  end
                end
              end
              unless address12.nil?
                elements5 << address12
                address13 = nil
                remaining2, index13, elements6, address14 = 1, @offset, [], true
                until address14 == nil
                  chunk11 = nil
                  if @input.size > @offset
                    chunk11 = @input[@offset...@offset + 1]
                  end
                  if chunk11 =~ /\A[0-9]/
                    address14 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
                    @offset = @offset + 1
                  else
                    address14 = nil
                    if @offset > @failure
                      @failure = @offset
                      @expected = []
                    end
                    if @offset == @failure
                      @expected << "[0-9]"
                    end
                  end
                  unless address14.nil?
                    elements6 << address14
                    remaining2 -= 1
                  end
                end
                if remaining2 <= 0
                  address13 = SyntaxNode.new(@input[index13...@offset], index13, elements6)
                  @offset = @offset
                else
                  address13 = nil
                end
                unless address13.nil?
                  elements5 << address13
                else
                  elements5 = nil
                  @offset = index10
                end
              else
                elements5 = nil
                @offset = index10
              end
            else
              elements5 = nil
              @offset = index10
            end
            if elements5
              address10 = SyntaxNode.new(@input[index10...@offset], index10, elements5)
              @offset = @offset
            else
              address10 = nil
            end
            if address10.nil?
              address10 = SyntaxNode.new(@input[index9...index9], index9, [])
              @offset = index9
            end
            unless address10.nil?
              elements0 << address10
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
      else
        elements0 = nil
        @offset = index1
      end
      if elements0
        address0 = SyntaxNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = nil
      end
      @cache[:number][index0] = [address0, @offset]
      return address0
    end

    def _read_boolean
      address0, index0 = nil, @offset
      cached = @cache[:boolean][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...@offset + 4]
      end
      if chunk0 == "true"
        address0 = SyntaxNode.new(@input[@offset...@offset + 4], @offset, [])
        @offset = @offset + 4
      else
        address0 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"true\""
        end
      end
      if address0.nil?
        @offset = index1
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...@offset + 5]
        end
        if chunk1 == "false"
          address0 = SyntaxNode.new(@input[@offset...@offset + 5], @offset, [])
          @offset = @offset + 5
        else
          address0 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"false\""
          end
        end
        if address0.nil?
          @offset = index1
        end
      end
      @cache[:boolean][index0] = [address0, @offset]
      return address0
    end

    def _read_null
      address0, index0 = nil, @offset
      cached = @cache[:null][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...@offset + 4]
      end
      if chunk0 == "null"
        address0 = SyntaxNode.new(@input[@offset...@offset + 4], @offset, [])
        @offset = @offset + 4
      else
        address0 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"null\""
        end
      end
      @cache[:null][index0] = [address0, @offset]
      return address0
    end

    def _read___
      address0, index0 = nil, @offset
      cached = @cache[:__][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      remaining0, index1, elements0, address1 = 0, @offset, [], true
      until address1 == nil
        chunk0 = nil
        if @input.size > @offset
          chunk0 = @input[@offset...@offset + 1]
        end
        if chunk0 =~ /\A[\s]/
          address1 = SyntaxNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address1 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "[\\s]"
          end
        end
        unless address1.nil?
          elements0 << address1
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        address0 = SyntaxNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = nil
      end
      @cache[:__][index0] = [address0, @offset]
      return address0
    end
  end

  class Parser
    include Grammar

    def initialize(input, actions, types)
      @input = input
      @actions = actions
      @types = types
      @offset = 0
      @cache = Hash.new { |h,k| h[k] = {} }
      @failure = 0
      @expected = []
    end

    def parse
      tree = _read_document
      if !tree.nil? and @offset == @input.size
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
