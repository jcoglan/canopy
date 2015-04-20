from canopy.lisp import parse

program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))'
tree = parse(program)

def print_tree(tree, indent=0):
    print('    ' * indent + tree.text)
    for el in tree:
        print_tree(el, indent + 1)

print_tree(tree)
