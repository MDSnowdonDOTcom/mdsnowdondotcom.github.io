const levels =[
	//level 0
	["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",
	 "tree", "tree",     "tree",     "tree",     "",     "animate1",     "",     "animate2",     "",     "animate3",     "",     "animate4",     "",     "animate5",     "",     "animate6",     "tree",
	 "tree", "tree",     "tree",     "rider",     "",     "animate1",     "",     "animate2",     "",     "animate3",     "",     "animate4",     "",     "animate5",     "",     "animate6",     "tree",
	 "tree", "tree",     "water","water","water","animate1",     "water","water","water","water","water","animate4",     "water","animate5",     "water","bridge","water",
	 "water","water","water","",     "water","water","water","water","",     "",     "water","water","water","water","water","",     "tree",
	 "tree", "",     "",     "",     "fenceRotate",  "animate", "animate", "animate", "animate", "animate", "animate", "animate", "animate", "animate", "animate", "animate", "tree",
	 "flag", "",     "",     "",     "fenceRotate",  "",     "up",   "",     "tree", "tree", "tree", "tree","",     "tree",     "tree",     "tree",     "tree", 
	 "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",],

	//level 1
	["tree", "tree", "flag", "tree", "tree", "tree", "tree", "water",     "tree",         "tree", "water",     "tree", "tree",         "water",      "tree", "tree", "tree",
	 "tree", "",     "",     "fenceRotate",     "",     "tree",     "tree",     "water",     "animate2",     "",     "water",     "",     "animate1",     "water",     "",     "animate3",     "tree",
	 "tree", "",     "",     "fenceRotate",     "",     "tree",     "",     "bridge",     "animate2",     "",     "water",     "",     "animate1",     "water",     "animate4",     "animate3",     "tree",
	 "tree", "rock",     "rock",     "",     "fence",     "tree",     "",     "water",     "animate2",     "",     "bridge",     "",     "animate1",     "bridge",     "animate4",     "animate3",     "tree",
	 "tree", "animate",     "animate",     "animate",     "animate",     "animate",     "animate",     "water",     "animate2",     "",     "water",     "",     "water",     "water",     "animate4",     "animate3",     "tree",
	 "tree", "",     "",     "",     "fence",     "rock",     "rock",     "water",     "water",     "water",     "water",     "",     "water",     "",     "animate4",     "animate3",     "tree",
	 "tree", "",     "",     "",     "rider",     "rock",     "tree",     "",          "",          "water",     "water",     "",     "water",     "",     "",     "animate3",     "left", 
	 "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",      "tree",      "water",     "water",     "tree", "water", "tree", "tree", "tree", "tree",],

	//level 2
	["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "rock", "rock", "rock", "rock", "rock", "rock", "rock",
	 "tree", "tree", "",     "",     "",     "",     "fenceRotate",     "",     "tree", "tree", "",     "",     "animate4",     "rock", "rock", "animate2",     "rock",
	 "tree", "tree", "",     "tree", "tree", "tree", "tree", "",     "",     "tree", "",     "rock", "animate4",     "",     "fenceRotate",     "animate2",     "rock",
	 "tree", "tree", "",     "",     "",     "",     "animate1",     "tree", "animate",     "animate",     "animate",     "rock", "animate4",     "",     "rock", "animate2",     "princess",
	 "tree", "tree", "tree", "tree", "",     "tree", "animate1",     "tree", "tree", "fence",     "rock", "rock", "rock", "rock", "rock", "animate2",     "rock",
	 "tree", "",     "",     "",     "",     "tree", "animate1",     "",     "tree", "",     "tree", "animate3",     "",     "",     "rock", "animate2",     "rock",
	 "tree", "",     "",     "tree", "",     "tree", "animate1",     "rider","tree", "",     "",     "animate3",     "tree", "",     "fenceRotate",     "animate2",     "tree", 
	 "tree", "tree", "up",   "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",]
	];//end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];
const doNotJump = ["fence", "fenceRotate"];
const numLevels = 3
const widthOfBoard = Math.floor((document.getElementById("gameBoard").offsetWidth) / (document.getElementById("data").offsetWidth));
const heightOfBoard = Math.floor((document.getElementById("gameBoard").offsetHeight) / (document.getElementById("data").offsetHeight));

var currentAnimation;
var runTimer;

var currentLevel = 0; //start level
var riderOn = false; //is the rider on?
var currentLocationOfHorse = 0;
var gameOver = false;
var lives = 5;
var timer = 0;
var speedEnemy = 0;
var stop = 0;
var pause = false;

//hard difficulty
function hard(){
	lives = 3;
	speedEnemy = -100;
	document.getElementById("start").style.display = "none";
	startTimer();
	life();
}

//medium difficulty
function medium(){
	lives = 4;
	speedEnemy = 0;
	document.getElementById("start").style.display = "none";
	startTimer();
	life();
}

//easy difficulty
function easy(){
	lives = 5;
	speedEnemy = 100;
	document.getElementById("start").style.display = "none";
	startTimer();
	life();
}

//tracks how long the game has ran
function startTimer(){
	timer++;

	runTimer = setTimeout(function() {
		startTimer();
	}, 1000);
}//startTimer

document.addEventListener('keydown', function(e) {
	if(!pause){
		if(e.keycode == 37 || e.keycode == 38 || e.keycode == 39 || e.keycode == 40){
			switch (e.keycode) {
				case 37: // left arrow
					if(currentLocationOfHorse % widthOfBoard != 0){
						tryToMove("left");
					}
					break;
				case 38: //up arrow
					if(currentLocationOfHorse - widthOfBoard >= 0){
						tryToMove("up");
					}
					break;
				case 39: //right arrow
					if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
						tryToMove("right");

					}
					break;
				case 40: //down arrow
					if(currentLocationOfHorse + widthOfBoard < (widthOfBoard * heightOfBoard)){
						tryToMove("down");
					}
					break;
			}//switch
		}else{
			switch (e.which) {
				case 37: // left arrow
					if(currentLocationOfHorse % widthOfBoard != 0){
						tryToMove("left");
					}
					break;
				case 38: //up arrow
					if(currentLocationOfHorse - widthOfBoard >= 0){
						tryToMove("up");
					}
					break;
				case 39: //right arrow
					if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
						tryToMove("right");

					}
					break;
				case 40: //down arrow
					if(currentLocationOfHorse + widthOfBoard < (widthOfBoard * heightOfBoard)){
						tryToMove("down");
					}
					break;
			}//switch
		}//else
	}
});//key event listener

//try to move horse
function tryToMove(direction){
	if(!gameOver){

		//location beofre move
		let oldLocation = currentLocationOfHorse;

		//class of location before move
		let oldClassName = gridBoxes[oldLocation].className;

		let nextLocation = 0; //location we wish to move to
		let nextClass = ""; //class of location we wisht to move to

		let nextLocation2 = 0;
		let nextClass2 = "";

		let newClass = ""; //new class to switch to if move successful

		switch(direction){
			case "left":
				nextLocation = currentLocationOfHorse - 1;
				break;
			case "right":
				nextLocation = currentLocationOfHorse + 1;
				break;
			case "up":
	 			nextLocation = currentLocationOfHorse - widthOfBoard;
	 			break;
			case "down":
				nextLocation = currentLocationOfHorse + widthOfBoard;
				break;
		}//switch

		nextClass = gridBoxes[nextLocation].className;

		//if the obbstavle is not passable, don't move
		if(noPassObstacles.includes(nextClass)) { return; }

		//if it's a fences and there is no rider, don't move
		if(!riderOn && nextClass.includes("fence")) { return; }

		//if there is a fence, move two spaces with animation
		if(nextClass.includes("fence")){
			if((direction == "up" && (!noPassObstacles.includes(gridBoxes[currentLocationOfHorse - (2 * widthOfBoard)].className) && !doNotJump.includes(gridBoxes[currentLocationOfHorse - (2 * widthOfBoard)].className))) || 
			   (direction == "down" && (!noPassObstacles.includes(gridBoxes[currentLocationOfHorse + (2 * widthOfBoard)].className) && !doNotJump.includes(gridBoxes[currentLocationOfHorse + (2 * widthOfBoard)].className))) ||
			   (direction == "left" && (!noPassObstacles.includes(gridBoxes[currentLocationOfHorse - 2].className) && !doNotJump.includes(gridBoxes[currentLocationOfHorse - 2].className))) ||
			   (direction == "right" && (!noPassObstacles.includes(gridBoxes[currentLocationOfHorse + 2].className) && !doNotJump.includes(gridBoxes[currentLocationOfHorse + 2].className)))){

				//rider must be on to jump
				if(riderOn){
					gridBoxes[currentLocationOfHorse].className = "";
					oldClassName = gridBoxes[nextLocation].className;

					//set values according to direction
					if(direction == "left"){
						nextClass = "jumpLeft";
						nextClass2 = "leftWith";
						nextLocation2 = nextLocation - 1;
					} else if (direction == "right"){
						nextClass = "jumpRight";
						nextClass2 = "rightWith"
						nextLocation2 = nextLocation + 1;
					} else if (direction == "up"){
						nextClass = "jumpUp";
						nextClass2 = "upWith"
						nextLocation2 = nextLocation - widthOfBoard;
					} else if (direction == "down"){
						nextClass = "jumpDown";
						nextClass2 = "downWith"
						nextLocation2 = nextLocation + widthOfBoard;
					}//else if

					pause = true;

					//show horse jumping
					gridBoxes[nextLocation].className = nextClass;
					setTimeout(function() {

						//set jump back to just a fence
						gridBoxes[nextLocation].className = oldClassName;

						//update current location of horse to be 2 spaces past take off
						currentLocationOfHorse = nextLocation2;

						//getclass of box after jump
						nextClass = gridBoxes[currentLocationOfHorse].className;

						//show horse and rider after landing 
						gridBoxes[currentLocationOfHorse].className = nextClass2;

						pause = false;

						//if next box is a flag, go up a level
						levelUp(nextClass);

					}, 350);
				}//if
			}//if
			return;
		}//if

		// if there is a rider, add rider
		if(nextClass == "rider"){
			riderOn = true;
		}

		//if there is a bridge in the old location keep it 
		if(oldClassName.includes("bridge")){
			gridBoxes[oldLocation].className = "bridge";
		}else{
			gridBoxes[oldLocation].className = ""
		}//else

		//build name of new class
		newClass = direction;
		newClass += (riderOn) ? "With" : "";

		//if there is a bridge in the next location, keep it
		if(gridBoxes[nextLocation].classList.contains("bridge")){
			newClass += " bridge";
		}//if

		//move 1 space
		currentLocationOfHorse = nextLocation;
		gridBoxes[currentLocationOfHorse].className = newClass;

		// if it is an enemy
		if(nextClass.includes("Enemy")){
			lives--;
			life();
			return;
		}

		//move up to next level if needed
		levelUp(nextClass);
	}//if

}//tryToMove

//move up a level
function levelUp(nextClass){
	if((nextClass == "flag" && riderOn) || (nextClass == "princess" && riderOn)){

		//check if the game has finished
		if(currentLevel + 1 < numLevels){
			document.getElementById("levelup").style.display = "block";
			clearTimeout(currentAnimation);
			setTimeout (function(){
				document.getElementById("levelup").style.display = "none";
				currentLevel++;
				loadLevel();
			}, 1000);
		}else{
			win();
		}//else			
	}//if
}//levelUp

function win(){
	let message = "Your time is " + Math.floor(timer / 60) + ":" + (timer % 60) +"!";
	let message2 = "You won with " + lives + " lives left!"

	document.getElementById("win").style.display = "block";
	document.getElementById("score").innerHTML = message;
	document.getElementById("livesLeft").innerHTML = message2;
	gameOver = true;
}//win

//load levels 0 - maxlevel
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	let animateBoxes1;
	let animateBoxes2;
	let animateBoxes3;
	let animateBoxes4;
	let animateBoxes5;
	let animateBoxes6;
	riderOn = false;

	//load board
	for(i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("up")) {
			currentLocationOfHorse = i;
		}else if(levelMap[i].includes("down")) {
			currentLocationOfHorse = i;
		}else if(levelMap[i].includes("right")) {
			currentLocationOfHorse = i;
		}else if(levelMap[i].includes("left")) {
			currentLocationOfHorse = i;
		}
	}//for

	animateBoxes = document.querySelectorAll(".animate");
	animateBoxes1 = document.querySelectorAll(".animate1");
	animateBoxes2 = document.querySelectorAll(".animate2");
	animateBoxes3 = document.querySelectorAll(".animate3");
	animateBoxes4 = document.querySelectorAll(".animate4");
	animateBoxes5 = document.querySelectorAll(".animate5");
	animateBoxes6 = document.querySelectorAll(".animate6");

		if(levelMap.includes("animate")){
			animateEnemy(animateBoxes, 0, "right", currentLevel, stop);
		}if(levelMap.includes("animate1")){
			animateEnemy(animateBoxes1, 0, "down", currentLevel, stop);
		}if(levelMap.includes("animate2")){
			animateEnemy(animateBoxes2, 0, "down", currentLevel, stop);
		}if(levelMap.includes("animate3")){
			animateEnemy(animateBoxes3, 0, "up", currentLevel, stop);
		}if(levelMap.includes("animate4")){
			animateEnemy(animateBoxes4, 0, "down", currentLevel, stop);
		}if(levelMap.includes("animate5")){
			animateEnemy(animateBoxes5, 0, "up", currentLevel, stop);
		}if(levelMap.includes("animate6")){
			animateEnemy(animateBoxes6, 0, "down", currentLevel, stop);
		}
}//loadLevel

//animate enemy left to right (could add up and down to this)
//boxes - array of grid boxes that include animation
//index - cureent  location of animaton
//direction - current direction of animation
function animateEnemy(boxes, index, direction, current, stopMoving){
	if(!gameOver){

		//exitfunction if no animation
		if(boxes.length - 1 == 0) {return;}

		if(current != currentLevel){return;}

		if(stopMoving != stop){return;}



		//update Images
		if(direction == "right"){
			boxes[index].classList.add("rightEnemy");
		} else if(direction == "left"){
			boxes[index].classList.add("leftEnemy");
		} else if(direction == "up"){
			boxes[index].classList.add("upEnemy");
		} else if(direction == "down"){
			boxes[index].classList.add("downEnemy");
		}//else

		//if player is there they loose		
		if(((boxes[index].className.includes("leftWith") || boxes[index].className.includes("rightWith") || boxes[index].className.includes("upWith") || boxes[index].className.includes("downWith")) || 
			(boxes[index].className.includes("left ") || boxes[index].className.includes("right ") || boxes[index].className.includes("up ") || boxes[index].className.includes("down "))) && 
			(boxes[index].className.includes("Enemy"))){
			lives--;
			life();

			//remove images from other boxes
			for(i = 0; i < boxes.length; i++){
				if(i != index){
					boxes[i].classList.remove("leftEnemy");
					boxes[i].classList.remove("rightEnemy");
					boxes[i].classList.remove("upEnemy");
					boxes[i].classList.remove("downEnemy");
				}//if
			}//for

			return;
		}//if


		//remove images from other boxes
		for(i = 0; i < boxes.length; i++){
			if(i != index){
				boxes[i].classList.remove("leftEnemy");
				boxes[i].classList.remove("rightEnemy");
				boxes[i].classList.remove("upEnemy");
				boxes[i].classList.remove("downEnemy");
			}//if
		}//for

		if(direction == "right"){
			//turn around if hit right side
			if(index == boxes.length - 1){
				index--;
				direction = "left";
			} else {
				index++;
			}//else
		} else if(direction == "left"){
			if(index == 0){
				index++;
				direction = "right";
			}else{
				index--;
			}//else
		} else if(direction == "up"){
			if(index == 0){
				index++;
				direction = "down";
			}else{
				index--;
			}//else
		} else if(direction == "down"){
			if(index == boxes.length - 1){
				index--;
				direction = "up"
			}else{
				index++;
			}
		}//else if

		currentAnimation = setTimeout(function() {
			animateEnemy(boxes, index, direction, current, stopMoving);
		}, (750 + speedEnemy));
	};
}//animate Enemy

function life(){

	for(var i = 1; i <= 5; i++){
		document.getElementById("life" + i).classList.remove("life");
	}

	for(var i = 1; i <= lives; i++){
		document.getElementById("life" + i).classList.add("life");
	}

	if(lives == 0){
		document.getElementById("lose").style.display = "Block";
		gameOver = true;
	}

	stop++;

	loadLevel();
}//life

function continueGame(){
	currentLevel = 0; //start level
    riderOn = false; //is the rider on?
	currentLocationOfHorse = 0;
	gameOver = false;
	lives = 5;
	timer = 0;
	speedEnemy = 0;
	stop = 0;

	document.getElementById("win").style.display = "none";
	document.getElementById("lose").style.display = "none";
	document.getElementById("start").style.display = "block";
}