'''
Very fast, but requires the array is sorted
'''

#-- Methods -------------------------------------#

def binary_search( A, t ):
	low = 0
	high = len(A)-1
	while low <= high :
		ix = int( (low+high)/2 )
		if t == A[ix]:
			return True
		elif t < A[ix]:
			high = ix-1
		else:
			low = ix+1
	return False

#-- Run -------------------------------------#

L = range(0,40, 2)

print L

print binary_search( L, 3)

print binary_search( L, 16)