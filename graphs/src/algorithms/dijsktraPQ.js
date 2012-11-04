

function dijsktraPQ( graph, s, e ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.A.pred = null;
		v.A.dist = 1000000;
	});
	s.A.dist = 0;

	var PQ = new PriorityQueue();
	$.each( V, function(i,v){
		PQ.push( v, v.A.dist );
	});
	
	while( ! PQ.empty() ){
		var u = PQ.popMin();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){
			
			var e = v.getLinkingEdgeByPtr(u);
			$.C( v.id() );
			$.C( u.id() );
			var newLen = u.A.dist + e.currDist;
			$.C( newLen );
			if( newLen < v.A.dist ){
				PQ.updatePriority( v, newLen );
				v.A.dist = newLen;
				v.A.pred = u;
			}

		});
	}

	// After Run
	$.each( V, function(i,v){
		v.setMetaText(
			v.A.pred != null ?
			'pred : ' + v.A.pred.A.id + '<br>dist: '+ Math.roundFloat( v.A.dist, 2 )
			:
			'pred : NULL' + '<br>dist: '+ Math.roundFloat( v.A.dist, 2 )
		);
	});
}