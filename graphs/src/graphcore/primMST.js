
function primMST( graph ){

	//reset edge colors
	$.each( graph.U.edges.cO.L, function(i,e){
		e.color.RGBA(50,100,100,0.5);
	});

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.pred = null;
		v.dist = 1000000; // "key"
	});
	V[0].dist = 0;

	var PQ = new PriorityQueue();
	$.each( V, function(i,v){
		PQ.push( v, v.dist );
	});
	
	while( ! PQ.empty() ){
		var u = PQ.popMin();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){

			if( PQ.includes( v )){
				var e = u.getLinkingEdgeByPtr( v );
				var w = e.currDist;
				if( w < v.dist ){
					v.pred = u;
					v.dist = w;
					PQ.updatePriority( v, w );
				}
			}

		});
	}

	// Set any edges yellow...
	$.each( V, function(i,v){
		if( v.pred != null ){
			var e = v.getLinkingEdgeByPtr( v.pred );
			e.color.RGBA(255,255,0,0.75);
		}
	});
}