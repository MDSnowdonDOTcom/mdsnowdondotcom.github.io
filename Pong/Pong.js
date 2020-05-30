//global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth =document.getElementById("gameBoard").offsetWidth

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;
const ballHeight = document.getElementById("ball").offsetHeight

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;
var angle = 0;
var speed = 0;

var score2 = 0;
var score1 = 0;

var bounce = new sound("bounce.mp3");
var fail = new sound("fail.mp3")

//controls game start/stop
var controlPlay;
var stop = 1;

var speedUp = -0.75;
var bounces = 0;
var topDirection = 0;
var leftDirection = 0;
var bouncesWalls = 0;

//start bakk motion
/*window.addEventListener('load',function() {
	startBall();
});*/

//Move Paddles
document.addEventListener('keydown', function(e) {
	if (e.keyCode == 87 || e.which == 87){ //W
		speedOfPaddle1 = -10;
	}
	if(e.keyCode == 83 || e.which == 83) {//A
		speedOfPaddle1 = 10;
	}
	if(e.keyCode == 38 || e.which == 38) {//Up
		speedOfPaddle2 = -10;
	}
	if(e.keyCode == 40 || e.which == 40){//Down
		speedOfPaddle2 = 10;
	}
});

//Stop Paddle
document.addEventListener('keyup', function(e) {
	if (e.keyCode == 87 || e.which == 87){ //W
		speedOfPaddle1 = 0;
	}
	if(e.keyCode == 83 || e.which == 83) {//A
		speedOfPaddle1 = 0;
	}
	if(e.keyCode == 38 || e.which == 38) {//Up
		speedOfPaddle2 = 0;
	}
	if(e.keyCode == 40 || e.which == 40){//Down
		speedOfPaddle2 = 0;
	}
	if(e.keyCode == 49 || e.witch == 49){//1
		startGame();
	}
	if(e.keyCode == 50 || e.witch == 50){//2
		stopGame();
	}
	if(e.keyCode == 51 || e.witch == 51){//3
		pauseGame();
	}
	if(e.keyCode == 52 || e.witch == 52){//4
		resumeGame();
	}

});

function startBall(){
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	bounces = 0;
	bouncesWalls = 0;

	//picks an direction
	angle = (Math.random() * 70 + 10);
	
	if(Math.floor(Math.random() * 2) == 1){
		topDirection = 1;
	}else{
		topDirection = -1;
	}//else

	if(Math.floor(Math.random() * 2) == 1){
		leftDirection = 1;
	}else{
		leftDirection = -1;
	}//else

	//picks a speed
	speed = (Math.random() * 4 + 4);

	//finds the x and y components of the velocity
	topSpeedOfBall = speed * (Math.sin(angle * Math.PI / 180));
	leftSpeedOfBall = speed * (Math.cos(angle * Math.PI / 180));

	speedUp += 0.75;

} // startBall

// update locations of paddles and ball
function show(){

	// update location of paddles and ball
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topDirection * (topSpeedOfBall + ((bounces >= 6) ? ((bounces - 6) * .5) : 0) + bouncesWalls + speedUp);
	leftPositionOfBall += leftDirection * (leftSpeedOfBall + ((bounces >= 6) ? ((bounces - 6) * .5) : 0) + bouncesWalls + speedUp);

	//stop paddle from leaving top of gameboard
	if(positionOfPaddle1 <= 0){
		positionOfPaddle1 = 0;
	}

	//stop the paddle from leaving bottom of gameboard
	if (positionOfPaddle1 >= gameBoardHeight - paddleHeight){
		positionOfPaddle1 = gameBoardHeight - paddleHeight;
	}

	//stop paddle from leaving top of gameboard
	if(positionOfPaddle2 <= 0){
		positionOfPaddle2 = 0;
	}

	//stop the paddle from leaving bottom of gameboard
	if (positionOfPaddle2 >= gameBoardHeight - paddleHeight){
		positionOfPaddle2 = gameBoardHeight - paddleHeight;
	}

	// if ball hits top, or bottom, of gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameBoardHeight - ballHeight){
		topDirection *= -1;
		bouncesWalls += 0.5;
	}

	//ball on left edge of gameboard
	if(leftPositionOfBall <= paddleWidth){

		//if ball hits left paddle, change direction
		if(topPositionOfBall > positionOfPaddle1 - ballHeight && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			bounce.play();
			leftDirection *= -1;
			bounces++;
			bouncesWalls = 0;
		} else {
			fail.play();
			score2 += 1;
			document.getElementById("score2").innerHTML = score2;

			if(score2 >= 5){
				stopGame();
			}//if

			startBall();
		}//else
	}//if

	// ball on right edge of gameboard
	if(leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight){

		//if the ball hits right paddle, change direction
		if(topPositionOfBall > positionOfPaddle2 -ballHeight && topPositionOfBall < positionOfPaddle2 + paddleHeight){
			bounce.play();
			leftDirection *= -1;
			bounces++;
			bouncesWalls = 0;
		} else {
			fail.play();
			score1 += 1;
			document.getElementById("score1").innerHTML = score1;

			if(score1 >= 5){
				stopGame();
			}//if

			startBall();
		}//else
	}//of

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

}// show

//object constructor to play sounds     
//https://www.w3schools.com/graphics/game_sound.asp 
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


//resume game play
function resumeGame(){
	if(stop == 0){
		if(!controlPlay){
			controlPlay = window.setInterval(show, 1000/60);
		}//if
	}//if
}//resumeGame

//pause game play
function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

//start game play
function startGame(){

	//reset the game
	score1 = 0;
	score2 = 0; 
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	stop = 0;
	speedUp = -0.75;
	bouncesWalls = 0;
	bounces = 0;
	document.getElementById("score1").innerHTML = score1;
	document.getElementById("score2").innerHTML = score2;



	startBall();

	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}//startGame

//StopGame
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
	stop = 1;

	var message1 = "Tie Game";
	var message2 = "Close to Continue.";

	if (score2 > score1){
		message1 = "Player 2 Wins with " + score2 + ((score2 == 1) ? " Point!" : " Points!");
		message2 = "Close to Continue"
	} else if (score2 < score1){
		message1 = "Player 1 Wins with " + score1 + ((score1 == 1) ? " Point!" : " Points!");
		message2 = "Close to Continue"
	}

	showLightBox(message1, message2);
}//stopGame

/* Lightbox Code */

//change the visibility of divID
function changeVisibility(divID){
	var element = document.getElementById(divID)

	// if element exists, toggle its class
	//between hidden and unhidden
	if (element){
		element.className = (element.className == "hidden")? "unhidden" : "hidden";
	}//if
}//chageVIsibility

//display message in lightbox
function showLightBox(messageOne, messageTwo){
	
	//set messages
	document.getElementById("message").innerHTML = messageOne;
	document.getElementById("message2").innerHTML = messageTwo;

	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

}//showLightBox

function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}//continueGame

/* End of Lightbox code */
