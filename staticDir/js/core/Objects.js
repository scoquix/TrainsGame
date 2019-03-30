function Objects() {
    
    var that = this;
    
    this.toUpdate = [];
    
    function init() {
        startScreen = new StartScreen();
        document.body.appendChild(startScreen.getScreen());
        startScreen.showScreen();

        loadingScreen = new LoadingScreen();
        document.body.appendChild(loadingScreen.getScreen());
        
        menuScreen = new MenuScreen();
        document.body.appendChild(menuScreen.getScreen());
    }
    init();

    this.initObjects = function (scene) {

        skybox = new Sky();
        scene.add(skybox.getSky());

        sun = new Sun();
        scene.add(sun.getSun());

        terrain = new Terrain();
        scene.add(terrain.getTerrain());
        
        scene.fog = new THREE.FogExp2(0xaaaaff,  0.001);
        
        
        
        /*var graf = new Graph(5);
        graf.addEdge(1, 2);
        graf.addEdge(2, 3);
        graf.addEdge(2, 4);
        graf.addEdge(3, 4);
        graf.print();
        console.log(graf.isConnected(0, 2));*/
        
        
        
        

    }

    this.roomEnter = function () {
        startScreen.hideScreen();
        loadingScreen.showScreen();
        menuScreen.showScreen();

        sign = new Sign();
        console.time("ładowanie")
        sign.loadModel("models/billboard.dae", function (modelData) {
            console.log("model jest załadowany")
            console.timeEnd("ładowanie");
            modelData.rotateY(Math.PI / 2);
            modelData.getObjectByName("Base").castShadow = true;
            //            modelData.position.z = -162 - 13;
            //            modelData.position.x = 26.25;
            //            modelData.getObjectByName("Pic2").children[0].material = materials.towns.Warsaw;
            //            modelData.getObjectByName("Base").material = materials.signBase;
            //var net = new Net();
            net.EmitSelect("townsColl", 1, modelData);
            net.EmitSelect("townsTracksColl", 2, modelData);


            loadingScreen.hideScreen();
        
        })
        
        trains = []; // - TABLICA Z ZAŁADOWANYMI 2 MODELAMI POCIĄGÓW
        train = new Train();
        console.time("ładowanie")
        train.loadModel("models/FlatBeds/Generic_Flatbed_FC1.dae", function (modelData) {
            console.log("model jest załadowany")
            console.timeEnd("ładowanie");
            modelData.rotateX(Math.PI / 2);
            modelData.rotateY(Math.PI);
            modelData.name = "train";
            modelData.remove(modelData.getObjectByName("VisualSceneNode"));
            modelData.remove(modelData.getObjectByName("Shadow"));
            trains.push(modelData);
        })
        console.time("ładowanie")
        train.loadModel("models/TTrucks/TTrucks_TTC1.dae", function (modelData) {
            console.log("model jest załadowany")
            console.timeEnd("ładowanie");
            modelData.rotateX(Math.PI / 2);
            modelData.rotateY(Math.PI);
            modelData.name = "train";
            modelData.remove(modelData.getObjectByName("VisualSceneNode"));
            modelData.remove(modelData.getObjectByName("Shadow"));
            trains.push(modelData);
        })
        
    }
        
    this.findTown = function(name) {
        for(var i = 0; i < that.towns.length; i++)
            if(that.towns[i].townName === name)
                return that.towns[i];
    }
    
    this.turn = function(text) {
        menuScreen.turn(text);
    }
    
    this.drawTrains = function(tracks) {
        for(var i = 0; i < scene.children.lenght; i++) {
            if(scene.children[i].name == "train") {
                scene.remove(scene.children[i]);
            }
        }
        for(var i = 0; i < tracks.length; i++) {
            console.log(tracks);
            var track = tracks[i].name.split("-");
            var town1 = that.findTown(track[0]);
            var town2 = that.findTown(track[1]);
            var z = (town1.coords.z + town2.coords.z) / 2;
            var x = (town1.coords.x + town2.coords.x) / 2;
            var train = trains[tracks[i].pawn].clone();
            train.position.x = x;
            train.position.z = z;
            var angleDeg = Math.atan2(town2.coords.z - town1.coords.z, town1.coords.x - town2.coords.x);
            train.rotateZ(angleDeg - Math.PI / 2);
            scene.add(train);
        }
    }

    this.towns = [
    /*{ id: 0, townName: "Warsaw", text: "Warszawa", coords: { z: -161, x: 28 } },
    { id: 1, townName: "Berlin", text: "Berlin", coords: { z: -41, x: 26 } },
    { id: 2, townName: "Amsterdam", text: "Amsterdam", coords: { z: 100, x: 26 } },
    { id: 3, townName: "Prague", text: "Praga", coords: { z: -40, x: 95 } },
    { id: 4, townName: "Paris", text: "Paryż", coords: { z: 165, x: 119 } },
    { id: 5, townName: "Bratislava", text: "Bratysława", coords: { z: -104, x: 148 } },
    { id: 6, townName: "Bern", text: "Berno", coords: { z: 73, x: 177 } },
    { id: 7, townName: "Zagreb", text: "Zagrzeb", coords: { z: -78, x: 209 } },
    { id: 8, townName: "Budapest", text: "Budapeszt", coords: { z: -131, x: 166 } },
    { id: 9, townName: "Minsk", text: "Mińsk", coords: { z: -262, x: -33 } },
    { id: 10, townName: "Kiev", text: "Kijów", coords: { z: -337, x: 57 } },
    { id: 11, townName: "London", text: "Londyn", coords: { z: 181, x: 32 } },
    { id: 12, townName: "Edinburgh", text: "Edynburg", coords: { z: 200, x: -99 } },
    { id: 13, townName: "Dublin", text: "Dublin", coords: { z: 269, x: -45 } },
    { id: 14, townName: "Oslo", text: "Oslo", coords: { z: -9, x: -184 } },
    { id: 15, townName: "Stockholm", text: "Sztokholm", coords: { z: -107, x: -160 } },
    { id: 16, townName: "Helsinki", text: "Helsinki", coords: { z: -197, x: -200 } },
    { id: 17, townName: "Reykjavik", text: "Rejkjawik", coords: { z: 350, x: -418 } },
    { id: 18, townName: "Madrid", text: "Madryt", coords: { z: 326, x: 310 } },
    { id: 19, townName: "Lisbon", text: "Lizbona", coords: { z: 447, x: 326 } },
    { id: 20, townName: "Rome", text: "Rzym", coords: { z: -13, x: 325 } },
    { id: 21, townName: "Sarajevo", text: "Sarajewo", coords: { z: -134, x: 266 } },
    { id: 22, townName: "Sofia", text: "Sofia", coords: { z: -230, x: 295 } },
    { id: 23, townName: "Athens", text: "Ateny", coords: { z: -259, x: 427 } },
    { id: 24, townName: "Bucharest", text: "Bukareszt", coords: { z: -283, x: 245 } },
    { id: 25, townName: "Moscow", text: "Moskwa", coords: { z: -406, x: -139 } },*/
]

this.townsTracks = [
    /*{ town1: "Warsaw", town2: "Berlin", color: "GREEN", price: 3 },
    { town1: "Warsaw", town2: "Prague", color: "RED", price: 4 },
    { town1: "Warsaw", town2: "Minsk", color: "ORANGE", price: 3 },
    { town1: "Warsaw", town2: "Kiev", color: "BLUE", price: 3 },
    { town1: "Prague", town2: "Bratislava", color: "BLUE", price: 3 },
    { town1: "Budapest", town2: "Bratislava", color: "ORANGE", price: 1 },
    { town1: "Zagreb", town2: "Bratislava", color: "GREEN", price: 2 },
    { town1: "Zagreb", town2: "Sarajevo", color: "BLACK", price: 2 },
    { town1: "Kiev", town2: "Bucharest", color: "BLACK", price: 5 },
    { town1: "Sofia", town2: "Bucharest", color: "ORANGE", price: 2 },
    { town1: "Athens", town2: "Bucharest", color: "GREEN", price: 5 },
    { town1: "Sarajevo", town2: "Sofia", color: "RED", price: 3 },
    { town1: "Zagreb", town2: "Rome", color: "BLUE", price: 3 },
    { town1: "Bern", town2: "Rome", color: "BLACK", price: 4 },
    { town1: "Bern", town2: "Paris", color: "ORANGE", price: 3 },
    { town1: "Paris", town2: "Prague", color: "GREEN", price: 4 },
    { town1: "Berlin", town2: "Amsterdam", color: "ORANGE", price: 3 },
    { town1: "Paris", town2: "Amsterdam", color: "BLUE", price: 4 },
    { town1: "London", town2: "Amsterdam", color: "RED", price: 2 },
    { town1: "London", town2: "Dublin", color: "BLACK", price: 3 },
    { town1: "London", town2: "Edinburgh", color: "GREEN", price: 2 },
    { town1: "Reykjavik", town2: "Edinburgh", color: "RED", price: 5 },
    { town1: "Madrid", town2: "Bern", color: "RED", price: 4 },
    { town1: "Madrid", town2: "Lisbon", color: "GREEN", price: 3 },
    { town1: "Madrid", town2: "Rome", color: "ORANGE", price: 5 },
    { town1: "Athens", town2: "Rome", color: "RED", price: 5 },
    { town1: "Minsk", town2: "Moscow", color: "BLACK", price: 4 },
    { town1: "Moscow", town2: "Helsinki", color: "BLUE", price: 5 },
    { town1: "Minsk", town2: "Stockholm", color: "GREEN", price: 5 },
    { town1: "Helsinki", town2: "Stockholm", color: "RED", price: 3 },
    { town1: "Oslo", town2: "Stockholm", color: "BLACK", price: 3 },
    { town1: "Oslo", town2: "Berlin", color: "RED", price: 5 },
    { town1: "Moscow", town2: "Kiev", color: "RED", price: 4 },*/
]
}

