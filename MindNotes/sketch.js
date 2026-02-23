let backgroundHue = 250;

var s1 = function( sketch ) {
  let humanBody;
  let humanFace;
  let chip;
    
  sketch.preload = function() {
    humanBody=sketch.loadModel('./HumanBody.obj', true);
    humanFace=sketch.loadModel('./Face.obj', true);
    chip=sketch.loadModel('./Chip.obj', true);
  };
  sketch.setup = function() {
    let canvas1 = sketch.createCanvas(200, 250, sketch.WEBGL);
    canvas1.position(475,100);
    sketch.angleMode(sketch.DEGREES);
  };
  sketch.draw = function() {
    //for canvas 1
    sketch.background(100);
    sketch.orbitControl();
    sketch.rotateX(180);
    sketch.noStroke();
    sketch.fill(188, 190, 194);
    sketch.model(humanBody);
    sketch.scale(0.4);
    sketch.translate(0,110,-60);
    sketch.fill(0,0,0);
    sketch.model(humanFace);
    sketch.fill(43, 115, 255);
    sketch.translate(-90,40,10);
    sketch.rotateX(-180);
    sketch.scale(0.3);
    sketch.model(chip);

   
    
  };
};

new p5(s1);