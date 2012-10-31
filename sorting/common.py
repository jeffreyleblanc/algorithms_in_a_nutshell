
import random
import inspect

def log( string ):
	print string

def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )

def swap( A, i1, i2):
	tmp = A[i1]
	A[i1] = A[i2]
	A[i2] = tmp

def randomArray():
	A = []
	for _ in range(random.randint(10,20)):
		A.append( random.randint(0,100) )
	return A

def testalgo( algo ):

	numargs = len(inspect.getargspec( algo )[0])

	L = randomArray()
	print L
	if numargs == 3:
		algo( L, 0, len(L)-1 )
	elif numargs == 1:
		algo( L )
	print L