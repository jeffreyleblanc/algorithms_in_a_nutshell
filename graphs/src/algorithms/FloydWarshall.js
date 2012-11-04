/*
	Computes shortest paths between all nodes.
	edge weights must be positive but can handle directed edges
*/

function FloydWarshall( graph ){

	// 2. Reset
	graph.resetAnalysis();

	var N = graph.U.nodes.cO.L;
	// "Clean" the id's of the Nodes so that they index at 0
	var count = 0;
	$.each( N, function(i,v){
		v.A.id = count;
		graph.indexToPtr.push( v );
		count += 1;
	});

	// 3. Setup for analysis
	// Make Matrices
	var V = new algMatrix().makeNbyN( N.length, -1 );
	var dist = new algMatrix().makeNbyN( N.length, 100000000 );
	var pred = new algMatrix().makeNbyN( N.length, -1 );

	// Setup the Matrices
	$.each( N, function(i,u){
		oN = u.getLinkedNodesOut(); // Only looking for nodes linking 'out'
		$.each( oN, function(i,v){
			var e = v.getLinkingEdgeByPtr(u);
			V.set( u.A.id, v.A.id, e.getDist() );
			dist.set( u.A.id, v.A.id, e.getDist() );
			pred.set( u.A.id, v.A.id, u.A.id);
		});
	});
	for( var i=0; i< N.length; i++)
		dist.set( i, i, 0);

	// 4. Run
	for( var t=0; t< V.E.length; t++){
		for( var u=0; u< V.E.length; u++){
			for( var v=0; v< V.E.length; v++){
				var newLen = dist.get(u,t) + dist.get(t,v);
				if( newLen < dist.get(u,v) ) {
					dist.set(u,v, newLen);
					pred.set(u,v, pred.get(t,v) );
				}
			}
		}
	}

	// 5. Output Results
	graph.predMatrix = pred;
	graph.distMatrix = dist;
	
};