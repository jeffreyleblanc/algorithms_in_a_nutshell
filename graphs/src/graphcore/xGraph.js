/*
* >*> thexel - xGraph.js <*<
* |^| copyright 2012 by Jeffrey LeBlanc LLC. |v|
*/

;(function(){var root=this;
	
	root.xGraph = Class.$fuse( [aGraph,vObjBase,vObj], {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'xGraph'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				//-- Utility Pointers
					Q.focus = null;
					Q.prevfocus = null;
					Q.linkfocus = null;
				//-- Size
					Q.P.width = 0;
					Q.P.height = 0;
				//-- States and Flags
					Q.editState_ = ''; //-- 'del', 'link', ''
				//-- Messages
					Q.msgREADY = false;
					Q.MSG = null;
				//-- Suppress drag
					Q.draggable =false;////////////

				/// move to aGraph
					Q.s = null; // sink node;
					Q.t = null; // target node;
			},
			
			postInitialize : function(){var Q=this;
				if(!Q.setByJson){
					//-- Create containers
					Q.U.edges = new vObj();
					Q.addC( Q.U.edges );
					Q.U.nodes = new vObj();
					Q.addC( Q.U.nodes );
				}
			},

		//== Analysis =====================================================//
			
		//-- Links --------------------------------//
			setCnvs : function( cnvs ){
				this.$super(cnvs);
				this.P.width = cnvs.P.width;
				this.P.height = cnvs.P.height;
			},
			
		//-- get New Instances --------------------------------//
		
			getNewEdge : function(){
				return new xEdge();
			},
			
			getNewNode : function(){
				return new xNode();
			},

		//-- Render --------------------------------//
			
			render : function(){ var Q=this;

				//-- Render the inspector hook 'square'
					Q.renderInspectorTag();
					if( Q.msgREADY )
						Q.renderWaitingMessage();
				//-- render focus
					if( Q.s !=  null ){
						Q.rndr.circle(Q.s.pos(),30,null,'green',3);
					}
					if( Q.t !=  null ){
						Q.rndr.circle(Q.t.pos(),30,null,'yellow',3);
					}
			},
			
			renderInspectorTag : function(){ var Q=this;
				Q.ctx.beginPath();
					Q.ctx.fillStyle = 'rgba(100,100,100,0.75)';
					Q.ctx.rect(Q.P.width-10,0,10,10);
					Q.ctx.fill();
				Q.ctx.closePath();
			},
			
			renderWaitingMessage : function(){ var Q=this;
				Q.ctx.beginPath();
				Q.ctx.fillStyle = "rgba(200, 0, 200, 0.5)";
				Q.ctx.arc(CNVS.mPos.x,CNVS.mPos.y, 35.0, 0, 2 * Math.PI, false);
				Q.ctx.fill();
				Q.ctx.closePath();
			},
			
		//-- Update --------------------------------//
			
			update : function(){
				
			},
			
			
		//-- Messages --------------------------------//
			
			injectMsg : function(p, cmdSTR,args){var Q=this;
				//-- Find a particle to inject into:
					var ptr = null;
					if( p!=null ) { ptr = p; }
					else {
						if( Q.U.nodes.cO.size() > 0)
							ptr = Q.U.nodes.cO.idx(0);
					}
				//-- Inject into particle
				if( ptr!=null )
					aMsg.injectMsg( ptr, cmdSTR, args||{} );
			},
			
			injectXMsg : function(p, m ){var Q=this;
				//-- Find a particle to inject into:
					var ptr = null;
					if( p!=null ) { ptr = p; }
					else {
						if( Q.U.nodes.cO.size() > 0)
							ptr = Q.U.nodes.cO.idx(0);
					}
				//-- Inject into particle
				if( ptr!=null )
					aMsg.injectMsg( ptr, m.getMsgStr(),
							{	
								alpha:0.8,
								name : time62(), //!-- will fill up the wall...
								throttle : false,
								clr : m.P.Clr,
								actDurationMs : m.getMsgDur()//,
								//actDelayMs : 500 //!-- experiment
							}
						);
			},
			
		//-- Contains --------------------------------//
		
			containsPnt : function( vec ){
				return true; //!-- Handle All Incoming Events
			},
		
		//-- Children Event Handlers --------------------------------//
			
			//-- Not being used currently
			setFocus : function(ptr){var Q=this;
				if(Q.focus!=null) Q.prevfocus = Q.focus;
				Q.focus = ptr;
			},
			//-- Not being used currently
			unFocus : function(ptr){var Q=this;
				Q.prevfocus = Q.focus;
				Q.focus = null;
			},
			
			//!-- Rename memberReportClick
			memberReportClick : function(ptr){var Q=this;
				if( Q.editState() == 'link' ){
					Q.handleLinkUpdate(ptr); }
			},

		//-- Edit States --------------------------------//
		
			editState : function( state ){var Q=this;
				if( state==undefined){
					return Q.editState_;
				}if( state != Q.editState_){
					//-- Clean up
					if( Q.editState_ == 'link' )
						Q.outOfLinkSTATE();
					//-- Set it
					Q.editState_ = state;
				}
			},
			
			//-- Linking --------------------------------//
				
				outOfLinkSTATE : function(){var Q=this;
					if( Q.linkfocus==null ) return;
					Q.linkfocus.readytolink = false;
					Q.linkfocus = null;
				},
				
				handleLinkUpdate : function( ptr ){var Q=this;
					if(!$.isDerivedFrom(ptr,'xNode')) return;
					if(Q.linkfocus != null){
						if( Q.linkfocus==ptr){
							Q.linkfocus.readytolink = false;
							Q.linkfocus=null;
						}else{
							Q.linkNodes(Q.linkfocus, ptr);
							Q.linkfocus.readytolink = false;
							Q.linkfocus = null;
						}
					}else{
						Q.linkfocus = ptr;
						Q.linkfocus.readytolink = true;
					}
				},
		
		//-- Events --------------------------------//
			
			eventDefaults : function(){return {
				
				dblclick : function( evt ){ var Q=this;
					var tmpC = Q.getNewNode();
					tmpC.pos(evt.lpos);
					Q.addNode( tmpC );
					//return true;
				}
			}},
			
			
		//-- Info Pointer ---------------------------------//
		
			offsetInfoPtr : function(){ var Q=this;
				return vVec(Q.P.width,0);
			}
	});
	
}).call(this);