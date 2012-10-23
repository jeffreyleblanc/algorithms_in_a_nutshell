

function FloydWarshall( graph ){

	var log = true;

	var NN = graph.U.nodes.cO.L;

	// "Clean" the id's of the Nodes so that they index at 0
	var count = 0;
	$.each( NN, function(i,v){
		v.a_id = count;
		graph.indexToPtr.push( v );
		count += 1;
	});

	// Make a l by l array
	V = makeNbyN( NN.length, -1 );
	dist = makeNbyN( NN.length, 100000000 );
	pred = makeNbyN( NN.length, -1 );
	//printNbyN( V );

	// Setup the Matrices
	$.each( NN, function(i,u){
		N = u.getLinkedNodesOut(); // Only looking for nodes linking 'out'
		$.each( N, function(i,v){
			var e = v.getLinkingEdgeByPtr(u);
			V[u.a_id][v.a_id] = e.currDist;
			dist[u.a_id][v.a_id] = e.currDist;
			pred[u.a_id][v.a_id] = u.a_id
		});
	});
	for( var i=0; i< NN.length; i++)
		dist[i][i] = 0;

	// Log the initial setup
	if( log ){
		$.C('V');
		printNbyN( V );
		$.C('dist');
		printNbyN( dist );
		$.C('pred');
		printNbyN( pred );
	}

	// Do it
	for( var t=0; t< V.length; t++){
		for( var u=0; u< V.length; u++){
			for( var v=0; v< V.length; v++){
				var newLen = dist[u][t] + dist[t][v];
				if( newLen < dist[u][v]){
					dist[u][v] = newLen;
					pred[u][v] = pred[t][v];
				}
			}
		}
	}

	// Set up predPath for each node
	graph.predMatrix = pred;
	graph.distMatrix = dist;
	
	// log the Results
	if( log ){
		$.C('===================================');
		$.C('dist');
		printNbyN( dist );
		$.C('pred');
		printNbyN( pred );
	}
};