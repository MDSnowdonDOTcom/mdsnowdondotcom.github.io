let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]


//reset board and all variables
function newGame(){

	//reset the board
	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
	}

	numTurns = 0;
	gameStatus = "";
	currentPlayer= "X";

	changeVisibility("controls");

}//newGame

// take player turn
function playerTakeTurn(e){

	if(e.innerHTML == ""){
		e.innerHTML = currentPlayer;
		checkGameStatus();

		//if game not over, computer goes
		if(gameStatus == ""){
			setTimeout(function() {
					computerTakeTurn();
					checkGameStatus();
				}, 300
			);
		}//if

	}else{
		showLightBox("Please try another.", "This box is already selected.");
		return;
	}

}// playerTakeTurn


// after each turn, check for a winner, a tie, or continue playing
function checkGameStatus(){
	numTurns++;

	//check for a win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
	}

	//check for tie
	if(numTurns == 9 && gameStatus == "") {
		gameStatus = "Tie Game!"
	}

	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );

	// game us over
	if(gameStatus != ""){
		setTimeout(function() {
			showLightBox(gameStatus, "Game Over.");
		}, 500);
	}
}// checkGameStatus

//check for a Win, there are 8 win paths
function checkWin(){
	let cb = []; //current Board
	cb[0] = "";
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;

	//top row
	if(cb[1] != "" && cb[2] == cb[1] && cb[3] == cb[1]){
		return true;
	}

	//middle row
	else if(cb[4] != "" && cb[5] == cb[4] && cb[6] == cb[4]){
		return true;
	}

	//bottom row
	else if(cb[7] != "" && cb[8] == cb[7] && cb[9] == cb[7]){
		return true;
	}

	//left collumn
	else if(cb[1] != "" && cb[4] == cb[1] && cb[7] == cb[1]){
		return true;
	}

	//middle collumn
	else if(cb[2] != "" && cb[5] == cb[2] && cb[8] == cb[2]){
		return true;
	}

	//right collumn
	else if(cb[3] != "" && cb[6] == cb[3] && cb[9] == cb[3]){
		return true;
	}

	//diagonal top left
	else if(cb[1] != "" && cb[5] == cb[1] && cb[9] == cb[1]){
		return true;
	}

	//diagonal bottom left
	else if(cb[7] != "" && cb[5] == cb[7] && cb[3] == cb[7]){
		return true;
	}else{
		return false;
	}

}// checkWin

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

	//if the game is over, show controls
	if(gameStatus != ""){
		changeVisibility("controls");
	}
}//continueGame

function computerTakeTurn(){
	
	let idName = "";
	var winO = winNext("O");
	var winX = winNext("X");

	if(document.getElementById("five").innerHTML == ""){
		document.getElementById("five").innerHTML = currentPlayer;
	}
	else if(winO != -1){
		document.getElementById(idNames[winO]).innerHTML = currentPlayer;
		return;
	}
	else if(winX != -1){
		document.getElementById(idNames[winX]).innerHTML = currentPlayer;
		return;
	}else{

		//choose random boxes until an emtpy box is found
		do{
			let rand = parseInt(Math.random()*9) + 1; //1-9	
			idName = idNames[rand-1];

			//check if chosen box iis empty
			if(document.getElementById(idName).innerHTML == ""){
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			}
		} while(true);
	}
	return;
}//computerTakeTurn

function winNext(player){
	let test = []; //current Board
	test[0] = document.getElementById("one").innerHTML;
	test[1] = document.getElementById("two").innerHTML;
	test[2] = document.getElementById("three").innerHTML;
	test[3] = document.getElementById("four").innerHTML;
	test[4] = document.getElementById("five").innerHTML;
	test[5] = document.getElementById("six").innerHTML;
	test[6] = document.getElementById("seven").innerHTML;
	test[7] = document.getElementById("eight").innerHTML;
	test[8] = document.getElementById("nine").innerHTML;

	if(test[4] == player && test[0] == player && test[8] == ""){
		return 8;
	}
	else if(test[4] == player && test[1] == player && test[7] == ""){
		return 7;
	}
	else if(test[4] == player && test[2] == player && test[6] == ""){
		return 6;
	}
	else if(test[4] == player && test[3] == player && test[5] == ""){
		return 5;
	}
	else if(test[4] == player && test[5] == player && test[3] == ""){
		return 3;
	}
	else if(test[4] == player && test[6] == player && test[2] == ""){
		return 2;
	}
	else if(test[4] == player && test[7] == player && test[1] == ""){
		return 1;
	}
	else if(test[4] == player && test[8] == player && test[0] == ""){
		return 0;
	}
	else if(test[4] == player && test[5] == player && test[3] == ""){
		return 3;
	}
	else if(test[1] == player && test[0] == player && test[2] == ""){
		return 2;
	}
	else if(test[1] == player && test[2] == player && test[0] == ""){
		return 0;
	}
	else if(test[3] == player && test[0] == player && test[6] == ""){
		return 6;
	}
	else if(test[3] == player && test[6] == player && test[0] == ""){
		return 0;
	}
	else if(test[7] == player && test[6] == player && test[8] == ""){
		return 8;
	}
	else if(test[7] == player && test[8] == player && test[6] == ""){
		return 6;
	}
	else if(test[5] == player && test[2] == player && test[8] == ""){
		return 8;
	}
	else if(test[5] == player && test[8] == player && test[2] == ""){
		return 2;
	}
	else if(test[0] == player && test[2] == player && test[1] == ""){
		return 1;
	}
	else if(test[0] == player && test[6] == player && test[3] == ""){
		return 3;
	}
	else if(test[6] == player && test[8] == player && test[7] == ""){
		return 7;
	}
	else if(test[2] == player && test[8] == player && test[5] == ""){
		return 5;
	}else{
		return -1;
	}


}