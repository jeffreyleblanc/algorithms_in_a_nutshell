#-- Insertion Sort ----------------------#

def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )

def insert( arr, idx ):
	i = idx - 1
	val = arr[idx]
	while i >=0 and cmp( arr[i], val ) > 0 :
		arr[i+1] = arr[i]
		i -= 1	
	arr[i+1] = val

def insertionSort( arr ):
	for j in range(1, len(arr)):
		insert( arr, j )

#-- Bucket Sort ----------------------#

hashN = 4

def hash( val ):
	return int(val / hashN )

def extract( B, A ):

	idx = 0
	for i in range(0, len(B) ):
		insertionSort( B[i] )

		for m in range(0,len(B[i])):

			A[idx] = B[i][m]
			idx += 1

def bucketsort( A , nb ):

	B = [ [] for _ in xrange(nb) ]

	for i in range(0,len(A)):
		k = hash(A[i])
		B[k].append( A[i] )

	extract( B, A )

#-- Run ----------------------#

L = [7,5,13,2,14,1,6]

print L

bucketsort( L , hashN )

print L





