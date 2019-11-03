/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var randomNum1, randomNum2, roundScore, scores, activePlayer, dice1, dice2, btnThrow, btnHold, btnNew, btnSet, playUntil, gamePlay;


init();

function throwDice() {
	if(gamePlay) {
	maxPlay();
	//random number between 1 and 6 for dice
	randomNum1 = Math.floor((Math.random()*6)+1);
	randomNum2 = Math.floor((Math.random()*6)+1);
	//set the dice image
	dice1.setAttribute("src", "dice-"+randomNum1+".png");
	dice1.style.display = "block";
	dice2.setAttribute("src", "dice-"+randomNum2+".png");
	dice2.style.display = "block";
	
	if(randomNum1!==1 && randomNum2!==1) {
		//current score
		roundScore += (randomNum1+randomNum2);
		console.log("round sc: "+roundScore+" (random: "+randomNum1+" and "+randomNum2+")");
		document.querySelector("#current-"+activePlayer).innerHTML = "<strong>"+roundScore+"</strong>";
	} else {
		 changePlayer();
	}
}}

function changePlayer() {
	if(gamePlay) {
	maxPlay();
	document.querySelector("#current-"+activePlayer).textContent = 0;
	if(randomNum1!==1 && randomNum2!==1) {
		var score = parseInt(scores[activePlayer]);
		score += roundScore;
		scores[activePlayer] = score;
		document.querySelector("#score-"+activePlayer).textContent = score;		
	}
	
	if(scores[activePlayer]>=playUntil) {
		document.querySelector("#name-" + activePlayer).textContent = 'Winner!';
		document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
		hideDice();
		gamePlay = false;
	} else {
		console.log("round sc: "+roundScore+" , total sc: "+scores[activePlayer]);
		roundScore = 0;

		document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("active");
		//change the active player
		activePlayer===0 ? activePlayer=1 : activePlayer=0;
		document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("active");
	}	
}}

function hideDice() {
	dice1.style.display = "none";
	dice2.style.display = "none";
}

function init() {
	maxPlay();
	gamePlay = true;
	console.log(playUntil);
	activePlayer = 0;
	scores = [0,0]; //total scores
	roundScore = 0; // current score
	btnThrow = document.querySelector(".btn-roll");
	btnHold = document.querySelector(".btn-hold");
	btnNew = document.querySelector(".btn-new");
	btnSet = document.querySelector(".btn-set");
	dice1 = document.querySelector(".dice1");
	dice2 = document.querySelector(".dice2");
	
	for(var i=0; i<scores.length; i++) {
		document.querySelector("#current-"+i).textContent = 0;
		document.querySelector("#score-"+i).textContent = 0;
		document.getElementById("name-"+i).textContent = "Player "+(i+1);
		document.querySelector(".player-"+i+"-panel").classList.remove('winner');
		document.querySelector(".player-"+i+"-panel").classList.remove('active');
	}
    document.querySelector('.player-0-panel').classList.add('active');
	hideDice();		
}

function maxPlay() {
	var inputMax = btnSet.value;
	if(isNaN(inputMax)) {
		playUntil = 100;
		btnSet.textContent = playUntil;
	} else {
		playUntil = inputMax;
	}
return playUntil;
}

btnThrow.addEventListener("click", throwDice);
btnHold.addEventListener("click", changePlayer);
btnNew.addEventListener("click", init);//check first challenge for bind solution
btnSet.addEventListener("click", maxPlay);