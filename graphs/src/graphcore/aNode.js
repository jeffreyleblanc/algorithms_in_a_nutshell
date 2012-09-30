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

				//-- ANALYSIS TOOLS

					Q.pred = null;//-1;
					Q.discovered = -1;
					Q.finished = -1;
					Q.color = '-'; //'W', 'G', 'K'

					Q.dist = 0;

					Q.a_id = Q.$class.$count;
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