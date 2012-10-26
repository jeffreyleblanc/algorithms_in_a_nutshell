
function ConvexHull( plane ){

	$.C( plane.id() );

	var P = plane.getPointsArray();

	// Sort points by x
	var p = P.concat();
	p.sort( comparePoints );
	/*dumpPointArray( P );
	dumpPointArray( p );*/
	
	// Handle upper hull
	var upper = [ p[0], p[1] ]; // Note these first two seeds will need to be removed
	for(var i=0; i<p.length; i++){
		upper.push( p[i] );
		while( upper.length > 2 && lastThreeDet( upper ) < 0.0 ){
			upper.splice(upper.length-2,1); // remove middle
		}
	}
	$.C( '--------' );
	dumpPointArray( upper );

	$.C( 'LOWER HULL' );
	// Handle lower hull
	var lower = [ p[p.length-1], p[p.length-2] ]; // Note these first two seeds will need to be removed
	for(var i=p.length-3; i>-1; i--){
		lower.push( p[i] );
		while( lower.length > 2 && lastThreeDet( lower ) < 0.0 ){
			lower.splice(lower.length-2,1); // remove middle
		}
	}
	$.C( '--------' );
	dumpPointArray( lower );

	// Make the final array:
	var hull = upper.slice(2).concat( lower.slice(1,-1));
	$.C( '---HULL-----' );
	dumpPointArray( hull );
	plane.loadHullArray( hull );
};

// det<0 right turn | det==0 colinear | det>0 left turn
function lastThreeDet( arr ){

	var pp = arr[arr.length-1];
	var Li = arr[arr.length-2];
	var Lii = arr[arr.length-3];

	return ( 
		(Li.x()-Lii.x())*(pp.y()-Lii.y())-(Li.y()-Lii.y())*(pp.x()-Lii.x())
	);
};

function dumpPointArray( arr ){
	$.each( arr, function(k,p){
		$.C( p.a_id );
	});
}

function comparePoints( p1, p2 ){
	if( p1.getX() > p2.getX() ){
		return 1;
	}else if( p1.getX() < p2.getX() ){
		return -1;
	}else{
		if( p1.getY() > p2.getY() )
			return 1;
		else
			return -1;
	}
};
