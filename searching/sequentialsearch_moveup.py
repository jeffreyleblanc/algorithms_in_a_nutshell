
def swap( A, i1, i2):
	tmp = A[i1]
	A[i1] = A[i2]
	A[i2] = tmp

def sequential_search_moveup( A, tgt ):
	for i in range(0, len(A)):
		if tgt == A[i]:
			if i > 0:
				swap( A, i, i-1 )
			return True
	return False


L = [ 'a', 'h', 'd', 'z', 'f' ]

print L

print sequential_search_moveup( L, 'd')

print L