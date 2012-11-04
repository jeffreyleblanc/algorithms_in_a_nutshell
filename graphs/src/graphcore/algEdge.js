/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.algEdge = xEdge.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'algEdge'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(){var Q=this;
				Q.$super();

				Q.useCurrDist = true;
				Q._dist = 1; // used if above is false

			},

		//-- distance ------------------------------------------------//

			getDist : function(){
				return ( this.useCurrDist ? this.currDist : this._dist );
			}
			
	});

}).call(this);