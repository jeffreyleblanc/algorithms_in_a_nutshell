'''>
counting sort
good when all elements are known to be within a range
but the number of elements is much greater than the range size
(in other words, many duplicates )
here A contains only integers from [0,k) 
-- in other words k is not included in the possible set
'''

from common import cmp, swap, log, testalgo

#-- Methods -------------------------------------#

def countingsort( A, n, k):
	i = idx = 0

	B = [0] * k

	for i in range(0,n):
		B[A[i]] += 1

	for i in range(0,k):
		while B[i] > 0:
			A[idx] = i
			idx += 1
			B[i] -= 1
	del B

#-- Run -------------------------------------#

if __name__ == "__main__":

	L = [3,0,2,0,0,2,3]

	print L

	countingsort(L, len(L), 4)

	print L

