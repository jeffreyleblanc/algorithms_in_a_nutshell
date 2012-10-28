/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.xPoint = vObj.$extend({
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'xPoint'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				//-- Interaction
					Q.draggable = true;		//-- Make it draggable
				//-- Attributes
					Q.P.fillcolor = new vColor(0,0,200,0.5);
					Q.P.strokecolor = new vColor(200, 0, 200, 0.5);
					Q.P.radius = 10;
				//-- Meta Variables
					Q.UserControlled = false;
					Q.renderStroke = false;

					Q.a_id = 0;

					Q.kdnode = null;
			},
			
			del : function(){ var Q=this;
				Q.$super();
			},

		//-- API -------------------------------------------//

			//! Note we could also base alot of this off
			// of the square of the distance...
			distance : function( xpnt ){
				return this.pos().subN( xpnt.pos() ).l();
			},

			getX : function(){
				return this.P.pos.x;
			},

			getY : function(){
				return this.P.pos.y;
			},

			x : function(){
				return this.P.pos.x;
			},

			y : function(){
				return this.P.pos.y;
			},

			// if this > p -1
			compare : function( p ){
				if( this.getX() > p.getX() ){
					return 1;
				}else if( this.getX() < p.getX() ){
					return -1;
				}else{
					if( this.getY() > p.getY() )
						return 1;
					else
						return -1;
				}
			},

		//-- Render -------------------------------------------//
			
			render : function(){ var Q=this;					
				Q.renderCircle();
				if( Q.readytolink )
					Q.rndr.circle(vVec(), Q.P.radius+4,null,Q.P.readytolinkcolor.RGBA(),2);

				Q.a_render();

				if(Q.mouseInside)
					Q.renderKDRegion();
			},

			renderKDRegion : function(){var Q=this;
				if( Q.kdnode == null ) return;

				Q.ctx.save();
				Q.ctx.translate( -1.0*Q.P.pos.x, -1.0*Q.P.pos.y);
				var r = Q.kdnode.region;
				Q.rndr.rect( vVec(r.left,r.bottom),r.right-r.left,r.top-r.bottom,'rgba(255,0,0,0.3)');
				Q.ctx.restore();
			},
			
			renderCircle : function(){var Q=this;
				Q.rndr.circle(vVec(), Q.P.radius, Q.P.fillcolor.RGBA());
				if(Q.mouseInside)
					Q.rndr.circle(vVec(), Q.P.radius+2,null,Q.P.strokecolor.RGBA(),2);
			},

			a_render : function(){var Q=this

				// Render Text
				this.ctx.fillStyle = 'White';
				Q.ctx.fillText(Q.a_id,-3,3);

			},
		
		//-- Boundary ---------------------------------//
		
			containsPnt : function( vec ){var Q=this;
				return (vec.lSQ() <= (Q.P.radius*Q.P.radius));
			},
		
		//-- Events ---------------------------------//
		
			eventDefaults : function(){return {
				
				mousedown : function( evt ){var Q=this;
					//-- could do setFocus...
					Q.cnvs.inspector.attach(Q);

				},
				
				mouseup : function( evt ){var Q=this;
					 //-- could do setFocus...
				},
				
				click : function( evt ){ var Q=this;
					
				}
				
			}}
	});
	
}).call(this);