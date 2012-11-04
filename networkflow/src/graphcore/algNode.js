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
					Q.A.type = ''				// used by DFS
					Q.A.color = '-'; 			//'W', 'G', 'K' : color, used to mark in searching
					Q.A.dist = 0;				// distance calculations
			},

			postInitialize : function(){var Q=this;
				//-- Make a popup text
					Q.txt = new j$();
					Q.txt.$e.css({"position":"absolute"})
						.addClass("graphAnalysis")
						.html( "---" );
					Q.txt.hide();
					Q.addC( Q.txt, false );
			},
			
			del : function(){ var Q=this;
				Q.txt.$e.remove();
				Q.txt.$e = null;
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
				Q.setAcolor();
				Q.renderAid();
				if( Q.txt.visible){
					var h = Q.txt.$e.h();
					var w = Q.txt.$e.w();
					Q.txt.$e.xy( Q.localToScreen().addN(vVec( -w/2 ,-2*Q.P.radius-h/2 )) );
				}
			},

			//! Shouldn't be done every loop
			setAcolor : function(){var Q=this;
				if( Q.A.color == 'W' )
					Q.P.fillcolor.RGBA(255,255,255,0.75);
				if( Q.A.color == 'G' )
					Q.P.fillcolor.RGBA(120,120,120,0.75);
				if( Q.A.color == 'K' )
					Q.P.fillcolor.RGBA(50,50,50,0.75);
				if( Q.A.color == '-' )
					Q.P.fillcolor.RGBA(0,0,200,0.5);
			},

			renderAid : function(){var Q=this;
				this.ctx.fillStyle = 'White';
				Q.ctx.fillText(Q.A.id,(Q.A.id>9?-4:-2),2);
			},

			setMetaText : function( str ){var Q=this;
				Q.txt.$e.html( str );
			},

		//-- Events ---------------------------------//

			// For some reason this is not inherited properly....
			eventDefaults : function(){return {

				mousedown : function( evt ){var Q=this;
					Q.cnvs.inspector.attach(Q);
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
				},

				mouseenter : function( evt ){var Q=this;
					Q.txt.show();
				},

				mouseleave : function( evt ){var Q=this;
					Q.txt.hide(); 
				},

			}}
	
	});
	
}).call(this);