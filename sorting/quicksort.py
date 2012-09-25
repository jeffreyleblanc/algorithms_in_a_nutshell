
#-- Methods -------------------------------------#

def log( string ):
	print string

def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )

def swap( A, i1, i2):
	tmp = A[i1]
	A[i1] = A[i2]
	A[i2] = tmp

def selectPivotIndex(A,l,r):
	return int( (l+r)/2 )

def partition(A,l,r):
	p = selectPivotIndex(A,l,r)
	swap(A,p,r)
	store = l
	for i in range(l,r):
		if cmp(A[i], A[r]) <= 0:
			swap(A,i,store)
			store += 1
	swap(A,store,r)
	return store

 
def quicksort( A, l, r ):
	if l < r:
		pi = partition(A,l,r)
		quicksort(A,l,pi-1)
		quicksort(A,pi+1,r)

#-- Run -------------------------------------#

L = [ 15, 9, 8, 1, 4, 11, 7, 12, 13, 6, 5, 3, 16, 2, 10, 14, -4 ]

print L

quicksort( L, 0, len(L)-1 )

print L