function TownsTrack(v1, v2, color) {
    var particles = new THREE.Geometry();
    var particleSystem, subV, stepV, particlesCount;

    function init(v1, v2, color) {
        subV = Distance(v1, v2);

        particlesCount = 300;
        stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek
        for (var i = 0; i < particlesCount; i++) {
            var particle = new THREE.Vector3(
                v1.x + stepV.x * i,
                v1.y + stepV.y * i,
                v1.z + stepV.z * i)
            particles.vertices.push(particle);
        }
        material = new THREE.PointsMaterial({
            color: color,
            size: 5,
        })
        particleSystem = new THREE.Points(particles, material);
        particleSystem.name = "track";
    }
    init(v1, v2, color);

    function Distance(v1, v2) {
        var subV = new THREE.Vector3(
            v2.x - v1.x,
            v2.y - v1.y,
            v2.z - v1.z
        )
        return subV;
    }

    this.getTownsTrack = function () {
        return particleSystem;

    }

}