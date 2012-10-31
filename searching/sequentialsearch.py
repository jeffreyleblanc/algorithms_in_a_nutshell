'''
pretty darn simple
Note that this can actually be pretty effective
Also, if you know that you will mainly search for
the same thing multiple times, or that you will
only search for it once, the variations included
can be very effective
'''

#-- Methods -------------------------------------#

def sequential_search( A, tgt ):
	for i in range(0, len(A)):
		if tgt == A[i]:
			return True
	return False

#-- Run -------------------------------------#

L = [ 'a', 'h', 'd', 'z', 'f' ]

print sequential_search( L, 'd')

print sequential_search( L, '')