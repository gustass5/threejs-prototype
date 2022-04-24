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
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.physicallyCorrectLights = true;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 100;
camera.position.y = 80;
camera.position.z = 100;

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();

// Map code

const water1 = { height: 0, color: new THREE.Color(0x5a78e6) };
const water2 = { height: 0.1, color: new THREE.Color(0x5a78e6) };
const water3 = { height: 0.2, color: new THREE.Color(0x5a78e6) };
const sand1 = { height: 0.25, color: new THREE.Color(0xef5e342) };
const sand2 = { height: 0.3, color: new THREE.Color(0xef5bf42) };
const sand3 = { height: 0.35, color: new THREE.Color(0xef5a442) };
const grass1 = { height: 0.4, color: new THREE.Color(0x6ce036) };
const grass2 = { height: 0.6, color: new THREE.Color(0x27c918) };
const grass3 = { height: 0.8, color: new THREE.Color(0x148709) };

for (let i = 0; i < 100; i++) {
	for (let j = 0; j < 100; j++) {
		const height = (simplex.noise2D(i * 0.02, j * 0.02) + 1) * 0.5;
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		geometry.translate(i, 0, j);
		console.log(height);
		const material = new THREE.MeshBasicMaterial();

		if (height > grass3.height) {
			material.color = grass3.color;
		} else if (height > grass2.height) {
			material.color = grass2.color;
		} else if (height > grass1.height) {
			material.color = grass1.color;
		} else if (height > sand3.height) {
			material.color = sand3.color;
		} else if (height > sand2.height) {
			material.color = sand2.color;
		} else if (height > sand1.height) {
			material.color = sand1.color;
		} else if (height > water3.height) {
			material.color = water3.color;
		} else if (height > water2.height) {
			material.color = water2.color;
		} else if (height > water1.height) {
			material.color = water1.color;
		}

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
	}
}
