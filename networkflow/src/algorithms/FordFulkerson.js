/*
	Calculates maximum flow from a source to a sink through
	a directed graph
*/

function FordFulkerson( graph ){

	compute( graph );
};

function compute( graph ){

	while( findAugmentingPath( graph ) ){
		processPath();
	}
};

// Note that the path is encoded in the graph nodes, and so not passed in
function processPath( ){

	// Step 1 : determine maximum additional flow along the path
	var v =  graph.sink();
	var delta = 100000000;
	while( v != graph.source() ){

		// get node previous to v in path we assume path ( sink to source )
		var u = v.I;
		if( u == null || u == undefined){ $.C("ERR"); return; }
		var e = u.getLinkingEdgeByPtr( v );

		var t = 0;
		if( v.Idir == "FORWARD"){
			t = e.P.capacity - e.flow;
		}else{
			t = -1.0 * e.flow;
		}

		if( t < delta )
			delta = t;

		v = u;
	};

	// Step 2 : assign the maximum additional flow along the path
	v = graph.sink();
	while( v != graph.source() ){

		// get node previous to v in path we assume path ( sink to source )
		var u = v.I;
		if( u == null || u == undefined){$.C("ERR"); return; }
		var e = u.getLinkingEdgeByPtr( v );

		var t = 0;
		if( v.Idir == 'FORWARD' ){
			e.flow += delta;
		}else{
			e.flow -= delta;
		}

		v = u;
	}
};

function findAugmentingPath( graph ) {

	// Reset the path to null
	var VL = graph.U.nodes.cO.L;
	$.each( VL, function(k,v){
		v.I = null;
	});

    // Begin the potential augmenting path at source with as much flow as possible.
	var path = [];
	path.push( graph.source() );

	// Process forward edges from u; then try backward edges
	while( path.length != 0 ){
		
		var u = path.pop();
		
		// try to make forward progress first...
		var it = u.getLinkedNodesOut();
		while( it.length != 0 ){
			
			var v = it.pop();
			var e = v.getLinkingEdgeByPtr( u );
			
			// not yet visited AND has unused capacity? Plan to increase.
			if( v.I == null && e.P.capacity > e.flow ){
				v.I = u;
				v.Idir = 'FORWARD';
				if( v == graph.sink() ){ 
					return true; // We have found a augmentation path
				}
				path.push( v );
			}
		}
		
		// try backward edges
		it = u.getLinkedNodesIn();
		while( it.length != 0 ){

			// try to find an incoming edge into u whose flow can be reduced.
			var v = it.pop();
			var e = v.getLinkingEdgeByPtr( u );
			
			if( v.I == null && e.flow > 0 ){
				v.I = u;
				path.push( v );
			}
		}
	}
	// No Path found
	return false;
};




