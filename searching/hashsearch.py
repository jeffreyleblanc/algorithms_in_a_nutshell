'''
Hash search
If there is a good hash method for the set, then this is good
flexible and fast, and is easy to insert/remove values
'''

#-- Methods -------------------------------------#

hashN = 10

# Purely for demonstation purposes
def hash( val , hashBase):
	hash = int(val / hashBase )
	if hash >= hashBase:
		hash = hashBase-1
	return hash

def loadTable( A, hashBase ):

	B = [ None for _ in xrange(hashBase) ]
	for i in range(0,len(A)):
		h = hash( A[i], hashBase )
		# Note this check still needs to be within len(B)
		if B[h] == None:
			B[h] = []
		B[h].append( A[i] )
	return B

def search( Table, val ):
	h = hash( val, hashN ) # Note use of above scope
	result = Table[h]
	if not result :
		return False
	else:
		if val in result: # Could use a search method here
			return True
		else:
			return False

#-- Run -------------------------------------#

L = [45, 70, 10, 36, 26, 84, 63, 5, 10, 5, 38, 10, 10, 23, 47, 11]

Table = loadTable( L, hashN )

print search( Table, 19 )

print search( Table, 63 )