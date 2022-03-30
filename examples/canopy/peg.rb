# This file was generated from examples/canopy/peg.peg
# See https://canopy.jcoglan.com/ for documentation

module Canopy::PEG
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
    attr_reader :grammar_name, :rules

    def initialize(text, offset, elements)
      super
      @grammar_name = elements[1]
      @rules = elements[2]
    end
  end

  class TreeNode2 < TreeNode
    attr_reader :grammar_rule

    def initialize(text, offset, elements)
      super
      @grammar_rule = elements[1]
    end
  end

  class TreeNode3 < TreeNode
    attr_reader :object_identifier

    def initialize(text, offset, elements)
      super
      @object_identifier = elements[3]
    end
  end

  class TreeNode4 < TreeNode
    attr_reader :identifier, :assignment, :parsing_expression

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
      @assignment = elements[1]
      @parsing_expression = elements[2]
    end
  end

  class TreeNode5 < TreeNode
    attr_reader :parsing_expression

    def initialize(text, offset, elements)
      super
      @parsing_expression = elements[2]
    end
  end

  class TreeNode6 < TreeNode
    attr_reader :first_part, :choice_part, :rest

    def initialize(text, offset, elements)
      super
      @first_part = elements[0]
      @choice_part = elements[0]
      @rest = elements[1]
    end
  end

  class TreeNode7 < TreeNode
    attr_reader :expression, :choice_part

    def initialize(text, offset, elements)
      super
      @expression = elements[3]
      @choice_part = elements[3]
    end
  end

  class TreeNode8 < TreeNode
    attr_reader :type_tag

    def initialize(text, offset, elements)
      super
      @type_tag = elements[1]
    end
  end

  class TreeNode9 < TreeNode
    attr_reader :actionable_expression, :action_tag

    def initialize(text, offset, elements)
      super
      @actionable_expression = elements[0]
      @action_tag = elements[2]
    end
  end

  class TreeNode10 < TreeNode
    attr_reader :actionable_expression

    def initialize(text, offset, elements)
      super
      @actionable_expression = elements[2]
    end
  end

  class TreeNode11 < TreeNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[1]
    end
  end

  class TreeNode12 < TreeNode
    attr_reader :object_identifier

    def initialize(text, offset, elements)
      super
      @object_identifier = elements[1]
    end
  end

  class TreeNode13 < TreeNode
    attr_reader :first_part, :sequence_part, :rest

    def initialize(text, offset, elements)
      super
      @first_part = elements[0]
      @sequence_part = elements[0]
      @rest = elements[1]
    end
  end

  class TreeNode14 < TreeNode
    attr_reader :expression, :sequence_part

    def initialize(text, offset, elements)
      super
      @expression = elements[1]
      @sequence_part = elements[1]
    end
  end

  class TreeNode15 < TreeNode
    attr_reader :expression

    def initialize(text, offset, elements)
      super
      @expression = elements[1]
    end
  end

  class TreeNode16 < TreeNode
    attr_reader :atom

    def initialize(text, offset, elements)
      super
      @atom = elements[0]
    end
  end

  class TreeNode17 < TreeNode
    attr_reader :atom, :quantifier

    def initialize(text, offset, elements)
      super
      @atom = elements[0]
      @quantifier = elements[1]
    end
  end

  class TreeNode18 < TreeNode
    attr_reader :predicate, :atom

    def initialize(text, offset, elements)
      super
      @predicate = elements[0]
      @atom = elements[1]
    end
  end

  class TreeNode19 < TreeNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
    end
  end

  class TreeNode20 < TreeNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
    end
  end

  class TreeNode21 < TreeNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[0]
    end
  end

  class TreeNode22 < TreeNode
    attr_reader :identifier

    def initialize(text, offset, elements)
      super
      @identifier = elements[1]
    end
  end

  FAILURE = Object.new

  module Grammar
    def _read_grammar
      address0, index0 = FAILURE, @offset
      cached = @cache[:grammar][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      remaining0, index2, elements1, address2 = 0, @offset, [], true
      until address2 == FAILURE
        address2 = _read___
        unless address2 == FAILURE
          elements1 << address2
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        address1 = TreeNode.new(@input[index2...@offset], index2, elements1)
        @offset = @offset
      else
        address1 = FAILURE
      end
      unless address1 == FAILURE
        elements0 << address1
        address3 = FAILURE
        address3 = _read_grammar_name
        unless address3 == FAILURE
          elements0 << address3
          address4 = FAILURE
          remaining1, index3, elements2, address5 = 1, @offset, [], true
          until address5 == FAILURE
            index4, elements3 = @offset, []
            address6 = FAILURE
            remaining2, index5, elements4, address7 = 0, @offset, [], true
            until address7 == FAILURE
              address7 = _read___
              unless address7 == FAILURE
                elements4 << address7
                remaining2 -= 1
              end
            end
            if remaining2 <= 0
              address6 = TreeNode.new(@input[index5...@offset], index5, elements4)
              @offset = @offset
            else
              address6 = FAILURE
            end
            unless address6 == FAILURE
              elements3 << address6
              address8 = FAILURE
              address8 = _read_grammar_rule
              unless address8 == FAILURE
                elements3 << address8
              else
                elements3 = nil
                @offset = index4
              end
            else
              elements3 = nil
              @offset = index4
            end
            if elements3.nil?
              address5 = FAILURE
            else
              address5 = TreeNode2.new(@input[index4...@offset], index4, elements3)
              @offset = @offset
            end
            unless address5 == FAILURE
              elements2 << address5
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            address4 = TreeNode.new(@input[index3...@offset], index3, elements2)
            @offset = @offset
          else
            address4 = FAILURE
          end
          unless address4 == FAILURE
            elements0 << address4
            address9 = FAILURE
            remaining3, index6, elements5, address10 = 0, @offset, [], true
            until address10 == FAILURE
              address10 = _read___
              unless address10 == FAILURE
                elements5 << address10
                remaining3 -= 1
              end
            end
            if remaining3 <= 0
              address9 = TreeNode.new(@input[index6...@offset], index6, elements5)
              @offset = @offset
            else
              address9 = FAILURE
            end
            unless address9 == FAILURE
              elements0 << address9
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
        address0 = TreeNode1.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:grammar][index0] = [address0, @offset]
      return address0
    end

    def _read_grammar_name
      address0, index0 = FAILURE, @offset
      cached = @cache[:grammar_name][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      chunk0, max0 = nil, @offset + 7
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if !chunk0.nil? && chunk0.downcase == "grammar".downcase
        address1 = TreeNode.new(@input[@offset...@offset + 7], @offset, [])
        @offset = @offset + 7
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "`grammar`"
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2 = @offset
        chunk1, max1 = nil, @offset + 1
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == ":"
          address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\":\""
          end
        end
        if address2 == FAILURE
          address2 = TreeNode.new(@input[index2...index2], index2, [])
          @offset = index2
        end
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          remaining0, index3, elements1, address4 = 1, @offset, [], true
          until address4 == FAILURE
            address4 = _read___
            unless address4 == FAILURE
              elements1 << address4
              remaining0 -= 1
            end
          end
          if remaining0 <= 0
            address3 = TreeNode.new(@input[index3...@offset], index3, elements1)
            @offset = @offset
          else
            address3 = FAILURE
          end
          unless address3 == FAILURE
            elements0 << address3
            address5 = FAILURE
            address5 = _read_object_identifier
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
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode3.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:grammar_name][index0] = [address0, @offset]
      return address0
    end

    def _read_grammar_rule
      address0, index0 = FAILURE, @offset
      cached = @cache[:grammar_rule][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_identifier
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_assignment
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          address3 = _read_parsing_expression
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
        address0 = TreeNode4.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:grammar_rule][index0] = [address0, @offset]
      return address0
    end

    def _read_assignment
      address0, index0 = FAILURE, @offset
      cached = @cache[:assignment][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      remaining0, index2, elements1, address2 = 1, @offset, [], true
      until address2 == FAILURE
        address2 = _read___
        unless address2 == FAILURE
          elements1 << address2
          remaining0 -= 1
        end
      end
      if remaining0 <= 0
        address1 = TreeNode.new(@input[index2...@offset], index2, elements1)
        @offset = @offset
      else
        address1 = FAILURE
      end
      unless address1 == FAILURE
        elements0 << address1
        address3 = FAILURE
        chunk0, max0 = nil, @offset + 2
        if max0 <= @input_size
          chunk0 = @input[@offset...max0]
        end
        if chunk0 == "<-"
          address3 = TreeNode.new(@input[@offset...@offset + 2], @offset, [])
          @offset = @offset + 2
        else
          address3 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"<-\""
          end
        end
        unless address3 == FAILURE
          elements0 << address3
          address4 = FAILURE
          remaining1, index3, elements2, address5 = 1, @offset, [], true
          until address5 == FAILURE
            address5 = _read___
            unless address5 == FAILURE
              elements2 << address5
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            address4 = TreeNode.new(@input[index3...@offset], index3, elements2)
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
        address0 = TreeNode.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:assignment][index0] = [address0, @offset]
      return address0
    end

    def _read_parsing_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:parsing_expression][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      address0 = _read_choice_expression
      if address0 == FAILURE
        @offset = index1
        address0 = _read_choice_part
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:parsing_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_parenthesised_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:parenthesised_expression][index0]
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
          @expected << "\"(\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          address3 = _read___
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = TreeNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address4 = FAILURE
          address4 = _read_parsing_expression
          unless address4 == FAILURE
            elements0 << address4
            address5 = FAILURE
            remaining1, index3, elements2, address6 = 0, @offset, [], true
            until address6 == FAILURE
              address6 = _read___
              unless address6 == FAILURE
                elements2 << address6
                remaining1 -= 1
              end
            end
            if remaining1 <= 0
              address5 = TreeNode.new(@input[index3...@offset], index3, elements2)
              @offset = @offset
            else
              address5 = FAILURE
            end
            unless address5 == FAILURE
              elements0 << address5
              address7 = FAILURE
              chunk1, max1 = nil, @offset + 1
              if max1 <= @input_size
                chunk1 = @input[@offset...max1]
              end
              if chunk1 == ")"
                address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address7 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "\")\""
                end
              end
              unless address7 == FAILURE
                elements0 << address7
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
      @cache[:parenthesised_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_choice_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:choice_expression][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_choice_part
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 1, @offset, [], true
        until address3 == FAILURE
          index3, elements2 = @offset, []
          address4 = FAILURE
          remaining1, index4, elements3, address5 = 1, @offset, [], true
          until address5 == FAILURE
            address5 = _read___
            unless address5 == FAILURE
              elements3 << address5
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            address4 = TreeNode.new(@input[index4...@offset], index4, elements3)
            @offset = @offset
          else
            address4 = FAILURE
          end
          unless address4 == FAILURE
            elements2 << address4
            address6 = FAILURE
            chunk0, max0 = nil, @offset + 1
            if max0 <= @input_size
              chunk0 = @input[@offset...max0]
            end
            if chunk0 == "/"
              address6 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address6 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"/\""
              end
            end
            unless address6 == FAILURE
              elements2 << address6
              address7 = FAILURE
              remaining2, index5, elements4, address8 = 1, @offset, [], true
              until address8 == FAILURE
                address8 = _read___
                unless address8 == FAILURE
                  elements4 << address8
                  remaining2 -= 1
                end
              end
              if remaining2 <= 0
                address7 = TreeNode.new(@input[index5...@offset], index5, elements4)
                @offset = @offset
              else
                address7 = FAILURE
              end
              unless address7 == FAILURE
                elements2 << address7
                address9 = FAILURE
                address9 = _read_choice_part
                unless address9 == FAILURE
                  elements2 << address9
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
          if elements2.nil?
            address3 = FAILURE
          else
            address3 = TreeNode7.new(@input[index3...@offset], index3, elements2)
            @offset = @offset
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
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
        address0 = TreeNode6.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:choice_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_choice_part
      address0, index0 = FAILURE, @offset
      cached = @cache[:choice_part][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      index2 = @offset
      address1 = _read_action_expression
      if address1 == FAILURE
        @offset = index2
        address1 = _read_sequence_expression
        if address1 == FAILURE
          @offset = index2
          address1 = _read_sequence_part
          if address1 == FAILURE
            @offset = index2
          end
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index3 = @offset
        index4, elements1 = @offset, []
        address3 = FAILURE
        remaining0, index5, elements2, address4 = 1, @offset, [], true
        until address4 == FAILURE
          address4 = _read___
          unless address4 == FAILURE
            elements2 << address4
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address3 = TreeNode.new(@input[index5...@offset], index5, elements2)
          @offset = @offset
        else
          address3 = FAILURE
        end
        unless address3 == FAILURE
          elements1 << address3
          address5 = FAILURE
          address5 = _read_type_tag
          unless address5 == FAILURE
            elements1 << address5
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
          address2 = TreeNode8.new(@input[index4...@offset], index4, elements1)
          @offset = @offset
        end
        if address2 == FAILURE
          address2 = TreeNode.new(@input[index3...index3], index3, [])
          @offset = index3
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
      @cache[:choice_part][index0] = [address0, @offset]
      return address0
    end

    def _read_action_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:action_expression][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_actionable_expression
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 1, @offset, [], true
        until address3 == FAILURE
          address3 = _read___
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = TreeNode.new(@input[index2...@offset], index2, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address4 = FAILURE
          address4 = _read_action_tag
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
        address0 = TreeNode9.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:action_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_actionable_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:actionable_expression][index0]
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
          @expected << "\"(\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index3, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          address3 = _read___
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = TreeNode.new(@input[index3...@offset], index3, elements1)
          @offset = @offset
        else
          address2 = FAILURE
        end
        unless address2 == FAILURE
          elements0 << address2
          address4 = FAILURE
          address4 = _read_actionable_expression
          unless address4 == FAILURE
            elements0 << address4
            address5 = FAILURE
            remaining1, index4, elements2, address6 = 0, @offset, [], true
            until address6 == FAILURE
              address6 = _read___
              unless address6 == FAILURE
                elements2 << address6
                remaining1 -= 1
              end
            end
            if remaining1 <= 0
              address5 = TreeNode.new(@input[index4...@offset], index4, elements2)
              @offset = @offset
            else
              address5 = FAILURE
            end
            unless address5 == FAILURE
              elements0 << address5
              address7 = FAILURE
              chunk1, max1 = nil, @offset + 1
              if max1 <= @input_size
                chunk1 = @input[@offset...max1]
              end
              if chunk1 == ")"
                address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address7 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "\")\""
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
      else
        elements0 = nil
        @offset = index2
      end
      if elements0.nil?
        address0 = FAILURE
      else
        address0 = TreeNode10.new(@input[index2...@offset], index2, elements0)
        @offset = @offset
      end
      if address0 == FAILURE
        @offset = index1
        address0 = _read_sequence_expression
        if address0 == FAILURE
          @offset = index1
          address0 = _read_repeated_atom
          if address0 == FAILURE
            @offset = index1
            address0 = _read_terminal_node
            if address0 == FAILURE
              @offset = index1
            end
          end
        end
      end
      @cache[:actionable_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_action_tag
      address0, index0 = FAILURE, @offset
      cached = @cache[:action_tag][index0]
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
      if chunk0 == "%"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"%\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_identifier
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
        address0 = TreeNode11.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:action_tag][index0] = [address0, @offset]
      return address0
    end

    def _read_type_tag
      address0, index0 = FAILURE, @offset
      cached = @cache[:type_tag][index0]
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
      if chunk0 == "<"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"<\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_object_identifier
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 == ">"
            address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\">\""
            end
          end
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
        address0 = TreeNode12.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:type_tag][index0] = [address0, @offset]
      return address0
    end

    def _read_sequence_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:sequence_expression][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_sequence_part
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 1, @offset, [], true
        until address3 == FAILURE
          index3, elements2 = @offset, []
          address4 = FAILURE
          remaining1, index4, elements3, address5 = 1, @offset, [], true
          until address5 == FAILURE
            address5 = _read___
            unless address5 == FAILURE
              elements3 << address5
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            address4 = TreeNode.new(@input[index4...@offset], index4, elements3)
            @offset = @offset
          else
            address4 = FAILURE
          end
          unless address4 == FAILURE
            elements2 << address4
            address6 = FAILURE
            address6 = _read_sequence_part
            unless address6 == FAILURE
              elements2 << address6
            else
              elements2 = nil
              @offset = index3
            end
          else
            elements2 = nil
            @offset = index3
          end
          if elements2.nil?
            address3 = FAILURE
          else
            address3 = TreeNode14.new(@input[index3...@offset], index3, elements2)
            @offset = @offset
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
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
        address0 = TreeNode13.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:sequence_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_sequence_part
      address0, index0 = FAILURE, @offset
      cached = @cache[:sequence_part][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      index2 = @offset
      address1 = _read_label
      if address1 == FAILURE
        address1 = TreeNode.new(@input[index2...index2], index2, [])
        @offset = index2
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index3 = @offset
        address2 = _read_maybe_atom
        if address2 == FAILURE
          @offset = index3
          address2 = _read_repeated_atom
          if address2 == FAILURE
            @offset = index3
            address2 = _read_atom
            if address2 == FAILURE
              @offset = index3
            end
          end
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
        address0 = TreeNode15.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:sequence_part][index0] = [address0, @offset]
      return address0
    end

    def _read_maybe_atom
      address0, index0 = FAILURE, @offset
      cached = @cache[:maybe_atom][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_atom
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        chunk0, max0 = nil, @offset + 1
        if max0 <= @input_size
          chunk0 = @input[@offset...max0]
        end
        if chunk0 == "?"
          address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"?\""
          end
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
        address0 = TreeNode16.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:maybe_atom][index0] = [address0, @offset]
      return address0
    end

    def _read_repeated_atom
      address0, index0 = FAILURE, @offset
      cached = @cache[:repeated_atom][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_atom
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2 = @offset
        chunk0, max0 = nil, @offset + 1
        if max0 <= @input_size
          chunk0 = @input[@offset...max0]
        end
        if chunk0 == "*"
          address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"*\""
          end
        end
        if address2 == FAILURE
          @offset = index2
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 == "+"
            address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address2 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"+\""
            end
          end
          if address2 == FAILURE
            @offset = index2
          end
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
        address0 = TreeNode17.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:repeated_atom][index0] = [address0, @offset]
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
      address0 = _read_parenthesised_expression
      if address0 == FAILURE
        @offset = index1
        address0 = _read_predicated_atom
        if address0 == FAILURE
          @offset = index1
          address0 = _read_reference_expression
          if address0 == FAILURE
            @offset = index1
            address0 = _read_terminal_node
            if address0 == FAILURE
              @offset = index1
            end
          end
        end
      end
      @cache[:atom][index0] = [address0, @offset]
      return address0
    end

    def _read_terminal_node
      address0, index0 = FAILURE, @offset
      cached = @cache[:terminal_node][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
      address0 = _read_string_expression
      if address0 == FAILURE
        @offset = index1
        address0 = _read_ci_string_expression
        if address0 == FAILURE
          @offset = index1
          address0 = _read_char_class_expression
          if address0 == FAILURE
            @offset = index1
            address0 = _read_any_char_expression
            if address0 == FAILURE
              @offset = index1
            end
          end
        end
      end
      @cache[:terminal_node][index0] = [address0, @offset]
      return address0
    end

    def _read_predicated_atom
      address0, index0 = FAILURE, @offset
      cached = @cache[:predicated_atom][index0]
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
      if chunk0 == "&"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"&\""
        end
      end
      if address1 == FAILURE
        @offset = index2
        chunk1, max1 = nil, @offset + 1
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == "!"
          address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address1 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"!\""
          end
        end
        if address1 == FAILURE
          @offset = index2
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        address2 = _read_atom
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
        address0 = TreeNode18.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:predicated_atom][index0] = [address0, @offset]
      return address0
    end

    def _read_reference_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:reference_expression][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_identifier
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2 = @offset
        address2 = _read_assignment
        @offset = index2
        if address2 == FAILURE
          address2 = TreeNode.new(@input[@offset...@offset], @offset, [])
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
        address0 = TreeNode19.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:reference_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_string_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:string_expression][index0]
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
          @expected << "'\"'"
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index3, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          index4 = @offset
          index5, elements2 = @offset, []
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
              @expected << "\"\\\\\""
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
                @expected << "<any char>"
              end
            end
            unless address5 == FAILURE
              elements2 << address5
            else
              elements2 = nil
              @offset = index5
            end
          else
            elements2 = nil
            @offset = index5
          end
          if elements2.nil?
            address3 = FAILURE
          else
            address3 = TreeNode.new(@input[index5...@offset], index5, elements2)
            @offset = @offset
          end
          if address3 == FAILURE
            @offset = index4
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
                @expected << "[^\"]"
              end
            end
            if address3 == FAILURE
              @offset = index4
            end
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
          address2 = TreeNode.new(@input[index3...@offset], index3, elements1)
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
              @expected << "'\"'"
            end
          end
          unless address6 == FAILURE
            elements0 << address6
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
        address0 = TreeNode.new(@input[index2...@offset], index2, elements0)
        @offset = @offset
      end
      if address0 == FAILURE
        @offset = index1
        index6, elements3 = @offset, []
        address7 = FAILURE
        chunk4, max4 = nil, @offset + 1
        if max4 <= @input_size
          chunk4 = @input[@offset...max4]
        end
        if chunk4 == "'"
          address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address7 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"'\""
          end
        end
        unless address7 == FAILURE
          elements3 << address7
          address8 = FAILURE
          remaining1, index7, elements4, address9 = 0, @offset, [], true
          until address9 == FAILURE
            index8 = @offset
            index9, elements5 = @offset, []
            address10 = FAILURE
            chunk5, max5 = nil, @offset + 1
            if max5 <= @input_size
              chunk5 = @input[@offset...max5]
            end
            if chunk5 == "\\"
              address10 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address10 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"\\\\\""
              end
            end
            unless address10 == FAILURE
              elements5 << address10
              address11 = FAILURE
              if @offset < @input_size
                address11 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address11 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "<any char>"
                end
              end
              unless address11 == FAILURE
                elements5 << address11
              else
                elements5 = nil
                @offset = index9
              end
            else
              elements5 = nil
              @offset = index9
            end
            if elements5.nil?
              address9 = FAILURE
            else
              address9 = TreeNode.new(@input[index9...@offset], index9, elements5)
              @offset = @offset
            end
            if address9 == FAILURE
              @offset = index8
              chunk6, max6 = nil, @offset + 1
              if max6 <= @input_size
                chunk6 = @input[@offset...max6]
              end
              if chunk6 =~ /\A[^']/
                address9 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address9 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "[^']"
                end
              end
              if address9 == FAILURE
                @offset = index8
              end
            end
            unless address9 == FAILURE
              elements4 << address9
              remaining1 -= 1
            end
          end
          if remaining1 <= 0
            address8 = TreeNode.new(@input[index7...@offset], index7, elements4)
            @offset = @offset
          else
            address8 = FAILURE
          end
          unless address8 == FAILURE
            elements3 << address8
            address12 = FAILURE
            chunk7, max7 = nil, @offset + 1
            if max7 <= @input_size
              chunk7 = @input[@offset...max7]
            end
            if chunk7 == "'"
              address12 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address12 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"'\""
              end
            end
            unless address12 == FAILURE
              elements3 << address12
            else
              elements3 = nil
              @offset = index6
            end
          else
            elements3 = nil
            @offset = index6
          end
        else
          elements3 = nil
          @offset = index6
        end
        if elements3.nil?
          address0 = FAILURE
        else
          address0 = TreeNode.new(@input[index6...@offset], index6, elements3)
          @offset = @offset
        end
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:string_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_ci_string_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:ci_string_expression][index0]
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
      if chunk0 == "`"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"`\""
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
              @expected << "\"\\\\\""
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
            if chunk2 =~ /\A[^`]/
              address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address3 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "[^`]"
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
          if chunk3 == "`"
            address6 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address6 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\"`\""
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
      @cache[:ci_string_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_any_char_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:any_char_expression][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      chunk0, max0 = nil, @offset + 1
      if max0 <= @input_size
        chunk0 = @input[@offset...max0]
      end
      if chunk0 == "."
        address0 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address0 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\".\""
        end
      end
      @cache[:any_char_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_char_class_expression
      address0, index0 = FAILURE, @offset
      cached = @cache[:char_class_expression][index0]
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
          @expected << "\"[\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        index2 = @offset
        chunk1, max1 = nil, @offset + 1
        if max1 <= @input_size
          chunk1 = @input[@offset...max1]
        end
        if chunk1 == "^"
          address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\"^\""
          end
        end
        if address2 == FAILURE
          address2 = TreeNode.new(@input[index2...index2], index2, [])
          @offset = index2
        end
        unless address2 == FAILURE
          elements0 << address2
          address3 = FAILURE
          remaining0, index3, elements1, address4 = 1, @offset, [], true
          until address4 == FAILURE
            index4 = @offset
            index5, elements2 = @offset, []
            address5 = FAILURE
            chunk2, max2 = nil, @offset + 1
            if max2 <= @input_size
              chunk2 = @input[@offset...max2]
            end
            if chunk2 == "\\"
              address5 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address5 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"\\\\\""
              end
            end
            unless address5 == FAILURE
              elements2 << address5
              address6 = FAILURE
              if @offset < @input_size
                address6 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address6 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "<any char>"
                end
              end
              unless address6 == FAILURE
                elements2 << address6
              else
                elements2 = nil
                @offset = index5
              end
            else
              elements2 = nil
              @offset = index5
            end
            if elements2.nil?
              address4 = FAILURE
            else
              address4 = TreeNode.new(@input[index5...@offset], index5, elements2)
              @offset = @offset
            end
            if address4 == FAILURE
              @offset = index4
              chunk3, max3 = nil, @offset + 1
              if max3 <= @input_size
                chunk3 = @input[@offset...max3]
              end
              if chunk3 =~ /\A[^\]]/
                address4 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
                @offset = @offset + 1
              else
                address4 = FAILURE
                if @offset > @failure
                  @failure = @offset
                  @expected = []
                end
                if @offset == @failure
                  @expected << "[^\\]]"
                end
              end
              if address4 == FAILURE
                @offset = index4
              end
            end
            unless address4 == FAILURE
              elements1 << address4
              remaining0 -= 1
            end
          end
          if remaining0 <= 0
            address3 = TreeNode.new(@input[index3...@offset], index3, elements1)
            @offset = @offset
          else
            address3 = FAILURE
          end
          unless address3 == FAILURE
            elements0 << address3
            address7 = FAILURE
            chunk4, max4 = nil, @offset + 1
            if max4 <= @input_size
              chunk4 = @input[@offset...max4]
            end
            if chunk4 == "]"
              address7 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
              @offset = @offset + 1
            else
              address7 = FAILURE
              if @offset > @failure
                @failure = @offset
                @expected = []
              end
              if @offset == @failure
                @expected << "\"]\""
              end
            end
            unless address7 == FAILURE
              elements0 << address7
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
      @cache[:char_class_expression][index0] = [address0, @offset]
      return address0
    end

    def _read_label
      address0, index0 = FAILURE, @offset
      cached = @cache[:label][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_identifier
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        chunk0, max0 = nil, @offset + 1
        if max0 <= @input_size
          chunk0 = @input[@offset...max0]
        end
        if chunk0 == ":"
          address2 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
          @offset = @offset + 1
        else
          address2 = FAILURE
          if @offset > @failure
            @failure = @offset
            @expected = []
          end
          if @offset == @failure
            @expected << "\":\""
          end
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
        address0 = TreeNode20.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:label][index0] = [address0, @offset]
      return address0
    end

    def _read_object_identifier
      address0, index0 = FAILURE, @offset
      cached = @cache[:object_identifier][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1, elements0 = @offset, []
      address1 = FAILURE
      address1 = _read_identifier
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          index3, elements2 = @offset, []
          address4 = FAILURE
          chunk0, max0 = nil, @offset + 1
          if max0 <= @input_size
            chunk0 = @input[@offset...max0]
          end
          if chunk0 == "."
            address4 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address4 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "\".\""
            end
          end
          unless address4 == FAILURE
            elements2 << address4
            address5 = FAILURE
            address5 = _read_identifier
            unless address5 == FAILURE
              elements2 << address5
            else
              elements2 = nil
              @offset = index3
            end
          else
            elements2 = nil
            @offset = index3
          end
          if elements2.nil?
            address3 = FAILURE
          else
            address3 = TreeNode22.new(@input[index3...@offset], index3, elements2)
            @offset = @offset
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
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
        address0 = TreeNode21.new(@input[index1...@offset], index1, elements0)
        @offset = @offset
      end
      @cache[:object_identifier][index0] = [address0, @offset]
      return address0
    end

    def _read_identifier
      address0, index0 = FAILURE, @offset
      cached = @cache[:identifier][index0]
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
      if chunk0 =~ /\A[a-zA-Z_]/
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "[a-zA-Z_]"
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 =~ /\A[a-zA-Z0-9_]/
            address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "[a-zA-Z0-9_]"
            end
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
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
      @cache[:identifier][index0] = [address0, @offset]
      return address0
    end

    def _read___
      address0, index0 = FAILURE, @offset
      cached = @cache[:__][index0]
      if cached
        @offset = cached[1]
        return cached[0]
      end
      index1 = @offset
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
          @expected << "[\\s]"
        end
      end
      if address0 == FAILURE
        @offset = index1
        address0 = _read_comment
        if address0 == FAILURE
          @offset = index1
        end
      end
      @cache[:__][index0] = [address0, @offset]
      return address0
    end

    def _read_comment
      address0, index0 = FAILURE, @offset
      cached = @cache[:comment][index0]
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
      if chunk0 == "#"
        address1 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
        @offset = @offset + 1
      else
        address1 = FAILURE
        if @offset > @failure
          @failure = @offset
          @expected = []
        end
        if @offset == @failure
          @expected << "\"#\""
        end
      end
      unless address1 == FAILURE
        elements0 << address1
        address2 = FAILURE
        remaining0, index2, elements1, address3 = 0, @offset, [], true
        until address3 == FAILURE
          chunk1, max1 = nil, @offset + 1
          if max1 <= @input_size
            chunk1 = @input[@offset...max1]
          end
          if chunk1 =~ /\A[^\n]/
            address3 = TreeNode.new(@input[@offset...@offset + 1], @offset, [])
            @offset = @offset + 1
          else
            address3 = FAILURE
            if @offset > @failure
              @failure = @offset
              @expected = []
            end
            if @offset == @failure
              @expected << "[^\\n]"
            end
          end
          unless address3 == FAILURE
            elements1 << address3
            remaining0 -= 1
          end
        end
        if remaining0 <= 0
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
      @cache[:comment][index0] = [address0, @offset]
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
      tree = _read_grammar
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

  ParseError = Class.new(StandardError)

  def self.parse(input, options = {})
    parser = Parser.new(input, options[:actions], options[:types])
    parser.parse
  end
end
