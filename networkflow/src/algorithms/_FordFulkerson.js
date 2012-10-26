
/*
	THIS IS SIMPLY AN UNCLEANED UP VERSION
*/

function FordFulkerson( graph ){

	compute( graph );
};

function compute( graph ){

	while( findAugmentingPath( graph)){
		processPath( path );
	}
}

function processPath( path ){

	$.C('-- process path!');

	var v =  graph.t;
	var delta = 100000000; // Reset anywhere in the loop? not sure need to check...

	$.C('- Step 1 : determine maximum additional flow along the path');

	while( v != graph.s ){

		$.C('Handling: '+v.a_id );

		// get node previous to v in path we assume path ( sink to source )
		var u = v.I;
		if( u == null || u == undefined){
			$.C("ERR"); return;
		}
		var e = u.getLinkingEdgeByPtr( v );

		var t = 0;
		if( v.Idir == "FORWARD"){
			t = e.P.capacity - e.flow;
			$.C(' FWD');
		}else{
			t = -1.0 * e.flow; // NOT SURE ABOUT THIS...
			$.C(' BCK');
		}

		if( t < delta )
			delta = t;

		$.C('delta is: '+delta);

		v = u;
	}

	$.C('final step 1 delta is: '+delta);

	$.C('- Step 2 : assign the maximum additional flow along the path');
	
	v = graph.t;
	while( v != graph.s ){
		// get node previous to v in path we assume path ( sink to source )

		$.C('Handling: '+v.a_id );

		var u = v.I;
		if( u == null || u == undefined){
			$.C("ERR"); return;
		}
		var e = u.getLinkingEdgeByPtr( v );


		var t = 0;
		if( v.Idir == 'FORWARD' ){
			e.flow += delta;
			$.C(' FWD');
		}else{
			e.flow -= delta;
			$.C(' BCK');
		}

		$.C('delta is: '+delta);
		$.C('flow is: '+e.flow);

		v = u;
	}
	

}

//function findAugmentingPath( VertexInfo []vertices) {
function findAugmentingPath( graph ) {

		$.C('-- Find augmenting path!');

		


		var VL = graph.U.nodes.cO.L;
		/* Null out the path */
		$.each( VL, function(k,v){
			v.I = null;
		});

	    // Begin the potential augmenting path at source with as much flow as possible.
		///vertices[sourceIndex] = new VertexInfo (-1);
		graph.s.I = null;
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
				/*if (vertices[v] == null && ei.P.capacity > ei.flow) {
					vertices[v] = new VertexInfo (u, FORWARD);

					if (v == sinkIndex) { return true; }  // we have found one!
					path.push (v);
				}*/
				/*if( v.I == null ){
					$.C("V I is null");
				}
				if( e.P.capacity > e.flow ){
					$.C( "YES!");
				}*/
				
				// not yet visited AND has unused capacity? Plan to increase.
				if( v.I == null && e.P.capacity > e.flow ){
					$.C( "DO!");
					v.I = u; // FORWARD?
					v.Idir = 'FORWARD';
					if( v == graph.t ){ 
						$.C("We have found a path!");
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
					v.I = u;
					v.Idir = 'BACK';
					path.push( v );
				}
			}
		}
		// nothing
		$.C("FOUND NOTHING TO DO...")
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
				if (vertices[v] == null && ei.P.capacity > ei.flow) {
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