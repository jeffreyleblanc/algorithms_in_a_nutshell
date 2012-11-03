/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

;(function(){var root=this;
	
	root.algGraph = xGraph.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'algGraph'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();

				//-- Analysis
					Q.indexToPtr = [];
					Q.predMatrix = null;
					Q.distMatrix = null;
				/// move to aGraph
					Q.s = null; // sink node;
					Q.t = null; // target node;
			},
			

		//== Analysis =====================================================//

			getPathBetween : function( s, t){var Q=this;
				var s_id = s.A.id;
				var t_id = t.A.id;

				var npath = []	// save the nodes we travese
				var epath = []; // save the edges we traverse

				console.log( Q.predMatrix );
				console.log( Q.predMatrix.E[1][1] ); 

				npath.push( t );
				while( t != s ){
					t_id = Q.predMatrix.E[s.A.id][t.A.id];
					$.C('stuff');
					$.C(t_id);
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
				return new algEdge();
			},
			
			getNewNode : function(){
				return new algNode();
			},

		//-- Render --------------------------------//
			
			render : function(){ var Q=this;
				Q.$super();

				//-- render focus
					if( Q.s !=  null ){
						Q.rndr.circle(Q.s.pos(),30,null,'green',3);
					}
					if( Q.t !=  null ){
						Q.rndr.circle(Q.t.pos(),30,null,'yellow',3);
					}
			},

		//-- Contains --------------------------------//

			
			//-- Linking --------------------------------//
				
				
				handleLinkUpdate : function( ptr ){var Q=this;
					if(!$.isDerivedFrom(ptr,'algNode')) return;
					if(Q.linkfocus != null){
						if( Q.linkfocus==ptr){
							Q.linkfocus.readytolink = false;
							Q.linkfocus=null;
						}else{
							Q.linkNodes(Q.linkfocus, ptr);
							Q.linkfocus.readytolink = false;
							Q.linkfocus = null;
						}
					}else{
						Q.linkfocus = ptr;
						Q.linkfocus.readytolink = true;
					}
				}

	});
	
}).call(this);