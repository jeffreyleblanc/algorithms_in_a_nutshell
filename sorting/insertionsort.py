'''>
insertion sort
use for small and nearly sorted arrays

works by expanding sorted area one element
at a time.
'''

from common import cmp, randomArray, testalgo

#-- Methods -------------------------------------#

def insert( arr, idx ):
	i = idx - 1
	val = arr[idx]
	while i >=0 and cmp( arr[i], val ) > 0 :
		arr[i+1] = arr[i]
		i -= 1	
	arr[i+1] = val

def insertionsort( arr, l, r ):
	for j in range(1, len(arr)):
		insert( arr, j )

#-- Run -------------------------------------#

if __name__ == "__main__":

	testalgo( insertionsort )