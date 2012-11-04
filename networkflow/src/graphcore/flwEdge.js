/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.flwEdge = algEdge.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'flwEdge'
			},

			initialize : function(){var Q=this;
				Q.$super();

				Q.flow = 0;
				Q.P.capacity = 100;
			},

		//-- render ------------------------------------------------//

			render : function(){var Q=this;
				Q.$super();
				Q.renderFlow();
			},

			renderFlow : function(){var Q=this;
				Q.ctx.save();
				Q.ctx.translate( 0.5*Q.currDist , 0.0 );
				
				// Render Text
				this.ctx.fillStyle = 'White';
				Q.ctx.fillText(Q.flow+ ' / '+Q.P.capacity,0,0);

				Q.ctx.restore();
			}
			
	});

}).call(this);