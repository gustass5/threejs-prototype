import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Setup code

const simplex = new SimplexNoise();

const scene = new THREE.Scene();
scene.background = new THREE.Color('#FFEECC');
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 100;
camera.position.y = 80;
camera.position.z = 100;

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

const loader = new GLTFLoader();

loader.load(
	'../assets/bunny.glb',
	function (gltf) {
		const bunny = gltf.scene;
		bunny.position.set(10, 1, 10);
		scene.add(bunny);
	},
	undefined,
	function (error) {
		console.error(error);
	}
);
const light = new THREE.PointLight();
light.position.set(100, 20, 10);

scene.add(light);
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();

// Map code

const waterHeight = 0;
const sandHeight = 0.25;
const grassHeight = 0.4;

for (let i = 0; i < 100; i++) {
	for (let j = 0; j < 100; j++) {
		const height = (simplex.noise2D(i * 0.02, j * 0.02) + 1) * 0.5;
		const waterBlockHeight = 0.5;

		const geometry = new THREE.BoxGeometry(
			1,
			height < sandHeight ? waterBlockHeight : 1,
			1
		);
		geometry.translate(i, height < sandHeight ? -waterBlockHeight * 0.5 : 0, j);

		console.log(height);
		const material = new THREE.MeshBasicMaterial();

		if (height > grassHeight) {
			const grassWeight = 1 - height < 0.4 ? 0.4 : 1 - height;
			material.color = new THREE.Color(0.1, grassWeight, 0);
		} else if (height > sandHeight) {
			material.color = new THREE.Color(0.6, (1 - height) * 0.85, 0);
		} else if (height > waterHeight) {
			material.color = new THREE.Color(0, 0.3, 1 - height);
		}

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
	}
}
