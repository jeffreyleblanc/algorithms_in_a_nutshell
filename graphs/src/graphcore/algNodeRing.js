/*
* wickk - ellipse.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;

	root.algNodeRing = vObj.$extend({
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'algNodeRing'
			},

		//-- Constructor & Destructor ------------------------------------------------//

			initialize : function(a){var Q=this;
				Q.$super();
				//-- Interaction
					Q.draggable = true;		//-- Make it draggable
				//-- Attributes
					Q.P.fillcolor = new vColor(0,0,200,0.5);
					Q.P.strokecolor = new vColor(200, 0, 200, 0.5);
					Q.P.radius = 30;
				//-- Meta Variables
					Q.UserControlled = false;
					Q.renderStroke = false;

				Q.graph = null;
				Q.tgt = undefined;
				Q.locked = false;
			},

		//-- Render -------------------------------------------//

						
			render : function(){ var Q=this;					
				Q.renderCircle();
			},
			
			renderCircle : function(){var Q=this;
				//Q.rndr.circle(vVec(), Q.P.radius, Q.P.fillcolor.RGBA());
				//if(Q.mouseInside)
				Q.rndr.circle(vVec(), Q.P.radius-2.0,null,Q.P.strokecolor.RGBA(),4);
			},

			containsPnt : function( vec ){var Q=this;
				return (vec.lSQ() <= (Q.P.radius*Q.P.radius));
			},

		//-- Events ---------------------------------//

			eventDefaults : function(){return {
				mousedown : function( evt ){var Q=this;
					// nothing for now
					if( Q.locked && Q.tgt != undefined ){
						Q.graph[Q.tgt]( null );
						Q.locked = false;
					}
				},

				mouseup : function( evt ){var Q=this
					if( Q.graph == null ) return;

					var min = 2000.0 * 2000.0;
					var closest = null;
					Q.graph.eachNodes( function(k,n){
						var diff = Q.pos().subN( n.pos() );
						if( diff.lSQ() < min){
							closest = n;
							min = diff.lSQ();
							// if we were under say 5, we just choose this one...
						}
					});
					$.C('closest is:');
					$.C(closest.id());
					$.C( Math.sqrt(min) );

					if( Q.tgt != undefined ){
						Q.graph[Q.tgt]( closest );
						Q.locked = true;
					}
				}
			}}

	});

}).call(this);