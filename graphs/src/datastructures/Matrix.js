
function algMatrix(){
	  if( !(this instanceof arguments.callee) ) 
	    return new arguments.callee(); 

	   this.E = null; // in theory this could be rolled into a init function...
	}
	algMatrix.prototype =  {

		makeNbyN : function( N, seed ){
			this.E = [];
			seed = seed||0;
			for(var i=0; i<N; i++){
				this.E.push( [] );
				for(var j=0; j<N; j++){
					this.E[i].push( seed );
				}
			}
			return this;
		},

		//! note, no error checking...
		get : function( r, c ){
			return this.E[r][c];
		},
		set : function( r, c, val ){
			this.E[r][c] = val;
		},

		print : function( ){
			var tmpStr = ''
			var l = this.E.length;
			for(var i=0; i<l; i++){
				tmpStr = '['+i+'] ';
				for(var j=0; j<l; j++){
					if( this.E[i][j] > 100000 )
						tmpStr += '-\t';
					else
						tmpStr += Math.round( this.E[i][j] )+'\t';
				}
				console.log( tmpStr );
			}
			return this;
		}
	};