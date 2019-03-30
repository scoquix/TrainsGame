function GameOver() {
    
    var screen = document.createElement("div");
    screen.id = "GameOverScreen";
    screen.style.position = "fixed";
    screen.style.top = 0;
    screen.style.left = 0;
    screen.style.width = "100%";
    screen.style.height = "100%";
    screen.style.display = "none";
    screen.style.color = "red";
    screen.style.fontSize = "50px";
    screen.style.background = "rgba(0,0,0,0.9)";
    
    screen.innerHTML = "Game Over";
    screen.style.textAlign = "center";
    screen.style.lineHeight = "100%";
    
    var win = document.createElement("div");
    win.id = "win";
    screen.appendChild(win);
    
    var results = document.createElement("div");
    results.id = "results";
    results.style.fontSize = "30px";
    screen.appendChild(results);
    
    this.getScreen = function() {
        return screen;
    }
    
    this.showScreen = function() {
        screen.style.display = "block";
    }
    
    this.hideScreen = function() {
        screen.style.display = "none";
    }
    
    this.setWin = function(text) {
        win.innerHTML = text;
    }
    
    this.setResults = function(text) {
        results.innerHTML = text;
    }
    
}