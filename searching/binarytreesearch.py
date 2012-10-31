'''
Simple Binary Tree
This has no balancing mechanism
However it does show the basic mechanics of a simple binary tree 
'''

#-- Structures and Methods -------------------------------------#

class node (object):
    def __init__(self, key, val, p=None):
        self.key = key
        self.val = val
        self.l = None
        self.r = None
        self.p = p      # parent

    # A pretty crappy tree printer
    def dump(self, tabs):
    	if tabs < 0:
    		tabs = 0
    	print ( "\t" * tabs )+str(self.key)+':'+str(self.val)
    	if self.l != None and self.r != None:
    		print ( "\t" * tabs )+'/\\'
    		self.l.dump(tabs-1)
    		self.r.dump(tabs+1)
    	elif self.l != None:
    		print ( "\t" * tabs )+'/'
    		self.l.dump(tabs-1)
    	elif self.r != None:
    		print ( "\t" * tabs )+'\\'
    		self.r.dump(tabs+1)

def addtotree( parent , key, val ):

	if parent == None:
		parent = node( key, val )
		return parent
	elif key < parent.key:
		if parent.l != None:
			addtotree( parent.l, key, val )
		else:
			parent.l = node(key,val,parent)
	elif key > parent.key:
		if parent.r != None:
			addtotree( parent.r, key, val )
		else:
			parent.r = node(key, val,parent)
	return None

def search( rootNode, key ):
    n = rootNode
    while n is not None:
        if key == n.key:
            return n.val
        elif key < n.key:
            n = n.l
        else:
            n = n.r
    return None

#-- Run -------------------------------------#

S = [ [ 13, 'a'], [26,'b'], [43,'c'], [17,'d'], [25,'e'], [15,'f'], [16,'g'] ]

root = addtotree( None, S[0][0], S[0][1] )

for kv in S[1:] :
	addtotree( root, kv[0], kv[1] )

root.dump(5)

print search( root, 18 )

print search( root, 16 )

