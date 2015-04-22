module Canopy::PEG
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
    attr_reader :grammar_name, :rules

    def initialize(text, offset, elements)
      super
      @grammar_name = elements[1]
      @rules = elements[2]
    end
  end

  class SyntaxNode2 < SyntaxNode
    attr_reader :grammar_rule

    def initialize(text, offset, elements)
      super
      @grammar_rule = elements[1]
    end
  end

  class SyntaxNode3 < SyntaxNode
    attr_reader :object_identifier

    def initialize(text, offset, elements)
      super
      @object_identifier = elements[1]
    end
  end

  class SyntaxNode4 < SyntaxNode
    attr_reader :identifier, :assignment, :parsing_expression

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
      @assignment = elements[1]
      @parsing_expression = elements[2]
    end
  end

  class SyntaxNode5 < SyntaxNode
    attr_reader :parsing_expression

    def initialize(text, offset, elements)
      super
      @parsing_expression = elements[2]
    end
  end

  class SyntaxNode6 < SyntaxNode
    attr_reader :first_part, :choice_part, :rest

    def initialize(text, offset, elements)
      super
      @first_part = elements[0]
      @choice_part = elements[0]
      @rest = elements[1]
    end
  end

  class SyntaxNode7 < SyntaxNode
    attr_reader :expression, :choice_part

    def initialize(text, offset, elements)
      super
      @expression = elements[3]
      @choice_part = elements[3]
    end
  end

  class SyntaxNode8 < SyntaxNode
    attr_reader :type_expression

    def initialize(text, offset, elements)
      super
      @type_expression = elements[1]
    end
  end

  class SyntaxNode9 < SyntaxNode
    attr_reader :object_identifier

    def initialize(text, offset, elements)
      super
      @object_identifier = elements[1]
    end
  end

  class SyntaxNode10 < SyntaxNode
    attr_reader :first_part, :sequence_part, :rest

    def initialize(text, offset, elements)
      super
      @first_part = elements[0]
      @sequence_part = elements[0]
      @rest = elements[1]
    end
  end

  class SyntaxNode11 < SyntaxNode
    attr_reader :expression, :sequence_part

    def initialize(text, offset, elements)
      super
      @expression = elements[1]
      @sequence_part = elements[1]
    end
  end

  class SyntaxNode12 < SyntaxNode
    attr_reader :expression

    def initialize(text, offset, elements)
      super
      @expression = elements[1]
    end
  end

  class SyntaxNode13 < SyntaxNode
    attr_reader :atom, :quantifier

    def initialize(text, offset, elements)
      super
      @atom = elements[0]
      @quantifier = elements[1]
    end
  end

  class SyntaxNode14 < SyntaxNode
    attr_reader :predicate, :atom

    def initialize(text, offset, elements)
      super
      @predicate = elements[0]
      @atom = elements[1]
    end
  end

  class SyntaxNode15 < SyntaxNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
    end
  end

  class SyntaxNode16 < SyntaxNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
    end
  end

  class SyntaxNode17 < SyntaxNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
    end
  end

  class SyntaxNode18 < SyntaxNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[1]
    end
  end

  ParseError = Struct.new(:input, :offset, :expected)

  module Grammar
    def _read_grammar
      address0, index0 = nil, @offset
      if @cache[:grammar].has_key?(index0)
        cached = @cache[:grammar][index0]
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
        address3 = _read_grammar_name
        if address3
          elements0 << address3
          text0 << address3.text
          address4 = nil
          remaining1, index3, elements2, text2, address5 = 1, @offset, [], "", true
          until address5 == nil
            index4, elements3, text3 = @offset, [], ""
            address6 = nil
            remaining2, index5, elements4, text4, address7 = 0, @offset, [], "", true
            until address7 == nil
              address7 = _read_space
              if address7
                elements4 << address7
                text4 << address7.text
                remaining2 -= 1
              end
            end
            if remaining2 <= 0
              @offset = index5
              address6 = SyntaxNode.new(text4, @offset, elements4)
              @offset += text4.size
            else
              address6 = nil
            end
            if address6
              elements3 << address6
              text3 << address6.text
              address8 = nil
              address8 = _read_grammar_rule
              if address8
                elements3 << address8
                text3 << address8.text
              else
                elements3 = nil
                @offset = index4
              end
            else
              elements3 = nil
              @offset = index4
            end
            if elements3
              @offset = index4
              address5 = SyntaxNode2.new(text3, @offset, elements3)
              @offset += text3.size
            else
              address5 = nil
            end
            if address5
              elements2 << address5
              text2 << address5.text
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            @offset = index3
            address4 = SyntaxNode.new(text2, @offset, elements2)
            @offset += text2.size
          else
            address4 = nil
          end
          if address4
            elements0 << address4
            text0 << address4.text
            address9 = nil
            remaining3, index6, elements5, text5, address10 = 0, @offset, [], "", true
            until address10 == nil
              address10 = _read_space
              if address10
                elements5 << address10
                text5 << address10.text
                remaining3 -= 1
              end
            end
            if remaining3 <= 0
              @offset = index6
              address9 = SyntaxNode.new(text5, @offset, elements5)
              @offset += text5.size
            else
              address9 = nil
            end
            if address9
              elements0 << address9
              text0 << address9.text
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
        @offset = index1
        address0 = SyntaxNode1.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:grammar][index0] = address0
    end

    def _read_grammar_name
      address0, index0 = nil, @offset
      if @cache[:grammar_name].has_key?(index0)
        cached = @cache[:grammar_name][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 8)]
      end
      if chunk0.downcase == "grammar ".downcase
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 8
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "`grammar `"
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        address2 = _read_object_identifier
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
        address0 = SyntaxNode3.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:grammar_name][index0] = address0
    end

    def _read_grammar_rule
      address0, index0 = nil, @offset
      if @cache[:grammar_rule].has_key?(index0)
        cached = @cache[:grammar_rule][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_identifier
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        address2 = _read_assignment
        if address2
          elements0 << address2
          text0 << address2.text
          address3 = nil
          address3 = _read_parsing_expression
          if address3
            elements0 << address3
            text0 << address3.text
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
        address0 = SyntaxNode4.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:grammar_rule][index0] = address0
    end

    def _read_assignment
      address0, index0 = nil, @offset
      if @cache[:assignment].has_key?(index0)
        cached = @cache[:assignment][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      remaining0, index2, elements1, text1, address2 = 1, @offset, [], "", true
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
        chunk0 = nil
        if @input.size > @offset
          chunk0 = @input[@offset...(@offset + 2)]
        end
        if chunk0 == "<-"
          address3 = SyntaxNode.new(chunk0, @offset, [])
          @offset += 2
        else
          address3 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"<-\""
          end
        end
        if address3
          elements0 << address3
          text0 << address3.text
          address4 = nil
          remaining1, index3, elements2, text2, address5 = 1, @offset, [], "", true
          until address5 == nil
            address5 = _read_space
            if address5
              elements2 << address5
              text2 << address5.text
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            @offset = index3
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
        address0 = SyntaxNode.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:assignment][index0] = address0
    end

    def _read_parsing_expression
      address0, index0 = nil, @offset
      if @cache[:parsing_expression].has_key?(index0)
        cached = @cache[:parsing_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      address0 = _read_choice_expression
      unless address0
        @offset = index1
        address0 = _read_choice_part
        unless address0
          @offset = index1
        end
      end
      return @cache[:parsing_expression][index0] = address0
    end

    def _read_parenthesised_expression
      address0, index0 = nil, @offset
      if @cache[:parenthesised_expression].has_key?(index0)
        cached = @cache[:parenthesised_expression][index0]
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
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"(\""
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 0, @offset, [], "", true
        until address3 == nil
          address3 = _read_space
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
          address4 = _read_parsing_expression
          if address4
            elements0 << address4
            text0 << address4.text
            address5 = nil
            remaining1, index3, elements2, text2, address6 = 0, @offset, [], "", true
            until address6 == nil
              address6 = _read_space
              if address6
                elements2 << address6
                text2 << address6.text
                remaining1 -= 1
              end
            end
            if remaining1 <= 0
              @offset = index3
              address5 = SyntaxNode.new(text2, @offset, elements2)
              @offset += text2.size
            else
              address5 = nil
            end
            if address5
              elements0 << address5
              text0 << address5.text
              address7 = nil
              chunk1 = nil
              if @input.size > @offset
                chunk1 = @input[@offset...(@offset + 1)]
              end
              if chunk1 == ")"
                address7 = SyntaxNode.new(chunk1, @offset, [])
                @offset += 1
              else
                address7 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "\")\""
                end
              end
              if address7
                elements0 << address7
                text0 << address7.text
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
        @offset = index1
        address0 = SyntaxNode5.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:parenthesised_expression][index0] = address0
    end

    def _read_choice_expression
      address0, index0 = nil, @offset
      if @cache[:choice_expression].has_key?(index0)
        cached = @cache[:choice_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_choice_part
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 1, @offset, [], "", true
        until address3 == nil
          index3, elements2, text2 = @offset, [], ""
          address4 = nil
          remaining1, index4, elements3, text3, address5 = 1, @offset, [], "", true
          until address5 == nil
            address5 = _read_space
            if address5
              elements3 << address5
              text3 << address5.text
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            @offset = index4
            address4 = SyntaxNode.new(text3, @offset, elements3)
            @offset += text3.size
          else
            address4 = nil
          end
          if address4
            elements2 << address4
            text2 << address4.text
            address6 = nil
            chunk0 = nil
            if @input.size > @offset
              chunk0 = @input[@offset...(@offset + 1)]
            end
            if chunk0 == "/"
              address6 = SyntaxNode.new(chunk0, @offset, [])
              @offset += 1
            else
              address6 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"/\""
              end
            end
            if address6
              elements2 << address6
              text2 << address6.text
              address7 = nil
              remaining2, index5, elements4, text4, address8 = 1, @offset, [], "", true
              until address8 == nil
                address8 = _read_space
                if address8
                  elements4 << address8
                  text4 << address8.text
                  remaining2 -= 1
                end
              end
              if remaining2 <= 0
                @offset = index5
                address7 = SyntaxNode.new(text4, @offset, elements4)
                @offset += text4.size
              else
                address7 = nil
              end
              if address7
                elements2 << address7
                text2 << address7.text
                address9 = nil
                address9 = _read_choice_part
                if address9
                  elements2 << address9
                  text2 << address9.text
                else
                  elements2 = nil
                  @offset = index3
                end
              else
                elements2 = nil
                @offset = index3
              end
            else
              elements2 = nil
              @offset = index3
            end
          else
            elements2 = nil
            @offset = index3
          end
          if elements2
            @offset = index3
            address3 = SyntaxNode7.new(text2, @offset, elements2)
            @offset += text2.size
          else
            address3 = nil
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
        address0 = SyntaxNode6.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:choice_expression][index0] = address0
    end

    def _read_choice_part
      address0, index0 = nil, @offset
      if @cache[:choice_part].has_key?(index0)
        cached = @cache[:choice_part][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      index2 = @offset
      address1 = _read_sequence_expression
      unless address1
        @offset = index2
        address1 = _read_sequence_part
        unless address1
          @offset = index2
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        index3 = @offset
        index4, elements1, text1 = @offset, [], ""
        address3 = nil
        remaining0, index5, elements2, text2, address4 = 1, @offset, [], "", true
        until address4 == nil
          address4 = _read_space
          if address4
            elements2 << address4
            text2 << address4.text
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          @offset = index5
          address3 = SyntaxNode.new(text2, @offset, elements2)
          @offset += text2.size
        else
          address3 = nil
        end
        if address3
          elements1 << address3
          text1 << address3.text
          address5 = nil
          address5 = _read_type_expression
          if address5
            elements1 << address5
            text1 << address5.text
          else
            elements1 = nil
            @offset = index4
          end
        else
          elements1 = nil
          @offset = index4
        end
        if elements1
          @offset = index4
          address2 = SyntaxNode8.new(text1, @offset, elements1)
          @offset += text1.size
        else
          address2 = nil
        end
        unless address2
          @offset = index3
          address2 = SyntaxNode.new("", @offset, [])
          @offset += 0
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
      return @cache[:choice_part][index0] = address0
    end

    def _read_type_expression
      address0, index0 = nil, @offset
      if @cache[:type_expression].has_key?(index0)
        cached = @cache[:type_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "<"
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"<\""
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        address2 = _read_object_identifier
        if address2
          elements0 << address2
          text0 << address2.text
          address3 = nil
          chunk1 = nil
          if @input.size > @offset
            chunk1 = @input[@offset...(@offset + 1)]
          end
          if chunk1 == ">"
            address3 = SyntaxNode.new(chunk1, @offset, [])
            @offset += 1
          else
            address3 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\">\""
            end
          end
          if address3
            elements0 << address3
            text0 << address3.text
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
        address0 = SyntaxNode9.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:type_expression][index0] = address0
    end

    def _read_sequence_expression
      address0, index0 = nil, @offset
      if @cache[:sequence_expression].has_key?(index0)
        cached = @cache[:sequence_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_sequence_part
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 1, @offset, [], "", true
        until address3 == nil
          index3, elements2, text2 = @offset, [], ""
          address4 = nil
          remaining1, index4, elements3, text3, address5 = 1, @offset, [], "", true
          until address5 == nil
            address5 = _read_space
            if address5
              elements3 << address5
              text3 << address5.text
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            @offset = index4
            address4 = SyntaxNode.new(text3, @offset, elements3)
            @offset += text3.size
          else
            address4 = nil
          end
          if address4
            elements2 << address4
            text2 << address4.text
            address6 = nil
            address6 = _read_sequence_part
            if address6
              elements2 << address6
              text2 << address6.text
            else
              elements2 = nil
              @offset = index3
            end
          else
            elements2 = nil
            @offset = index3
          end
          if elements2
            @offset = index3
            address3 = SyntaxNode11.new(text2, @offset, elements2)
            @offset += text2.size
          else
            address3 = nil
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
        address0 = SyntaxNode10.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:sequence_expression][index0] = address0
    end

    def _read_sequence_part
      address0, index0 = nil, @offset
      if @cache[:sequence_part].has_key?(index0)
        cached = @cache[:sequence_part][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      index2 = @offset
      address1 = _read_label
      unless address1
        @offset = index2
        address1 = SyntaxNode.new("", @offset, [])
        @offset += 0
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        index3 = @offset
        address2 = _read_quantified_atom
        unless address2
          @offset = index3
          address2 = _read_atom
          unless address2
            @offset = index3
          end
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
        address0 = SyntaxNode12.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:sequence_part][index0] = address0
    end

    def _read_quantified_atom
      address0, index0 = nil, @offset
      if @cache[:quantified_atom].has_key?(index0)
        cached = @cache[:quantified_atom][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_atom
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        address2 = _read_quantifier
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
        address0 = SyntaxNode13.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:quantified_atom][index0] = address0
    end

    def _read_atom
      address0, index0 = nil, @offset
      if @cache[:atom].has_key?(index0)
        cached = @cache[:atom][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      address0 = _read_parenthesised_expression
      unless address0
        @offset = index1
        address0 = _read_predicated_atom
        unless address0
          @offset = index1
          address0 = _read_reference_expression
          unless address0
            @offset = index1
            address0 = _read_string_expression
            unless address0
              @offset = index1
              address0 = _read_ci_string_expression
              unless address0
                @offset = index1
                address0 = _read_any_char_expression
                unless address0
                  @offset = index1
                  address0 = _read_char_class_expression
                  unless address0
                    @offset = index1
                  end
                end
              end
            end
          end
        end
      end
      return @cache[:atom][index0] = address0
    end

    def _read_predicated_atom
      address0, index0 = nil, @offset
      if @cache[:predicated_atom].has_key?(index0)
        cached = @cache[:predicated_atom][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      index2 = @offset
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "&"
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"&\""
        end
      end
      unless address1
        @offset = index2
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...(@offset + 1)]
        end
        if chunk1 == "!"
          address1 = SyntaxNode.new(chunk1, @offset, [])
          @offset += 1
        else
          address1 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"!\""
          end
        end
        unless address1
          @offset = index2
        end
      end
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        address2 = _read_atom
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
        address0 = SyntaxNode14.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:predicated_atom][index0] = address0
    end

    def _read_reference_expression
      address0, index0 = nil, @offset
      if @cache[:reference_expression].has_key?(index0)
        cached = @cache[:reference_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_identifier
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        index2 = @offset
        address2 = _read_assignment
        @offset = index2
        unless address2
          address2 = SyntaxNode.new("", @offset, [])
          @offset += 0
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
        address0 = SyntaxNode15.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:reference_expression][index0] = address0
    end

    def _read_string_expression
      address0, index0 = nil, @offset
      if @cache[:string_expression].has_key?(index0)
        cached = @cache[:string_expression][index0]
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
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"\\\"\""
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
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"\\\\\""
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
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "<any char>"
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
            if chunk3 and chunk3 =~ /\A[^"]/
              address3 = SyntaxNode.new(chunk3, @offset, [])
              @offset += 1
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
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"\\\"\""
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
      return @cache[:string_expression][index0] = address0
    end

    def _read_ci_string_expression
      address0, index0 = nil, @offset
      if @cache[:ci_string_expression].has_key?(index0)
        cached = @cache[:ci_string_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "`"
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"`\""
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
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"\\\\\""
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
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "<any char>"
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
            if chunk3 and chunk3 =~ /\A[^`]/
              address3 = SyntaxNode.new(chunk3, @offset, [])
              @offset += 1
            else
              address3 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "[^`]"
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
          if chunk4 == "`"
            address6 = SyntaxNode.new(chunk4, @offset, [])
            @offset += 1
          else
            address6 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"`\""
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
      return @cache[:ci_string_expression][index0] = address0
    end

    def _read_any_char_expression
      address0, index0 = nil, @offset
      if @cache[:any_char_expression].has_key?(index0)
        cached = @cache[:any_char_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "."
        address0 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address0 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\".\""
        end
      end
      return @cache[:any_char_expression][index0] = address0
    end

    def _read_char_class_expression
      address0, index0 = nil, @offset
      if @cache[:char_class_expression].has_key?(index0)
        cached = @cache[:char_class_expression][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "["
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
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
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        index2 = @offset
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...(@offset + 1)]
        end
        if chunk1 == "^"
          address2 = SyntaxNode.new(chunk1, @offset, [])
          @offset += 1
        else
          address2 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"^\""
          end
        end
        unless address2
          @offset = index2
          address2 = SyntaxNode.new("", @offset, [])
          @offset += 0
        end
        if address2
          elements0 << address2
          text0 << address2.text
          address3 = nil
          remaining0, index3, elements1, text1, address4 = 1, @offset, [], "", true
          until address4 == nil
            index4 = @offset
            index5, elements2, text2 = @offset, [], ""
            address5 = nil
            chunk2 = nil
            if @input.size > @offset
              chunk2 = @input[@offset...(@offset + 1)]
            end
            if chunk2 == "\\"
              address5 = SyntaxNode.new(chunk2, @offset, [])
              @offset += 1
            else
              address5 = nil
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"\\\\\""
              end
            end
            if address5
              elements2 << address5
              text2 << address5.text
              address6 = nil
              chunk3 = nil
              if @input.size > @offset
                chunk3 = @input[@offset...(@offset + 1)]
              end
              if chunk3.nil?
                address6 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "<any char>"
                end
              else
                address6 = SyntaxNode.new(chunk3, @offset, [])
                @offset += 1
              end
              if address6
                elements2 << address6
                text2 << address6.text
              else
                elements2 = nil
                @offset = index5
              end
            else
              elements2 = nil
              @offset = index5
            end
            if elements2
              @offset = index5
              address4 = SyntaxNode.new(text2, @offset, elements2)
              @offset += text2.size
            else
              address4 = nil
            end
            unless address4
              @offset = index4
              chunk4 = nil
              if @input.size > @offset
                chunk4 = @input[@offset...(@offset + 1)]
              end
              if chunk4 and chunk4 =~ /\A[^\]]/
                address4 = SyntaxNode.new(chunk4, @offset, [])
                @offset += 1
              else
                address4 = nil
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "[^\\]]"
                end
              end
              unless address4
                @offset = index4
              end
            end
            if address4
              elements1 << address4
              text1 << address4.text
              remaining0 -= 1
            end
          end
          if remaining0 <= 0
            @offset = index3
            address3 = SyntaxNode.new(text1, @offset, elements1)
            @offset += text1.size
          else
            address3 = nil
          end
          if address3
            elements0 << address3
            text0 << address3.text
            address7 = nil
            chunk5 = nil
            if @input.size > @offset
              chunk5 = @input[@offset...(@offset + 1)]
            end
            if chunk5 == "]"
              address7 = SyntaxNode.new(chunk5, @offset, [])
              @offset += 1
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
            if address7
              elements0 << address7
              text0 << address7.text
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
        @offset = index1
        address0 = SyntaxNode.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:char_class_expression][index0] = address0
    end

    def _read_label
      address0, index0 = nil, @offset
      if @cache[:label].has_key?(index0)
        cached = @cache[:label][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_identifier
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        chunk0 = nil
        if @input.size > @offset
          chunk0 = @input[@offset...(@offset + 1)]
        end
        if chunk0 == ":"
          address2 = SyntaxNode.new(chunk0, @offset, [])
          @offset += 1
        else
          address2 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\":\""
          end
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
        address0 = SyntaxNode16.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:label][index0] = address0
    end

    def _read_object_identifier
      address0, index0 = nil, @offset
      if @cache[:object_identifier].has_key?(index0)
        cached = @cache[:object_identifier][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      address1 = _read_identifier
      if address1
        elements0 << address1
        text0 << address1.text
        address2 = nil
        remaining0, index2, elements1, text1, address3 = 0, @offset, [], "", true
        until address3 == nil
          index3, elements2, text2 = @offset, [], ""
          address4 = nil
          chunk0 = nil
          if @input.size > @offset
            chunk0 = @input[@offset...(@offset + 1)]
          end
          if chunk0 == "."
            address4 = SyntaxNode.new(chunk0, @offset, [])
            @offset += 1
          else
            address4 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\".\""
            end
          end
          if address4
            elements2 << address4
            text2 << address4.text
            address5 = nil
            address5 = _read_identifier
            if address5
              elements2 << address5
              text2 << address5.text
            else
              elements2 = nil
              @offset = index3
            end
          else
            elements2 = nil
            @offset = index3
          end
          if elements2
            @offset = index3
            address3 = SyntaxNode18.new(text2, @offset, elements2)
            @offset += text2.size
          else
            address3 = nil
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
        address0 = SyntaxNode17.new(text0, @offset, elements0)
        @offset += text0.size
      else
        address0 = nil
      end
      return @cache[:object_identifier][index0] = address0
    end

    def _read_identifier
      address0, index0 = nil, @offset
      if @cache[:identifier].has_key?(index0)
        cached = @cache[:identifier][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1, elements0, text0 = @offset, [], ""
      address1 = nil
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 and chunk0 =~ /\A[a-zA-Z_]/
        address1 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address1 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "[a-zA-Z_]"
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
          if chunk1 and chunk1 =~ /\A[a-zA-Z0-9_]/
            address3 = SyntaxNode.new(chunk1, @offset, [])
            @offset += 1
          else
            address3 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "[a-zA-Z0-9_]"
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
      return @cache[:identifier][index0] = address0
    end

    def _read_quantifier
      address0, index0 = nil, @offset
      if @cache[:quantifier].has_key?(index0)
        cached = @cache[:quantifier][index0]
        @offset += cached.text.size if cached
        return cached
      end
      index1 = @offset
      chunk0 = nil
      if @input.size > @offset
        chunk0 = @input[@offset...(@offset + 1)]
      end
      if chunk0 == "?"
        address0 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address0 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"?\""
        end
      end
      unless address0
        @offset = index1
        chunk1 = nil
        if @input.size > @offset
          chunk1 = @input[@offset...(@offset + 1)]
        end
        if chunk1 == "*"
          address0 = SyntaxNode.new(chunk1, @offset, [])
          @offset += 1
        else
          address0 = nil
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"*\""
          end
        end
        unless address0
          @offset = index1
          chunk2 = nil
          if @input.size > @offset
            chunk2 = @input[@offset...(@offset + 1)]
          end
          if chunk2 == "+"
            address0 = SyntaxNode.new(chunk2, @offset, [])
            @offset += 1
          else
            address0 = nil
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"+\""
            end
          end
          unless address0
            @offset = index1
          end
        end
      end
      return @cache[:quantifier][index0] = address0
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
      if chunk0 and chunk0 =~ /\A[\s]/
        address0 = SyntaxNode.new(chunk0, @offset, [])
        @offset += 1
      else
        address0 = nil
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "[\\s]"
        end
      end
      return @cache[:space][index0] = address0
    end
  end

  class Parser
    include Grammar

    def initialize(input)
      @input = input
      @offset = 0
      @cache = Hash.new { |h,k| h[k] = {} }
      @failure = 0
      @expected = []
    end

    def parse
      tree = _read_grammar
      if tree and @offset == @input.size
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

  def self.parse(input)
    parser = Parser.new(input)
    parser.parse
  end
end
