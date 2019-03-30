function Sky() {

    var skybox;

    function init() {
        var faceMaterial = new THREE.MeshFaceMaterial(materials.skybox);
        var cube = new THREE.CubeGeometry(2048, 2048, 2048, 2048, 1, 1);
        skybox = new THREE.Mesh(cube, faceMaterial);
    }
    init();

    this.getSky = function() {
        return skybox;
    }

}