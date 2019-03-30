function Sun() {
    var sun = new THREE.Object3D();

    function init() {
        var hemiLight = new THREE.HemisphereLight(0x7F7F1F, 0x7F493F, 0.8);
        hemiLight.position.set(0, 500, 0);
        sun.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(-1, 0.75, 1);
        dirLight.position.multiplyScalar(50);

        dirLight.castShadow = true;
        dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024 * 2;
/*
        var d = 300;

        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;

        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        dirLight.shadowDarkness = 0.35;
*/        
        sun.add(dirLight);
    }
    init();

    this.getSun = function () {
        return sun;
    }
}