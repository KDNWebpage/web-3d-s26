let myShape;
let saveButton;

function preload(){
    myShape=loadModel('./GreenLight.obj', true);
}

function setup() {
    let canvas = createCanvas(400,400, WEBGL);
    angleMode(DEGREES);
    saveButton = createButton('Save Canvas');
    saveButton.position(10, 500);
    saveButton.mousePressed(saveDrawing);
}

function draw() {
    background(200);
    orbitControl();
    noStroke();
    ambientLight(160, 160, 160);
    model(myShape);
}

function keyPressed(){
    if (key === 'r'){
    emissiveMaterial(255,0,0);
    }
    if (key === 'g'){
    emissiveMaterial(0,255,0);
    }
    if (key === 'b'){
    emissiveMaterial(0,0,255);
    }
    if (key === 'y'){
    emissiveMaterial(255,255,0);
    }
    if (key === 'w'){
    emissiveMaterial(255,255,255);
    }
}

function saveDrawing() {
  saveCanvas('myCanvas', 'png'); 
}
