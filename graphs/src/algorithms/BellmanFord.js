
function bellmanFord( graph, s ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	// Ready
	graph.resetColors();

	var V = graph.U.nodes.cO.L;
	var E = graph.U.edges.cO.L;

	$.each( V, function(i,v){
		v.A.pred = null;
		v.A.dist = 1000000;
	});
	s.A.dist = 0;

	//! check implementation
	var n = V.length;
	for( var i=1; i<n; i++ ){
		$.C( 'pass : '+ i);
		$.each( E, function(i,e){
			var v = e.n1();
			var u = e.n2();
			
			var newLen = u.A.dist + e.currDist;
			if( newLen < v.A.dist ){
				if( i == n )
					$.C( "NEGATIVE CYCLE" );
				v.A.dist = newLen
				v.A.pred = u;
			}

			newLen = v.A.dist + e.currDist;
			if( newLen < u.A.dist ){
				if( i == n )
					$.C( "NEGATIVE CYCLE" );
				u.A.dist = newLen
				u.A.pred = v;
			}
		});
	}

	// Show results
	$.each( V, function(i,v){
		v.setMetaText(
			v.A.pred != null ?
			'pred : ' + v.A.pred.A.id + '<br>dist: '+ Math.roundFloat( v.A.dist )
			:
			'pred : NULL' + '<br>dist: '+ Math.roundFloat( v.A.dist )
		);
	});
}