function Terrain() {

    var terrain;

    function init() {
        var terrainGeometry = new THREE.PlaneBufferGeometry(1024, 1024);

        terrain = new THREE.Mesh(terrainGeometry, materials.terrainMaterial);
        terrain.name = "terrain";
        terrain.rotateZ(Math.PI / 2);
        terrain.rotateY(Math.PI / 2);
        terrain.receiveShadow = true;

    }
    init();

    this.getTerrain = function() {
        return terrain;
    }

}