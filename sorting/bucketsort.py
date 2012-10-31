'''>
hash sort
uses a hash function to cut up the problem into subunits
the subunits can be solved with any sorting algorithm
'''

from common import cmp, swap, log, testalgo
from insertionsort import insertionsort

#-- Methods -------------------------------------#

# Purely for demonstation purposes
def hash( val , hashBase):
	hash = int(val / hashBase )
	if hash >= hashBase:
		hash = hashBase-1
	return hash

def extract( B, A ):

	idx = 0
	for i in range(0, len(B) ):
		insertionsort( B[i], 0, len(B[i]) )

		for m in range(0,len(B[i])):

			A[idx] = B[i][m]
			idx += 1

def bucketsort( A ):

	# Purely for demonstation purposes
	hashN = 5 

	B = [ [] for _ in xrange(hashN) ]

	for i in range(0,len(A)):
		k = hash(A[i], hashN )
		B[k].append( A[i] )

	extract( B, A )

#-- Run ----------------------#

if __name__ == "__main__":

	testalgo( bucketsort )





