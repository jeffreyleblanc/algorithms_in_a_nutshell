
def sequential_search( A, tgt ):
	for i in range(0, len(A)):
		if tgt == A[i]:
			return True
	return False


L = [ 'a', 'h', 'd', 'z', 'f' ]

print sequential_search( L, 'd')

print sequential_search( L, '')