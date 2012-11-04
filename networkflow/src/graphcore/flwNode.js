/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.flwNode = algNode.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'flwNode'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();

				Q.I = null; // for FordFulkerson path search
				Q.Idir = undefined; // For FordFulkerson search
			}
	
	});
	
}).call(this);