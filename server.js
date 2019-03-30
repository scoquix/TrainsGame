var http = require("http");
var qs = require("querystring");
var socketio = require("socket.io");
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var Operations = require("./modules/Operations.js"); //załadowanie pliku Operations.js z katalogu modules równoległego do server.js
var db; //obiekt bazy danych mongoDB
var opers = new Operations();//obiekt zwracający wszystkie funkcje z pliku Operations.js

var loadFile = require("./modules/loadFile.js");

var server = http.createServer(function (request, response) {

    // Files loading
    if (request.method == "GET") {
        loadFile({ url: request.url, staticDir: "staticDir", response: response });
    }

})

server.listen(3000);
console.log("Server started on port: 3000");
var io = socketio.listen(server);

var townsColl;
var townsTracksColl;
mongoClient.connect("mongodb://localhost/TrainDB", function (err, dbase) {
    if (err) console.log(err)
    else console.log("mongo podłączone")
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
    // pod zmienną widoczną na zewnątrz    
    db = dbase;
    /*dbase.createCollection("townsColl", function (err, coll) {
        console.log(coll)
        townsColl = coll;
        console.log("Utworzyłem kolekcje");

    })
    dbase.createCollection("townsTracksColl", function (err, coll) {
        console.log(coll)
        townsTracksColl = coll;
        console.log("Utworzyłem kolekcje");

    })*/

})


var maxUsersInRoom = 2;

var users = [];

var buildedTracks = [];
var usersTracks = [];

var towns = [];

io.sockets.on("connection", function(client) {
    
    // Client connected
    console.log("Client connected: " + client.id);
    client.emit("onconnect", {
        clientID: client.id,
        roomStatus: users.length,
    })
    
    //INSERT ARRAYS TO DATABASE
/*    client.on("dodaj",function(data)
    {
        for (var i = 0; i < data.towns.length; i++) {
            opers.Insert(townsColl, data.towns[i]);
        }
        console.log(data.townsTracks.length);
        for (var i = 0; i < data.townsTracks.length; i++) {
            opers.Insert(townsTracksColl, data.townsTracks[i]);
        }
    })*/
    
    //Select
    client.on("select", function (data) {
        coll = db.collection(data.coll_name);
        function callback(items) {
            if(data.num == 1) towns = items;
            client.emit("select", {
                selected: items,
                number: data.num,
            });
        }
        opers.SelectAll(coll, callback);
    })
    
    client.on("tryEnterRoom", function() {
        var response = { event: "tryEnterRoom", message: "" }
        if(users.length < maxUsersInRoom) {
            users.push({id: client.id, trains: 20, points: 0});
            response.success = true;
            response.message = "Pomyślnie dodano do pokoju";
            response.playersCount = users.length;
            console.log("Client entered room");
            
            usersTracks.push(new Graph(26));
            
            client.broadcast.emit("message", { event: "roomEnter", playersCount: users.length });
        }
        else {
            response.success = false;
            response.message = "Nie udało sie dodać do pokoju. Pokój jest pełny";
        }
        io.sockets.to(client.id).emit("response", response);
    })
    
    // Client disconnected
    client.on("disconnect", function () {
        for(var i = 0; i < users.length; i++)
            if(users[i].id == client.id) {
                users.splice(i, 1);
                usersTracks.splice(i, 1);
                console.log("Client leaved room");
                client.broadcast.emit("message", { event: "roomEnter", playersCount: users.length });
            }
        if(users.length == 0) buildedTracks = [];
    })
    
    client.on("startGame", function() {
        var last = -1;
        for(var i = 0; i < users.length; i++) {
            var response = {};
            
            // Turn
            var turn = Math.round(Math.random())
            if(last == -1) {
                last = turn;
                if(turn == 1) response.myTurn = true;
                else response.myTurn = false;
            }
            else if(last == 1) response.myTurn = false;
            else response.myTurn = true;
            
            // Cards
            response.cards = [];
            for(var j = 0; j < 5; j++) {
                var rand = Math.floor(Math.random() * 5);
                response.cards.push(rand)
                /*if(rand === 0) response.cards.push("RED");
                else if(rand === 1) response.cards.push("GREEN");
                else if(rand === 2) response.cards.push("BLUE");
                else if(rand === 3) response.cards.push("BLACK");
                else if(rand === 4) response.cards.push("ORANGE");*/
            }
            // Target
            //var rand = Math.floor( Math.random() * 5 );
            // wzięcie z bazy celu o danym indexie
            
            response.trains = users[i].trains;
            console.log("users: " + users.length);
            console.log("response: " + response.myTurn);
            io.sockets.to(users[i].id).emit("startGame", response);
        }
    })

    client.on("randTwoCards", function (user) {
        var tab = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
        console.log(tab);
        console.log(user.id)
        for(var i = 0; i < users.length; i++) {
            if(users[i].id == client.id) io.sockets.to(users[i].id).emit("TwoCardsRespons", { twoCards: tab,});
            else io.sockets.to(users[i].id).emit("changeTurn", {} );
        }
    })
    
    client.on("buildTrack", function (data) {
        var color;
        switch (data.selectedTrack.color)
        {
            case "RED":
                color = 0;
                break;
            case "ORANGE":
                color = 1;
                break;
            case "GREEN":
                color = 2;
                break;
            case "BLUE":
                color = 3;
                break;
            case "BLACK":
                color = 4;
                break;
        }
        var trackName = data.selectedTrack.town1 + "-" + data.selectedTrack.town2;
        console.log(data.cards);
        var response = { success: false, message: "Ta trasa jest już utworzona" };
        var isSuchTrack = false;
        for(var j = 0; j < buildedTracks.length; j++) {
            if(buildedTracks[j].name == trackName) {
                isSuchTrack = true;
            }
        }
        if (!isSuchTrack) {
            var isTrainsEnough = true;
            var myTrainsCount = 0;
            var userIndex = 0;
            for(var i = 0; i < users.length; i++) {
                if(users[i].id == client.id) {
                    myTrainsCount = users[i].trains;
                    userIndex = i;
                }
            }
            if(data.selectedTrack.price > myTrainsCount) {
                isTrainsEnough = false;
                response.success = false;
                response.message = "Nie masz wystarczająco pociągów";
            }
            var counter = 0;
            for (var i = 0 ; i < data.cards.length; i++)
            {
                if (data.cards[i] == color)
                    counter++;
            }
            if (counter >= data.selectedTrack.price && isTrainsEnough) {
                buildedTracks.push({name: trackName, pawn: data.pawn });
                response.success = true;
                response.message = "Utworzyłeś trasę!";
                users[userIndex].trains -= data.selectedTrack.price;
                users[userIndex].points += data.selectedTrack.price * 2;
                var counter2 = 0;
                for (var i = 0 ; i < data.cards.length; i++) {
                    if (data.cards[i] == color && counter2 != data.selectedTrack.price) {
                        data.cards.splice(i, 1);
                        i = -1;
                        counter2++;
                    }
                }
                for(var i = 0; i < users.length; i++) {
                    if(users[i].id == client.id) io.sockets.to(users[i].id).emit("change", { event: "trackBuilded", buildedTracks: buildedTracks, cards: data.cards, trains: users[i].trains });
                    else io.sockets.to(users[i].id).emit("change", { event: "trackBuilded", buildedTracks: buildedTracks, trains: users[i].trains });
                }
                if(users[userIndex].trains <= 3) {
                    var myresp = { event: "GameOver" }
                    var enresp = { event: "GameOver" }
                    if(userIndex == 0) {
                        if(users[0].points > users[1].points) {
                            myresp.win = true;
                            enresp.win = false;
                        }
                        else {
                            myresp.win = false;
                            enresp.win = true;
                            
                        }
                        myresp.myPoints = users[0].points;
                        myresp.enemyPoints = users[1].points;
                        enresp.myPoints = users[1].points;
                        enresp.enemyPoints = users[0].points;
                        io.sockets.to(users[0].id).emit("response", myresp);
                        io.sockets.to(users[1].id).emit("response", enresp);
                    }
                    else if(userIndex == 1) {
                        if(users[1].points > users[0].points) {
                            myresp.win = true;
                            enresp.win = false;
                        }
                        else {
                            myresp.win = false;
                            enresp.win = true;
                        }
                        myresp.myPoints = users[1].points;
                        myresp.enemyPoints = users[0].points;
                        enresp.myPoints = users[0].points;
                        enresp.enemyPoints = users[1].points;
                        io.sockets.to(users[1].id).emit("response", myresp);
                        io.sockets.to(users[0].id).emit("response", enresp);
                    }
                }
//                io.sockets.to(users[0].id).emit("change", { event: "trackBuilded", buildedTracks: buildedTracks, cards: data.cards });
//                io.sockets.to(users[1].id).emit("change", { event: "trackBuilded", buildedTracks: buildedTracks, cards: data.cards });
               
                /*sign.loadModel("models/Flatbeds/Generic_Flatbed.DAE", 4, function (modelData) {
                    console.log("model jest załadowany")
                    console.timeEnd("ładowanie");
                    modelData.rotateX(-Math.PI / 2);
                    modelData.position.set(1, 0, 1);
                    //modelData.getObjectByName("Base").castShadow = true;
                    //            modelData.position.z = -162 - 13;
                    //            modelData.position.x = 26.25;
                    //            modelData.getObjectByName("Pic2").children[0].material = materials.towns.Warsaw;
                    //            modelData.getObjectByName("Base").material = materials.signBase;
                    scene.add(modelData);
                    console.log(scene);
                })*/





            }
            else {
                response.success = false;
                response.message = "Nie masz wystarczającej ilości kart";
            }
        }
        io.sockets.to(client.id).emit("buildTrack", response);
    })
    
})

// Graf

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