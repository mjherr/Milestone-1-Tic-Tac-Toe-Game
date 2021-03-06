// variables

const space = document.querySelectorAll(".boxes");
const PlayerX = "X";
const PlayerO = "O";
let turn = PlayerX;
// let turn2 = PlayerO;

const victoryCheck = Array(space.length);
victoryCheck.fill(null);

//elements of the game

const strike = document.getElementById("strike");
const scoreArea = document.getElementById("score-area");
const gameOver = document.getElementById("endgame-text");
const playAgain = document.getElementById("play-again");

//click functions

space.forEach((boxes) => boxes.addEventListener("click", boxClick));

function boxClick(event) {
    if (scoreArea.classList.contains("visible")) {
        return;
    }
    const box = event.target;
    const boxNumber = box.dataset.index;
    if (box.innerText != ""){
        return;
    }
    if (turn === PlayerX) {
        box.innerText = PlayerX;
        victoryCheck[boxNumber - 1] = PlayerX;
        turn = PlayerO;
    }
    else {
        box.innerText = PlayerO;
        victoryCheck[boxNumber - 1] = PlayerO;
        turn = PlayerX;
    }
    checkForVictory();
}
//victory check function

function checkForVictory() {
    for (const winningCombo of winningCombos) {
        const {combo, strikes} = winningCombo;
        const boxValue1 = victoryCheck[combo[0] - 1];
        const boxValue2 = victoryCheck[combo[1] - 1];
        const boxValue3 = victoryCheck[combo[2] - 1];

        if(
            boxValue1 != null && 
            boxValue1 === boxValue2 && 
            boxValue1 === boxValue3
        ) {
            strike.classList.add(strikes);
            scoreAreaBox(boxValue1);
            return;
        }
     }
    }

//in case of a draw

const allBoxesFilled = victoryCheck.every((boxes)=> boxes !== null);
if (allBoxesFilled) {
    scoreAreaBox(null);
}

//score box area

function scoreAreaBox(gameOverText){
    let text = 'Draw!';
    if(gameOverText != null) {
        text = `Winner is ${gameOverText}!`;
    }
    scoreArea.className = "visible";
    gameOver.innerText = text;
}

//winning lines

const winningCombos = [
    //winning rows
    {combo: [1, 2, 3], strikes: "strike-row1"},
    {combo: [4, 5, 6], strikes: "strike-row2"},
    {combo: [7, 8, 9], strikes: "strike-row3"},
    //winning columns
    {combo: [1, 4, 7], strikes: "strike-column1"},
    {combo: [2, 5, 8], strikes: "strike-column2"},
    {combo: [3, 6, 9], strikes: "strike-column3"},
    //winning diagonals
    {combo: [1, 5, 9], strikes: "strike-diagonal1"},
    {combo: [3, 5, 7], strikes: "strike-diagonal2"},
    
];