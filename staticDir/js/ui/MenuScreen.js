function MenuScreen() {
    
    var that = this;
    
    var startBtnEnable = true;
    var randomBtnEnable = true;
    
    var screen = document.createElement("div");
    screen.id = "menuScreen";
    screen.style.position = "fixed";
    screen.style.bottom = 0;
    screen.style.left = 0;
    screen.style.width = "100%";
    screen.style.height = "130px";
    screen.style.display = "none";
    screen.style.background = "rgba(0,0,0,0.8)";
    
    var container = document.createElement("div");
    container.id = "container";
    container.style.width = "100%";
    container.style.height = "130px";
    container.style.position = "relative";
        
    var button = document.createElement("div");
    button.id = "startButton";
    button.innerHTML = "START";
    button.addEventListener("click", startButtonClick);
    container.appendChild(button);
    
    var help = document.createElement("div");
        help.id = "dynamicHelp";
        help.innerHTML = "HELP";
        help.addEventListener("click", buttonHelp);
    container.appendChild(help);

    var exit = document.createElement("div")
        exit.id = "helpWindow";
    
    var textBox = document.createElement("div");
    textBox.id = "text";
    textBox.style.width = "100%";
    textBox.style.color = "white";
    textBox.style.paddingTop = "5%";
    textBox.style.paddingLeft = "15%";

    exit.appendChild(textBox);
    
    var x = document.createElement("div");
        x.innerHTML = "X"
        x.id = "cross";
        x.addEventListener("click", buttonHelp)
    exit.appendChild(x);
    
    document.body.appendChild(exit);

    var status = document.createElement("div");
    status.setAttribute("class", "status");
    status.innerHTML = "0/2 graczy - oczekiwanie";
    container.appendChild(status);
    
    var turn = document.createElement("div");
    turn.id = "turn";
    turn.innerHTML = "";
    container.appendChild(turn);
    
    var random = document.createElement("div");
    random.id = "random";
    random.innerHTML = "LOSUJ";
    random.addEventListener("click", randomButtonClick);
    container.appendChild(random);
    
    screen.appendChild(container);
    
    this.getScreen = function() {
        return screen;
    }
    
    this.showScreen = function() {
        screen.style.display = "block";
    }
    
    this.hideScreen = function() {
        screen.style.display = "none";
    }
    
    this.startButtonDisable = function() {
        button.setAttribute("class", "disable");
        startBtnEnable = false;
    }
    
    this.randomButtonDisable = function() {
        random.setAttribute("class", "disable");
        randomBtnEnable = false;
    }
        
    this.startButtonEnable = function() {
        button.setAttribute("class", "");
        startBtnEnable = true;
    }
    
    this.randomButtonEnable = function() {
        random.setAttribute("class", "");
        randomBtnEnable = true;
    }
    
    this.turn = function(string) {
        turn.innerHTML = string;
    }

    function buttonHelp() {
        net.buttonHelp();
        document.querySelector('#helpWindow').classList.toggle('animuj');
    }
    
    function startButtonClick() {
        if(startBtnEnable) {
            that.randomButtonEnable();
            that.startButtonDisable();
            net.startGame();
        }
    }
    
    function randomButtonClick() {
        if (randomBtnEnable) {
            net.randTwoCards();
        }
    }
}