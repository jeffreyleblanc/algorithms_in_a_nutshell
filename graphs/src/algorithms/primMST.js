
function primMST( graph ){

	//reset edge colors
	/*$.each( graph.U.edges.cO.L, function(i,e){
		e.color.RGBA(50,100,100,0.5);
	});*/
	graph.resetColors();

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.A.pred = null;
		v.A.dist = 1000000; // "key"
	});
	V[0].A.dist = 0;

	var PQ = new PriorityQueue();
	$.each( V, function(i,v){
		PQ.push( v, v.A.dist );
	});
	
	while( ! PQ.empty() ){
		var u = PQ.popMin();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){

			if( PQ.includes( v )){
				var e = u.getLinkingEdgeByPtr( v );
				$.C( e.id() );
				var w = e.currDist;
				if( w < v.A.dist ){
					v.A.pred = u;
					v.A.dist = w;
					PQ.updatePriority( v, w );
				}
			}

		});
	}

	// Set any edges yellow...
	$.each( V, function(i,v){
		if( v.A.pred != null ){
			var e = v.getLinkingEdgeByPtr( v.A.pred );
			e.color.RGBA(255,255,0,0.75);
		}
	});
}