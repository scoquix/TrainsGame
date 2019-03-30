function TrackInfo() {
    
    var container = document.createElement("div");
    container.id = "trackInfo";
    container.style.position = "absolute";
    container.style.display = "none";
    container.style.zIndex = 99;
    
    var titleDiv = document.createElement("div");
    container.appendChild(titleDiv);
    
    var colorDiv = document.createElement("div");
    container.appendChild(colorDiv);
    
    var priceDiv = document.createElement("div");
    container.appendChild(priceDiv);
    
    var build = document.createElement("div");
    build.innerHTML = "Zbuduj trasę";
    build.style.background = "brown"
    build.style.textAlign = "center";
    build.style.borderRadius = "10px";
    build.id = "buildTrack";
    container.appendChild(build);

    this.showWindow = function(positionX, positionY, title, color, price) {
        
        titleDiv.innerHTML = "Trasa: " + title;
        colorDiv.innerHTML = "Kolor: " + color;
        priceDiv.innerHTML = "Cena: " + price + "kart";
        
        container.style.top = positionY + "px";
        container.style.left = positionX + "px";
        container.style.display = "block";
        
    }
    
    this.hideWindow = function() {
        container.style.display = "none";
    }
    
    this.getWindow = function() {
        return container;
    }
    
    this.getButton = function() {
        return build;
    }
    
}