/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.xNode = Class.$fuse( [aNode,vObjBase,vObj], {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'xNode'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(a){var Q=this;
				Q.$super();
				
				//-- Interaction
					Q.draggable = true;		//-- Make it draggable
				//-- Attributes
					Q.P.fillcolor = new vColor(0,0,200,0.5);
					Q.P.strokecolor = new vColor(200, 0, 200, 0.5);
					Q.P.radius = 20;
				//-- Meta Variables
					Q.UserControlled = false;
					Q.renderStroke = false;
				//-- Link state cues
					Q.readytolink = false;
					Q.P.readytolinkcolor = new vColor(200, 0, 0, 0.8);
					
					Q.hasMSG = false; //!-- Boolean if has a message, temporary
					
				///-- Packets
					Q.packetInbox = []; //!-- should this be a aList?
			},
			
			del : function(){ var Q=this;
				Q.$super();
			},
			
		///-- Packets -----------------------------------//
		
			acceptPacket : function( pkt ){var Q=this
				Q.packetInbox.push( pkt );
			},
			
			parsePackets : function(){var Q=this;
				var _pkt = null;
				while( Q.packetInbox.length!=0 ){
					_pkt = Q.packetInbox.pop();
					_pkt.applyF( Q, _pkt );
					_pkt.propF( Q, _pkt );
					_pkt.del();
				}
			},

		//-- Render -------------------------------------------//
			
			render : function(){ var Q=this;					
				Q.renderCircle();
				if( Q.readytolink )
					Q.rndr.circle(vVec(), Q.P.radius+4,null,Q.P.readytolinkcolor.RGBA(),2);
			},
			
			renderCircle : function(){var Q=this;
				Q.rndr.circle(vVec(), Q.P.radius, Q.P.fillcolor.RGBA());
				if(Q.mouseInside)
					Q.rndr.circle(vVec(), Q.P.radius+2,null,Q.P.strokecolor.RGBA(),2);
			},
			
		//-- Update -------------------------------------------//
			
			update : function(){var Q=this;
				Q.parsePackets();
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
					switch( Q.U.graph.editState() ){
						case 'del':
							Q.del();
							break;
						case 'link':
							Q.U.graph.memberReportClick(Q);
							break;
					}
				}
				
			}}
	});
	
}).call(this);