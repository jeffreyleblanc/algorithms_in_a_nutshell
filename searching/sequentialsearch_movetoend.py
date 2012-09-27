
# Note there are many other ways to implement this functionality
def move_idx_end( A, idx ):
	if idx == 0 or idx > len(A)-1:
		return

	hold = A[idx]
	for i in range(idx+1, len(A)):
		A[i-1] = A[i]
	A[len(A)-1] = hold

def sequential_search_moveend( A, tgt ):

	for i in range(0, len(A)):
		if tgt == A[i]:
			if i != 0:
				move_idx_end( A, i )
			return True
	return False


L = [ 'a', 'h', 'd', 'z', 'f' ]

print L

print sequential_search_moveend( L, 'd')

print L

print sequential_search_moveend( L, 'z')

print L