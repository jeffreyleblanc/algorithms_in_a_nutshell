
/*
	These functions help to find the median of an Array subset.
	They do not fully sort an array, but find the median and ensure
	elements to the 'left' at less than and those to the 'right' greater
	than
*/

function printArray( A ){
	var str = '[ ';
	for(var i=0; i<A.length; i++){
		str += A[i]+' , ';
	}
	str += ' ]';
	$.C(str);
}

function cmp( a, b){
	return a >= b;
};

function swap( A, i1, i2 ){
	var tmp = A[i1];
	A[i1] = A[i2];
	A[i2] = tmp;
};

function partition( A, l, r, pidx, cmpf){
	var idx = 0
	var store = 0
	var pivot = A[pidx]

	printArray( h );
	$.C('->')
	// move pivot to end of the array
	swap(A,r,pidx);
	printArray( h );
	// all values <= pivot moved to front of array, and pivot inserted just after
	store = l
	for(var i=l; i < r; i++){ //Note, we don't include the last index
		if( cmpf(A[i],pivot) <= 0 ){
			swap(A, i, store);
			store += 1;
			printArray( h );
		}
	}
	swap(A,r,store);
	printArray( h );
	return store;
};

function selectSeedPivotIndex(A,l,r){
	return Math.floor(1+(r-l)/2);
};

function selectKth(A, k, l, r, cmpf){
	idx = selectSeedPivotIndex(A,l,r); // this is the seed index
	$.C('idx is:'+idx);
	pivotIdx = partition(A,l,r, idx, cmpf)

	if( l+k-1 == pivotIdx )
		return pivotIdx; // We recursively reach here eventually

	if( l+k-1 < pivotIdx)
		return selectKth(A, k, l, pivotIdx-1, cmpf);
	else
 		return selectKth(A, k-(pivotIdx-l+1), pivotIdx+1, r, cmpf);
 };

function splitAboutMedian( A, l, r, cmpf){

	var medianpos = Math.ceil(1+(r-l)/2);
	selectKth(A, medianpos, l, r, cmpf );

};
 
// == TEST CODE ======================================= //

//var h = [ 23, 4, 12, 2, 99, 3, 101, 12, -2, -4, -5, 19, 33, 22, 1, 45, 24, 8, 89 ];
var h = [ 5, 4, 2, 6, 3, 1 ];
$.C('-----');
$.C( h );
printArray( h );
$.C('median index : '+ Math.ceil(h.length/2) );
splitAboutMedian(h, 0, h.length-1, cmp );
$.C( h );
$.C('-----');
