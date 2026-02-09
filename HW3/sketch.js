let myShape;

function setup() {
    let canvas = createCanvas(400,400, WEBGL);
    angleMode(DEGREES);
    beginGeometry();
    push();
    microwave();
    pop();
    push();
    translate(0,-150,-200);
    microwave();
    pop();
    push();
    translate(0, 150, 200);
    microwave();
    pop();
    myShape = endGeometry();
}

function draw() {
    background(200);
    orbitControl();
    noStroke();
    ambientLight(160, 160, 160);
    specularMaterial(255);
    model(myShape);
}

function microwave(){
    push();
    fill(117, 115, 115);
    cylinder(60,5);
    translate(0,5,0);
    fill(31, 31, 31);
    cylinder(20,5);
    translate(30,7,0);
    fill(74, 72, 72);
    shininess(100);
    box(200,10,150);
    translate(70,-50,0);
    box(60,90,150);
    translate(-70,5,-75);
    box(200,100,20);
    translate(-105,0,70);
    box(20,100,160);
    translate(105,-45,5);
    box(200,10,150);
    translate(70, 28, 72);
    fill(0,0,0);
    rotateX(90);
    cylinder(12,20,15);
    translate(0,0,-36);
    cylinder(12,20,15);
    translate(-120,55,20);
    rotateX(-90);
    rotateY(-45);
    fill(81, 81,81, 175);
    box(135,80,15);
    pop();
}
