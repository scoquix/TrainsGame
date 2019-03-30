function Graph(v) {
    var verticesCount = v; // ilość wierzchołków
    var vertices = []; // wierzchołki
    
    for(var i = 0; i < verticesCount; i++) {
        vertices.push(new Vertex(i));
    }
    
    function Vertex(id) {
        this.id = id;
        this.edges = [];
    }
    
    this.addEdge = function(v1, v2) { 
        if(vertices[v1].edges.indexOf(v2) == -1) {
            vertices[v1].edges.push(v2);
            vertices[v2].edges.push(v1);
        }
    }
    
    var visited = [];
    this.isConnected = function(v1, v2) {
        visited = new Array(verticesCount);
        for( var i = 0; i < visited.length; i++) visited[i] = false;
        return _isConnected(v1, v2);
    }
    //                     1   5
    function _isConnected(v1, v2) {
        visited[v1] = true;
        for(var j = 0; j < vertices[v1].edges.length; j++) {
            if(vertices[v1].edges[j] == v2) return true; // znalazłem połączenie
            if(visited[vertices[v1].edges[j]]) continue;
            return _isConnected(vertices[v1].edges[j], v2);
        }
        return false;
    }
    
    this.print = function() {
        for(var i = 0; i < vertices.length; i++) {
            var txt = "";
            txt = vertices[i].id + ": ";
            for(var j = 0; j < vertices[i].edges.length; j++) {
                txt += vertices[i].edges[j] + ",";
            }
            console.log(txt);
        }
    }
    
}