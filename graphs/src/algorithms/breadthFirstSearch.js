
function breadthFirstSearch( graph, s ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.A.pred = null;
		v.A.dist = 1000000;
		v.A.color = 'W';
	});

	s.A.color = 'G';
	s.A.dist = 0;

	Q = new Queue();
	Q.enqueue( s );
	while( ! Q.empty() ){
		var u = Q.head();
		N = u.getLinkedNodes();
		$.each( N, function(i,v){
			if( v.A.color == 'W'){
				v.A.dist = u.A.dist + 1;
				v.A.pred = u;
				v.A.color = 'G';
				Q.enqueue( v );
			}
		});
		Q.pop();
		u.A.color = 'K';
	}

	// Show results
	$.each( V, function(i,v){
		v.setMetaText(
			v.A.pred != null ?
			'pred : ' + v.A.pred.A.id + '<br>dist: '+v.A.dist 
			:
			'pred : NULL' + '<br>dist: '+v.A.dist
		);
	});
}