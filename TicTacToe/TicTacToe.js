let currentPlayer = "X";
let gameSatus = "";
let numTurns = 0;


// take player turn
function playerTakeTurn(e){

	if(gameSatus != ""){
		return;
	}

	if(e.innerHTML == ""){
		e.innerHTML = currentPlayer;
		checkGameSatus();
	}else{
		showLightBox("Please try another.", "This box is already selected.")
	}

	// game us over
	if(gameSatus != ""){
		showLightBox(gameSatus, "Game Over.")
	}
}// playerTakeTurn


// after each turn, check for a winner, a tie, or continue playing
function checkGameSatus(){
	numTurns++;

	//check for a win
	if(checkWin()){
		gameSatus = currentPlayer + " wins!";
		return;
	}

	//check for lie
	if(numTurns == 9){
		gameSatus = "Tie Game!"
	}

	//switch current player
	currentPlayer = (currentPlayer == "X" ? "0" : "X" );
}// checkGameSatus

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

}

function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}