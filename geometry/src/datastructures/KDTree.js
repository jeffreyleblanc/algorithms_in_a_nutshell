/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

// http://en.wikipedia.org/wiki/K-d_tree

;(function(){var root=this;
	
	root.KDTree = aObj.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'KDTree',
				comparators : [
					function( p1, p2 ){
						return ( p1.x()>p2.x() ? 1: (
							p1.x()<p2.x() ? -1 :
								( p1.y()>p1.y()? 1 : -1 )))
					},
					function( p1, p2 ){
						return ( p1.y()>p2.y() ? 1: (
							p1.y()<p2.y() ? -1 :
								( p1.x()>p1.x()? 1 : -1 )))
					}
				]
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				Q.root = null;
				Q.maxDim = undefined;
				Q.entries = [];
			},

			generate : function( points ){var Q=this;

				if( points.length  == 0 ) return;

				maxDim = 2 + 1; // hardcoded...

				Q.setRoot( Q.generateNode(1, maxDim, points, 0, points.length-1, Q.$class.comparators ) );
				
				// For the moment we will add something similar to the drawing code
				// in xPlane to determine the regions for each node
				// at some point that could probably be done within the
				// generateNode sequence
				Q.setBounds( Q.root, null, false, 0, 1000, 00, 1000 );

				return Q;
			},

			generateNode : function( d, maxD, points, left, right, comparators){var Q=this;

				// Handle simple cases
				if( right < left ) return null;
				if( right == left ) return new KDNode().i( d, points[left] );

				// Order the array[left,right] so the mth element will be the median
				// and the elements prior to it will be <=, though they won't neccessarily
				// be sorted; similarly, the elements afer will all be >=
				var m = left+Math.floor((1+right-left)/2);
				splitaboutKth( points, left, right, m, comparators[d-1] );

				// Median point on this dimension becomes parent
				var dm = new KDNode().i( d, points[m]);

				// Update to the next dimension, or reset back to 1
				d += 1;
				if( d >= maxD ){ d = 1; }

				// recursively compute the left and right sub-trees, which translate
				// into 'below' and 'above' for n-dimensions
				dm.setBelow(
					Q.generateNode( d, maxD, points, left, m-1, comparators )
				);
				dm.setAbove(
					Q.generateNode( d, maxD, points, m+1, right, comparators )
				);
				return dm;

			},
			
			setBounds : function( p, pn, isAbove, xMin, xMax, yMin, yMax ){var Q=this;

				if( p==undefined || p==null ) return;

				p.region.i( xMin, xMax, yMin, yMax );

				var coor = 0;
				if( p.dimension == 1 )
					coor = p.point.pos().x;
				else
					coor = p.point.pos().y;
				
				// Iterate
				if( p.dimension == 1){ // splitting along x
					Q.setBounds( p.above, p, true, coor, xMax, yMin, yMax );
					Q.setBounds( p.below, p, false, xMin, coor, yMin, yMax  );
				}else{
					Q.setBounds( p.above, p, true, xMin, xMax, coor, yMax );
					Q.setBounds( p.below, p, false, xMin, xMax, yMin, coor  );
				}
			},


		//-- Accessors -------------------------------------------//

			dump : function(){var Q=this;

				$.C('dumping tree...');
				Q.root?Q.root.dump():$.C('empty');
			},
			
			removeAll : function(){var Q=this;
				Q.root = null;
				$.each( Q.entries, function(k,n){
					n.clearLinks();
				});
				delete Q.entries;
				Q.entries = null;
			},

			insert : function( pnt ){var Q=this;
				// Complicated code to go here!
			},

			// Pass in a xPoint instance, and you get back the node
			// that control that region
			parent : function( pnt ){ var Q=this;
				
				node = Q.root;
				next = null;
				while( node != null ){

					if( node.isBelow(pnt) ){
						next = node.getBelow();
						if (next == null) {
							return node;
						} else {
							node = next;
						}
					} else {
						next = node.getAbove();
						if (next == null) {
							return node;
						} else {
							node = next;
						}
					}
				}
				// An issue if we get here
				$.C('Issue');
			},

			getRoot : function( ){ var Q=this;
				return Q.root;
			},

			setRoot : function( node ){ var Q=this;
				Q.root = node;
			},

		//-- Query and Search -------------------------------------------//

			nearest : function( pnt ){ var Q=this;
				if (root == null || pnt == null) return null;
				// find parent node to which pnt would have been inserted. This is our
			    // best shot at locating closest point; compute best distance guess so far
				var parent = Q.parent(pnt);
				var result = parent.point;
				var smallest = pnt.distance(result);

				$.C('parent is:')
				$.C('a_id: '+parent.point.a_id);
				$.C('dist is: '+smallest );
				
				var betterOne = Q.root.nearest( pnt, smallest );
				if( betterOne != null || betterOne != undefined){
					$.C('found better:')
					$.C('id: '+betterOne.a_id);
				}

			},

			search : function( testregion ){ var Q=this;
				var results = [];
				if( Q.root == null ) return results;
				Q.root.search( testregion, results);
				return results;
			}
			
	});
	
}).call(this);