
#-- Methods -------------------------------------#

def log( string ):
	print string

def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )

def swap( A, i1, i2):
	tmp = A[i1]
	A[i1] = A[i2]
	A[i2] = tmp

def heapify(A,idx,max):
	l = 2*idx+1
	r = 2*idx+2
	if l < max and A[l] > A[idx] :
		largest = l
	else:
		largest = idx
	if r < max and A[r] > A[largest] :
		largest = r
	if largest != idx :
		swap( A, idx, largest )
		heapify( A, largest, max)

def buildHeap(A):
	for i in range(int(len(A)/2)-1,-1,-1):
		heapify(A,i,len(A))

def heapsort(A):
	buildHeap(A)
	for i in range(len(A)-1,0,-1):
		swap(A,0,i)
		heapify(A,0,i)

#-- Run -------------------------------------#

L = [ 15, 9, 8, -1, 4, 11, 7, 12, 13, -6, 5, 3, 16, 2, 10, 14, -3 ]

print L

heapsort( L )

print L

