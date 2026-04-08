// Get container
const container = document.getElementById("bloch-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    400 / 400,
    0.1,
    1000
);

camera.position.z = 2;
camera.position.x = 1;
camera.position.y = 1;

camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setClearColor(0x000000, 0);

renderer.setSize(300, 300);
container.appendChild(renderer.domElement);

// Sphere
const geometry = new THREE.SphereGeometry(
    1,
    32,
    32
);

const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x888888,   // grey instead of white
    transparent: true,
    opacity: 0.4       // ⭐ makes sphere faint
});

const sphere = new THREE.Mesh(
    geometry,
    material
);

scene.add(sphere);

// Axes
const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

// Arrow

const direction = new THREE.Vector3(0, 0, 1);

const origin = new THREE.Vector3(0, 0, 0);

const arrowHelper = new THREE.ArrowHelper(
    direction,
    origin,
    1.6,
    0xffff00,
    0.4,
    0.25
);

scene.add(arrowHelper);
arrowHelper.visible = false;

// Animation

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();


// Update Function

function updateBlochVector(a, b) {

    const norm = Math.sqrt(a*a + b*b);

    if (norm === 0) return;

    a = a / norm;
    b = b / norm;

    const theta = 2 * Math.acos(a);

    const x = Math.sin(theta);
    const y = 0;
    const z = Math.cos(theta);

    const newDirection =
        new THREE.Vector3(x, y, z);

    newDirection.normalize();

    arrowHelper.setDirection(newDirection);

    arrowHelper.setLength(1.5);

    arrowHelper.visible = true;
}