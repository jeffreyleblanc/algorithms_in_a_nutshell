function makeNbyN( N, seed ){
	A = [];
	seed = seed||0;
	for(var i=0; i<N; i++){
		A.push( [] );
		for(var j=0; j<N; j++){
			A[i].push( seed );
		}
	}
	return A;
};

function printNbyN( M ){
	var tmpStr = ''
	var l = M.length;
	for(var i=0; i<l; i++){
		tmpStr = '['+i+'] ';
		for(var j=0; j<l; j++){
			if( M[i][j] > 100000 )
				tmpStr += '-\t';
			else
				tmpStr += Math.round( M[i][j] )+'\t';
		}
		$.C( tmpStr );
		
	}
}