

function dijsktraPQ( graph, s, e ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.pred = null;
		v.dist = 1000000;
	});
	s.dist = 0;

	var PQ = new PriorityQueue();
	$.each( V, function(i,v){
		PQ.push( v, v.dist );
	});
	
	while( ! PQ.empty() ){
		var u = PQ.popMin();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){
			
			var e = v.getLinkingEdgeByPtr(u);
			$.C( v.id() );
			$.C( u.id() );
			var newLen = u.dist + e.currDist;
			$.C( newLen );
			if( newLen < v.dist ){
				PQ.updatePriority( v, newLen );
				v.dist = newLen;
				v.pred = u;
			}

		});
	}
}