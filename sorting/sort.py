'''
Insertion Sort
Basically just sorts the array left to right
Order
'''

#-- Methods -------------------------------------#

def log( string ):
	print string

def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )

def insert( arr, idx ):

	log( 'step ' + str(idx) )

	i = idx - 1
	val = arr[idx]
	while i >=0 and cmp( arr[i], val ) > 0 :
		arr[i+1] = arr[i]
		i -= 1
		
		log( '\t:: '+str(arr) )
	
	arr[i+1] = val
	
	log( '\t'+str(arr) )

def insertionSort( arr ):

	log( '-- Begin insertionSort --' )

	for j in range(1, len(arr)):

		insert( arr, j )

	log( '-- End insertionSort --' )

#-- Run -------------------------------------#

L = [ 15, 9, 8, 1, 4, 11, 7, 12, 13, 6, 5, 3, 16, 2, 10, 14 ]

print L

insertionSort( L )

print L