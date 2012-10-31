'''>
quick sort
sort of a simpler version of median sort
also see introsort
'''

from common import cmp, swap, log, testalgo

#-- Methods -------------------------------------#

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

if __name__ == "__main__":

	testalgo( quicksort )