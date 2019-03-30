function Train() {
    var daeModel

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(4, 4, 4)

            daeModel.traverse(function (mesh) {
                if (mesh instanceof THREE.Mesh) {
                    
                }
            });

            callback(daeModel)

        })
    }

    this.getModel = function () {
        return daeModel
    }
}