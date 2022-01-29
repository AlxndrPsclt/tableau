let frame = 0;
let MAX_X = 100;
let MAX_Y = 100;
let CELL_X = 10;
let CELL_Y = 10;
let x = 50;
let y = 95;
let direction = 'S';
let lastFrameChanged = 0;

let grid = Array(MAX_X).fill().map(() => Array(MAX_Y));
let coords = Array();

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function randomProba(proba) {
  let rand = random(0,100);
  return (rand < proba);
}

function newX() {
  let nextX = x;
  let nextX2 = x;
  if (direction == 'W'){
    nextX = (max(0, x-1));
    nextX2 = (max(0, x-2));
  } else if (direction == 'E') {
    nextX = (min(x + 1, MAX_X-1));
    nextX2 = (min(x + 2, MAX_X-2));
  }
  if (grid[nextX][y] || grid[nextX2][y] || grid[nextX][max(0,y-1)] || grid[nextX][min(y+1, MAX_Y)] || grid[nextX2][max(0,y-1)] || grid[nextX2][min(y+1, MAX_Y)]) {
    return (x)
  } else {
    lastFrameChanged = frame;
    coords.push({x: nextX, y:y});
    return (nextX)
  }
}

function newY() {
  let nextY = y;
  let nextY2 = y;
  if (direction == 'N'){
    nextY = (max(0, y-1));
    nextY2 = (max(0, y-2));
  } else if (direction == 'S') {
    nextY = (min(y + 1, MAX_Y-1));
    nextY2 = (min(y + 2, MAX_Y-2));
  }
  if (grid[x][nextY] || grid[x][nextY2] || grid[max(0,x-1)][nextY] || grid[min(x+1,MAX_X)][nextY] || grid[max(0,x-1)][nextY2] || grid[min(x+1,MAX_X)][nextY2]) {
    return (y)
  } else {
    lastFrameChanged = frame;
    coords.push({x, nextY});
    return (nextY)
  }
}

function changeDirection() {

  if (direction == 'W') {
    if (randomProba(66)) {
      newDirection = 'N';
    } else {
      newDirection = 'S';
    }
  } else if (direction == 'E') {
    if (randomProba(66)) {
      newDirection = 'N';
    } else {
      newDirection = 'S';
    }
  } else if (direction == 'N') {
    if (randomProba(50)) {
      newDirection = 'E';
    } else {
      newDirection = 'W';
    }
  } else if (direction == 'S') {
    if (randomProba(50)) {
      newDirection = 'E';
    } else {
      newDirection = 'W';
    }
  }
  return newDirection;
}

function draw() {
  frame += 1;
  fill(10);
  stroke(50);

  if (randomProba(20)) {
    direction = changeDirection();
  }

  x = newX();
  y = newY();

  grid[x][y]=true;


  rect(CELL_X * x, CELL_Y * y,CELL_X,CELL_Y);

  if (frame - lastFrameChanged > 10) {
    lastFrameChanged = frame;
    branch = random(coords);
    x= branch.x;
    y= branch.y;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
