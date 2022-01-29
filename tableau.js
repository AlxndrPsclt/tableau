let frame = 0;
let MAX_X = 100;
let MAX_Y = 100;
let CELL_X = 10;
let CELL_Y = 10;
let x = 0;
let y = 0;

let grid = [

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function randomProba(proba) {
  let rand = random(0,100);
  return (rand < proba);
}

function draw() {
  frame += 1;
  fill(10);
  rect(10 * x, 10 * y,10,10);

  direction = 'N';

  if (randomProba(50)) {
    if (randomProba(MAX_X-x)) {
      x = min(x + 1, MAX_X);
    } else {
      x = max(0, x - 1);
    }
  } else {
    if (randomProba(MAX_Y-y)) {
      y = min(y + 1, MAX_Y);
    } else {
      y = max(0, y - 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
