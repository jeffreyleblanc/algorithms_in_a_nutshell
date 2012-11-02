/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.aNode = aObj.$extend({
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'aNode'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
			
				//-- Containers
					Q.U.edges = new aList();
				//-- Pointer to Controller
					Q.U.graph = null; //-- Pointer to graph

				//== ANALYSIS TOOLS
					Q.A = {}; 	//-- Analysis tools container
					Q.A.id = Q.$class.$count;	// id of the node
					Q.A.pred = null;			// previous node
					Q.A.discovered = -1;		// whether a node has been discovered
					Q.A.finished = -1;			// done finding
					Q.A.color = '-'; 			//'W', 'G', 'K' : color, used to mark in searching
					Q.A.dist = 0;				// distance calculations
					
			},
			
			//?-- Delete Children Option?
			del : function(){ var Q=this; 
				//-- Remove any edge dependencies
				Q.U.edges.each_reverse( function(i,e){
					e.del();
				});
				//-- Call Super
				Q.$super();
			},

		//== Analysis =====================================================//

			
		//-- Graph Membership -------------------------------------------//
		
			setGraph : function(graph){var Q=this;
				Q.U.graph = graph;
			},
			
			getGraph : function(){
				return this.U.graph;
			},
		
		//-- Edge Connections -------------------------------------------//
		
			//!-- ADD ADD ADD
			//!-- How exactly use?
			onAlter : function(){var Q=this;
				
			},
		
			addEdge : function(edge){var Q=this;
				if( !Q.U.edges.find(edge))
					Q.U.edges.add(edge);
			},
			
			removeEdge : function(edge){var Q=this;
				Q.U.edges.rem(edge);
			},
			
			getLinkedNodes : function(){var Q=this;
				var L = [];
				Q.U.edges.each( function(i,e){
					L.push( e.getOther(Q) );
				});
				return L;
			},

			/* TEST > */

			//--  n1---n2, '-', '<', '>', '|'

			// n1

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

			/* < TEST */
			
			getLinkingEdge : function(n_idx, filter){var Q=this;
				return ($.ISatype(n_idx))?
					Q.getLinkingEdgeByPtr(n_idx) :
					Q.getLinkingEdgeByIdx(n_idx, filter);
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
			
			getLinkingEdgeByIdx : function(idx, filtern){ var Q=this;
				var resulte = null;
				if( Q.U.edges.size() < idx )
					if( Q.U.edges.at(idx) != filtern )
						resulte = Q.U.edges.at(idx);
				return resulte;
			}
	});
	
}).call(this);