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
					Q.kdtree = null;

					// Enables drag and creation of a region
					Q.defineregion = false; //state
					Q.region = null;
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
				Q.renderKDTree();
				Q.renderRegion();
			},
			
			renderRegion : function(){var Q=this;
				if( Q.region == null ) return;

				var r = Q.region;
				Q.rndr.rect( vVec(r.left,r.bottom),r.right-r.left,r.top-r.bottom,'rgba(255,255,0,0.3)');

			},

			renderKDTree : function(){var Q=this;
				if( Q.kdtree == null) return;
				Q.renderKDNode( Q.kdtree.root, null, false, 0, 1000, 0, 1000 );
			},

			renderKDNode : function( p, pn, isAbove, _xMin, _xMax, _yMin, _yMax ){var Q=this;

				if( p==undefined || p==null ) return;

				var xMin = _xMin;
				var xMax = _xMax;
				var yMin = _yMin;
				var yMax = _yMax;

				if( p.dimension == 1 )
					xMin = xMax = p.point.pos().x;
				else
					yMin = yMax = p.point.pos().y;

				if( pn != null ){
					if( isAbove){
						if( p.dimension == 1 )
							yMin = pn.point.pos().y;
						else
							xMin = pn.point.pos().x;
					}else{
						if( p.dimension == 1 )
							yMax = pn.point.pos().y;
						else
							xMax = pn.point.pos().x;
					}
				}

				// Iterate
				if( p.dimension == 1){
					Q.renderKDNode( p.above, p, true, xMin, _xMax, _yMin, _yMax );
					Q.renderKDNode( p.below, p, false, _xMin, xMax, _yMin, _yMax  );
				}else{
					Q.renderKDNode( p.above, p, true, _xMin, _xMax, yMin, _yMax );
					Q.renderKDNode( p.below, p, false, _xMin, _xMax, _yMin, yMax  );
				}

				//Draw it:
				Q.rndr.line(vVec(xMin,yMin),vVec(xMax,yMax),(p.dimension==1?'red':'blue'),2);

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
				},
				// Something of a hack here..
				click : function( evt ){var Q=this;
					Q.defineregion = false; //state
					Q.region = null;

					if( Q.kdtree != null ){
						// Make a temp xPoint:
						var tmpC = Q.getNewPoint();
						tmpC.pos(evt.lpos);
						// test it
						Q.kdtree.nearest( tmpC );
					}
				},

				mousedown : function( evt ){var Q=this;
					if( Q.defineregion ){
						Q.region =  new KDRegion();
						Q.region.setInfin();
						Q.region.left = evt.lpos.x;
						Q.region.bottom = evt.lpos.y;
						Q.region.right = evt.lpos.x+1;
						Q.region.top = evt.lpos.y+1;
					}
				},

				mouseup : function( evt ){var Q=this;
					if( Q.defineregion && Q.region != null ){
						// do stuff with region
						if( Q.kdtree != null ){
							var results = Q.kdtree.search( Q.region );
							$.C('Range Query Found:');
							$.each(results, function(k,p){
								$.C(p.a_id);
							});
						}
						// delete the region
						Q.region.del();
						Q.region = null;
					}
				},

				mousemove : function( evt ){var Q=this;
					if( evt.mDown && Q.defineregion && Q.region!=null){
						Q.region.right = evt.lpos.x;
						Q.region.top = evt.lpos.y;
					}
				}

			}},
			
			
		//-- Info Pointer ---------------------------------//
		
			offsetInfoPtr : function(){ var Q=this;
				return vVec(Q.P.width,0);
			}
	});
	
}).call(this);