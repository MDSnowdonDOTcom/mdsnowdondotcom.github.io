//global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

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
	show();

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
	show();

});

// update locations of paddles and ball
function show(){
	let paddleHeight = document.getElementById("paddle1").offsetHeight
	let gameBoardHeight = document.getElementById("gameBoard").offsetHeight;

	positionOfPaddle1 += speedOfPaddle1
	positionOfPaddle2 += speedOfPaddle2

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

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
}// show

