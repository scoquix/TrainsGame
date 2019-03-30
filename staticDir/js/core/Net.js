function Net() {

    var that = this;
    
    this.clientID = 0;
    this.isLogin = false;
    this.waiting = true;
    this.userPawn = 0;

    this.myCards = [];
    this.myTurn = false;
    this.target = "";
    this.isStarting = false;

    client.on("onconnect", function (data) {
        that.clientID = data.clientID;
        document.querySelector("#startScreen .room .status").innerHTML = data.roomStatus + "/2";
        if (data.roomStatus > 1) document.querySelector("#menuScreen .status").innerHTML = data.roomStatus + "/2 graczy";
        else document.querySelector("#menuScreen .status").innerHTML = data.roomStatus + "/2 graczy - oczekiwanie";
/*
        client.emit("dodaj", {
            towns: objects.towns,
            townsTracks: objects.townsTracks
        })*/
    })
    
    this.buttonHelp = function () {
        var text = "";
        text += "Witaj w dynamicznym helpie<br/>";
        text += "Tu uzyskasz pomoc, rady i podpowiedzi...";

        
        if (that.myTurn)
            text += "<br/><br/> Teraz twoja kolej.<br>Podpowidź:";
        else
            text += "<br/><br/> Poczekaj na swoją kolej.<br>Podpowidź:";

        if (that.myCards.length < 3)
            text += "<br/><br/>     Masz malo kart, sugeruje losowanie :) ";

        var red = 0,
            black = 0,
            green = 0,
            blue = 0;

        for (var i = 0; i < that.myCards.length; i++)
        {
            switch (that.myCards[i]) {
                case 0:
                    //red
                    red++;
                    break;
                case 1:
                    //orange
                    orange++;
                    break;
                case 2:
                    //green
                    green++
                    break;
                case 3:
                    //blue
                    blue++
                    break;
                case 4:
                    //black
                    black++
                    break;
            }
        }
        if (red > 3)
            text += "<br>       Posiadasz wiele czerwonych kart.<br>Poszukaj trasy którą mógłbyś dzięki nim zbudować";
        if(green>= 3)
            text += "<br>       Posiadasz wiele zielonych kart.<br>Poszukaj trasy którą mógłbyś dzięki nim zbudować";
        if (blue >= 3)
            text += "<br>       Posiadasz wiele niebieskich kart.<br>Poszukaj trasy którą mógłbyś dzięki nim zbudować";
        if (black >= 3)
            text += "<br>       Posiadasz wiele czarnych kart.<br>Poszukaj trasy którą mógłbyś dzięki nim zbudować";
        if (orange >= 3)
            text += "<br>       Posiadasz wiele pomarańczowych kart.<br>Poszukaj trasy którą mógłbyś dzięki nim zbudować";

        document.getElementById("text").innerHTML = text + "";
    }
    
    var trains = new Trains();
    document.body.appendChild(trains.getTrains());
    
    var gameover = new GameOver();
    document.body.appendChild(gameover.getScreen());

    this.EmitSelect = function (collectionName, num, modelData) {
        client.emit("select", {
            coll_name: collectionName,
            num: num,
        });
        client.on("select", function (data) {
            if (data.number == 1) {
                objects.towns = data.selected;
                for (var i = 0; i < data.selected.length; i++) {
                    var townSign = modelData.clone();
                    townSign.position.z = data.selected[i].coords.z - 13;
                    townSign.position.x = data.selected[i].coords.x;
                    switch (data.selected[i].townName) {
                    case "Amsterdam":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Amsterdam;
                        break;
                    case "Athens":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Athens;
                        break;
                    case "Berlin":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Berlin;
                        break;
                    case "Sarajevo":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.BosniaHerzegovina;
                        break;
                    case "Bern":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Bern;
                        break;
                    case "Bratislava":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Bratislava;
                        break;
                    case "Bucharest":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Bucharest;
                        break;
                    case "Budapest":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Budapest;
                        break;
                    case "Dublin":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Dublin;
                        break;
                    case "Edinburgh":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Edinburgh;
                        break;
                    case "Helsinki":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Helsinki;
                        break;
                    case "Kiev":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Kiev;
                        break;
                    case "Lisbon":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Lisbon;
                        break;
                    case "London":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.London;
                        break;
                    case "Madrid":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Madrid;
                        break;
                    case "Minsk":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Minsk;
                        break;
                    case "Moscow":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Moscow;
                        break;
                    case "Oslo":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Oslo;
                        break;
                    case "Paris":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Paris;
                        break;
                    case "Prague":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Prague;
                        break;
                    case "Reykjavik":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Reykjavik;
                        break;
                    case "Rome":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Rome;
                        break;
                    case "Sofia":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Sofia;
                        break;
                    case "Stockholm":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Stockholm;
                        break;
                    case "Warsaw":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Warsaw;
                        break;
                    case "Zagreb":
                        townSign.getObjectByName("Pic2").children[0].material = materials.towns.Zagreb;
                        break;
                    }
                    scene.add(townSign);
                }

            } else if (data.number == 2) {
                objects.townsTracks = data.selected;
                for (var i = 0; i < data.selected.length; i++) {
                    var town1Coords = objects.findTown(data.selected[i].town1).coords;
                    var town2Coords = objects.findTown(data.selected[i].town2).coords;
                    var color = 0x000000;

                    switch (data.selected[i].color) {
                    case "GREEN":
                        color = 0x00aa00;
                        break;
                    case "RED":
                        color = 0xaa0000;
                        break;
                    case "ORANGE":
                        color = 0xff5500;
                        break;
                    case "BLUE":
                        color = 0x000088;
                        break;
                    case "BLACK":
                        color = 0x000000;
                        break;
                    case "PURPLE":
                        color = 0x7F00FF;
                        break;
                        /*case "GREEN":
                            color = 0x00ff00;
                            break;
                        case "ORANGE":
                            color = 0xff0000;
                            break;
                        case "YELLOW":
                            color = 0xffff00;
                            break;
                        case "BLUE":
                            color = 0x0000ff;
                            break;
                        case "AQUAMARINE":
                            color = 0x00ffff;
                            break;*/
                        /*case "PURPLE":
                            color = 0x7F00FF;
                            break;*/
                    }
                    var v1 = new THREE.Vector3(town1Coords.x, 0, town1Coords.z);
                    var v2 = new THREE.Vector3(town2Coords.x, 0, town2Coords.z);

                    var track = new TownsTrack(v1, v2, color);
                    track.getTownsTrack().trackData = { color: objects.townsTracks[i].color, town1: objects.townsTracks[i].town1, town2: objects.townsTracks[i].town2, price: objects.townsTracks[i].price };
                    scene.add(track.getTownsTrack());
                    //this.toUpdate.push(track);

                }

            }
        })
    }

    this.tryEnterRoom = function () {
        client.emit("tryEnterRoom", {})
    }

    client.on("response", function (data) {
        switch (data.event) {
        case "tryEnterRoom":
            if (data.success) {
                this.isLogin = true;
                menuScreen.randomButtonDisable();
                objects.roomEnter();
                if (data.playersCount > 1) {
                    document.querySelector("#menuScreen .status").innerHTML = data.playersCount + "/2 graczy";
                    this.waiting = false;
                } else {
                    menuScreen.startButtonDisable();
                    document.querySelector("#menuScreen .status").innerHTML = data.playersCount + "/2 graczy - oczekiwanie";
                }
            } else {
                alert(data.message);
            }
            break;
            case "GameOver":
                main.communique.hideCommunique();
                gameover.showScreen();
                if(data.win) gameover.setWin("Wygrałeś!");
                else gameover.setWin("Przegrałeś :(");
                gameover.setResults("PUNKTACJA: <br> Otrzumujesz " + data.myPoints + " punktów<br>Przeciwnik dostał " + data.enemyPoints + " punktów");
                break;
        }
    })

    client.on("message", function (data) {
        switch (data.event) {
        case "roomEnter":
            document.querySelector("#startScreen .room .status").innerHTML = data.playersCount + "/2";
            if (data.playersCount > 1) {
                menuScreen.startButtonEnable();
                document.querySelector("#menuScreen .status").innerHTML = data.playersCount + "/2 graczy";
                this.waiting = false;
            } else document.querySelector("#menuScreen .status").innerHTML = data.playersCount + "/2 graczy - oczekiwanie";
            break;
        }
    })

    this.startGame = function () {
        client.emit("startGame", {});
    }

    client.on("startGame", function (data) {
        that.myTurn = data.myTurn;
        that.myCards = data.cards;
        that.isStarting = true;
        //this.target = data.target;
        menuScreen.randomButtonEnable();
        menuScreen.startButtonDisable();
        canvas.random(that.myCards);

        if(that.myTurn) {
            objects.turn("Twoja kolej");
        }
        else {
            objects.turn("Kolej przeciwnika");
            that.userPawn = 1;
        }
        trains.setImg(materials.trainIcos[that.userPawn]);
        trains.setTrainsCount(data.trains);
    })
    this.randTwoCards = function () {
        if(that.myTurn) {
            console.log("Net z ID: ");
            console.log(that.clientID);
            client.emit("randTwoCards", { id: that.clientID })
        }
        else main.communique.showCommunicue("Kolej przeciwnika");
    }
    client.on("TwoCardsRespons", function (data) {
        //this.myTurn = data.myTurn;
        that.myTurn = !that.myTurn;
        if(that.myTurn) objects.turn("Twoja kolej");
        else objects.turn("Kolej przeciwnika");
        var children = that.myCards.concat(data.twoCards);
        that.myCards = children 
        //this.target = data.target;
        canvas.random(that.myCards);
    })
    
    this.buildTrack = function (selectedTrack) {
        if(that.myTurn)
            client.emit("buildTrack", { selectedTrack, cards: that.myCards, pawn: that.userPawn });
        else main.communique.showCommunicue("Kolej przeciwnika");
    }
    
    client.on("buildTrack", function(data) {
        console.log(data);
        main.communique.showCommunicue(data.message);
    })
    
    client.on("change", function(data) {
        console.log("CHANGE")

        if(data.cards){
            that.myCards = data.cards;
            canvas.random(that.myCards);
        }

        that.myTurn = !that.myTurn;
        if(that.myTurn) objects.turn("Twoja kolej");
        else objects.turn("Kolej przeciwnika");
        if(data.event == "trackBuilded") {
            console.log(data);
            objects.drawTrains(data.buildedTracks)
            trains.setTrainsCount(data.trains);
        }
    })
    client.on("changeTurn",function() {
        that.myTurn = true;
        objects.turn("Twoja kolej");
    })

}