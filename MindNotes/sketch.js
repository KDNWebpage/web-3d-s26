let backgroundHue = 250;

var s1 = function( sketch ) {
  sketch.setup = function() {
    let canvas1 = sketch.createCanvas(200, 250, sketch.WEBGL);
    canvas1.position(475,100);
  }
  sketch.draw = function() {
    //for canvas 1
    sketch.background(100);
    sketch.rotateX(sketch.frameCount * 0.01);
    sketch.rotateZ(sketch.frameCount * 0.01);
    sketch.cone(30, 50);
  }
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);