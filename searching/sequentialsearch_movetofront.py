'''
pretty darn simple
'''

#-- Methods -------------------------------------#

# Note there are many other ways to implement this functionality
def move_idx_front( A, idx ):
	if idx == 0 or idx > len(A)-1:
		return

	hold = A[idx]
	for i in range(idx-1, -1, -1):
		A[i+1] = A[i]
	A[0] = hold

def sequential_search_movefront( A, tgt ):

	for i in range(0, len(A)):
		if tgt == A[i]:
			if i != 0:
				move_idx_front( A, i )
			return True
	return False

#-- Run -------------------------------------#

L = [ 'a', 'h', 'd', 'z', 'f' ]

print L

print sequential_search_movefront( L, 'd')

print L

print sequential_search_movefront( L, 'z')

print L