// referenced https://github.com/STRd6/PriorityQueue.js

/*
== Example Usage ==

// Highest priority first
var queue = PriorityQueue();

queue.push("b", 5);
queue.push("a", 10);

queue.pop(); // => "a"
queue.pop(); // => "b"

// Lowest priority first
var queue = PriorityQueue({low: true});

queue.push("x", 5);
queue.push("y", 10);

queue.pop(); // => "x"
queue.pop(); // => "y"
*/

(function() {

  PriorityQueue = function(options){
    
    var contents = [];
    var sorted = false;
    var sortStyle = function(a, b) {
      return a.priority - b.priority;
    };

    var _sort = function() {
      contents.sort(sortStyle);
      sorted = true;
    };

    var self = {

      dump : function(){
        if(!sorted) _sort();
        $.each( contents, function(i,v){
          $.C( v );
        });
      },

      popMax: function(){
        if(!sorted) _sort();
        var element = contents.pop();
        return ( element ? element.object : undefined );
      },
      popMin: function(){
        if(!sorted) _sort();
        var element = contents[0];
        contents = contents.slice(1);
        return ( element ? element.object : undefined );
      },

      max: function() {
        if(!sorted) _sort();
        var element = contents[contents.length - 1];
        return ( element ? element.object : undefined );
      },

      min: function() {
        if(!sorted) _sort();
        var element = contents[0];
        return ( element ? element.object : undefined );
      },

      includes: function(object) {
        for(var i = contents.length - 1; i >= 0; i--) {
          if(contents[i].object === object)
            return true;
        }
        return false;
      },

      updatePriority: function(object, newPriority) {
        for(var i = contents.length - 1; i >= 0; i--) {
          if(contents[i].object === object)
            contents[i].priority = newPriority;
            sorted = false;
        }
      },

      size: function() {
        return contents.length;
      },

      empty: function() {
        return contents.length === 0;
      },

      push: function(object, priority) {
        contents.push({object: object, priority: priority});
        sorted = false;
      }
    };

    return self;
  };
})();