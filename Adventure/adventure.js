const levels =[
	//level 0
	["flag", "rock", "", "", "",
	 "fence", "rock", "", "", "rider",
	 "", "tree", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "fenceRotate", "", "up", ""],

	 //level 1
	 ["flag", "water", "", "", "",
	  "fence", "water", "", "", "rider",
	  "animate", "bridge animate", "animate", "animate", "animate",
	  "", "water", "", "", "",
	  "", "water", "up", "", ""],

	  //level 2
	  ["tree", "tree", "flag", "tree", "tree",
	   "animate", "animate", "animate", "animate", "animate",
	   "water", "bridge", "water", "water", "water",
	   "", "", "", "fenceRotate", "",
	   "rider", "rock", "", "", "horseup"]
	];//end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0; //start level
var riderOn = false; //is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; //allows 1 animation per level

window.addEventListener("load", function() {
	loadLevel();
});

//load levels 0 - maxlevel
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;

	//load board
	for(i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("horse")) currentLocationOfHorse = 1;
	}//for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");
}//loadLevel

//animate enemy left to right (could add up and down to this)
//boxes - array of grid boxes that include animation
//index - cureent  location of animaton
//direction - current direction of animation
function animateEnemy(boxes, index, direction){

	//exitfunction if no animation
	if(boxes.length <= 0) {return;}

	//update Images
	if(direction == "right"){
		boxes[index].classList.add("rightEnemy");
	} else if(direction == "left"){
		boxes[index].classList.add("leftEnemy");
	} else if(direction == "up"){
		boxes[index].classList.add("upEnemy");
	} else{
		boxes[index].classList.add("downEnemy");
	}//else

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
		if(index == boxes.legnth - 1){
			index--;
			direction = "up"
		}else{
			index++;
		}
	}//else if

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);

}//animate Enemy