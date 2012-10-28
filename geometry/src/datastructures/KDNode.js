/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

;(function(){var root=this;
	
	root.KDNode = aObj.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'KDNode'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				Q.point = null; // xPoint
				Q.dimension = 2; // hard coded!
				Q.max = undefined;	// int
				Q.coordinate = undefined; //double
				Q.region = null; //HyperCube

				Q.below = null; //KDNode
				Q.above = null; //KDNode

				Q.cached = []; // double[]
			},
			
			i : function( dim, pnt ){var Q=this;
				// Complicated code to go here!
				Q.dimension = dim;
				Q.point = pnt;

				pnt.kdnode = Q; // backward assign;

				return Q;
			},

			dump : function(){var Q=this;
				$.C('-N->');
					if( Q.point != null )
						$.C('point: '+Q.point.a_id);
					$.C('dim: '+Q.dimension);
					$.C('above: '+ ((Q.above!=null)?Q.above.point.a_id:'null'));
					$.C('below: '+ ((Q.below!=null)?Q.below.point.a_id:'null'));
				$.C('-N-<');
				if(Q.above!=null)Q.above.dump();
				if(Q.below!=null)Q.below.dump();
			},

			getBelow : function(){
				return this.below;
			},

			setBelow : function( node ){
				this.below = node;
			},

			getAbove : function(){
				return this.above;
			},

			setAbove : function( node ){
				this.above = node;
			},

			region : function(){
				return this.region;
			},

			isBelow : function( pnt ){var Q=this;
				if( Q.dimension == 1)
					return pnt.pos().x < Q.point.pos().x;
				else
					return pnt.pos().y < Q.point.pos().y;
			},

			search : function( hypercube, pntlist ){var Q=this;
				// do stuff
			},
/*
public void search (IHypercube space, ArrayList<IMultiPoint> results) {
	// Wholly contained? Take all descendant points		
	if (space.contains (region)) {
		this.drain(results);
		return;
	}

	// OK. Is our point, at least contained?
	if (space.intersects (cached)) {
		results.add(point);
	}

	// recursively progress along both ancestral trees, if demanded. Note that
	// the cost in manipulating space to be "cropped" to the proper structure
	// is excessive and leaving it alone has no bearing on the computation.
	if (space.getLeft(dimension) < coord) {
		if (below != null) { below.search(space, results); }
	}
	if (coord < space.getRight(dimension)) {
		if (above != null) { above.search(space, results); }
	}
}
*/

/*
// Helper method to visit all descendant nodes in the tree rooted at given node.
private void drain(ArrayList<IMultiPoint> results) {
	if (below != null) { below.drain (results); }
	results.add(this.point);
	if (above != null) { above.drain (results); }
}
*/

			isBoundless : function(){var Q=this;
				// return boolean
			},

			isLeaf : function(){var Q=this;
				// return boolean
			},

			shorter : function( numlist, num){ 
				// does something....
			},

			nearest : function( pnt, min ){var Q=this;

				//$.C('TRY! :'+Q.point.a_id);

				var result = null; // NOTE THIS IS AN XPOINT

				var d = Q.point.distance( pnt );
				if( d < min ){
					result = Q.point;
					min = d;
				}

				var dp = 0;
				if( Q.dimension == 1 )
					dp = Math.abs( pnt.pos().x - Q.point.pos().x );
				else
					dp = Math.abs( pnt.pos().y - Q.point.pos().y );
				if( dp < min ){
					//$.C('dp < min');
					if( Q.above != null ){
						var pt = Q.above.nearest( pnt, min );
						if(pt!=null){result = pt;}
					}
					if( Q.below != null ){
						var pt = Q.below.nearest( pnt, min );
						if(pt!=null){result = pt;}
					}	
				}else{
					//$.C('try other');
					if( Q.isBelow( pnt) && Q.below != null ){
						pt = Q.below.nearest(pnt, min);
					}else if(Q.above != null){
						pt = Q.above.nearest(pnt, min);
					}
					if(pt!=null){result = pt;}
				}

				return result;

			},

			
	});
	
}).call(this);