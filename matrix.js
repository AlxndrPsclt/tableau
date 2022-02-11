let frame = 0;

let LINES_NUMBER = 40;
let LINE_RESOLUTION = 200;
let LINE_SPACEMENT = 30;
let POINT_SPACEMENT = 8;
let XMAX = 200;
let XMIN = -400;
let SLOPE = -1;
let LEVEL = {x: -300, y: 500, z: 0};

let lines = Array(LINES_NUMBER).fill().map(() => Array(LINE_RESOLUTION));
let grid = Array(100).fill().map(() => Array(100));
let displacement = Array(LINES_NUMBER).fill().map(() => Array(LINE_RESOLUTION));
let points = Array();


class Point {
  constructor(index, line_number) {
    this.index = index;
    this.line_number = line_number;
    this.displacement = {x: 0, y: random(-20,40), z: 0};
  };
  generateDisplacement() {
    this.displacement = {x: 0, y: random(-20,40), z: 0};
    return this.displacement;
  };
  x() {
    return (LEVEL.x + (this.index % LINE_RESOLUTION) * POINT_SPACEMENT + (frame % LINE_RESOLUTION) * POINT_SPACEMENT + this.displacement.x);
  };
  y() {
    return (LEVEL.y + this.displacement.y);
  };
  z() {
    return (LEVEL.z + this.x() * SLOPE + this.line_number * LINE_SPACEMENT + this.displacement.z);
  };
}


function pairwise(arr, func){
  for(var i=0; i < arr.length - 1; i++){
    func(arr[i], arr[i + 1]);
  }
}




function displayVertex(point) {
  vertex((point.x - 100) * 8, point.y + 500, (point.z + 100) * 2 );
}

function displayLine(lineArray) {
  beginShape();
  lineArray.forEach(displayVertex);
  endShape();
}

function drawGrid() {
  stroke(240);
  strokeWeight(1);
  for (let i = 0, len = 21; i < len; i++) {
    line(-200, 500, 20*i-200, 200, 500, 20*i-200);
    line(20*i-200, 500, -200, 20*i-200, 500, 200);
  }
}


function setup() {
  console.log("setup!");
  frameRate(10);
  createCanvas(600,600, this.WEBGL);
  //ortho(-width, width, height, -height/2, 0.1, 100);
  currCamera = createCamera();
  angleMode(DEGREES);
  currCamera.tilt(+60);
  currCamera.move(0,-300,0);

  for (let line_number = 0, len = LINES_NUMBER; line_number < len; line_number++) {
    for (let point_number = 0, len = LINE_RESOLUTION; point_number < len; point_number++) {
      points.push(new Point(point_number, line_number));
    }
  }

  background(0);
  stroke(240);
  strokeWeight(1);
  fill(1);
  for (let i = 0, len = 21; i < len; i++) {
    line(-200, 500, 20*i-200, 200, 500, 20*i-200);
    line(20*i-200, 500, -200, 20*i-200, 500, 200);
  }
  stroke(200);
  strokeWeight(2);
  console.log("line");

  pairwise(points, function(current, next){
    if (current.line_number == next.line_number) {
      line(current.x(), current.y(), current.z(), next.x(), next.y(), next.z());
    }
  })
}


function draw() {
  frame += 1;
  background(0);
  // drawGrid();
  pairwise(points, function(current, next){
    if (current.line_number == next.line_number) {
      line(current.x(), current.y(), current.z(), next.x(), next.y(), next.z());
    }
  });
  //lines.forEach(forwardLine);
  //lines.forEach(displayLine);
//  background(0);
//  for (let line = -2000, len = 1000; line < len; line=line+80) {
//
//    beginShape();
//    for (let i = -500, len = 1500; i < len; i=i+5) {
//      if (randomProba(10)) {
//      vertex(i, random(-10,min(frame, 70))+150, -2*i/3+line);
//      }
//    }
//    endShape();
//  }
}
