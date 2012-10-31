#!/usr/bin/python
# -*- coding: utf-8 -*-

'''

https://github.com/MartinThoma/algorithms/blob/master/datastructures/redBlackTree.py

'''


class rbnode(object):

    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.p = None
        self.red = False
        self.originalRed = False
        self.isNil = False

    def __str__(self):
        if self.isNil:
            return "Node: NIL"
        else:
            return str("%s" % self.key)

    def dump(self, tabs):

        if self.isNil:
            return

        if tabs < 0:
            tabs = 0
        print ( "\t" * tabs )+str(self.key)
        if self.left != None and self.right != None:
            print ( "\t" * tabs )+'/\\'
            self.left.dump(tabs-1)
            self.right.dump(tabs+1)
        elif self.left != None:
            print ( "\t" * tabs )+'/'
            self.left.dump(tabs-1)
        elif self.right != None:
            print ( "\t" * tabs )+'\\'
            self.right.dump(tabs+1)

    def dump2(self, level, tabs, N):

        if self.isNil:
            return

        if tabs < 0:
            tabs = 0
        print ( "\t" * tabs )+str(self.key)
        N[level][tabs] = self.key
        if self.left != None and self.right != None:
            print ( "\t" * tabs )+'/\\'
            self.left.dump2(level+1,tabs-1,N)
            self.right.dump2(level+1,tabs+1,N)
        elif self.left != None:
            print ( "\t" * tabs )+'/'
            self.left.dump2(level+1,tabs-1,N)
        elif self.right != None:
            print ( "\t" * tabs )+'\\'
            self.right.dump2(level+1,tabs+1,N)

class rbtree(object):

    def __init__(self, create_node=rbnode):
        
        # Our nil node, used for all leaves.
        self.nil = create_node(key=None)
        self.nil.isNil = True
        
        self.root = self.nil
        
        # A callable that creates a node.
        self.create_node = create_node

    
    #-- ANALYSIS -------------------------------------------------------#

    def search(self, key, x=None):
        """
        Search the subtree rooted at x (or the root if not given) 
        iteratively for the key.
        
        @return: self.nil if it cannot find it.
        """
        if x == None:
            x = self.root

        while x != self.nil and key != x.key:
            if key < x.key:
                x = x.left
            else:
                x = x.right
        return x

    
    def minimum(self, x=None):
        """
        Find the node with the minimum value of the subtree
        rooted at x.

        @param x: the root where you start your search.
        @return: The node with the minimum value in the subtree 
                rooted at x.
        """
        if x == None:
            x = self.root

        if x == self.nil:
            return self.nil

        while x.left != self.nil:
            x = x.left
        return x

    
    def maximum(self, x=None):
        """
        Find the maximum value of the subtree rooted at x.

        @param x: the root where you start your search.
        @return: The maximum value in the subtree rooted at x.
        """
        if x == None:
            x = self.root

        if x == self.nil:
            return self.nil

        while x.right != self.nil:
            x = x.right
        return x

    #-- UTILTIES -------------------------------------------------------#

    # Get the 'sibling' of a node
    def _sibling(self, n):
        assert n.p != self.nil
        if n == n.p.left:
            return n.p.right
        else:
            return n.p.left


    #       B                                  A
    #      / \        rotateRight(B)          / \
    #     /   \           -------->          /   \
    #    A     t3                           t1    B
    #   / \                                      / \
    #  /   \                                    /   \
    # t1     t2                                t2    t3

    def _right_rotate(self, B):
        A = B.left
        # Move t2
        B.left = A.right
        if B.left != self.nil:
            B.left.p = B
        # A switches with B
        A.p = B.p
        if A.p == self.nil:
            self.root = A
        elif B.p.right == B:
            B.p.right = A
        elif B.p.left == B:
            B.p.left = A
        # A and B point to eachother
        B.p = A
        A.right = B

    #      A                                  B
    #     / \        rotateLeft(A)           / \
    #    /   \           -------->          /   \
    #   t1    B                            A    t3
    #        / \         <--------        / \
    #       /   \     rotateRight(B)     /   \
    #      t2   t3                      t1   t2

    def _left_rotate(self, A):
        B = A.right
        # Move t2
        A.right = B.left
        if A.right != self.nil:
            A.right.p = A
        # B switches with A
        B.p = A.p
        if B.p == self.nil:
            self.root = B
        elif A.p.right == A:
            A.p.right = B
        elif A.p.left == A:
            A.p.left = B
        # A and B point to eachother
        A.p = B
        B.left = A

    #-- INSERTION -------------------------------------------------------#

    def insert_key(self, key):
  
        self.insert_node(self.create_node(key=key))

    def insert_node(self, z): # z -> n
        
        y = self.nil
        x = self.root
        while x != self.nil:
            y = x
            if z.key < x.key:
                x = x.left
            else:
                x = x.right
        z.p = y
        if y == self.nil:
            self.root = z
        elif z.key < y.key:
            y.left = z
        else:
            y.right = z
        z.left = self.nil
        z.right = self.nil
        z.red = True
        self._insert_fixup(z)

    def _insert_fixup(self, z):
        """
        Restore the red-black properties after insert.
        """
        # You only get into trouble if the parent of z is red.
        # Otherwise, all properties are still valid.
        while z.p.red:
            if z.p == z.p.p.left: # parent of z is a left child
                y = z.p.p.right   # the uncle of z
                if y.red:
                    # parent of z and uncle of z are both red
                    # this means you can re-color them to black
                    # to make sure that the black-height didn't
                    # change, you have to re-color their parent to 
                    # red. Then you have to continue checking.
                    z.p.red = False
                    y.red = False
                    z.p.p.red = True
                    z = z.p.p
                else:
                    if z == z.p.right:
                        z = z.p
                        self._left_rotate(z)
                    z.p.red = False
                    z.p.p.red = True # this was black, as z.p is red
                    self._right_rotate(z.p.p)
            else:               #  parent of z is a right child
                y = z.p.p.left  # the uncle of z
                if y.red:
                    z.p.red = False
                    y.red = False
                    z.p.p.red = True
                    z = z.p.p
                else:
                    if z == z.p.left:
                        z = z.p
                        self._right_rotate(z)
                    z.p.red = False
                    z.p.p.red = True
                    self._left_rotate(z.p.p)
        self.root.red = False

    #-- DELETION -------------------------------------------------------#

    def delete_key(self, key):
        """
        Delete a key from the tree.

        @param key: the key you want to delete from the tree.
        @return: False if the key was not in the tree, 
                 otherwise True.
        """
        node = self.search(key)
        if node == self.nil:
            return False
        self.delete_node(node)
        return True

    def delete_node(self, n):
        """
        Delete a node from the tree.

        @param n: the node you want to delete from the tree.
        """
        # The following source was "translated" from
        # this Java source:
        # http://en.literateprograms.org/Red-black_tree_(Java)
        if n.left != self.nil and n.right != self.nil:
            pred = self.maximum(n.left)
            n.key = pred.key
            n = pred

        assert n.left == self.nil or n.right == self.nil

        if n.right == self.nil:
            child = n.left
        else:
            child = n.right

        if not n.red:
            n.red = child.red
            self.deleteCase1(n)
        self.replaceNode(n, child)

        if self.root.red:
            self.root.red = False

    def _replaceNode(self, oldn, newn):
        if oldn.p == self.nil:
            self.root = newn
        else:
            if oldn == oldn.p.left:
                oldn.p.left = newn
            else:
                oldn.p.right = newn
        if newn != self.nil:
            newn.p = oldn.p

    def _deleteCase1(self, n):
        """ In this case, N has become the root node. The deletion 
            removed one black node from every path, so no properties 
            are violated. 
        """
        if n.p == self.nil:
            return
        else:
            self.deleteCase2(n)

    def _deleteCase2(self, n):
        """ N has a red sibling. In this case we exchange the colors 
            of the parent and sibling, then rotate about the parent 
            so that the sibling becomes the parent of its former 
            parent. This does not restore the tree properties, but 
            reduces the problem to one of the remaining cases. """
        if self.sibling(n).red:
            n.p.red = True
            self.sibling(n).red = False
            if n == n.p.left:
                self.left_rotate(n.p)
            else:
                self.right_rotate(n.p)
        self.deleteCase3(n)

    def _deleteCase3(self, n):
        """ In this case N's parent, sibling, and sibling's children 
            are black. In this case we paint the sibling red. Now 
            all paths passing through N's parent have one less black 
            node than before the deletion, so we must recursively run 
            this procedure from case 1 on N's parent.
        """
        tmp = self.sibling(n)
        if not n.p.red and not tmp.red and not tmp.left and not tmp.right:
            tmp.red = True
            self.deleteCase1(n.p)
        else:
            self.deleteCase4(n)

    def _deleteCase4(self, n):
        """ N's sibling and sibling's children are black, but its 
            parent is red. We exchange the colors of the sibling and 
            parent; this restores the tree properties. 
        """
        tmp = self.sibling(n)
        if n.p.red and not tmp.red and not tmp.left.red and not tmp.right.red:
            tmp.red = True
            n.p.red = False
        else:
            self.deleteCase5(n)

    def _deleteCase5(self, n):
        """ There are two cases handled here which are mirror images 
            of one another:
                N's sibling S is black, S's left child is red, S's 
                right child is black, and N is the left child of its 
                parent. We exchange the colors of S and its left 
                sibling and rotate right at S.

                N's sibling S is black, S's right child is red, 
                S's left child is black, and N is the right child of 
                its parent. We exchange the colors of S and its right 
                sibling and rotate left at S.
                Both of these function to reduce us to the situation 
                described in case 6. """
        tmp = self.sibling(n)

        if n == n.p.left and not tmp.red and tmp.left and not tmp.right:
            tmp.red = True
            tmp.left.red = False
            self.right_rotate(tmp)
        elif n == n.p.right and not tmp.red and tmp.right and not tmp.left:
            tmp.red = True
            tmp.right.red = False
            self.left_rotate(tmp)

        self.deleteCase6(n)

    def _deleteCase6(self, n):
        """ There are two cases handled here which are mirror images 
            of one another:
            N's sibling S is black, S's right child is red, and N is 
            the left child of its parent. We exchange the colors of 
            N's parent and sibling, make S's right child black, then
            rotate left at N's parent.
            N's sibling S is black, S's left child is red, and N is 
            the right child of its parent. We exchange the colors of 
            N's parent and sibling, make S's left child black, then 
            rotate right at N's parent.
        """
        tmp = self.sibling(n)

        tmp.red = n.p.red
        n.p.red = False

        if n == n.p.left:
            assert tmp.right.red
            tmp.right.red = False
            self.left_rotate(n.p)
        else:
            assert tmp.left.red
            tmp.left.red = False
            self.right_rotate(n.p)

    #-- TESTING -------------------------------------------------------#

    def check_invariants(self):
        """
            @return: True if satisfies all criteria to be red-black tree.
        """

        def is_search_tree(node):
            if node != None and node != self.nil:
                if node.left != self.nil:
                    assert(node.left.key <= node.key)
                    is_search_tree(node.left)
                if node.right != self.nil:
                    assert(node.right.key >= node.key)
                    is_search_tree(node.right)

        def is_red_black_node(node):
            """
                @return: the number of black nodes on the way to the 
                         leaf (node does NOT count)
            """
            # check has _left and _right or neither
            assert not ((node.left and not node.right) or 
                        (node.right and not node.left))

            # leaves have to be black
            assert not ((not node.left and not node.right) and node.red)

            # if node is red, check children are black
            if node.red and node.left and node.right:
                assert not (node.left.red or node.right.red)

            # has the current node a left child?
            if node.left or node.right:
                # check children's parents are correct
                assert not (self.nil != node.right and node != node.right.p)
                assert not (self.nil != node.left and node != node.left.p)

                # check if children are ok
                left_counts = is_red_black_node(node.left)
                right_counts = is_red_black_node(node.right)

                if not node.left.red:
                    left_counts += 1
                if not node.right.red:
                    right_counts += 1

                # check children's counts are ok
                if left_counts != right_counts:
                    write_tree(self, "test", show_nil=True)
                assert left_counts == right_counts
                return left_counts
            return 0

        is_search_tree(self.root)
        is_red_black_node(self.root)
        return not self.root.red


#---------

print 'hello'

S = [ 13, 26, 43, 17, 25, 15, 16 ]

T = rbtree()
for v in S:
    print v
    T.insert_key( v )

assert T.check_invariants()

print T.search( 26 )
print T.search( 10 )

T.root.dump(6)

X = [['' for _ in range(14)] for _ in range(14)]

T.root.dump2( 0, 7, X)

for r in X:
    print r

print '... insert 14 ....'

T.insert_key( 14 )
X = [['' for _ in range(14)] for _ in range(14)]
T.root.dump2( 0, 7, X)

for r in X:
    print r
