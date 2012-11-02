/*
* thexel - xNode.js
* copyright 2012 by Jeffrey LeBlanc LLC. 
*/

;(function(){var root=this;
	
	root.xEdge = Class.$fuse( [aEdge,vObjBase,vObj], {
		//-- Class Vars ------------------------------------------------//
			__classvars__ : {
				aType : 'xEdge'
			},
		
		//-- Constructor & Destructor ------------------------------------------------//
			
			initialize : function(){var Q=this;
				Q.$super();
				//-- Current Geometry
					Q.P.aCurr = 0; 	//-- current angle
					Q.currDist = 0; //-- current distance
				//-- Visuals
					Q.color = new vColor(50,100,100,0.5);
					Q.hovercolor = new vColor(50,200,100,0.5);
					
				///-- Packets
					Q.travellers = new aList();
			},
			
			del : function(){var Q=this;	
				Q.$super();
			},

		//== Analysis =====================================================//
		
		///-- Packets ----------------------------------------///
		
			acceptTraveler : function( pkt ){var Q=this;
				var accepted = false;
				if( Q.dir() != '|' ){
					if( (Q.dir()=='-' || Q.dir()=='>') && 
						pkt.from == Q.n1() && pkt.to == Q.n2() )
							accepted = true;
					else if( (Q.dir()=='-' || Q.dir()=='<') && 
						pkt.from==Q.n2() && pkt.to==Q.n1() )
							accepted = true;
				}
				if( accepted ) Q.travellers.add( pkt );
				else pkt.del();
			},
			
			//-- n1 is 0 here, while n2 is at currDist
			//-- this is also functioning as the 'update function'
			renderPackets : function(){var Q=this;
				//C('xEdge : renderPackets');
				Q.travellers.each_reverse( function(k,p){
					gP = p;
					var prog = p.edgeProgress(); //-- note, calling this should also update it...
					//-- If has reached goal, push into Node and return
					if( prog > 1.0){
						p.to.acceptPacket( p );
						Q.travellers.rem( p );
					}
					//-- If still traveling, move it along and render it
					var offset = vVec( p.edgeProgress()*Q.currDist, 0.0);
					if( p.to == Q.U.n1 ) offset.mult(-1.0).add(vVec(Q.currDist,0));
					p.renderF( Q, offset );
				});
			},

		//-- Render -------------------------------------------//
		
			//-- Overload renderTree to set rotation to node orientation
			renderTree : function(gM){var Q=this;
				//-- Calculate things
					if(Q.isNull() ) return;
					var tmpV = Q.n2().P.pos.copy().sub(Q.n1().P.pos);
					Q.currDist = tmpV.lngth();
					var rot = tmpV.rot();
				//-- Set Transformation
					Q.pos(Q.n1().P.pos);
					Q.rot( -rot );
					Q.P.aCurr = -rot;
				//-- Call it
					Q.$super(gM);
			},
		
			render : function(){var Q=this;
				Q.renderLine(Q.currDist);
				Q.renderDirection();
				///--
				Q.renderPackets();
			},
		
			renderLine : function(currD){var Q=this;
				if(!Q.mouseInside)
					Q.rndr.line(vVec(),vVec(currD,0),Q.color.RGBA(),2,"round");
				else
					Q.rndr.line(vVec(),vVec(currD,0),Q.hovercolor.RGBA(),2,"round");
			},
			
			renderDirection : function(){var Q=this;
				switch( Q.dir() ){
					case '>' :
						Q.renderArrow(1.0, 0.0); break;
					case '<' :
						Q.renderArrow(-1.0, 0.0); break;
					case '-' :
						Q.renderArrow(1.0, 10.0); 
						Q.renderArrow(-1.0, -10.0); 
						break;
					case '|':
						Q.renderPipe(); break;
					default:
						Q.renderX(); break;
				}
			},
			
			renderArrow : function(dir, offset){var Q=this;
				Q.ctx.save();
				Q.ctx.translate( 0.5*Q.currDist + offset, 0.0 );
				var half_w = 6.0 * dir;
				var half_h = 6.0;
				var pointList = [
					vVec( -half_w, half_h ),
					vVec( half_w, 0 ),
					vVec( -half_w, -half_h )
				];
				Q.rndr.shape( pointList, Q.color.RGBA(), null );
				Q.ctx.restore();
			},
			
			renderPipe : function(){var Q=this;
				Q.rndr.line(
					vVec(0.5*Q.currDist, 6 ),
					vVec(0.5*Q.currDist, -6 ),
				Q.color.RGBA(),2);
			},
			
			renderX : function(){var Q=this;				
				Q.rndr.line(
					vVec(0.5*Q.currDist-6, 6 ),
					vVec(0.5*Q.currDist+6, -6 ),
				Q.color.RGBA(),2);
				Q.rndr.line(
					vVec(0.5*Q.currDist+6, 6 ),
					vVec(0.5*Q.currDist-6, -6 ),
				Q.color.RGBA(),2);
			},
			
		//-- Update -----------------------------------------//
		
			update : function(){var Q=this;
			},
			
			
			//-- Liquify and Solidify ------------------------//
			
				liquify : function(){},
				
				solidify : function(){},
			
		//-- EVENTS -----------------------------------------//
			
			containsPnt : function(vec){var Q=this;
				if( vec.x >= 0 )
					if( vec.y >= -10 )
						if( vec.x < Q.currDist )
							if( vec.y < 10 )
								return true;	
				return false;
			},
	
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
				}
			}},
			
			offsetInfoPtr : function(){ var Q=this;
				return vVec(Q.currDist/2,0);
			}
			
	});

}).call(this);