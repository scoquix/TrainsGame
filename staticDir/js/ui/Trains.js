function Trains() {
    
    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.right = "0";
    
    var img = document.createElement("div");
    container.appendChild(img);
    
    var trainCount = document.createElement("div");
    trainCount.style.position = "absolute";
    trainCount.style.top = "50px";
    trainCount.style.right = "150px";
    trainCount.style.color = "red";
    trainCount.style.fontSize = "60px";
    container.appendChild(trainCount);
    
    this.getTrains = function() {
        return container;
    }
    
    this.setImg = function(path) {
        img.innerHTML = "";
        var i = document.createElement("img");
        i.src = path;
        i.width = 300;
        i.height = 170;
        img.appendChild(i);
    }
    
    this.setTrainsCount = function(number) {
        trainCount.innerHTML = number + "";
    }
    
}