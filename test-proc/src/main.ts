import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 30;
camera.position.y = 10;
camera.position.z = 30;

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();

// Map code

const base = { height: 0, color: new THREE.Color(0x331802) };
const water = { height: 0.2, color: new THREE.Color(0x5a78e6) };
const sand = { height: 0.3, color: new THREE.Color(0xe3c866) };
const grass = { height: 0.5, color: new THREE.Color(0x6ce036) };
const dirt = { height: 0.7, color: new THREE.Color(0x804c1f) };
const stone = { height: 0.8, color: new THREE.Color(0xa8a8a8) };

for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 10; j++) {
		const height = Math.abs(simplex.noise2D(i, j));
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		geometry.translate(i, 0, j);
		console.log(height);
		const material = new THREE.MeshBasicMaterial();

		if (height > stone.height) {
			material.color = stone.color;
		} else if (height > dirt.height) {
			material.color = dirt.color;
		} else if (height > grass.height) {
			material.color = grass.color;
		} else if (height > sand.height) {
			material.color = sand.color;
		} else if (height > water.height) {
			material.color = water.color;
		} else if (height > base.height) {
			material.color = base.color;
		}

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
	}
}
