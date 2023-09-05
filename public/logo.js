let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let scale = 50;

let initial = true;
let partymode = false;

function newRandomColor() {
  return '#' + Math.floor(Math.random()*16777216).toString(16);
}

function drawSquare(x, y) {
  if(initial == true) {
    // pride month
    // if(x == 0) {
    //   ctx.fillStyle = "#ff0000";
    // } else if(x == 1) {
    //   ctx.fillStyle = "#ff7f00";
    // } else if(x == 2) {
    //   ctx.fillStyle = "#ffff00";
    // } else if(x == 4) {
    //   ctx.fillStyle = "#00ff00";
    // } else if(x == 5) {
    //   ctx.fillStyle = "#0000ff";
    // } else if(x == 6) {
    //   ctx.fillStyle = "#7f00ff";
    // }
    ctx.fillStyle = "#ffffff";
  } else {
    ctx.fillStyle = newRandomColor();
  }
  ctx.fillRect(x*scale, y*scale, scale, scale);
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    drawSquare(this.x, this.y);
  }
}

let squares = [
  new Square(0, 1),
  new Square(0, 2),
  new Square(0, 3),
  new Square(0, 4),
  new Square(0, 5),
  new Square(1, 1),
  new Square(1, 3),
  new Square(2, 1),
  new Square(2, 2),
  new Square(2, 4),
  new Square(2, 5),
  new Square(4, 1),
  new Square(4, 2),
  new Square(4, 3),
  new Square(4, 4),
  new Square(4, 5),
  new Square(5, 1),
  new Square(5, 3),
  new Square(5, 5),
  new Square(6, 2),
  new Square(6, 4)
];

function setSquares() {
  for(square of squares) {
    squares[squares.indexOf(square)] = new Square(square.x, square.y);
  }
  
  for(square of squares) {
    drawSquare(square.x, square.y);
  }
}

setSquares();

canvas.addEventListener('mousedown', e => {
  initial = false;
  let cursorX = Math.floor((e.offsetX)/scale);
  let cursorY = Math.floor((e.offsetY)/scale);
  for(square of squares) {
    if(cursorX == square.x && cursorY == square.y) {
      squares[squares.indexOf(square)] = new Square(cursorX, cursorY)
    }
  }
});

let repeat;

$("#partymode").click(function() {
  if(partymode == false) {
    initial = false;
    partymode = true;
    $(this).text("party mode on");
    repeat = setInterval(function() {setSquares();}, 500);
  } else {
    initial = true;
    partymode = false;
    $(this).text("party mode off");
    clearInterval(repeat);
    setSquares();
  }
});
