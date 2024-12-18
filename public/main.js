import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

let currentSceneIndex = 0;
let scenes = ['assets/1.jpg',
  'assets/2.jpg',
  'assets/3.jpg',
  'assets/4.jpg',
  'assets/5.jpg',
  'assets/6.jpg',
  'assets/7.jpg'
]; // Array to store different 360-degree images - ASSETS folder is part og gitignore

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const loader = new THREE.TextureLoader();

// Load First Scene
loadScene('assets/1.jpg');

// Switching to next scene
window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') { // Press the Right Arrow key
        nextScene();
    }
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	renderer.render( scene, camera );
}


// Load a 360-degree image and add it to the scene
function loadScene(imagePath) {
  // OPTION 1 - Gives brighter result - SLOWER SPEED
  // const texture = new THREE.TextureLoader().load(imagePath);
  // texture.mapping = THREE.EquirectangularReflectionMapping;
  //
  // // Create a sphere to wrap the 360 image
  // const geometry = new THREE.SphereGeometry(500, 60, 40);
  // geometry.scale(-1, 1, 1); // Invert the sphere to look inside
  //
  // const material = new THREE.MeshBasicMaterial({
  //   map: texture
  // });
  // const mesh = new THREE.Mesh(geometry, material);
  //
  // // Add the mesh to the scene
  // scene.add(mesh);

  // OPTION 2 - Gives realistic result - SLIGHTLY FASTER
  const texture = loader.load(
    imagePath,
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture;
    });
}

// Add navigation to switch between scenes
function nextScene() {
  currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
  loadScene(scenes[currentSceneIndex]);
}
