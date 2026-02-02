function setup() {
    let canvas = createCanvas(400,400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(198, 0, 252);
    orbitControl();
	stroke(255);
	fill(255,0,0);
    box(100);
    translate(0,0,85);
	fill(0,255,0);
	rotateX(90);
	rotateY(45);
    cone(70,70,5);
    translate(0,100,0);
	fill(0,0,255);
	rotateY(-45);
    box(25);
	translate(0,22,0);
	fill(0,0,0);
	rotateY(45);
	cone(17, 17, 5);
	translate(0,50,0);
	fill(82, 82, 82);
	rotateY(-45);
	rotateX(90);
	cone(17, 17, 5);
	translate(0,100,0);
	fill(166, 166, 166);
	rotateX(90);
	cone(17,17,5);
	translate(0,250,0);
	fill(255,255,255);
	rotateX(90);
	cone(17,17,5);

}
