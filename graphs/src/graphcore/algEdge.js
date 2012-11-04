/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.algEdgeSetter = jUi.$extend( {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'algEdgeSetter'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(){var Q=this;
				Q.$super();

				Q.$e.addClass('jInspectorAlg');
				Q.buildUiPanels();
				Q.buildButtons();
				Q.hide();
				
				Q.tgt = null;
			},

			buildUiPanels : function(){var Q=this;
				Q.dflt$(Q.$e);
				Q.$buttonPanel = Q.createUiPanel('buttonPanel');
			},

			buildButtons : function(){var Q=this;
				Q.dflt$(Q.$buttonPanel);
				Q.createTextButton({
					html : '<',
					baseClass : 'textButton',
					onClick: function(){if(Q.tgt!=null) Q.tgt.dir('<');}
					});
				Q.createTextButton({
					html : '-',
					baseClass : 'textButton',
					onClick: function(){if(Q.tgt!=null) Q.tgt.dir('-');}
					});
				Q.createTextButton({
					html : '>',
					baseClass : 'textButton',
					onClick: function(){if(Q.tgt!=null) Q.tgt.dir('>');}
					});
			}			
	});

}).call(this);


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


				Q.A = {};
				Q.A.edgetype = ''; // Used by DFS

				Q.dirSetter = null;
			},

			postInitialize : function(){var Q=this;

				Q.dirSetter = new algEdgeSetter();
				Q.dirSetter.tgt = Q;
			},

			del : function(){ var Q=this;
				Q.dirSetter.$e.remove();
				Q.dirSetter.$e = null;
				Q.$super();
			},

		//-- distance ------------------------------------------------//

			getDist : function(){
				return ( this.useCurrDist ? this.currDist : this._dist );
			},

		//-- render ------------------------------------------------//

			render : function(){var Q=this;
				Q.$super();

				if( Q.dirSetter.visible){
					var h = Q.dirSetter.$e.h();
					var w = Q.dirSetter.$e.w();
					Q.dirSetter.$e.xy( Q.localToScreen( vVec(Q.currDist/2,0 )).addN(vVec( -w/2 ,-2*Q.P.radius-h/2 )) );
				}
			},

		//-- EVENTS -----------------------------------------//
	
			eventDefaults : function(){return {
				
				mousedown : function( evt ){var Q=this;
					//-- could do setFocus...
					Q.cnvs.inspector.attach(Q);
				},
				
				click : function( evt ){ var Q=this;
					switch( Q.U.graph.editState() ){
						case 'del':
							Q.del();
							break;
					}
				},

				mouseenter : function( evt ){var Q=this;
					Q.dirSetter.show();
					// Simple debug for DFS
					$.C( Q.A.edgetype );
				},

				mouseleave : function( evt ){var Q=this;
					setTimeout( function(){
						Q.dirSetter.hide(); 
					},250);
					
				},
			}}
			
	});

}).call(this);