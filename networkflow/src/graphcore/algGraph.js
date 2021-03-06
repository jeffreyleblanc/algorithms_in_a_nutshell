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
				//-- Sink and Source
					Q.U._s = null; // sink node;
					Q.U._t = null; // target node;
					Q.nrSource = null;
					Q.nrSink = null;
			},

			postInitialize : function(){var Q=this;
				Q.$super();
				Q.makeRings();
			},

			postLink : function(){var Q=this;
				Q.linkRings();
			},

			del : function(){var Q=this;
				N = Q.U.nodes.cO.L;
				for( var i=N.length-1; i>-1; i--){
					N[i].del();
				}
				Q.U.nodes.clearC();
				Q.nrSink.del();
				Q.nrSource.del();
				
				this.$super();
			},

		//-- reset --------------------------------------------//

			resetAnalysis : function(){var Q=this;
				Q.eachEdges( function(i,e){
					e.color.RGBA(50,100,100,0.5);
				});
				Q.eachNodes( function(i,n){
					n.A.color = '-'; 
					n.P.fillcolor.RGBA(0,0,200,0.5);
				});
			},

		//-- Source and Sink --------------------------------------------//

			makeRings : function(){var Q=this;
				Q.nrSource = new algNodeRing();
				Q.nrSource.graph = Q;
				Q.nrSource.tgt = 'source';
				Q.addC( Q.nrSource, false );
				Q.nrSource.pos( vVec(35,35) );
				Q.nrSource.P.strokecolor = new vColor(0, 200, 0, 0.5);
				
				Q.nrSink = new algNodeRing();
				Q.nrSink.graph = Q;
				Q.nrSink.tgt = 'sink';
				Q.addC( Q.nrSink, false );
				Q.nrSink.pos( vVec(100,35) );
				Q.nrSink.P.strokecolor = new vColor(200, 0, 0, 0.5);
			},

			linkRings : function(){var Q=this;
				if( Q.U._s != null ){
					Q.nrSource.node = Q.U._s;
					Q.nrSource.locked = true;
				}
				if( Q.U._t != null ){
					Q.nrSink.node = Q.U._t;
					Q.nrSink.locked = true;
				}
			},

		//== Analysis =====================================================//

			source : function( n ){
				if( n === undefined )
					return this.U._s;
				else
					this.U._s = n;
			},
			sink : function( n ){
				if( n === undefined )
					return this.U._t;
				else
					this.U._t = n;
			},

			getPathBetween : function( s, t){var Q=this;
				var s_id = s.A.id;
				var t_id = t.A.id;

				var npath = []	// save the nodes we travese
				var epath = []; // save the edges we traverse

				npath.push( t );
				while( t != s ){
					t_id = Q.predMatrix.get(s.A.id, t.A.id);
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

				// Render focuses //! we are using rings now
				/*if( Q.U._s !=  null ){
					Q.rndr.circle( Q.U._s.pos() ,30,null,'green',3);
				}
				if( Q.U._t !=  null ){
					Q.rndr.circle( Q.U._t.pos() ,30,null,'yellow',3);
				}*/
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