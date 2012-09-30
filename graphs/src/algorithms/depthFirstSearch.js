
function depthFirstSearch( graph, s ){

	if( s == null ){ $.C('No source defined!');return; }
	else $.C('Runnning on '+graph.id()+' '+s.id());

	var V = graph.U.nodes.cO.L;
	$.each( V, function(i,v){
		v.pred = null;
		v.discovered = -1;
		v.finished = -1;
		v.color = 'W';
	});

	window.counter = 0; // defines as global
	dfs_visit( s );

	$.each( V, function(i,v){
		if( v.color == 'W')
			dfs_visit( v );
	});
};

function dfs_visit( u ){

	u.color = 'G';
	u.discovered = ++window.counter;

	N = u.getLinkedNodes();
	$.each( N, function(i,v){
		if( v.color == 'W'){
			v.pred = u;
			dfs_visit( v );
		}
	});

	u.color = 'K';
	u.finished = ++window.counter;
}