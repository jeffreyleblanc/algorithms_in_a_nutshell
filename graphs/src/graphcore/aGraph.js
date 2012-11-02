/*
* thexel - aGraph.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.aGraph = aObj.$extend({
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'aGraph'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				//-- Particle and Spring Containers
					Q.U.edges = null;
					Q.U.nodes = null;

				//-- Analysis
					Q.indexToPtr = [];
					Q.predMatrix = null;
					Q.distMatrix = null;
			},
			
			postInitialize : function(){var Q=this;
				if(!Q.setByJson){
					//-- Create containers
					Q.U.edges = new aObj();
					Q.addC( Q.U.edges );
					Q.U.nodes = new aObj();
					Q.addC( Q.U.nodes );
				}
			},

		//== Analysis =====================================================//

			getPathBetween : function( s, t){var Q=this;
				var s_id = s.A.id;
				var t_id = t.A.id;

				var npath = []	// save the nodes we travese
				var epath = []; // save the edges we traverse

				npath.push( t );
				while( t != s ){
					t_id = Q.predMatrix[s.A.id][t.A.id];
					if( t_id == -1 ) return null;
					var tmpE = t.getLinkingEdgeByPtr( Q.indexToPtr[t_id] );
					t = Q.indexToPtr[t_id];
					npath.push( Q.indexToPtr[t_id]);
					epath.push( tmpE);
				}
				return {
					'nodes' : npath,
					'edges' : epath
				};
			},
			
		//-- get New Instances --------------------------------//
	
			getNewEdge : function(){
				return new aEdge();
			},
			
			getNewNode : function(){
				return new aNode();
			},
			
		//-- Add/Remove --------------------------------//
		
			addNode : function( n ){ var Q=this;
				Q.U.nodes.addC(n);
				n.setGraph(Q);
			},
			
			addEdge : function( e ){ var Q=this;
				Q.U.edges.addC(e);
				e.setGraph(Q);
			},
			
			//!-- NOTE REMOVAL FUNCTIONS TAKE CARE OF THEMSELVES
			/*
				e.g. node.del() and edge.del() will do the right thing by unwinding any connections
			*/
		
		//-- Linking Utilities --------------------------------//
			
			linkNodes : function( n1, n2 ){var Q=this;
				var tmpE = Q.getNewEdge();
				Q.addEdge( tmpE );
				tmpE.attach(n1, n2);
				return tmpE;
			},
		
		//-- Access --------------------------------//
			
			eachNodes : function(fn){var Q=this;
				Q.U.nodes.cO.each( function(i,e){
					return fn(i,e);
				});
			},
			
			convoluteNodes : function(fn){var Q=this;
				Q.U.nodes.cO.convolute( function(n1,n2,i,j){
					return fn(n1,n2,i,j);
				});
			},
			
			eachEdges : function(fn){var Q=this;
				Q.U.edges.cO.each( function(i,e){
					return fn(i,e);
				});
			}
				
	});
		
}).call(this);