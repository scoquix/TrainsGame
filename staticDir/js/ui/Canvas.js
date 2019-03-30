function Canvas() {
    var canvas, context;
    function init() {
        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; // bez px;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "100px";
        canvas.setAttribute("id", "myCanvas");
        canvas.style.zIndex = "2";
        //canvas.style.background = "rgba(240, 40, 40, 0.5)";
        context = canvas.getContext("2d");
        document.getElementById("three").appendChild(canvas);
    }
    init();
    this.random = function (tab) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        //context = document.getElementById("myCanvas").getContext("2d");
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0 ; i < tab.length; i++) {
            switch (tab[i]) {
                case 0:
                    //img.src = materials.cards.red;
                    img = document.getElementById("red");
                    break;
                case 1:
                    //img.src = materials.cards.orange;
                    img = document.getElementById("orange");
                    break;
                case 2:
                    //img.src = materials.cards.green;
                    img = document.getElementById("green");
                    break;
                case 3:
                    //img.src = materials.cards.blue;
                    img = document.getElementById("blue");
                    break;
                case 4:
                    //img.src = materials.cards.black;
                    img = document.getElementById("black");
                    break;
            }
            context.drawImage(img, i * width / tab.length /3 , height - height / 2, width/7, height / 7);
        }
    }
}