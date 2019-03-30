function Communique() {
    var box = document.createElement("div");
    box.id = "communique";
    box.style.background = "red";
    box.style.border = "1px solid black";
    box.style.borderRadius = "10px";
    box.style.color = "white";
    box.style.maxWidth = "500px";
    box.style.display = "none";
    box.style.zIndex = "100";
    box.style.position = "absolute";
    box.style.top = "50%";
    box.style.left = "50%";
    box.style.transform = "translate(-50%, -50%)";
    box.style.padding = "10px";
    box.style.fontSize = "30px";
    
    var button = document.createElement("div");
    button.innerHTML = "OK";
    button.addEventListener("click", function() {
        box.style.display = "none";
    });
    button.style.cursor = "pointer";
    box.appendChild(button);
    
    this.getCommunicue = function() {
        return box;
    }
    
    this.showCommunicue = function(text) {
        box.innerHTML = text;
        box.appendChild(button);
        box.style.display = "block";
    }
    
    this.hideCommunique = function() {
        box.style.display = "none";
    }
    
}