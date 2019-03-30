function TrainTrack() {
    var daeModel

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(10, 10, 10)

            //po załadowaniu jest możliwy dostęp do składników / meshów modelu:

            daeModel.traverse(function (mesh) {
                if (mesh instanceof THREE.Mesh) {
                    //console.log(mesh);
                    //mesh.material = materials.material01;
                    //mesh.material = materials.material01
                    //  tu można pokolorować poszcególne meshe helikoptera     
                    // lub nałożyć im materiały     
                }
            });

            // callback czyli zwrócenie danych modelu na zewnątrz pliku 

            callback(daeModel)

        })
    }

    this.getModel = function () {
        return daeModel
    }
}