let backgroundHue = 250;
let myShape;

var s1 = function( sketch ) {
  sketch.preload = function() {
    myShape=loadModel('./HumanModel.obj', true);
  };
  sketch.setup = function() {
    let canvas1 = sketch.createCanvas(200, 250, sketch.WEBGL);
    canvas1.position(475,100);
  };
  sketch.draw = function() {
    //for canvas 1
    sketch.background(100);
    sketch.orbitControl();
    sketch.model(myShape);
  };
};

new p5(s1);