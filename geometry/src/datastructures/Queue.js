
function Queue () {
    this.Q = new Array();
    this.enqueue = function( obj ) {
        this.Q.unshift( obj );
    };
    this.head = function() {
        return this.Q[ this.Q.length-1 ];
    };
    this.pop = function() {
        return this.Q.pop();
    };
    this.empty = function(){
    	return this.Q.length == 0;
    }
}