const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let lanes = [200, 400, 600];
let currentLane = 1;

let player = {
  x: lanes[currentLane] - 25,
  y: 300,
  width: 50,
  height: 50,
  dy: 0,
  gravity: 1,
  jumpPower: -15,
  grounded: true
};

let obstacles = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = '#e63946'; // Pushpa color
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
  player.dy += player.gravity;
  player.y += player.dy;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.grounded = true;
  }
}

function spawnObstacle() {
  if (Math.random() < 0.02) {
    let lane = lanes[Math.floor(Math.random() * lanes.length)];
    obstacles.push({ x: lane - 15, y: 350, width: 30, height: 50 });
  }
}

function drawObstacles() {
  ctx.fillStyle = '#2a9d8f';
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    obs.y -= 5;
  });
}

function checkCollision() {
  obstacles.forEach(obs => {
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      alert('Thaggede Le! Game Over.');
      document.location.reload();
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  updatePlayer();
  spawnObstacle();
  drawObstacles();
  checkCollision();
  score++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft' && currentLane > 0) {
    currentLane--;
    player.x = lanes[currentLane] - 25;
  }
  if (e.code === 'ArrowRight' && currentLane < lanes.length - 1) {
    currentLane++;
    player.x = lanes[currentLane] - 25;
  }
  if (e.code === 'Space' && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }
});

gameLoop();
