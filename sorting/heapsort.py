'''>
heap sort
uses a sort of binary tree
'''

from common import cmp, swap, log, testalgo

#-- Methods -------------------------------------#

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
	for i in range(int(len(A)/2)-1,-1,-1): # range is [ |n/2|-1 ... 0 ]
		heapify(A,i,len(A))

def heapsort(A, l, r): # note l and r not used here
	buildHeap(A)
	for i in range(len(A)-1,0,-1): # range is [ n-1 ... 0 ]
		swap(A,0,i)
		heapify(A,0,i)

#-- Run -------------------------------------#

if __name__ == "__main__":

	testalgo( heapsort )

