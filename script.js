//Doc ready check
$(document).ready(function() {
// Set up
var canvas = document.getElementById("game_board");
var context = canvas.getContext("2d");

//*Board set up*

//Color gradient and shadow
var gradient = context.createLinearGradient(0, 0, 700, 0);
gradient.addColorStop("0", "#1B50F7");
gradient.addColorStop("1", "#C800FF");
context.strokeStyle = gradient;
context.lineWidth = 10;
context.shadowBlur = 20;
context.shadowOffsetX = 5;
context.shadowOffsetY = 10;
context.shadowColor = '#999';

//vertical line 1
context.moveTo(300, 100);
context.lineTo(300, 600);
context.lineCap = 'round';
context.stroke();

//vertical line 2
context.moveTo(500, 100);
context.lineTo(500, 600);
context.lineCap = 'round';
context.stroke();

//horizontal line 1
context.moveTo(140, 250);
context.lineTo(650, 250);
context.lineCap = 'round';
context.stroke();

//horizontal line 2
context.moveTo(140, 450);
context.lineTo(650, 450);
context.lineCap = 'round';
context.stroke();

//*End board set up*

//setting up each empty space to be "empty"(true)
var NW_isEmpty = true;
var NC_isEmpty = true;
var NE_isEmpty = true;
var CW_isEmpty = true;
var CC_isEmpty = true;
var CE_isEmpty = true;
var SW_isEmpty = true;
var SC_isEmpty = true;
var SE_isEmpty = true;
//variables to determine whether an X or O occupies the space
var NW_state = '';
var NC_state = '';
var NE_state = '';
var CW_state = '';
var CC_state = '';
var CE_state = '';
var SW_state = '';
var SC_state = '';
var SE_state = '';
//array with all possible moves (empty spaces)
var array = ["NW", "NC", "NE", "CW", "CC", "CE", "SW", "SC", "SE"];
//variable to check if the game has been won or not (for tie game check)
var win_state = false;

//draw functions
function drawCircle_NW() {
	//checks to see if the space is available to fill
    if (NW_isEmpty) {
        context.beginPath();
        context.arc(210, 170, 50, 0, 2 * Math.PI);
        context.stroke();
        //changes the state to "filled"
        NW_isEmpty = false;
        //changes to occupied by O
        NW_state = 'O';
        //calls the winCheck function to detect a win
        winCheck();
        //calls the drawX function for the "AI's" turn
        drawX();
    }
}

function drawCircle_NC() {

    if (NC_isEmpty) {
        context.beginPath();
        context.arc(400, 170, 50, 0, 2 * Math.PI);
        context.stroke();
        NC_isEmpty = false;
        NC_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_NE() {

    if (NE_isEmpty) {
        context.beginPath();
        context.arc(590, 170, 50, 0, 2 * Math.PI);
        context.stroke();
        NE_isEmpty = false;
        NE_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_CW() {

    if (CW_isEmpty) {
        context.beginPath();
        context.arc(210, 350, 50, 0, 2 * Math.PI);
        context.stroke();
        CW_isEmpty = false;
        CW_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_CC() {

    if (CC_isEmpty) {
        context.beginPath();
        context.arc(400, 350, 50, 0, 2 * Math.PI);
        context.stroke();
        CC_isEmpty = false;
        CC_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_CE() {

    if (CE_isEmpty) {
        context.beginPath();
        context.arc(590, 350, 50, 0, 2 * Math.PI);
        context.stroke();
        CE_isEmpty = false;
        CE_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_SW() {

    if (SW_isEmpty) {
        context.beginPath();
        context.arc(210, 530, 50, 0, 2 * Math.PI);
        context.stroke();
        SW_isEmpty = false;
        SW_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_SC() {

    if (SC_isEmpty) {
        context.beginPath();
        context.arc(400, 530, 50, 0, 2 * Math.PI);
        context.stroke();
        SC_isEmpty = false;
        SC_state = 'O';
        winCheck();
        drawX();
    }
}

function drawCircle_SE() {

    if (SE_isEmpty) {
        context.beginPath();
        context.arc(590, 530, 50, 0, 2 * Math.PI);
        context.stroke();
        SE_isEmpty = false;
        SE_state = 'O';
        winCheck();
        drawX();
    }
}

//function for the "AI's" turn
function drawX() {

    //generate a random move
    var ai_move = array[Math.floor(Math.random() * array.length)];

    //*"Smarter" AI
    //all possible 'north' horizontal counters
    if ((NW_state == 'O') && (NC_state == 'O')) {
        ai_move = 'NE';
    }
    else if ((NW_state == 'O') && (NE_state == 'O')) {
        ai_move = 'NC';
    }
    else if ((NC_state == 'O') && (NE_state == 'O')) {
        ai_move = 'NW';
    }
    //all possible 'center' horizontal counters
    else if ((CW_state == 'O') && (CC_state == 'O')) {
        ai_move = 'CE';
    }
    else if ((CW_state == 'O') && (CE_state == 'O')) {
        ai_move = 'CC';
    }
    else if ((CC_state == 'O') && (CE_state == 'O')) {
        ai_move = 'CW';
    }
    //all possible 'south' horizontal counters
    else if ((SW_state == 'O') && (SC_state == 'O')) {
        ai_move = 'SE';
    }
    else if ((SW_state == 'O') && (SE_state == 'O')) {
        ai_move = 'SC';
    }
    else if ((SC_state == 'O') && (SE_state == 'O')) {
        ai_move = 'SW';
    }
    //all possible 'west' vertical counters
    else if ((NW_state == 'O') && (CW_state == 'O')) {
        ai_move = 'SW';
    }
    else if ((CW_state == 'O') && (SW_state == 'O')) {
        ai_move = 'NW';
    }
    else if ((NW_state == 'O') && (SW_state == 'O')) {
        ai_move = 'CW';
    }
    //all possible 'center' vertical counters
    else if ((NC_state == 'O') && (CC_state == 'O')) {
        ai_move = 'SC';
    }
    else if ((CC_state == 'O') && (SC_state == 'O')) {
        ai_move = 'NC';
    }
    else if ((NC_state == 'O') && (SC_state == 'O')) {
        ai_move = 'CC';
    }
    //all possible 'east' vertical counters
    else if ((NE_state == 'O') && (CE_state == 'O')) {
        ai_move = 'SE';
    }
    else if ((CE_state == 'O') && (SE_state == 'O')) {
        ai_move = 'NE';
    }
    else if ((NE_state == 'O') && (SE_state == 'O')) {
        ai_move = 'CE';
    }
    //all possible 'NW' diagonal counters
    else if ((NW_state == 'O') && (CC_state == 'O')) {
        ai_move = 'SE';
    }
    else if ((CC_state == 'O') && (SE_state == 'O')) {
        ai_move = 'NW';
    }
    else if ((NW_state == 'O') && (SE_state == 'O')) {
        ai_move = 'CC';
    }
    //all possible 'NE' (reverse) diagonal counters
    else if ((NE_state == 'O') && (CC_state == 'O')) {
        ai_move = 'SW';
    }
    else if ((CC_state == 'O') && (SW_state == 'O')) {
        ai_move = 'NE';
    }
    else if ((NE_state == 'O') && (SW_state == 'O')) {
        ai_move = 'CC';
    }
    else {}

    var condition = true;
    //interval setup to break while loop if endless
    setInterval(function() {
    //while statement needed to loop back to beginning of switch 
    while (condition) {
        switch (ai_move) {
            case "NW":
                if (NW_isEmpty) {
                    NW_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    NW_img.style.display = "block";
                    NW_img.style.height = "100px";
                    NW_img.style.width = "97px";
                    NW_img.style.overflow = "auto";

                    //set isEmpty to false, and set condition to false to stop while loop
                    NW_isEmpty = false;
                    //set empty state to X
                    NW_state = 'X';
                    //change condition to false to end while loop
                    condition = false;
                    //check to see if AI won
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "NC":
                if (NC_isEmpty) {
                    NC_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    NC_img.style.display = "block";
                    NC_img.style.height = "100px";
                    NC_img.style.width = "97px";
                    NC_img.style.overflow = "auto";
 
                    NC_isEmpty = false;
                    NC_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "NE":
                if (NE_isEmpty) {
                    NE_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    NE_img.style.display = "block";
                    NE_img.style.height = "100px";
                    NE_img.style.width = "97px";
                    NE_img.style.overflow = "auto";

                    NE_isEmpty = false;
                    NE_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "CW":
                if (CW_isEmpty) {
                    CW_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    CW_img.style.display = "block";
                    CW_img.style.height = "100px";
                    CW_img.style.width = "97px";
                    CW_img.style.overflow = "auto";

                    CW_isEmpty = false;
                    CW_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "CC":
                if (CC_isEmpty) {
                    CC_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    CC_img.style.display = "block";
                    CC_img.style.height = "100px";
                    CC_img.style.width = "97px";
                    CC_img.style.overflow = "auto";

                    CC_isEmpty = false;
                    CC_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "CE":
                if (CE_isEmpty) {
                    CE_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    CE_img.style.display = "block";
                    CE_img.style.height = "100px";
                    CE_img.style.width = "97px";
                    CE_img.style.overflow = "auto";

                    CE_isEmpty = false;
                    CE_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "SW":
                if (SW_isEmpty) {
                    SW_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    SW_img.style.display = "block";
                    SW_img.style.height = "100px";
                    SW_img.style.width = "97px";
                    SW_img.style.overflow = "auto";
 
                    SW_isEmpty = false;
                    SW_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "SC":
                if (SC_isEmpty) {
                    SC_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    SC_img.style.display = "block";
                    SC_img.style.height = "100px";
                    SC_img.style.width = "97px";
                    SC_img.style.overflow = "auto";

                    SC_isEmpty = false;
                    SC_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;

            case "SE":
                if (SE_isEmpty) {
                    SE_img.style.backgroundImage = "url(http://i57.tinypic.com/vg1qio.png)";
                    SE_img.style.display = "block";
                    SE_img.style.height = "100px";
                    SE_img.style.width = "97px";
                    SE_img.style.overflow = "auto";

                    SE_isEmpty = false;
                    SE_state = 'X';
                    condition = false;
                    winCheck();
                } else {
                    ai_move = array[Math.floor(Math.random() * array.length)];
                }
                break;
        }
    } }, 50);
}
//grab image div
var NW_img = document.getElementById("NW_img");
var NC_img = document.getElementById("NC_img");
var NE_img = document.getElementById("NE_img");
var CW_img = document.getElementById("CW_img");
var CC_img = document.getElementById("CC_img");
var CE_img = document.getElementById("CE_img");
var SW_img = document.getElementById("SW_img");
var SC_img = document.getElementById("SC_img");
var SE_img = document.getElementById("SE_img");
//add event listeners to spaces (possible moves)
var NW_event = document.getElementById("NW_space");
NW_event.addEventListener("click", drawCircle_NW);
var NC_event = document.getElementById("NC_space");
NC_event.addEventListener("click", drawCircle_NC);
var NE_event = document.getElementById("NE_space");
NE_event.addEventListener("click", drawCircle_NE);
var CW_event = document.getElementById("CW_space");
CW_event.addEventListener("click", drawCircle_CW);
var CC_event = document.getElementById("CC_space");
CC_event.addEventListener("click", drawCircle_CC);
var CE_event = document.getElementById("CE_space");
CE_event.addEventListener("click", drawCircle_CE);
var SW_event = document.getElementById("SW_space");
SW_event.addEventListener("click", drawCircle_SW);
var SC_event = document.getElementById("SC_space");
SC_event.addEventListener("click", drawCircle_SC);
var SE_event = document.getElementById("SE_space");
SE_event.addEventListener("click", drawCircle_SE);

//Checks to see if player has won
function winCheck() {
	if ((NW_state == 'O') && (NC_state == 'O') && (NE_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((NW_state == 'X') && (NC_state == 'X') && (NE_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((CW_state == 'O') && (CC_state == 'O') && (CE_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((CW_state == 'X') && (CC_state == 'X') && (CE_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((SW_state == 'O') && (SC_state == 'O') && (SE_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((SW_state == 'X') && (SC_state == 'X') && (SE_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((NW_state == 'O') && (CW_state == 'O') && (SW_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((NW_state == 'X') && (CW_state == 'X') && (SW_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((NC_state == 'O') && (CC_state == 'O') && (SC_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((NC_state == 'X') && (CC_state == 'X') && (SC_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((NE_state == 'O') && (CE_state == 'O') && (SE_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((NE_state == 'X') && (CE_state == 'X') && (SE_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((NW_state == 'O') && (CC_state == 'O') && (SE_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((NW_state == 'X') && (CC_state == 'X') && (SE_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if ((NE_state == 'O') && (CC_state == 'O') && (SW_state == 'O')) {
        win_state = true;
		alert("You win!");
		location.reload();
	} 
	else if ((NE_state == 'X') && (CC_state == 'X') && (SW_state == 'X')) {
        win_state = true;
		alert("You lose!");
		location.reload();
	} else {}

	if (((NW_isEmpty == false) && (NC_isEmpty == false) && (NE_isEmpty == false)
	 	&& (CW_isEmpty == false) && (CC_isEmpty == false) && (CE_isEmpty == false)
	 	&& (SW_isEmpty == false) && (SC_isEmpty == false) && (SE_isEmpty == false))
        && (win_state == false)) {
		alert("Tie game!");
		location.reload();
	} else {}
}
});