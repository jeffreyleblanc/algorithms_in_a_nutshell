
function FordFulkerson( graph ){

	compute( graph );
};

function compute( graph ){

	while( findAugmentingPath( graph)){
		//processPath( path );
	}
}

function processPath( path ){

	var v =  graph.t;
	var delta = 100000000;

	while( v != graph.s ){
		// get node previous to v in path we assume path ( sink to source )
		/// No use I!!!
		var u =null;
		for(var i=0; i<path.length; i++){
			if( path[i] == v )
				u = path[i+1]; //obviously bad, but in theory check in while protects us
		}
		var e = u.getLinkingEdgeByPtr( v );
		var tmpN = e.n1();
		var t = 0;
		if( 
			( tmpN == u && ( e.dir() == '-' || e.dir() == '>')) ||
			( tmpN != u && ( e.dir() == '-' || e.dir() == '<'))
		)
			t = e.currDist - e.flow;
		else
			t = -1.0 * e.flow; // NOT SURE ABOUT THIS...

		if( t < delta )
			delta = t;

		v = u;
	}

	v = graph.t;
	while( v != graph.s ){
		// get node previous to v in path we assume path ( sink to source )
		///! NO this would use I!
		var u =null;
		for(var i=0; i<path.length; i++){
			if( path[i] == v )
				u = path[i+1]; //obviously bad, but in theory check in while protects us
		}
		var e = u.getLinkingEdgeByPtr( v );
		var tmpN = e.n1();
		var t = 0;
		if( 
			( tmpN == u && ( e.dir() == '-' || e.dir() == '>')) ||
			( tmpN != u && ( e.dir() == '-' || e.dir() == '<'))
		)
			e.flow += delta;
		else
			e.flow -= delta;

		if( t < delta )
			delta = t;

		v = u;
	}

}

//function findAugmentingPath( VertexInfo []vertices) {
function findAugmentingPath( graph ) {

		$.C('run!');

		var VL = graph.U.nodes.cO.L;

	    // Begin the potential augmenting path at source with as much flow as possible.
		///vertices[sourceIndex] = new VertexInfo (-1);
		graph.s.I = -1;
		///Stack<Integer> path = new Stack<Integer>();
		///path.push (sourceIndex);
		var path = [];
		path.push( graph.s );

		// Process forward edges from u; then try backward edges
		///VertexStructure struct[] = network.getEdgeStructure();
		// this is VL...

		///while (!path.isEmpty()) {
		while( path.length != 0 ){
			
			///int u = path.pop();
			var u = path.pop();
			
			// try to make forward progress first...
			///Iterator<EdgeInfo> it = struct[u].forward();
			var it = u.getLinkedNodesOut();
			///while (it.hasNext()) {
			while( it.length != 0 ){
				
				///EdgeInfo ei = it.next();
				///int v = ei.end;
				var v = it.pop();
				var e = v.getLinkingEdgeByPtr( u );
				$.C( e.n1().a_id + '-' + e.n2().a_id);
				
				// not yet visited AND has unused capacity? Plan to increase.
				/*if (vertices[v] == null && ei.capacity > ei.flow) {
					vertices[v] = new VertexInfo (u, FORWARD);

					if (v == sinkIndex) { return true; }  // we have found one!
					path.push (v);
				}*/
				/*if( v.I == null ){
					$.C("V I is null");
				}
				if( e.currDist > e.flow ){
					$.C( "YES!");
				}*/
				

				if( v.I == null && e.currDist > e.flow ){
					//$.C( "DO!");
					v.I = u; // FORWARD?
					if( v == graph.t ){ 
						$.C("We are done!");
						return true;
					}
					path.push( v );
				}
			}
			
			// try backward edges
			///it = struct[u].backward();
			it = u.getLinkedNodesIn();
			///while (it.hasNext()) {
			while( it.length != 0 ){
				// try to find an incoming edge into u whose flow can be reduced.
				///EdgeInfo rei = it.next();
				///int v = rei.start; 

				var v = it.pop();
				var e = v.getLinkingEdgeByPtr( u );
				$.C( e.id() );
				$.C( 'BACK!'+e.n1().a_id + '-' + e.n2().a_id);
				
				// now try backward edge not yet visited (can't be sink!)
				/*if (vertices[v] == null && rei.flow > 0) {
					vertices[v] = new VertexInfo (u, BACKWARD);
					path.push(v);
				}*/
				if( v.I == null && e.flow > 0 ){
					v.I = u; // FORWARD?
					path.push( v );
				}
			}
		}
		// nothing
		return false;
	}


/*
public boolean findAugmentingPath (VertexInfo []vertices) {
	    // Begin the potential augmenting path at source with as much flow as possible.
		vertices[sourceIndex] = new VertexInfo (-1);
		Stack<Integer> path = new Stack<Integer>();
		path.push (sourceIndex);

		// Process forward edges from u; then try backward edges
		VertexStructure struct[] = network.getEdgeStructure();
		while (!path.isEmpty()) {
			int u = path.pop();
			
			// try to make forward progress first...
			Iterator<EdgeInfo> it = struct[u].forward();
			while (it.hasNext()) {
				EdgeInfo ei = it.next();
				int v = ei.end;
				
				// not yet visited AND has unused capacity? Plan to increase.
				if (vertices[v] == null && ei.capacity > ei.flow) {
					vertices[v] = new VertexInfo (u, FORWARD);

					if (v == sinkIndex) { return true; }  // we have found one!
					path.push (v);
				}
			}
			
			// try backward edges
			it = struct[u].backward();
			while (it.hasNext()) {
				// try to find an incoming edge into u whose flow can be reduced.
				EdgeInfo rei = it.next();
				int v = rei.start;  
				
				// now try backward edge not yet visited (can't be sink!)
				if (vertices[v] == null && rei.flow > 0) {
					vertices[v] = new VertexInfo (u, BACKWARD);
					path.push(v);
				}
			}
		}
		
		// nothing
		return false;
	}
*/