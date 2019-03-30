function Main() {

    var w = a = s = d = false;
    var selectedTrack = {};

    function initEngine() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            50, // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
        );

        renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(renderer.domElement);

        camera.position.x = 200;
        camera.position.y = 100;
        camera.position.z = -150;

        var axis = new THREE.AxisHelper(1000);
        scene.add(axis);

        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector2();
        
        camera.rotation.x = -Math.PI / 2;
        camera.rotation.y = Math.PI / 3;
        camera.rotation.z = Math.PI / 2;
        
        stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);

    }

    initEngine();
    objects.initObjects(scene);
    trackInfo = new TrackInfo();
    document.body.appendChild(trackInfo.getWindow());
    this.communique = new Communique();
    document.body.appendChild(this.communique.getCommunicue());
    initEvents();
    animateScene();
    
    function animateScene() {
        stats.begin();
        
        if(w && camera.position.x > -230) camera.position.x -= settings.cameraSpeed;
        if(s && camera.position.x < 580) camera.position.x += settings.cameraSpeed;
        if(a && camera.position.z < 370) camera.position.z += settings.cameraSpeed;
        if(d && camera.position.z > -400) camera.position.z -= settings.cameraSpeed;
        
        for(var i = 0; i < objects.toUpdate.length; i++) {
            objects.toUpdate[i].Update();
        }

        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
        
        stats.end();
    }
    
    function initEvents() {
        document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener("keyup", onKeyUp, false);
        document.getElementById("three").addEventListener("mousedown", onMouseDown, false);
        trackInfo.getButton().addEventListener("click", buildTrack);
    }
    
    function onKeyDown(event) {
//        console.log(event.keyCode);
        switch(event.keyCode) {
            case 87: case 38: // w / up
                w = true;
                break;
            case 65: case 37: // a / left
                a = true;
                break;
            case 68: case 39: // d / right
                d = true;
                break;
            case 83: case 40: // s / down
                s = true;
                break;
        }
    }
    
    function onKeyUp(event) {
        switch(event.keyCode) {
            case 87: case 38: // w / up
                w = false;
                break;
            case 65: case 37: // a / left
                a = false;
                break;
            case 68: case 39: // d / right
                d = false;
                break;
            case 83: case 40: // s / down
                s = false;
                break;
        }
    }
    
    function onMouseDown(event) {
        trackInfo.hideWindow();
        
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        
        if (intersects.length > 0 && intersects[0].object.name == "track") {
            
            console.log(intersects[0].object);
            var track = intersects[0].object;
            
            trackInfo.showWindow( event.clientX, event.clientY, track.trackData.town1 + "-" + track.trackData.town2, track.trackData.color, track.trackData.price );
            selectedTrack = track.trackData;

        }
    }
    
    function buildTrack() {
        net.buildTrack(selectedTrack);
    }

}