/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.algNode = xNode.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'algNode'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();

				//== ANALYSIS TOOLS
					Q.A = {}; 	//-- Analysis tools container
					Q.A.id = Q.$class.$count;	// id of the node
					Q.A.pred = null;			// previous node
					Q.A.discovered = -1;		// whether a node has been discovered
					Q.A.finished = -1;			// done finding
					Q.A.color = '-'; 			//'W', 'G', 'K' : color, used to mark in searching
					Q.A.dist = 0;				// distance calculations
				
			},
			
			del : function(){ var Q=this;
				Q.$super();
			},

		//== Analysis =====================================================//
			
			getLinkedNodesOut : function(){var Q=this;
				var L = [];
				Q.U.edges.each( function(i,e){
					var tmpN = e.n1();
					if( 
						( tmpN == Q && ( e.dir() == '-' || e.dir() == '>')) ||
						( tmpN != Q && ( e.dir() == '-' || e.dir() == '<'))
					){
						L.push( e.getOther(Q) ); }
				});
				return L;
			},

			getLinkedNodesIn : function(){var Q=this;
				var L = [];
				Q.U.edges.each( function(i,e){
					var tmpN = e.n1();
					if( 
						( tmpN == Q && ( e.dir() == '-' || e.dir() == '<')) ||
						( tmpN != Q && ( e.dir() == '-' || e.dir() == '>'))
					){
						L.push( e.getOther(Q) ); }
				});
				return L;
			},

			//! FIXED ERROR HERE SHOULD FIX IN PHYCORE
			getLinkingEdgeByPtr : function(n){var Q=this;
				if(!n) return null;if(n==Q)return null;
				var resulte = null;
				Q.U.edges.each( function(i,e){
					if( e.has(n) ){
						resulte = e; return false; //-- Force exit
					}
				});
				return resulte;
			},

		//-- Render -------------------------------------------//
			
			render : function(){ var Q=this;
				Q.$super();				
				Q.a_setColor();
				Q.a_render();
			},

			a_setColor : function(){var Q=this;
				if( Q.A.color == 'W' )
					Q.P.fillcolor.RGBA(255,255,255,0.75);
				if( Q.A.color == 'G' )
					Q.P.fillcolor.RGBA(120,120,120,0.75);
				if( Q.A.color == 'K' )
					Q.P.fillcolor.RGBA(50,50,50,0.75);
				if( Q.A.color == '-' )
					Q.P.fillcolor.RGBA(0,0,200,0.5);
			},

			a_render : function(){var Q=this

				// Render Text
				this.ctx.fillStyle = 'White';

				/*
				//Depth First
				if( Q.pred == null )
					Q.ctx.fillText(Q.a_id+ ' # '+Q.finished,0,0);
				else
					Q.ctx.fillText(Q.a_id+' > '+Q.pred.a_id+ ' # '+Q.finished,0,0);
				*/

				// Breadth First
				if( Q.A.pred == null )
					Q.ctx.fillText(Q.A.id+ ' # '+Q.A.dist,0,0);
				else
					Q.ctx.fillText(Q.A.id+' > '+Q.A.pred.A.id+ ' # '+Q.A.dist,0,0);

			},

		//-- Events ---------------------------------//

			// For some reason this is not inherited properlly....
			eventDefaults : function(){return {

				mousedown : function( evt ){var Q=this;
					//-- could do setFocus...
					Q.cnvs.inspector.attach(Q);

					//! FOR ANALYSIS
					Q.U.graph.setFocus( Q );
				},

				mouseup : function( evt ){var Q=this;
					 //-- could do setFocus...
				},

				click : function( evt ){ var Q=this;
					switch( Q.U.graph.editState() ){
						case 'del':
							Q.del();
							break;
						case 'link':
							Q.U.graph.memberReportClick(Q);
							break;
					}
				}

			}}
	
	});
	
}).call(this);