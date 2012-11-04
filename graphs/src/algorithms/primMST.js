
function primMST( graph ){

	// 2. Reset
	graph.resetAnalysis();

	// 3. Setup for analysis
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
	
	// 4. Run
	while( ! PQ.empty() ){
		var u = PQ.popMin();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){

			if( PQ.includes( v )){
				var e = u.getLinkingEdgeByPtr( v );
				$.C( e.id() );
				var w = e.getDist();
				if( w < v.A.dist ){
					v.A.pred = u;
					v.A.dist = w;
					PQ.updatePriority( v, w );
				}
			}

		});
	}

	// 5. Output Results
	$.each( V, function(i,v){
		if( v.A.pred != null ){
			var e = v.getLinkingEdgeByPtr( v.A.pred );
			e.color.RGBA(255,255,0,0.75);
		}
	});
};