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
				
				Q.point = null; 			// xPoint
				Q.dimension = 2; 			// hard coded!
				Q.max = undefined;			// int
				Q.coordinate = undefined; 	// double
				Q.region = new KDRegion(); 	// region

				Q.below = null; //KDNode
				Q.above = null; //KDNode

			},
			
			i : function( dim, pnt ){var Q=this;
				Q.dimension = dim;
				Q.point = pnt;
				pnt.kdnode = Q; // backward assign;
				return Q;
			},

		//-- Accessors ------------------------------------------------//

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

		//-- Query and Search ------------------------------------------------//

			isBelow : function( pnt ){var Q=this;
				if( Q.dimension == 1)
					return pnt.pos().x < Q.point.pos().x;
				else
					return pnt.pos().y < Q.point.pos().y;
			},

			search : function( space, results ){var Q=this;
				// Wholly contained? Take all descendant points
				if( space.contains( Q.region ) ){
					Q.drain( results );
					return;
				}

				// OK. Is our point, at least contained?
				if( space.intersects( Q.point )) {
					results.push( Q.point );
				}

				// recursively progress along both ancestral trees, if demanded. Note that
				// the cost in manipulating space to be "cropped" to the proper structure
				// is excessive and leaving it alone has no bearing on the computation.
				if( Q.dimension == 1){
					var coord = Q.point.pos().x;
					if( space.left < coord) {
						if( Q.below != null) { Q.below.search( space, results); }
					}
					if( coord < space.right ) {
						if( Q.above != null) { Q.above.search(space, results); }
					}
				}else{
					var coord = Q.point.pos().y;
					if( space.bottom < coord) {
						if( Q.below != null) { Q.below.search( space, results); }
					}
					if( coord < space.top ) {
						if( Q.above != null) { Q.above.search(space, results); }
					}
				}
			},

			nearest : function( pnt, min ){var Q=this;

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
					if( Q.above != null ){
						var pt = Q.above.nearest( pnt, min );
						if(pt!=null){result = pt;}
					}
					if( Q.below != null ){
						var pt = Q.below.nearest( pnt, min );
						if(pt!=null){result = pt;}
					}	
				}else{
					if( Q.isBelow( pnt) && Q.below != null ){
						pt = Q.below.nearest(pnt, min);
					}else if(Q.above != null){
						pt = Q.above.nearest(pnt, min);
					}
					if(pt!=null){result = pt;}
				}
				return result;
			},

		//-- Helper Methods ------------------------------------------------//

			// Helper method to visit all descendant nodes in the tree rooted at given node.
			drain : function( results ){var Q=this;
				if( Q.below != null) { Q.below.drain(results); }
				results.push(Q.point);
				if( Q.above != null) { Q.above.drain(results); }
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

		//-- Not implemented ------------------------------------------------//

			isBoundless : function(){var Q=this;
				// return boolean
			},

			isLeaf : function(){var Q=this;
				// return boolean
			},

			shorter : function( numlist, num){ 
				// does something....
			}
			
	});
	
}).call(this);


