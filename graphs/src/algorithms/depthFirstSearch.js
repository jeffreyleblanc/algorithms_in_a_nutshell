
function dfs_visit( u ){

	// Ready
	graph.resetColors();


	u.A.color = 'G';
	u.A.discovered = ++window.counter;

	N = u.getLinkedNodes();
	$.each( N, function(i,v){
		if( v.A.color == 'W'){
			v.A.pred = u;
			dfs_visit( v );
		}
	});

	u.A.color = 'K';
	u.A.finished = ++window.counter;
}

function depthFirstSearch( graph, s ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.A.pred = null;
		v.A.discovered = -1;
		v.A.finished = -1;
		v.A.color = 'W';
	});

	window.counter = 0; // defines as global
	dfs_visit( s );

	$.each( V, function(i,v){
		if( v.A.color == 'W')
			dfs_visit( v );
	});

	// Post run, assign text
	$.each( V, function(i,v){
		v.setMetaText(
			v.A.pred != null ?
			'pred : ' + v.A.pred.A.id
			:
			'pred : NULL'
		);
	});
};

