# This file was generated from examples/canopy/json.peg
# See https://canopy.jcoglan.com/ for documentation

module CanopyJson
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
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[2]
    end
  end

  class TreeNode2 < TreeNode
    attr_reader :pair

    def initialize(text, offset, elements)
      super
      @pair = elements[1]
    end
  end

  class TreeNode3 < TreeNode
    attr_reader :pair

    def initialize(text, offset, elements)
      super
      @pair = elements[1]
    end
  end

  class TreeNode4 < TreeNode
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[1]
    end
  end

  class TreeNode5 < TreeNode
    attr_reader :__, :string, :value

    def initialize(text, offset, elements)
      super
      @__ = elements[2]
      @string = elements[1]
      @value = elements[4]
    end
  end

  class TreeNode6 < TreeNode
    attr_reader :value

    def initialize(text, offset, elements)
      super
      @value = elements[1]
    end
  end

  class TreeNode7 < TreeNode
    attr_reader :value

    def initialize(text, offset, elements)
      super
      @value = elements[1]
    end
  end

  class TreeNode8 < TreeNode
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[1]
    end
  end

  class TreeNode9 < TreeNode
    attr_reader :__

    def initialize(text, offset, elements)
      super
      @__ = elements[2]
    end
  end

  FAILURE = Object.new

  module Grammar
    def _read_document
      address0, index0 = FAILURE, @offset
      cached = @cache[:document][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read___
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2 = @offset
        address2 = _read_object
        if address2 == FAILURE
          @offset = index2
          address2 = _read_array
          if address2 == FAILURE
            @offset = index2
          end
        end
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          address3 = _read___
          unless address3 == FAILURE
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode1.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:document][index0] = [address0, @offset]
      return address0
    end

    def _read_object
      address0, index0 = FAILURE, @offset
      cached = @cache[:object][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      index2, elements0 = @offset, []
      address1 = FAILURE
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "{"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyJson::object", "\"{\""]
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_pair
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          index3, elements1, address4 = @offset, [], nil
          loop do
            index4, elements2 = @offset, []
            address5 = FAILURE
            chunk1, max1 = nil, @offset + 1
            if max1 <= @input_size
              chunk1 = @input[@offset...max1]
            end
            if chunk1 == ","
              address5 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address5 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::object", "\",\""]
              end
            end
            unless address5 == FAILURE
              elements2 << address5
              address6 = FAILURE
              address6 = _read_pair
              unless address6 == FAILURE
                elements2 << address6
              else
                elements2 = nil
                @offset = index4
              end
            else
              elements2 = nil
              @offset = index4
            end
            if elements2.nil?
              address4 = FAILURE
            else
              address4 = TreeNode3.new(@input[index4...@offset], index4, elements2)
              @offset = @offset
            end
            unless address4 == FAILURE
              elements1 << address4
            else
              break
            end
          end
          if elements1.size >= 0
            address3 = TreeNode.new(@input[index3...@offset], index3, elements1)
            @offset = @offset
          else
            address3 = FAILURE
          end
          unless address3 == FAILURE
            elements0 << address3
            address7 = FAILURE
            chunk2, max2 = nil, @offset + 1
            if max2 <= @input_size
              chunk2 = @input[@offset...max2]
            end
            if chunk2 == "}"
              address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address7 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::object", "\"}\""]
              end
            end
            unless address7 == FAILURE
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode2.new(@input[index2...@offset], index2, elements0)
        @offset = @offset
      end
      if address0 == FAILURE
        @offset = index1
        index5, elements3 = @offset, []
        address8 = FAILURE
        chunk3, max3 = nil, @offset + 1
        if max3 <= @input_size
          chunk3 = @input[@offset...max3]
        end
        if chunk3 == "{"
          address8 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address8 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyJson::object", "\"{\""]
          end
        end
        unless address8 == FAILURE
          elements3 << address8
          address9 = FAILURE
          address9 = _read___
          unless address9 == FAILURE
            elements3 << address9
            address10 = FAILURE
            chunk4, max4 = nil, @offset + 1
            if max4 <= @input_size
              chunk4 = @input[@offset...max4]
            end
            if chunk4 == "}"
              address10 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address10 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::object", "\"}\""]
              end
            end
            unless address10 == FAILURE
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
        if elements3.nil?
          address0 = FAILURE
        else
          address0 = TreeNode4.new(@input[index5...@offset], index5, elements3)
          @offset = @offset
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:object][index0] = [address0, @offset]
      return address0
    end

    def _read_pair
      address0, index0 = FAILURE, @offset
      cached = @cache[:pair][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read___
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_string
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          address3 = _read___
          unless address3 == FAILURE
            elements0 << address3
            address4 = FAILURE
            chunk0, max0 = nil, @offset + 1
            if max0 <= @input_size
              chunk0 = @input[@offset...max0]
            end
            if chunk0 == ":"
              address4 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address4 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::pair", "\":\""]
              end
            end
            unless address4 == FAILURE
              elements0 << address4
              address5 = FAILURE
              address5 = _read_value
              unless address5 == FAILURE
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode5.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:pair][index0] = [address0, @offset]
      return address0
    end

    def _read_array
      address0, index0 = FAILURE, @offset
      cached = @cache[:array][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      index2, elements0 = @offset, []
      address1 = FAILURE
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "["
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyJson::array", "\"[\""]
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_value
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          index3, elements1, address4 = @offset, [], nil
          loop do
            index4, elements2 = @offset, []
            address5 = FAILURE
            chunk1, max1 = nil, @offset + 1
            if max1 <= @input_size
              chunk1 = @input[@offset...max1]
            end
            if chunk1 == ","
              address5 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address5 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::array", "\",\""]
              end
            end
            unless address5 == FAILURE
              elements2 << address5
              address6 = FAILURE
              address6 = _read_value
              unless address6 == FAILURE
                elements2 << address6
              else
                elements2 = nil
                @offset = index4
              end
            else
              elements2 = nil
              @offset = index4
            end
            if elements2.nil?
              address4 = FAILURE
            else
              address4 = TreeNode7.new(@input[index4...@offset], index4, elements2)
              @offset = @offset
            end
            unless address4 == FAILURE
              elements1 << address4
            else
              break
            end
          end
          if elements1.size >= 0
            address3 = TreeNode.new(@input[index3...@offset], index3, elements1)
            @offset = @offset
          else
            address3 = FAILURE
          end
          unless address3 == FAILURE
            elements0 << address3
            address7 = FAILURE
            chunk2, max2 = nil, @offset + 1
            if max2 <= @input_size
              chunk2 = @input[@offset...max2]
            end
            if chunk2 == "]"
              address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address7 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::array", "\"]\""]
              end
            end
            unless address7 == FAILURE
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode6.new(@input[index2...@offset], index2, elements0)
        @offset = @offset
      end
      if address0 == FAILURE
        @offset = index1
        index5, elements3 = @offset, []
        address8 = FAILURE
        chunk3, max3 = nil, @offset + 1
        if max3 <= @input_size
          chunk3 = @input[@offset...max3]
        end
        if chunk3 == "["
          address8 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address8 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyJson::array", "\"[\""]
          end
        end
        unless address8 == FAILURE
          elements3 << address8
          address9 = FAILURE
          address9 = _read___
          unless address9 == FAILURE
            elements3 << address9
            address10 = FAILURE
            chunk4, max4 = nil, @offset + 1
            if max4 <= @input_size
              chunk4 = @input[@offset...max4]
            end
            if chunk4 == "]"
              address10 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address10 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::array", "\"]\""]
              end
            end
            unless address10 == FAILURE
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
        if elements3.nil?
          address0 = FAILURE
        else
          address0 = TreeNode8.new(@input[index5...@offset], index5, elements3)
          @offset = @offset
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:array][index0] = [address0, @offset]
      return address0
    end

    def _read_value
      address0, index0 = FAILURE, @offset
      cached = @cache[:value][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read___
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2 = @offset
        address2 = _read_object
        if address2 == FAILURE
          @offset = index2
          address2 = _read_array
          if address2 == FAILURE
            @offset = index2
            address2 = _read_string
            if address2 == FAILURE
              @offset = index2
              address2 = _read_number
              if address2 == FAILURE
                @offset = index2
                address2 = _read_boolean_
                if address2 == FAILURE
                  @offset = index2
                  address2 = _read_null_
                  if address2 == FAILURE
                    @offset = index2
                  end
                end
              end
            end
          end
        end
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          address3 = _read___
          unless address3 == FAILURE
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode9.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:value][index0] = [address0, @offset]
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
          @expected << ["CanopyJson::string", "'\"'"]
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
              @expected << ["CanopyJson::string", "\"\\\\\""]
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
                @expected << ["CanopyJson::string", "<any char>"]
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
                @expected << ["CanopyJson::string", "[^\"]"]
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
              @expected << ["CanopyJson::string", "'\"'"]
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

    def _read_number
      address0, index0 = FAILURE, @offset
      cached = @cache[:number][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      index2 = @offset
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "-"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyJson::number", "\"-\""]
        end
      end
      if address1 == FAILURE
        address1 = TreeNode.new(@input[index2...index2], index2, [])
        @offset = index2
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index3 = @offset
        chunk1, max1 = nil, @offset + 1
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == "0"
          address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyJson::number", "\"0\""]
          end
        end
        if address2 == FAILURE
          @offset = index3
          index4, elements1 = @offset, []
          address3 = FAILURE
          chunk2, max2 = nil, @offset + 1
          if max2 <= @input_size
            chunk2 = @input[@offset...max2]
          end
          if chunk2 =~ /\A[1-9]/
            address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyJson::number", "[1-9]"]
            end
          end
          unless address3 == FAILURE
            elements1 << address3
            address4 = FAILURE
            index5, elements2, address5 = @offset, [], nil
            loop do
              chunk3, max3 = nil, @offset + 1
              if max3 <= @input_size
                chunk3 = @input[@offset...max3]
              end
              if chunk3 =~ /\A[0-9]/
                address5 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address5 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << ["CanopyJson::number", "[0-9]"]
                end
              end
              unless address5 == FAILURE
                elements2 << address5
              else
                break
              end
            end
            if elements2.size >= 0
              address4 = TreeNode.new(@input[index5...@offset], index5, elements2)
              @offset = @offset
            else
              address4 = FAILURE
            end
            unless address4 == FAILURE
              elements1 << address4
            else
              elements1 = nil
              @offset = index4
            end
          else
            elements1 = nil
            @offset = index4
          end
          if elements1.nil?
            address2 = FAILURE
          else
            address2 = TreeNode.new(@input[index4...@offset], index4, elements1)
            @offset = @offset
          end
          if address2 == FAILURE
            @offset = index3
          end
        end
        unless address2 == FAILURE
          elements0 << address2
          address6 = FAILURE
          index6 = @offset
          index7, elements3 = @offset, []
          address7 = FAILURE
          chunk4, max4 = nil, @offset + 1
          if max4 <= @input_size
            chunk4 = @input[@offset...max4]
          end
          if chunk4 == "."
            address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address7 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << ["CanopyJson::number", "\".\""]
            end
          end
          unless address7 == FAILURE
            elements3 << address7
            address8 = FAILURE
            index8, elements4, address9 = @offset, [], nil
            loop do
              chunk5, max5 = nil, @offset + 1
              if max5 <= @input_size
                chunk5 = @input[@offset...max5]
              end
              if chunk5 =~ /\A[0-9]/
                address9 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address9 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << ["CanopyJson::number", "[0-9]"]
                end
              end
              unless address9 == FAILURE
                elements4 << address9
              else
                break
              end
            end
            if elements4.size >= 1
              address8 = TreeNode.new(@input[index8...@offset], index8, elements4)
              @offset = @offset
            else
              address8 = FAILURE
            end
            unless address8 == FAILURE
              elements3 << address8
            else
              elements3 = nil
              @offset = index7
            end
          else
            elements3 = nil
            @offset = index7
          end
          if elements3.nil?
            address6 = FAILURE
          else
            address6 = TreeNode.new(@input[index7...@offset], index7, elements3)
            @offset = @offset
          end
          if address6 == FAILURE
            address6 = TreeNode.new(@input[index6...index6], index6, [])
            @offset = index6
          end
          unless address6 == FAILURE
            elements0 << address6
            address10 = FAILURE
            index9 = @offset
            index10, elements5 = @offset, []
            address11 = FAILURE
            index11 = @offset
            chunk6, max6 = nil, @offset + 1
            if max6 <= @input_size
              chunk6 = @input[@offset...max6]
            end
            if chunk6 == "e"
              address11 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address11 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << ["CanopyJson::number", "\"e\""]
              end
            end
            if address11 == FAILURE
              @offset = index11
              chunk7, max7 = nil, @offset + 1
              if max7 <= @input_size
                chunk7 = @input[@offset...max7]
              end
              if chunk7 == "E"
                address11 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address11 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << ["CanopyJson::number", "\"E\""]
                end
              end
              if address11 == FAILURE
                @offset = index11
              end
            end
            unless address11 == FAILURE
              elements5 << address11
              address12 = FAILURE
              index12 = @offset
              chunk8, max8 = nil, @offset + 1
              if max8 <= @input_size
                chunk8 = @input[@offset...max8]
              end
              if chunk8 == "+"
                address12 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address12 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << ["CanopyJson::number", "\"+\""]
                end
              end
              if address12 == FAILURE
                @offset = index12
                chunk9, max9 = nil, @offset + 1
                if max9 <= @input_size
                  chunk9 = @input[@offset...max9]
                end
                if chunk9 == "-"
                  address12 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                  @offset = @offset + 1
                else
                  address12 = FAILURE
                  if @offset > @failure
                    @failure = @offset
                    @expected = []
                  end
                  if @offset == @failure
                    @expected << ["CanopyJson::number", "\"-\""]
                  end
                end
                if address12 == FAILURE
                  @offset = index12
                  chunk10, max10 = nil, @offset + 0
                  if max10 <= @input_size
                    chunk10 = @input[@offset...max10]
                  end
                  if chunk10 == ""
                    address12 = TreeNode.new(@input[@offset...@offset + 0], @offset, [])
                    @offset = @offset + 0
                  else
                    address12 = FAILURE
                    if @offset > @failure
                      @failure = @offset
                      @expected = []
                    end
                    if @offset == @failure
                      @expected << ["CanopyJson::number", "\"\""]
                    end
                  end
                  if address12 == FAILURE
                    @offset = index12
                  end
                end
              end
              unless address12 == FAILURE
                elements5 << address12
                address13 = FAILURE
                index13, elements6, address14 = @offset, [], nil
                loop do
                  chunk11, max11 = nil, @offset + 1
                  if max11 <= @input_size
                    chunk11 = @input[@offset...max11]
                  end
                  if chunk11 =~ /\A[0-9]/
                    address14 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                    @offset = @offset + 1
                  else
                    address14 = FAILURE
                    if @offset > @failure
                      @failure = @offset
                      @expected = []
                    end
                    if @offset == @failure
                      @expected << ["CanopyJson::number", "[0-9]"]
                    end
                  end
                  unless address14 == FAILURE
                    elements6 << address14
                  else
                    break
                  end
                end
                if elements6.size >= 1
                  address13 = TreeNode.new(@input[index13...@offset], index13, elements6)
                  @offset = @offset
                else
                  address13 = FAILURE
                end
                unless address13 == FAILURE
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
            if elements5.nil?
              address10 = FAILURE
            else
              address10 = TreeNode.new(@input[index10...@offset], index10, elements5)
              @offset = @offset
            end
            if address10 == FAILURE
              address10 = TreeNode.new(@input[index9...index9], index9, [])
              @offset = index9
            end
            unless address10 == FAILURE
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:number][index0] = [address0, @offset]
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
      chunk0, max0 = nil, @offset + 4
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "true"
        address0 = TreeNode.new(@input[@offset...@offset + 4], @offset, [])
        @offset = @offset + 4
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyJson::boolean_", "\"true\""]
        end
      end
      if address0 == FAILURE
        @offset = index1
        chunk1, max1 = nil, @offset + 5
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == "false"
          address0 = TreeNode.new(@input[@offset...@offset + 5], @offset, [])
          @offset = @offset + 5
        else
          address0 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyJson::boolean_", "\"false\""]
          end
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:boolean_][index0] = [address0, @offset]
      return address0
    end

    def _read_null_
      address0, index0 = FAILURE, @offset
      cached = @cache[:null_][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      chunk0, max0 = nil, @offset + 4
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "null"
        address0 = TreeNode.new(@input[@offset...@offset + 4], @offset, [])
        @offset = @offset + 4
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << ["CanopyJson::null_", "\"null\""]
        end
      end
      @cache[:null_][index0] = [address0, @offset]
      return address0
    end

    def _read___
      address0, index0 = FAILURE, @offset
      cached = @cache[:__][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0, address1 = @offset, [], nil
      loop do
        chunk0, max0 = nil, @offset + 1
        if max0 <= @input_size
          chunk0 = @input[@offset...max0]
        end
        if chunk0 =~ /\A[\s]/
          address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address1 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << ["CanopyJson::__", "[\\s]"]
          end
        end
        unless address1 == FAILURE
          elements0 << address1
        else
          break
        end
      end
      if elements0.size >= 0
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      else
        address0 = FAILURE
      end
      @cache[:__][index0] = [address0, @offset]
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
      tree = _read_document
      if tree != FAILURE and @offset == @input_size
        return tree
      end
      if @expected.empty?
        @failure = @offset
        @expected << ["CanopyJson", "<EOF>"]
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
