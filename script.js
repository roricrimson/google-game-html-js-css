const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = 700;
canvas.width = 1000;

const ground = canvas.height - canvas.height / 3;
let player_x = 50;
let player_y = ground - 100;
let obstacle_x = canvas.width + 100;
let obstacle_y;
let up = 0;
let index;
let stop_game = false;
let time;
let obstacle = [
  {
    w: 50,
    h: 70,
  },
  {
    w: 50,
    h: 60,
  },
  {
    w: 50,
    h: 40,
  },
  {
    w: 50,
    h: 30,
  },
  {
    w: 40,
    h: 70,
  },
  {
    w: 40,
    h: 60,
  },
  {
    w: 40,
    h: 40,
  },
  {
    w: 40,
    h: 30,
  },
];

CreatePlayground();
GenerateIndex();
Update();
addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    if (up === 0) {
      up = 2;
    }
  }
});

function CreatePlayground() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(0, ground);
  context.lineTo(canvas.width, ground);
  context.stroke();
  CreatePlayer();
}

function CreatePlayer() {
  context.beginPath();
  context.rect(player_x, player_y, 50, 100);
  context.fill();
}

function Update() {
  if (!stop_game) {
    requestAnimationFrame(Update);
    Jump();
    UpdateObstacle();

    CreatePlayground();
    CreateObstacle();
    DetectCollision();
  } else {
    context.font = "600 50px sans-serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("You Lose", canvas.width / 2, canvas.height / 2);
  }
}

function Jump() {
  if (up > 0) {
    if (up === 2) {
      player_y -= 3;
      if (player_y < 150) {
        up = 1;
      }
    }

    if (up === 1) {
      player_y += 3;
      if (player_y >= ground - 100) {
        up = 0;
      }
    }
  }
}

function GenerateIndex() {
  index = Math.floor(Math.random() * obstacle.length);
}
function Generatetime() {
  time = Math.floor(Math.random() * 1000 + 200);
}

function UpdateObstacle() {
  obstacle_y = ground - obstacle[index].h;
  obstacle_x -= 3;
  if (obstacle_x < 0) {
    Generatetime();
    setTimeout(function () {
      GenerateIndex();
      obstacle_x = canvas.width + 100;
    }, time);
  }
}
function CreateObstacle() {
  context.beginPath();
  context.rect(obstacle_x, obstacle_y, obstacle[index].w, obstacle[index].h);
  context.fill();
}

function DetectCollision() {
  if (
    player_y + 100 >= obstacle_y &&
    player_x + 50 > obstacle_x &&
    player_x < obstacle_x + obstacle[index].w
  ) {
    stop_game = true;
  }
}
