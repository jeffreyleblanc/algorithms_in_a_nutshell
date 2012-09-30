
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

function breadthFirstSearch( graph, s ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.pred = null;
		v.dist = 1000000;
		v.color = 'W';
	});

	s.color = 'G';
	s.dist = 0;

	Q = new Queue();
	Q.enqueue( s );
	while( ! Q.empty() ){
		var u = Q.head();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){
			if( v.color == 'W'){
				v.dist = u.dist + 1;
				v.pred = u;
				v.color = 'G';
				Q.enqueue( v );
			}
		});
		Q.pop();
		u.color = 'K';
	}
}