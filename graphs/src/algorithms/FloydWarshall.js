
function makeNbyN( N, seed ){
	A = [];
	seed = seed||0;
	for(var i=0; i<N; i++){
		A.push( [] );
		for(var j=0; j<N; j++){
			A[i].push( seed );
		}
	}
	return A;
};

function printNbyN( M ){
	var tmpStr = ''
	var l = M.length;
	for(var i=0; i<l; i++){
		tmpStr = '['+i+'] ';
		for(var j=0; j<l; j++){
			if( M[i][j] > 100000 )
				tmpStr += '-\t';
			else
				tmpStr += Math.round( M[i][j] )+'\t';
		}
		$.C( tmpStr );
		
	}
}


function FloydWarshall( graph ){

	var NN = graph.U.nodes.cO.L;

	// "Clean" the id's of the Nodes so that they index at 0
	var count = 0;
	$.each( NN, function(i,v){
		v.a_id = count;
		count += 1;
	});

	// Make a l by l array
	V = makeNbyN( NN.length, -1 );
	dist = makeNbyN( NN.length, 100000000 );
	pred = makeNbyN( NN.length, -1 );
	printNbyN( V );

	// Set the Matrix
	/*
	We need to get linked Nodes OUT and IN as seperate lists
	*/
	$.each( NN, function(i,u){
		N = u.getLinkedNodesOut(); //getLinkedNodes();
		$.each( N, function(i,v){
			var e = v.getLinkingEdgeByPtr(u);
			V[u.a_id][v.a_id] = e.currDist;
			dist[u.a_id][v.a_id] = e.currDist;
			pred[u.a_id][v.a_id] = u.a_id
		});
	});
	for( var i=0; i< NN.length; i++)
		dist[i][i] = 0;

	$.C('V');
	printNbyN( V );
	$.C('dist');
	printNbyN( dist );
	$.C('pred');
	printNbyN( pred );

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
	$.C('===================================');
	$.C('dist');
	printNbyN( dist );
	$.C('pred');
	printNbyN( pred );

	/*$.each( V, function(i,v){
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
	}*/
}