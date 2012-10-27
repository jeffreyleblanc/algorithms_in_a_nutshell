
/*
	These functions help to find the median of an Array subset.
	They do not fully sort an array, but find the median and ensure
	elements to the 'left' at less than and those to the 'right' greater
	than
*/

function swap( A, i1, i2 ){
	var tmp = A[i1];
	A[i1] = A[i2];
	A[i2] = tmp;
};

// note l and r are ACTUAL indices
function partition( A, l, r, pidx, cmpf){

	// Check we aren't partitioning nothing:
	if( l == r){ return l; }

	var idx = 0;
	var curri = l;
	var pivot = A[pidx];

	// move pivot to end of the subsection
	swap(A,r,pidx);
	// all values <= pivot moved to front of array, and pivot inserted just after
	for(var i=l; i < r; i++){ //Note, we don't include the last index as the pivot is there
		if( cmpf(A[i],pivot) <= 0 ){
			swap(A, i, curri);
			curri += 1;
		}
	}
	swap(A,r,curri);
	return curri;
};

function splitaboutKth( A, l, r, k, cmpf ){

	// var get seed index
	var sidx = Math.floor((l+r)/2);

	var foundk = partition(A,l,r,sidx,cmpf);
	while( foundk != k ){
		if( foundk < k ){
			// We need to work on the section to the right of foundk
			var foundk = partition( A, foundk+1, r, k, cmpf );
		} else {
			// We need to work on the section to the left of foundk
			var foundk = partition( A, l, foundk-1, k, cmpf );
		}
	}

};