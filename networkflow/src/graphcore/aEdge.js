/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.aEdge = aObj.$extend({
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'aEdge'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(){var Q=this;
				Q.$super();
				//-- Links
					Q.U.n1 = null; //-- Node 1
					Q.U.n2 = null; //-- Node 2
				//-- Graph
					Q.U.graph = null;
					
					
				//-- Directionality
					Q.P.dir = '-'; //--  n1---n2, '-', '<', '>', '|'

					Q.flow = 0;
			},
			
			//?-- Delete Children Option?
			del : function(){var Q=this;
				//-- Inform particles
					if(Q.U.n1 != null) Q.U.n1.removeEdge(Q);
					if(Q.U.n2 != null) Q.U.n2.removeEdge(Q);
				//-- Call Super
					Q.$super();
			},
			
		//-- Graph Membership  -------------------------------------------//
			
			setGraph : function(graph){var Q=this;
				Q.U.graph = graph;
			},
			
			getGraph : function(){
				return this.U.graph;
			},
			
		//-- Links -------------------------------------------//
		
			attach : function(n1, n2){var Q=this;
				Q.U.n1 = n1; n1.addEdge(Q);
				Q.U.n2 = n2; n2.addEdge(Q);	
			},
			
			has : function(n){var Q=this;
				return ( Q.U.n1==n || Q.U.n2==n );
			},
			
			getOther : function(n){var Q=this;
				if( Q.U.n1 == n ) return Q.U.n2;
				if( Q.U.n2 == n ) return Q.U.n1;
				return null;
			},
			
			isNull : function(){var Q=this;
				return (Q.U.n1 == null || Q.U.n2 == null )
			},
			
		//-- Getter/Setters  -------------------------------------------//
		
			n1 : function(n){var Q=this;
				if($.isDef(n)){
					if(Q.U.n1!=null)Q.U.n1.removeEdge(Q);
					Q.U.n1 = n; n.addEdge(Q);
				}
				return Q.U.n1;
			},
		
			n2 : function(n){var Q=this;
				if($.isDef(n)){
					if(Q.U.n2!=null)Q.U.n2.removeEdge(Q);
					Q.U.n2 = n; n.addEdge(Q);
				}
				return Q.U.n2;
			},
			
		//-- Directionality -------------------------------------------//
		
			dir : function( dir_ ){var Q=this;
				if(dir_==undefined){ return Q.P.dir; }
				else{
					Q.P.dir = dir_.replace('\n',''); //!-- handle newline error 
				}
			}
		
	});
	
}).call(this);