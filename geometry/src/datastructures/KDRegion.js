/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

;(function(){var root=this;
	
	root.KDRegion = vObj.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'KDRegion'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				Q.left = 0;
				Q.right = 0;
				Q.bottom = 0;
				Q.top = 0;
			},

			setInfin : function(){var Q=this;
				Q.left = -1000;
				Q.right = 2000;
				Q.bottom = -1000; // Remember y reversal
				Q.top = 2000;
				return Q;
			},
			
			i : function( l, r, b, t ){var Q=this;
				Q.left = l;
				Q.right = r;
				Q.bottom = b;
				Q.top = t;
				return Q;
			},

		//-- Tests -----------------------------------------------//

			intersects : function( p ){var Q=this;
				var x = p.pos().x;
				var y = p.pos().y;
				
				return (x >= Q.left) && (x <= Q.right) && (y >= Q.bottom) && (y <= Q.top);
			},

			ontains : function( region ){var Q=this;
				var rl = r.left;
				var rr = r.right;
				if(Q.left <= rl && rl <= rr && rr <= Q.right) {
					var rb = r.bottom;
					var rt = r.top;
					if( Q.bottom <= rb && rb <= rt && rt <= Q.top)
						return true;
				}
				return false;
			},

			equals : function( other ){var Q=this;
					
				return Q.left == other.left &&
					Q.bottom == other.bottom &&
					Q.right == other.right &&
					Q.top == other.top;
			},

			print : function(){var Q=this;
				$.C( "[" + Q.left + "," + Q.bottom + " : " + Q.right + "," + Q.top + "]" );
			}
			
	});
	
}).call(this);
