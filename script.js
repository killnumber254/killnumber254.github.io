const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
//принятие картинки
let cars = new Image();
cars.src = "./mashin.png";

let carRight = new Image();
carRight.src = "./mashin.png";

let carLeft = new Image();
carLeft.src = "./mashin.png";
//ширина и высота canvas
canvas.width = canvas.height = 600;
// координаты и значение скорости плавных поворотов
let x = 30,
  velY = 0,
  velX = 0,
  speed = 10, // max speed
  friction = 0.98, // friction
  keys = [];

let coordinate = {
  x: 30,
  y: 370,
  xRight: 30,
  xLeft: -10,
  yRight: 0,
  yLeft: -200,
};

//кнопки направления машины
const machineMovement = () => {
  if (keys[39]) {
    if (velX < speed) {
      velX++;
    }
  }
  if (keys[37]) {
    if (velX > -speed) {
      velX--;
    }
  }
};

function twoCars() {
  if (coordinate.yRight >= 0) {
    coordinate.yRight += speed;
  }
  if (coordinate.yRight === 600) {
    coordinate.yRight = 0;
  }
}

function oneCars() {
  if (coordinate.yLeft >= -200) {
    coordinate.yLeft += speed;
  }
  if (coordinate.yLeft === 600) {
    coordinate.yLeft = 0;
  }
}

function deadGame() {
  if (x >= 30) {
    setInterval(game);
  } else if (coordinate.y === coordinate.yLeft) {
    clearInterval(game);
  }
  if (x <= 5) {
    setInterval(game);
  } else if (coordinate.y === coordinate.yRight) {
    clearInterval(game);
  }
}
// randomMachines();
// функция анемирования машины
function gamesCar() {
  twoCars();
  oneCars();
  deadGame();
  machineMovement();
  x += velX;
  if (x >= 30) {
    x = 30;
  } else if (x <= -10) {
    x = -10;
  }
  console.log(x);
  // twoCars();
  ctx.clearRect(0, 0, 600, 600);
  ctx.drawImage(carRight, coordinate.xRight, coordinate.yRight, 60, 60);
  // ctx.drawImage(road, 5, 150, 140, 140);
  ctx.drawImage(cars, x, coordinate.y, 60, 60);
  ctx.drawImage(carLeft, coordinate.xLeft, coordinate.yLeft, 60, 60);
}

let game = setInterval(gamesCar, 100);
//работа кнопок при нажатии и отжатии
document.body.addEventListener("keydown", (e) => {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", (e) => {
  keys[e.keyCode] = false;
});
