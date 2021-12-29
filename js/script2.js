var canvas = document.querySelector("#c");
var ctx = canvas.getContext("2d");
var gameFPS = 30;
var i = 0;
var pointsPlayer = 0;
var pointsComputer = 0;
var ballRadius = 10;
var paddleWidth = 100;
var paddleHeight = 10;
var leftArrowHit = false;
var rightArrowHit = false;

var gameWon = false;
var gameLost = false;

document.getElementById('compscore').innerHTML = "Computer: " + pointsComputer;
document.getElementById('myscore').innerHTML = "You: " + pointsPlayer;

var ball = new Object();
ball["x"] = 160;
ball["y"] = 240;
ball["xSpeed"] = 1;
ball["ySpeed"] = 3;

var topPaddle = new Object();
topPaddle["x"] = (canvas.width / 2) - (paddleWidth / 2);
topPaddle["y"] = 10;

var bottomPaddle = new Object();
bottomPaddle["x"] = (canvas.width / 2) - (paddleWidth / 2);
bottomPaddle["y"] = canvas.height - 20;

window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(e) {
    console.log(e.keyCode);
    if(gameWon == false && gameLost == false) {
    if(e.keyCode == 39) {
        rightArrowHit = true;
    }
    }
    if(gameWon == false && gameLost == false) {
    if(e.keyCode == 37) {
        leftArrowHit = true;
    }
  }
  else {
    rightArrowHit = false;
    leftArrowHit = false;
  }
}
function keyboardEvents() {
    if(leftArrowHit) {
        bottomPaddle.x -= 3;
        leftArrowHit = false;
    }
    if(rightArrowHit) {
        bottomPaddle.x += 3;
        rightArrowHit = false;
    }
    if(bottomPaddle.x <= 0) {
        bottomPaddle.x = 0;
    }
    if(bottomPaddle.x >= canvas.width - paddleWidth) {
        bottomPaddle.x = canvas.width - paddleWidth;
    }
}
function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTopPaddle() {
  ctx.fillStyle = "white";
  paddleWidth = 100 - (pointsPlayer * 5);
  ctx.fillRect(topPaddle.x, topPaddle.y, paddleWidth, paddleHeight);
}

function drawBottomPaddle() {
  ctx.fillStyle = "white";
  paddleWidth = 100 - (pointsComputer * 5);
  ctx.fillRect(bottomPaddle.x, canvas.height - 20, paddleWidth, paddleHeight);
}

function drawBall() {
  if (gameWon == false && gameLost == false) {
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = "white";
  ctx.fill();
  if (ball.x >= canvas.width || ball.x <= 0) {
    ball.xSpeed = ball.xSpeed * -1;
  }
}
  //if (ball.y >= canvas.height || ball.y <= 0) {
    //ball.ySpeed = ball.ySpeed * -1;
  //}
}

function hitDetect() {
  if ((ball.y + ballRadius) >= (bottomPaddle.y)) {
    if (bottomPaddle.x <= ball.x && ball.x <= (bottomPaddle.x + paddleWidth)) {
      console.log("bottomPaddle hit");
      ball.ySpeed = ball.ySpeed * -1;
      ball.y = bottomPaddle.y - ballRadius;
      return;
    }
  }
  if ((ball.y - ballRadius) <= (topPaddle.y + paddleHeight)) {
    if (topPaddle.x <= ball.x && ball.x <= (topPaddle.x + paddleWidth)) {
      console.log("topPaddle hit");
      ball.ySpeed = ball.ySpeed * -1;
      ball.y = topPaddle.y + ballRadius + paddleHeight;
      return;
    }
  }
  if ((ball.x + ballRadius) >= canvas.width || (ball.x - ballRadius) <= 0) {
    ball.xSpeed = ball.xSpeed * -1;
  }
  if (ball.y > (canvas.height + ballRadius)) {
    if (gameWon == false && gameLost == false) {
    pointsComputer++;
    document.getElementById('compscore').innerHTML = "Computer: " + pointsComputer;
    }
    if (pointsComputer >= 10) {
      gameLost = true;
    }
    initGameObjects(); // kun pallo menee ohi mailasta, niin se täytyy hävittää ja tulee piste jollekkin
    console.log("Point to computer");
  }
  if (ball.y < (0 - ballRadius)) {
    if (gameWon == false && gameLost == false) {
    pointsPlayer++;
    document.getElementById('myscore').innerHTML = "You: " + pointsPlayer;
    }
    initGameObjects();
    console.log("Point to player");
  }
}

function initGameObjects() {
  if (gameWon == false && gameLost == false) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    topPaddle.x = canvas.width / 2 - paddleWidth / 2;
    bottomPaddle.x = canvas.width / 2 - paddleWidth / 2;
    drawBall();
    drawTopPaddle();
    drawBottomPaddle();
  }
  if (gameWon == true) {
    document.getElementById("win").style.visibility = "visible";
  }
  if (gameLost == true) {
    document.getElementById("lose").style.visibility = "visible";
  }
}

function computerAI() {
    if(ball.ySpeed < 0) {
        if(ball.x < (topPaddle.x + paddleWidth / 2)) {
            topPaddle.x--;
        }
        else {
            topPaddle.x++;
        }
        if(topPaddle.x <=0 ) {
            topPaddle.x = 0;
        }
        if(topPaddle.x >= canvas.width - paddleWidth) {
            topPaddle.x = canvas.width - paddleWidth;
        }
    }
}
  function pongGame() {
    drawBackground();
    drawTopPaddle();
    drawBottomPaddle();
    drawBall();
    hitDetect();
    keyboardEvents();
    computerAI();
    i++;
    //console.log(pointsComputer);
  }

  window.setInterval(pongGame, 1000 / (gameFPS + ((pointsPlayer + pointsComputer) * 5)));