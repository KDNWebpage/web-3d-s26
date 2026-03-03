var s2 = function( sketch ) {
  let wristband;
  let outsideFrame;
  let insideFrame;
  let watch;
  let thought;
  let shapeColor1;
  let shapeColor2;
  let shapeColor3;
  let button;
    
  sketch.preload = function() {
    wristband=sketch.loadModel('./Wristband.obj', true);
    outsideFrame=sketch.loadModel('./OutsideFrame.obj', true);
    insideFrame=sketch.loadModel('./InsideFrame.obj', true);
    watch=sketch.loadModel('./Watch.obj', true);
    thought=sketch.loadModel('./Text.obj', true);
    
  };
  sketch.setup = function() {
    let canvas2 = sketch.createCanvas(300, 250, sketch.WEBGL);
    canvas2.parent('sketch-holder2');
    canvas2.position(695,170);
    sketch.angleMode(sketch.DEGREES);
    shapeColor1=sketch.color(120, 119, 119);
    shapeColor2=sketch.color(168, 168, 168);
    shapeColor3=sketch.color(73, 113, 201);
    button = sketch.createButton('Save Image');
    button.position(1000, 400);
    button.mousePressed(sketch.savePrototype); 
  };
    
  sketch.savePrototype = function() {
    sketch.saveCanvas('watchPrototype', 'png'); 
  };
    
  sketch.keyPressed = function() {
    if (sketch.key === 'b' || sketch.key === 'B') {
    shapeColor1 = sketch.color(sketch.random(255),sketch.random(255),sketch.random(255));
    }
    if (sketch.key === 'o' || sketch.key === 'O') {
    shapeColor2 = sketch.color(sketch.random(255),sketch.random(255),sketch.random(255));
    }
    if (sketch.key === 'i' || sketch.key === 'I') {
    shapeColor3 = sketch.color(sketch.random(255),sketch.random(255),sketch.random(255));
    }
  };
  sketch.draw = function() {
    //for canvas 2
    sketch.background(192, 211, 252);
    sketch.orbitControl();
    sketch.push();
    sketch.fill(shapeColor1);
    sketch.noStroke();
    sketch.model(wristband);
    sketch.pop();
    sketch.push();
    sketch.scale(0.5);
    sketch.translate(0,0,90);
    sketch.fill(shapeColor2);
    sketch.noStroke();
    sketch.model(outsideFrame);
    sketch.pop();
    sketch.push();
    sketch.scale(0.37);
    sketch.translate(0,0,155);
    sketch.noStroke();
    sketch.fill(shapeColor3);
    sketch.model(insideFrame);
    sketch.pop();
    sketch.push();
    sketch.rotateX(-180);
    sketch.rotateY(180);
    sketch.scale(0.7);
    sketch.translate(0,0,-10);
    sketch.noStroke();
    sketch.fill(54, 54, 54);
    sketch.model(watch);
    sketch.pop();
    sketch.push();
    sketch.rotateX(180);
    sketch.noStroke();
    sketch.scale(0.3);
    sketch.translate(0,10,-198);
    sketch.fill(0,0,0);
    sketch.model(thought);
    sketch.pop();
  };
};

// create the second instance of p5 and pass in the function for sketch 2
new p5(s2);