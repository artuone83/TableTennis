let canvas;
let canvasContext;
let ballX = 50;
let ballXspeed = 5;
let ballY = 285;
let ballYspeed = 4;

let paddle1Y = 250;
let paddle2Y = 250;

let player1Score = 0;
let player2Score = 0;
const winningScore = 3;

let showingWinScreen = false;

const paddleHeight = 100;
const paddleThickness = 10;



function calculateMausePosition (evt){
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
      x:mouseX,
      y:mouseY
  };
}


function handleMouseClick(evt){
  if(showingWinScreen) {
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = false;
  };
}

window.onload = function() {

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  let framePersecond = 30;
  setInterval(function (){
    drawEverything ();
    moveEverything();
  }, 1000/framePersecond);

  canvas.addEventListener("mousedown", handleMouseClick);

  canvas.addEventListener("mousemove",
      function(evt){
        let mousePos = calculateMausePosition(evt);
        paddle1Y = mousePos.y - (paddleHeight/2);
  });
}

function ballReset() {
  if(player1Score >= winningScore || player2Score >= winningScore){
    showingWinScreen = true;
  }

  ballXspeed = -ballXspeed;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement() {

  let paddle2YCenter = paddle2Y + (paddleHeight/2);

  if(paddle2YCenter < ballY-35) {
    paddle2Y += 6;
  }else if (paddle2YCenter > ballY+35){
    paddle2Y -= 6;
  }
}

function moveEverything(){
  if(showingWinScreen){
    return;
  }
  computerMovement();

  ballX += ballXspeed;
  ballY += ballYspeed;
  if(ballY > canvas.height){
    ballYspeed = -ballYspeed;
  }else if(ballY <= 0){
    ballYspeed = -ballYspeed;
  }

  if(ballX > canvas.width){
    //ballXspeed = -ballXspeed;
    if(ballY > paddle2Y &&
      ballY < paddle2Y+paddleHeight){
        ballXspeed = -ballXspeed;

        let deltaY = ballY-(paddle2Y+paddleHeight/2);
        ballYspeed = deltaY * 0.35;
      }else {
          player1Score++;//must be befoer ballReset
          ballReset();

      }
  }else if(ballX < 0) {
    if(ballY > paddle1Y &&
      ballY < paddle1Y+paddleHeight){
        ballXspeed = -ballXspeed;

        let deltaY = ballY-(paddle1Y+paddleHeight/2);
        ballYspeed = deltaY * 0.35;
      }else {
          player2Score++;//must be befoer ballReset
          ballReset();

      }
  }
}

function drawNet() {
    for(let i = 0; i < canvas.height; i += 40){
      colorRect(canvas.width/2-1,i,2,20,"white");
    }
}

function drawEverything (){

  console.log(ballX);
  /*canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0,250,10,100);
  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(ballX,285,10,10);*/

  // canvas box
  colorRect(0,0,canvas.width,canvas.height,"black");

  if(showingWinScreen){
    canvasContext.fillStyle = "white";

      if(player1Score >= winningScore){
          canvasContext.fillText("Left Player Won!",350,200);
       }else if (player2Score >= winningScore){
         canvasContext.fillText("Right Player Won!",350,200);
      }

    canvasContext.fillText("Click to continue",350,500);
    return;
  }
  drawNet();
  // paddel left
  colorRect(0,paddle1Y,paddleThickness,paddleHeight, "white");

  // paddle right
  colorRect(canvas.width-paddleThickness,paddle2Y,paddleThickness,paddleHeight, "white");
  // ball
  colorCircle(ballX, ballY, 10,"white");
  //colorRect(ballX,285,10,10, "red");
  /*canvasContext.fillStyle = 'white';
  canvasContext.beginPath();
  canvasContext.arc(ballX, 285, 10, 0, Math.PI *2, true);
  canvasContext.fill();*/

  canvasContext.fillText(player1Score,100,100);
  canvasContext.fillText(player2Score,canvas.width-100,100);
}
function colorRect(leftX,topY, width, height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
function colorCircle(centerX, centerY, radius, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI *2, true);
  canvasContext.fill();
}
