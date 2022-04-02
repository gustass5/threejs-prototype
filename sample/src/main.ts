import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGL1Renderer({
	canvas: document.querySelector('#app') as HTMLCanvasElement
});

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setX(-20);
camera.position.setY(10);

renderer.render(scene, camera);

const planeGeometry = new THREE.BoxGeometry(20, 1, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ee40 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = 0.5;

scene.add(plane);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.y = 10;
pointLight.position.z = 15;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

const playerGeometry = new THREE.CylinderGeometry(1, 1, 2, 16);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 2;

scene.add(player);

const ligthHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(ligthHelper, gridHelper);

const gravity = 0.25;
const speed = 1;

document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.key === ' ') {
		player.position.y = 6;
	}

	if (event.key === 'w') {
		player.position.x += speed;
	}

	if (event.key === 's') {
		player.position.x -= speed;
	}

	if (event.key === 'd') {
		player.position.z += speed;
	}

	if (event.key === 'a') {
		player.position.z -= speed;
	}
});

function draw() {
	requestAnimationFrame(draw);

	if (player.position.y - gravity * 2 > 1.5) {
		player.position.y -= gravity;
	}

	controls.update();
	renderer.render(scene, camera);
}

draw();
