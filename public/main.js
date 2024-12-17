import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Light Setup
const light = new THREE.PointLight(0xffffff, 50)
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

// Ambient Light Setup
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x773399 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const fbxLoader = new FBXLoader()
fbxLoader.load(
    './assets/drone.fbx',
    (object) => {
        object.scale.set(.03, .03, .03)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}
