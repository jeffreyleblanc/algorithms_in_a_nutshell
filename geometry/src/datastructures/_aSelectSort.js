
/*
	These functions help to find the median of an Array subset.
	They do not fully sort an array, but find the median and ensure
	elements to the 'left' at less than and those to the 'right' greater
	than
*/

// -- UTILITY FUNCTIONS ----------------------------- //

	function printArray( A ){
		var str = '[ ';
		for(var i=0; i<A.length; i++){
			str += A[i]+' , ';
		}
		str += ' ]';
		///$.C(str);
	}

	function cmp( a, b){
		return a >= b;
	};

	function swap( A, i1, i2 ){
		var tmp = A[i1];
		A[i1] = A[i2];
		A[i2] = tmp;
	};

// -- WORK FUNCTIONS ----------------------------- //

	// note l and r are ACTUAL indices
	function partition( A, l, r, pidx, cmpf){
		
		// Check we aren't partitioning nothing:
		if( l == r){
			///$.C('SEEING SELF!');
			return l;
		}

		var idx = 0
		var curri = 0
		var pivot = A[pidx]

		///$.C('init:');
		///printArray( h );
		///$.C('pivot idx: '+pidx);
		///$.C('pivot is: '+pivot);
		///$.C('move pivot to back')
		// move pivot to end of the subsection
		swap(A,r,pidx);
		///printArray( h );
		// all values <= pivot moved to front of array, and pivot inserted just after
		curri = l;
		for(var i=l; i < r; i++){ //Note, we don't include the last index
			///$.C('comparing: '+A[i]+' '+pivot);
			if( cmpf(A[i],pivot) <= 0 ){
				///$.C('do switch:');
				swap(A, i, curri);
				curri += 1;
				///printArray( h );
			}
		}
		///$.C('switch back:');
		swap(A,r,curri);
		//printArray( h );
		///$.C('initial pivot now at idx:'+curri);
		///$.C('exit');
		return curri;
	};

	function splitaboutKth2( A, l, r, k, cmpf ){

		// var get seed index
		var sidx = Math.floor((l+r)/2);

		var foundk = partition(A,l,r,sidx,cmpf);

		if( foundk == k ){
			//$.C('we have split at the right point!');
			return;
		}
		else if( foundk < k ){
			// We need to work on the section to the right of foundk
			splitaboutKth( A, foundk+1, r, k, cmpf );
		} else {
			// We need to work on the section to the left of foundk
			splitaboutKth( A, l, foundk-1, k, cmpf );
		}
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

	function splitAboutMedian( A, l, r, cmpf){

		var medianpos = Math.ceil((A.length)/2);
		splitaboutKth(A, l, r, medianpos, cmpf );

	};
 

// -- TEST FUNCTIONS ----------------------------- //



function validateSplit( A, medianidx ){
	$.C('validate:');
	printArray( A );
	var median = A[medianidx];
	for(var i=0; i<medianidx; i++){
		if( A[i] > median ){
			$.C('FAIL BELLOW!'); return;
		}
	}
	for(var i=medianidx+1; i<A.length; i++){
		if( A[i] < median ){
			$.C('FAIL ABOVE!'); return;
		}
	}
	$.C('PASSED');
}

function generateRandomArray(){
	var length = Math.ceil( 15*Math.random());
	var A = []
	for(var i=0; i<length; i++)
		A.push( Math.ceil( 100*Math.random()) );
	return A;
}

	//var h = [ 5, 4, 2, 6, 3, 1 ];
	//var h = [ 6, 5, 4, 3, 2, 7, 1 ];
	//var h = [ 23, 4, 12, 2, 99, 3, 101, 13, -2, -4, -5, 19, 33, 22, 1, 45, 24, 8, 89 ];
	//var h = [ 1, 11, 34, 81, 36 ];


for(var c=0; c<10; c++){
	var h = generateRandomArray();
	$.C('-----');
	$.C( h );
	//printArray( h );
	$.C('median index : '+ Math.ceil(h.length/2) );
	
	
	//partition(h, 0, h.length-1, Math.floor(h.length/2), cmp );

	//splitaboutKth( h, 0, h.length-1, Math.ceil(h.length/2), cmp );
	splitAboutMedian( h, 0, h.length-1, cmp );

	$.C('end');
	$.C( h );
	validateSplit( h, Math.ceil(h.length/2) );
	$.C('-----');
}


