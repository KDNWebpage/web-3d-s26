

function setup() {
    let canvas = createCanvas(400,400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    orbitControl();
    noStroke();
    lights();
    fill(0,255,255);
    shininess(10);
    specularMaterial(255);
    //emissiveMaterial(255,0,255);
    ellipsoid(100,50,25);
}
