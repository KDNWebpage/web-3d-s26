

// The main library script
import * as THREE from 'three';

// The plug-in for orbit controls
import { OrbitControls } from './src/OrbitControls.js';

//The plug-in for First Person Controls
import { PointerLockControls } from './src/PointerLockControls.js';

//The plug-in to load glb models
import { GLTFLoader } from './src/GLTFLoader.js';

// Declaring global variables.
let camera, canvas, controls, scene, renderer, bear;
let ice;

//Variables for First Person Controls
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {

    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfeff5 );
    scene.fog = new THREE.FogExp2( 0xbfeff5, 0.0015 );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    //renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( innerWidth, innerHeight );
    renderer.setAnimationLoop( animate );
    canvas.appendChild( renderer.domElement );

    // Setup camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 10, 200 );

    // Setup Orbit controls
    //controls = new OrbitControls( camera, renderer.domElement );
    //controls.listenToKeyEvents( window ); 
    //controls.enableDamping = true; 
    //controls.dampingFactor = 0.05;
    //controls.screenSpacePanning = false;
    //controls.minDistance = 100;
    //controls.maxDistance = 500;
    //controls.cursorStyle = 'grab';
    //controls.maxPolarAngle = Math.PI / 2;
    
    // Setup First Person Controls
    controls = new PointerLockControls( camera, document.body );

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {
controls.lock();

    } );


    controls.addEventListener( 'lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );

    scene.add( controls.object );

    const onKeyDown = function ( event ) {

        switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;

        case 'Space':
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;

        }

    };

    const onKeyUp = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    //End of First person setup
    
       // Add world geometry that needs loading inside init
    const loader = new GLTFLoader();
        loader.load( './assets/polar_bear_full.glb', function ( gltf ) {

            bear = gltf.scene;
            bear.scale.set (10,10,10);
            bear.position.set(0,-10,0);
            scene.add( bear ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } );      
        loader.load( './assets/ice.glb', function ( gltf ) {

            ice = gltf.scene;
            ice.scale.set (10,10,10);
            ice.position.set(50,-15,0);
            scene.add( ice ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } ); 
    
    //Add refraction
    // refractor

		
    const listener = new THREE.AudioListener();
camera.add(listener);

const audioLoader = new THREE.AudioLoader();
const backgroundSound = new THREE.Audio(listener);

audioLoader.load('./assets/Akon_Lonely.mp3', function(buffer) {
	backgroundSound.setBuffer(buffer);
	backgroundSound.setLoop(true);
	backgroundSound.setVolume(0.4);

	// Try autoplay if user already allowed it before
	if (localStorage.getItem("audioEnabled") === "true") {
		if (listener.context.state === "suspended") {
			listener.context.resume().then(() => {
				backgroundSound.play();
			});
		} else {
			backgroundSound.play();
		}
	}
});
	
	document.addEventListener("click", () => {
	localStorage.setItem("audioEnabled", "true");

	if (listener.context.state === "suspended") {
		listener.context.resume().then(() => {
			if (!backgroundSound.isPlaying) {
				backgroundSound.play();
			}
		});
	} else {
		if (!backgroundSound.isPlaying) {
			backgroundSound.play();
		}
	}
}, { once: true });
    }


    //// Grouping of trees
    //const geometry = new THREE.ConeGeometry( 10, 60, 8, 1 );
    //const material = new THREE.MeshPhongMaterial( { color: 0x14401e, flatShading: true } );
    //const mesh = new THREE.InstancedMesh( geometry, material, 500 );
    //const tree = new THREE.Object3D();
    //for ( let i = 0; i < 75; i ++ ) {
    //    tree.position.x = Math.random() * 250 - 125;
    //    tree.position.y = 0;
    //    tree.position.z = Math.random() * 250 - 125;
    //    tree.updateMatrix();
    //    mesh.setMatrixAt( i, tree.matrix );
    //}
    //scene.add( mesh );

const planeGeo = new THREE.PlaneGeometry( 100.1, 100.1 );
    // Ground
    const earth = new THREE.PlaneGeometry( 2000, 2000 );
    const ground = new THREE.MeshPhongMaterial( { color: 0x402314, flatShading: true } );
    const mesh2 = new THREE.Mesh( earth, ground );
    mesh2.translateY( -65 );
    mesh2.rotateX( -1.5708 );
    scene.add( mesh2 );

    // lights
    const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight1.position.set( 1, 1, 1 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0xffffff, 2 );
    dirLight2.position.set( - 1, - 1, - 1 );
    scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0x555555 );
    scene.add( ambientLight );


// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    
    //Start First Person Control Animations
    const time = performance.now();
    
    
    if ( controls.isLocked === true ) {

        
        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;


        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );
 
        controls.object.position.y += ( velocity.y * delta ); // new behavior 
        
        	if (controls.object.position.y < 10) {
            velocity.y = 0;
            controls.object.position.y = 10;
            canJump = true;
            }
    }

    prevTime = time;

    //End First Person Control Animations
     renderer.render( scene, camera );
   
}

// Function to render the scene using the camera.
function render() {
    renderer.render( scene, camera );
}






