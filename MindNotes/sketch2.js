var s2 = function( sketch ) {

   sketch.setup = function() {
    let canvas2 = sketch.createCanvas(300, 250, sketch.WEBGL);
    canvas2.position(675,100);
  }
  sketch.draw = function() {
    //for canvas 2
    sketch.background(255,255,0);
    sketch.rotateX(sketch.frameCount * 0.01);
    sketch.rotateZ(sketch.frameCount * 0.02);
    sketch.cone(30, 50);
  }
};

// create the second instance of p5 and pass in the function for sketch 2
new p5(s2);