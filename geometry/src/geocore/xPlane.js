/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

;(function(){var root=this;
	
	root.xPlane = vObj.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'xPlane'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				//-- Size
					Q.P.width = 0;
					Q.P.height = 0;
					
					Q.draggable =false;

					Q.idx_ = 0;

					Q.hull = null;
			},
			
			postInitialize : function(){var Q=this;
				if(!Q.setByJson){
					//-- Create containers
					Q.U.points = new vObj();
					Q.addC( Q.U.points );
				}
			},

			postLink : function(){var Q=this;
				$.C("POST LINK");
				Q.idx_ = 0;
				$.each( Q.U.points.cO.L, function(k,p){
					p.a_id = Q.idx_;
					Q.idx_ += 1;
				});
			},

		//-- API -------------------------------------------//

			getPointsArray : function(){
				return this.U.points.cO.L;
			},

			loadHullArray : function( hull_ ){var Q=this;
				if( Q.hull != null )
					delete Q.hull;
				Q.hull = hull_;
			},

			
		//-- Links --------------------------------//
			setCnvs : function( cnvs ){
				this.$super(cnvs);
				this.P.width = cnvs.P.width;
				this.P.height = cnvs.P.height;
			},
			
		//-- get New Instances --------------------------------//
		
			getNewPoint : function(){
				return new xPoint();
			},

		//-- Add/Remove --------------------------------//
			
			addPoint : function( p ){ var Q=this;
				Q.U.points.addC(p);
				p.a_id = Q.idx_;
				Q.idx_ += 1;
			},

		//-- Render --------------------------------//
			
			render : function(){ var Q=this;

				//-- Render the inspector hook 'square'
					Q.renderInspectorTag();

					Q.renderHull();
			},
			
			renderHull : function(){var Q=this;
				if( Q.hull == null ) return;

				Q.ctx.beginPath();

				Q.rndr.mvTo(Q.hull[0].pos());
				for(var i=1; i<Q.hull.length; i++ )
					Q.rndr.lnTo( Q.hull[i].pos());
				Q.rndr.lnTo( Q.hull[0].pos());
				
				Q.ctx.strokeStyle = 'yellow';
				Q.ctx.lineWidth =1;
				Q.ctx.stroke();
				Q.ctx.closePath();
			},

			renderInspectorTag : function(){ var Q=this;
				Q.ctx.beginPath();
					Q.ctx.fillStyle = 'rgba(100,100,100,0.75)';
					Q.ctx.rect(Q.P.width-10,0,10,10);
					Q.ctx.fill();
				Q.ctx.closePath();
			},
			
		//-- Update --------------------------------//
			
			update : function(){
				
			},
			
		//-- Contains --------------------------------//
		
			containsPnt : function( vec ){
				return true; //!-- Handle All Incoming Events
			},
		
		//-- Events --------------------------------//
			
			eventDefaults : function(){return {
				
				dblclick : function( evt ){ var Q=this;
					var tmpC = Q.getNewPoint();
					tmpC.pos(evt.lpos);
					Q.addPoint( tmpC );
					//return true;
				}
			}},
			
			
		//-- Info Pointer ---------------------------------//
		
			offsetInfoPtr : function(){ var Q=this;
				return vVec(Q.P.width,0);
			}
	});
	
}).call(this);