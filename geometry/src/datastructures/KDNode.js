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

			isBellow : function( pnt ){var Q=this;
				// do stuff
				// return boolean
			},

			search : function( hypercube, pntlist ){var Q=this;
				// do stuff
			},

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