function StartScreen() {
    
    var screen = document.createElement("div");
    screen.id = "startScreen";
    screen.style.position = "fixed";
    screen.style.top = 0;
    screen.style.left = 0;
    screen.style.width = "100%";
    screen.style.height = "100%";
    screen.style.display = "none";
    screen.style.background = "rgba(0,0,0,0.8)";
    
    var room = document.createElement("div");
    room.id = "room1";
    room.setAttribute("class", "room");
    var span = document.createElement("span");
    span.innerHTML = "ROOM 1";
    room.appendChild(span);
    var span = document.createElement("span");
    span.setAttribute("class", "status");
    span.innerHTML = "0/2";
    room.appendChild(span);
    var button = document.createElement("span");
    button.setAttribute("class", "enter");
    button.innerHTML = "Wejdź";
    button.addEventListener("click", net.tryEnterRoom);
    room.appendChild(button);
    screen.appendChild(room);
    
    this.getScreen = function() {
        return screen;
    }
    
    this.showScreen = function() {
        screen.style.display = "block";
    }
    
    this.hideScreen = function() {
        screen.style.display = "none";
    }
    
}