
// See: https://github.com/jeffreyleblanc/algorithms_in_a_nutshell/blob/master/sorting/median.py

/*def cmp( a, b ):
	return a > b # Note that in python bool are ints ( 0, 1 )
*/

function cmp( a, b){
	return a >= b;
};

function swap( A, i1, i2 ){
	var tmp = A[i1];
	A[i1] = A[i2];
	A[i2] = tmp;
}

function partition( A, l, r, pidx){
	var idx = 0
	var store = 0
	var pivot = A[pidx]

	// move pivot to end of the array
	swap(A,r,pidx);

	// all values <= pivot moved to front of array, and pivot inserted just after
	store = l
	for(var i=l; i<(r); i++){ // don't include the last one!
		if( cmp(A[i],pivot) <= 0 ){
			swap(A, i, store);
			store += 1;
		}
	}
	swap(A,r,store);
	return store;
};

/*def selectPivotIndex(A,l,r):
	return int( (l+r)/2 )*/

function selectPivotIndex(A,l,r){
	return Math.ceil(1+(r-l)/2);
};

 function selectKth(A, k, l, r){

	idx = selectPivotIndex(A,l,r); // Should this be in there explicitly?
	pivotIdx = partition(A,l,r,idx)

	if( l+k-1 == pivotIdx )
		return pivotIdx; // we recursively reach here eventually

	if( l+k-1 < pivotIdx)
		return selectKth(A, k, l, pivotIdx-1);
	else
 		return selectKth(A, k-(pivotIdx-l+1), pivotIdx+1, r);

 };


 ///

function partition2( A, l, r, pidx){
	var idx = 0
	var store = 0
	var pivot = A[pidx]

	// move pivot to end of the array
	swap(A,r,pidx);

	// all values <= pivot moved to front of array, and pivot inserted just after
	store = l
	for(var i=l; i<(r); i++){ // don't include the last one!
		if( cmp(A[i],pivot) <= 0 ){
			swap(A, i, store);
			store += 1;
		}
	}
	swap(A,r,store);
	return store;

};

 ///

var h = [ 23, 4, 12, 2, 99, 3, 101, 33, 22, 1, 45, 24, 8, 89 ];


$.C( h );
$.C('-----');

$.C( Math.ceil(h.length/2) );

//partition2( h, 0, h.length-1, Math.ceil(h.length/2));
selectKth( h, Math.ceil(h.length/2), 0, h.length-1)

$.C( h );

$.C('-----');

