// Images and 3D Font Example Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-ins
import { PointerLockControls } from "./src/PointerLockControls.js";
import { Font } from "./src/FontLoader.js";
import { TTFLoader } from "./src/TTFLoader.js";
import { TextGeometry } from "./src/TextGeometry.js";
import { GLTFLoader } from './src/GLTFLoader.js';

// Declaring global variables.
let camera, canvas, controls, scene, renderer, penny, art, ghost, record, billy, building; 

// Variables for First Person Controls
let raycaster;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = true;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let font;
let text = "Cabinet of Curiosity";
let textGeo;
let materials;
let textMesh1;
let textMesh2;
let group;

// Run the "init" function which is like "setup" in p5.
init();


// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfeff5);
    //scene.fog = new THREE.FogExp2(0xbfeff5, 0.0015);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(innerWidth, innerHeight);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 0);
	camera.scale.set(2.5, 2.5, 2.5);

    // Setup First Person Controls
    // DO NOT TOUCH

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById("blocker");
    const instructions = document.getElementById("instructions");

    instructions.addEventListener("click", function () {
        controls.lock();
    });

    controls.addEventListener("lock", function () {
        instructions.style.display = "none";
        blocker.style.display = "none";
    });

    controls.addEventListener("unlock", function () {
        blocker.style.display = "block";
        instructions.style.display = "";
    });

    scene.add(controls.object);

    const onKeyDown = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = true;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = true;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = true;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = true;
                break;

            case "Space":
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = false;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = false;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = false;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = false;
                break;
        }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    // End First Person Controls

    // Add world geometry

    // room material
    const wall = new THREE.MeshPhongMaterial({ color: 0xbbb2b9 });
    
    //
    // back wall
    //const shortWall = new THREE.BoxGeometry(300, 200, 10);
    //const backWall = new THREE.Mesh(shortWall, wall);
    //backWall.position.set(0, 0, -250);
    //scene.add(backWall);
	
	// side walls
	//const longWall = new THREE.BoxGeometry(10, 200, 600);
	//const leftWall = new THREE.Mesh(longWall, wall);
	//leftWall.position.set(-150, 0, 0);
	//scene.add(leftWall);
	//
	//const rightWall = new THREE.Mesh(longWall, wall);
	//rightWall.position.set(150, 0, 0);
	//scene.add(rightWall);
	
	// front walls 
	//const frontSide = new THREE.BoxGeometry(100, 125, 10);
	//const frontLeft = new THREE.Mesh(frontSide, wall);
	//frontLeft.position.set(-100, -20, 250);
	//scene.add(frontLeft);
	//
	//const frontRight = new THREE.Mesh(frontSide, wall);
	//frontRight.position.set(100, -20, 250);
	//scene.add(frontRight);
	//
	//const frontTop = new THREE.BoxGeometry(300, 57.5, 10);
	//const frontMiddle = new THREE.Mesh(frontTop, wall);
	//frontMiddle.position.set(0, 70, 250);
	//scene.add(frontMiddle);
	
	// ceiling
	//const ceilingMat = new THREE.MeshPhongMaterial({ color: 0xd000a2 });
	//const ceilingShape = new THREE.BoxGeometry(300, 10, 500);
	//const ceilingMain = new THREE.Mesh(ceilingShape, ceilingMat);
	//ceilingMain.position.set(0, 100, 0);
	//scene.add(ceilingMain);
	     

    // text

    // materials for the text
    materials = [
        new THREE.MeshPhongMaterial({ color: 0x10b10c, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0x0c9909 }) // side
    ];

    // establish font loader
    const loader = new GLTFLoader();
		loader.load( './assets/tester.glb', function ( gltf ) {

            building = gltf.scene;
            building.scale.set (60,60,60);
            building.position.set(0,-10,0);
            scene.add( building ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } );  
	loader.load( './assets/record_player.glb', function ( gltf ) {

            record = gltf.scene;
            record.scale.set (1.5,1.5,1.5);
            record.position.set(100,4,0);
			record.rotateY (1.5708);
            scene.add( record ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } ); 
	
	loader.load( './assets/billy.glb', function ( gltf ) {

            billy = gltf.scene;
            billy.scale.set (7,7,7);
            billy.position.set(25,-10,-135);
            scene.add( billy ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } ); 
	
	loader.load( './assets/Ghostface.glb', function ( gltf ) {

            ghost = gltf.scene;
            ghost.scale.set (14,14,14);
            ghost.position.set(65,-10,-135);
            scene.add( ghost ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } ); 
	
	loader.load( './assets/Art.glb', function ( gltf ) {

            art = gltf.scene;
            art.scale.set (14,14,14);
            art.position.set(-15,-10,-133);
            scene.add( art ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } ); 
	
	loader.load( './assets/pennywise.glb', function ( gltf ) {

            penny = gltf.scene;
            penny.scale.set (14,14,14);
            penny.position.set(-50,-10,-135);
            scene.add( penny ); 

            //createGUI( bear, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } ); 

    // use loader with desired ttf font
    loader.load("./CourierPrime-Bold.ttf", function (json) {
        font = new Font(json);
        // see create text function below
        createText();
    });

    // add resulting shapes to scene
    group = new THREE.Group();
    group.position.y = 100;

    scene.add(group);

    // image

    // load image as a texture
    const imgSource = new THREE.TextureLoader().load("./Assets/Cat.jpeg");
	imgSource.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial = new THREE.MeshBasicMaterial({
        map: imgSource,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry = new THREE.PlaneGeometry(400, 300);
    // apply image to shape and add to scene
    const imgPlane = new THREE.Mesh(imgGeometry, imgMaterial);
    imgPlane.position.set(0, 500, -400);
    scene.add(imgPlane);
	
	// image 2
	const imgSource2 = new THREE.TextureLoader().load("./Assets/Billie.jpg");
	imgSource2.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial2 = new THREE.MeshBasicMaterial({
        map: imgSource2,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry2 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane2 = new THREE.Mesh(imgGeometry2, imgMaterial2);
    imgPlane2.position.set(102, 20.5, 0);
	imgPlane2.rotateY(-1.571);
    scene.add(imgPlane2);
	
	// image 3
	const imgSource3 = new THREE.TextureLoader().load("./Assets/Ariana.jpg");
	imgSource3.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial3 = new THREE.MeshBasicMaterial({
        map: imgSource3,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry3 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane3 = new THREE.Mesh(imgGeometry3, imgMaterial3);
    imgPlane3.position.set(102, 20.5, 41);
	imgPlane3.rotateY(-1.571);
    scene.add(imgPlane3);
	
	// image 4
	const imgSource4 = new THREE.TextureLoader().load("./Assets/Gigi.jpg");
	imgSource4.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial4 = new THREE.MeshBasicMaterial({
        map: imgSource4,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry4 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane4 = new THREE.Mesh(imgGeometry4, imgMaterial4);
    imgPlane4.position.set(102, 20.5, -44);
	imgPlane4.rotateY(-1.571);
    scene.add(imgPlane4);
	
	// image 5
	const imgSource5 = new THREE.TextureLoader().load("./Assets/Gracie.jpg");
	imgSource5.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial5 = new THREE.MeshBasicMaterial({
        map: imgSource5,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry5 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane5 = new THREE.Mesh(imgGeometry5, imgMaterial5);
    imgPlane5.position.set(140.5, 20.5, -76);
    scene.add(imgPlane5);
	
	// image 6
	const imgSource6 = new THREE.TextureLoader().load("./Assets/Taylor.jpg");
	imgSource6.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial6 = new THREE.MeshBasicMaterial({
        map: imgSource6,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry6 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane6 = new THREE.Mesh(imgGeometry6, imgMaterial6);
    imgPlane6.position.set(190.5, 20.5, -76);
    scene.add(imgPlane6);
	
	// image 7
	const imgSource7 = new THREE.TextureLoader().load("./Assets/Raye.jpeg");
	imgSource7.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial7 = new THREE.MeshBasicMaterial({
        map: imgSource7,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry7 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane7 = new THREE.Mesh(imgGeometry7, imgMaterial7);
    imgPlane7.position.set(190.5, 20.5, 73);
	imgPlane7.rotateY (3.14159);
    scene.add(imgPlane7);
	
	// image 8
	const imgSource8 = new THREE.TextureLoader().load("./Assets/Sabrina.jpg");
	imgSource8.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial8 = new THREE.MeshBasicMaterial({
        map: imgSource8,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry8 = new THREE.PlaneGeometry(14, 14);
    // apply image to shape and add to scene
    const imgPlane8 = new THREE.Mesh(imgGeometry8, imgMaterial8);
    imgPlane8.position.set(140.5, 20.5, 73);
	imgPlane8.rotateY (3.14159);
    scene.add(imgPlane8);
	
	// image 9
	const imgSource9 = new THREE.TextureLoader().load("./Assets/HMHAS_tour.jpg");
	imgSource9.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial9 = new THREE.MeshBasicMaterial({
        map: imgSource9,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry9 = new THREE.PlaneGeometry(25, 33);
    // apply image to shape and add to scene
    const imgPlane9 = new THREE.Mesh(imgGeometry9, imgMaterial9);
    imgPlane9.position.set(75.5, 12.5, -1.5);
	imgPlane9.rotateY(-1.5708);
    scene.add(imgPlane9);
	
	// image 10
	const imgSource10 = new THREE.TextureLoader().load("./Assets/blair_witch.jpg");
	imgSource10.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial10 = new THREE.MeshBasicMaterial({
        map: imgSource10,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry10 = new THREE.PlaneGeometry(25, 33);
    // apply image to shape and add to scene
    const imgPlane10 = new THREE.Mesh(imgGeometry10, imgMaterial10);
    imgPlane10.position.set(75.5, 12.5, 54);
	imgPlane10.rotateY(-1.5708);
    scene.add(imgPlane10);
	
	// image 11
	const imgSource11 = new THREE.TextureLoader().load("./Assets/scream_six.jpg");
	imgSource11.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial11 = new THREE.MeshBasicMaterial({
        map: imgSource11,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry11 = new THREE.PlaneGeometry(25, 33);
    // apply image to shape and add to scene
    const imgPlane11 = new THREE.Mesh(imgGeometry11, imgMaterial11);
    imgPlane11.position.set(75.5, 12.5, -55);
	imgPlane11.rotateY(-1.5708);
    scene.add(imgPlane11);
	
	// image 12
	const imgSource12 = new THREE.TextureLoader().load("./Assets/Strangers.jpg");
	imgSource12.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial12 = new THREE.MeshBasicMaterial({
        map: imgSource12,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry12 = new THREE.PlaneGeometry(25, 33);
    // apply image to shape and add to scene
    const imgPlane12 = new THREE.Mesh(imgGeometry12, imgMaterial12);
    imgPlane12.position.set(-64, 12.5, -55);
	imgPlane12.rotateY(1.5708);
    scene.add(imgPlane12);
	
	// image 13
	const imgSource13 = new THREE.TextureLoader().load("./Assets/thunderbolts.jpg");
	imgSource13.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial13 = new THREE.MeshBasicMaterial({
        map: imgSource13,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry13 = new THREE.PlaneGeometry(25, 33);
    // apply image to shape and add to scene
    const imgPlane13 = new THREE.Mesh(imgGeometry13, imgMaterial13);
    imgPlane13.position.set(-64, 12.5, -1.5);
	imgPlane13.rotateY(1.5708);
    scene.add(imgPlane13);
	
	// image 14
	const imgSource14 = new THREE.TextureLoader().load("./Assets/GOTG.jpg");
	imgSource14.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial14 = new THREE.MeshBasicMaterial({
        map: imgSource14,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry14 = new THREE.PlaneGeometry(25, 33);
    // apply image to shape and add to scene
    const imgPlane14 = new THREE.Mesh(imgGeometry14, imgMaterial14);
    imgPlane14.position.set(-64, 12.5, 54);
	imgPlane14.rotateY(1.5708);
    scene.add(imgPlane14);
	
	// image 15
	const imgSource15 = new THREE.TextureLoader().load("./Assets/Duck1.jpeg");
	imgSource15.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial15 = new THREE.MeshBasicMaterial({
        map: imgSource15,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry15 = new THREE.PlaneGeometry(12, 12);
    // apply image to shape and add to scene
    const imgPlane15 = new THREE.Mesh(imgGeometry15, imgMaterial15);
    imgPlane15.position.set(-168, 7, -25);
	imgPlane15.rotateY(0.785398);
    scene.add(imgPlane15);
	
	// image 16
	const imgSource16 = new THREE.TextureLoader().load("./Assets/Duck2.jpeg");
	imgSource16.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial16 = new THREE.MeshBasicMaterial({
        map: imgSource16,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry16 = new THREE.PlaneGeometry(12, 12);
    // apply image to shape and add to scene
    const imgPlane16 = new THREE.Mesh(imgGeometry16, imgMaterial16);
    imgPlane16.position.set(-132, 7, -35);
	imgPlane16.rotateY(-0.349066);
    scene.add(imgPlane16);
	
	// image 17
	const imgSource17 = new THREE.TextureLoader().load("./Assets/Duck3.jpeg");
	imgSource17.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial17 = new THREE.MeshBasicMaterial({
        map: imgSource17,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry17 = new THREE.PlaneGeometry(12, 12);
    // apply image to shape and add to scene
    const imgPlane17 = new THREE.Mesh(imgGeometry17, imgMaterial17);
    imgPlane17.position.set(-108, 7, -3);
	imgPlane17.rotateY(1.5708);
    scene.add(imgPlane17);
	
	// image 18
	const imgSource18 = new THREE.TextureLoader().load("./Assets/Duck3.jpeg");
	imgSource18.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial18 = new THREE.MeshBasicMaterial({
        map: imgSource18,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry18 = new THREE.PlaneGeometry(12, 12);
    // apply image to shape and add to scene
    const imgPlane18 = new THREE.Mesh(imgGeometry18, imgMaterial18);
    imgPlane18.position.set(-108, 7, -3);
	imgPlane18.rotateY(1.5708);
    scene.add(imgPlane18);
	
	// image 19
	const imgSource19 = new THREE.TextureLoader().load("./Assets/Duck4.jpeg");
	imgSource19.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial19 = new THREE.MeshBasicMaterial({
        map: imgSource19,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry19 = new THREE.PlaneGeometry(12, 12);
    // apply image to shape and add to scene
    const imgPlane19 = new THREE.Mesh(imgGeometry19, imgMaterial19);
    imgPlane19.position.set(-132, 7, 30);
	imgPlane19.rotateY(0.174533);
    scene.add(imgPlane19);
	
	// image 20
	const imgSource20 = new THREE.TextureLoader().load("./Assets/Duck5.jpeg");
	imgSource20.colorSpace = THREE.SRGBColorSpace;
    // use loaded testure in a material
    const imgMaterial20 = new THREE.MeshBasicMaterial({
        map: imgSource20,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry20 = new THREE.PlaneGeometry(12, 12);
    // apply image to shape and add to scene
    const imgPlane20 = new THREE.Mesh(imgGeometry20, imgMaterial20);
    imgPlane20.position.set(-169, 7, 19);
	imgPlane20.rotateY(-0.959931);
    scene.add(imgPlane20);

    // Ground
    const earth = new THREE.PlaneGeometry(4000, 4000);
    const ground = new THREE.MeshPhongMaterial({ color: 0x6af1f9, flatShading: true });
    const mesh2 = new THREE.InstancedMesh(earth, ground, 500);
    mesh2.translateY(80);
    mesh2.rotateX(-1.5708);
    scene.add(mesh2);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    //const ambientLight = new THREE.AmbientLight(0x555555);
    //scene.add(ambientLight);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    // Start First Person Control Animations
    const time = performance.now();
    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        // jump fix
        controls.object.position.y += velocity.y * delta;
        if (controls.object.position.y < 10) {
            velocity.y = -120;
            controls.object.position.y = 10;

            canJump = true;
        }
    }

    prevTime = time;
    // End First Person Control Animations

    render();
}

// Function to render the scene using the camera.
function render() {
    renderer.render(scene, camera);
}

// Function to generate text shapes
function createText() {
    // create geomtery with parameters, change parameters to test modifications
    // "text" on next line is the message to be written
    textGeo = new TextGeometry(text, {
        font: font,
        size: 20,
        depth: 10,
        curveSegments: 4,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: true
    });

    // finish making geometry
    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    // apply material to geometry
    textMesh1 = new THREE.Mesh(textGeo, materials);

    // set position and rotation
    textMesh1.position.x = centerOffset;
    textMesh1.position.z = -200;
    textMesh1.position.y = -100;
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    // add to group to be added to scene
    group.add(textMesh1);
}
