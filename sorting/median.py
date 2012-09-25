
#-- Methods -------------------------------------#

def log( string ):
	print string

def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )

def swap( A, i1, i2):
	tmp = A[i1]
	A[i1] = A[i2]
	A[i2] = tmp


def partition( A, l, r, pidx):
	idx = 0
	store = 0
	pivot = A[pidx]

	# move pivot to end of the array
	swap(A,r,pidx)

	# all values <= pivot moved to front of array, and pivot inserted just after
	store = l
	for i in range(l,r):
		if cmp(A[i],pivot) <= 0:
			swap(A, i, store)
			store += 1
	swap(A,r,store)
	return store

def selectPivotIndex(A,l,r):
	return int( (l+r)/2 )

def selectKth(A, k, l, r):
	idx = selectPivotIndex(A,l,r)
	pivotIdx = partition(A,l,r,idx)

	if l+k-1 == pivotIdx:
		return pivotIdx

	if l+k-1 < pivotIdx :
		return selectKth(A, k, l, pivotIdx-1)
	else:
 		return selectKth(A, k-(pivotIdx-l+1), pivotIdx+1, r)
 
def mediansort( A, l, r ):
	if r <= l:
		return

	mid = int( (r-l+1)/2 )
	me = selectKth(A, mid+1, l, r)

	mediansort( A, l, l+mid-1)
	mediansort(A, l+mid+1, r)

#-- Run -------------------------------------#

L = [ 15, 9, 8, 1, 4, 11, 7, 12, 13, 6, 5, 3, 16, 2, 10, 14 ]

print L

mediansort( L, 0, len(L)-1 )

print L