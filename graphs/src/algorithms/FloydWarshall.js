

function FloydWarshall( graph ){

	var log = true;

	var NN = graph.U.nodes.cO.L;

	// "Clean" the id's of the Nodes so that they index at 0
	var count = 0;
	$.each( NN, function(i,v){
		v.A.id = count;
		graph.indexToPtr.push( v );
		count += 1;
	});

	// Make a l by l array
	var V = new algMatrix().makeNbyN( NN.length, -1 );
	var dist = new algMatrix().makeNbyN( NN.length, 100000000 );
	var pred = new algMatrix().makeNbyN( NN.length, -1 );
	//printNbyN( V );

	// Setup the Matrices
	$.each( NN, function(i,u){
		N = u.getLinkedNodesOut(); // Only looking for nodes linking 'out'
		$.each( N, function(i,v){
			var e = v.getLinkingEdgeByPtr(u);
			V.E[u.A.id][v.A.id] = e.currDist;
			dist.E[u.A.id][v.A.id] = e.currDist;
			pred.E[u.A.id][v.A.id] = u.A.id
		});
	});
	for( var i=0; i< NN.length; i++)
		dist.E[i][i] = 0;

	// Log the initial setup
	if( log ){
		$.C('INIT===================================');
		$.C('V');
		//printNbyN( V );
		V.print();
		$.C('dist');
		//printNbyN( dist );
		dist.print();
		$.C('pred');
		//printNbyN( pred );
		pred.print();
		$.C('END INIT===================================');
	}

	// Do it
	for( var t=0; t< V.E.length; t++){
		for( var u=0; u< V.E.length; u++){
			for( var v=0; v< V.E.length; v++){
				var newLen = dist.E[u][t] + dist.E[t][v];
				if( newLen < dist.E[u][v]){
					dist.E[u][v] = newLen;
					pred.E[u][v] = pred.E[t][v];
				}
			}
		}
	}

	// Set up predPath for each node
	graph.predMatrix = pred;
	graph.distMatrix = dist;
	
	// log the Results
	if( log ){
		$.C('RESULT ===================================');
		$.C('dist');
		//printNbyN( dist );
		dist.print();
		$.C('pred');
		//printNbyN( pred );
		pred.print();
		$.C('END RESULT ===================================');
	}
};