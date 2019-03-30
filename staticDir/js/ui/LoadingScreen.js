function LoadingScreen() {
    
    var screen = document.createElement("div");
    screen.id = "loadingScreen";
    screen.style.position = "fixed";
    screen.style.top = 0;
    screen.style.left = 0;
    screen.style.width = "100%";
    screen.style.height = "100%";
    screen.style.display = "none";
    screen.style.background = "rgba(0,0,0,0.9)";
    
    screen.innerHTML = "Loading...";
    screen.style.textAlign = "center";
    screen.style.lineHeight = "100%";
    
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