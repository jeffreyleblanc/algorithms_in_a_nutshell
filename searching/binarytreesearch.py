
class node (object):
    def __init__(self, val, p=None):
        self.val = val
        self.l = None
        self.r = None
        self.p = p

    def dump(self, tabs):
    	if tabs < 0:
    		tabs = 0
    	print ( "\t" * tabs )+str(self.val)
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


def addtotree( parent , val ):

	if parent == None:
		parent = node( val )
		return parent
	elif val < parent.val:
		if parent.l != None:
			addtotree( parent.l, val )
		else:
			parent.l = node(val,parent)
	elif val > parent.val:
		if parent.r != None:
			addtotree( parent.r, val )
		else:
			parent.r = node(val,parent)
	return None


S = [ 13, 26, 43, 17, 25, 15, 16 ]

#S = [ 20, 26, 43, 17, 25, 15, 16 ]


root = addtotree( None, S[0] )

for v in S[1:] :
	print v
	addtotree( root, v )

root.dump(5)

