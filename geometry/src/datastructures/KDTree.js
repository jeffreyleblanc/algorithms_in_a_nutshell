/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

// http://en.wikipedia.org/wiki/K-d_tree


function generateKDTree( points ){

	if( points.length  == 0 ) return null;

	// Median will be the root:
	var maxD = 2 + 1; // hardcoded...
	var tree = new KDTree( maxD );

	// we need comparators for each dimension!
	var comparators = [
		function( p1, p2 ){
			$.C('1: '+p1.a_id);
			$.C('2: '+p2.a_id);
			if( p1.x() > p2.x() ) return 1; // handle this better
			else if( p1.x() < p2.x() ) return -1;
			else{
				if( p1.y() > p2.y() ) return 1;
				else return -1;
			}
		},
		function( p1, p2 ){
			$.C('1: '+p1.a_id);
			$.C('2: '+p2.a_id);
			if( p1.y() > p2.y() ) return 1; //handle this better
			else if( p1.y() < p2.y() ) return -1;
			else{
				if( p1.x() > p2.x() ) return 1;
				else return -1;
			}
		}
	];

	tree.setRoot( generate(1, maxD, points, 0, points.length-1, comparators ) );
	return tree;
};

function generate( d, maxD, points, left, right, comparators){

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
		generate( d, maxD, points, left, m-1, comparators )
	);
	dm.setAbove(
		generate( d, maxD, points, m+1, right, comparators )
	);
	return dm;

};


;(function(){var root=this;
	
	root.KDTree = aObj.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'KDTree'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				Q.root = null;
				Q.maxDim = undefined;

				Q.entries = [];
			},

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

			parent : function( pnt ){ var Q=this;
				// Complicated code to go here!
				// return KDNode*
			},

			getRoot : function( ){ var Q=this;
				return Q.root;
			},

			setRoot : function( node ){ var Q=this;
				Q.root = node;
			},

			nearest : function( pnt ){ var Q=this;
				// Complicated code to go here!
				// return KDNode*
			},

			search : function( hypercube ){ var Q=this;
				// return xPoint[]
			}

			
	});
	
}).call(this);