'''>
median sort
finds the median (or a pivot index) in the array and subdivides about that
applies the same method to the two resulting subarrays and so on till sorted
an issue is that if the pivot selection is far from the median, less efficient
'''

from common import cmp, swap, log, testalgo

#-- Methods -------------------------------------#

def partition( A, l, r, pidx):

	idx, store, pivot = 0, l, A[pidx]

	# move pivot to end of the array
	swap(A,r,pidx)

	# all values <= pivot moved to front of array, and pivot inserted just after
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

#! Note there is also a non-recursive way to implment this
def mediansort( A, l, r ):
	if r <= l:
		return

	mid = int( (r-l+1)/2 )
	me = selectKth(A, mid+1, l, r)

	mediansort( A, l, l+mid-1)
	mediansort(A, l+mid+1, r)

#-- Run -------------------------------------#

if __name__ == "__main__":

	testalgo( mediansort )