
function bellmanFord( graph, s ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	var E = graph.U.edges.cO.L;

	$.each( V, function(i,v){
		v.pred = null;
		v.dist = 1000000;
	});
	s.dist = 0;

	var n = V.length;
	for( var i=1; i<n; i++ ){
		$.C( 'pass : '+ i);
		$.each( E, function(i,e){
			var v = e.n1();
			var u = e.n2();
			
			var newLen = u.dist + e.currDist;
			if( newLen < v.dist ){
				if( i == n )
					$.C( "NEGATIVE CYCLE" );
				v.dist = newLen
				v.pred = u;
			}

			newLen = v.dist + e.currDist;
			if( newLen < u.dist ){
				if( i == n )
					$.C( "NEGATIVE CYCLE" );
				u.dist = newLen
				u.pred = v;
			}
		});
	}
}