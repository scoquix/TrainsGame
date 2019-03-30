function Cards() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext2D();
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.id = "cards";
    
    
    this.getCards = function() {
        return canvas;
    }
    
    this.drawCards = function() {
        
    }
    
}