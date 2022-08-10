// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true
let player1Roll = 0
let player2Roll = 0
let player1WinTally = 0
let player2WinTally = 0
let player1Incremented = false
let player2Incremented = false

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const resetGameBtn = document.getElementById("resetGameBtn")

const player1TotalWin = document.getElementById("player1TotalWin")
const player2TotalWin = document.getElementById("player2TotalWin")

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player1Roll++
        player1Score += randomNumber
        if(player1Score === 13) {
            player1Score = 0
        }
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        playerTurnMessage("Player 2")
        classSwitch(player1Dice, player2Dice)
    } else {
        player2Roll++
        player2Score += randomNumber
        if(player2Score === 13) {
            player2Score = 0
        }
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        classSwitch(player2Dice, player1Dice)
        playerTurnMessage("Player 1")
    }
    player1Turn = !player1Turn
    roundWinChecker()
    playerStarCount(player1Incremented, player1TotalWin)
    playerStarCount(player2Incremented, player2TotalWin)
    checkMate()
})

// This function switches Buttons hides and show the appropriate button
function switchButton(hide1, hide2, show) {
    hide1.style.display = "none"
    hide2.style.display = "none"
    show.style.display = "block"
}

// Checks if a player has won the round and adds + 1 to their win Tally
function roundWinChecker() {
    if(player1Score >= 20 && player1Roll === player2Roll && player1Score > player2Score) {
        player1WinTally++
        player1Incremented = true
        message.textContent = "player 1 won the round!"
        switchButton(rollBtn, resetGameBtn, resetBtn)
        } else if(player2Score >= 20 && player2Score > player1Score) {
            player2WinTally++
            player2Incremented = true
            message.textContent = "Player 2 won the round!"
            switchButton(rollBtn, resetGameBtn, resetBtn)
        }   
}

// Removes or add the 'active' class to the dice
function classSwitch(playerRemove, playerAdd) {
    playerRemove.classList.remove('active');
    playerAdd.classList.add('active');
}

// Updates message to let them know whos turn it is.
function playerTurnMessage(player) {
     message.textContent = `${player} Turn`
}

// Adds a star if players wins a round
function playerStarCount(incremented, DOM) {
     if(incremented === true) {
         DOM.innerHTML += `<li>⭐</li>`
     } 
}

// Checks if a player has won the game
function checkMate() {
    if(player1WinTally === 3) {
        message.textContent = "player 1 won the game!"
        switchButton(rollBtn, resetBtn, resetGameBtn)
    } else if (player2WinTally === 3) {
        message.textContent = "player 2 won the game!"
        switchButton(rollBtn, resetBtn, resetGameBtn)
    }
}

// Resets all var to 0
function statReset() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    player1Incremented = false
    player2Incremented = false
    playerTurnMessage("Player 1");
    switchButton(resetBtn, resetGameBtn, rollBtn);
    classSwitch(player2Dice, player1Dice);
}

function resetRound() {
    statReset()
}

resetBtn.addEventListener("click", function() {
    resetRound()
})

function resetGame() {
    statReset()
    player1WinTally = 0
    player2WinTally = 0
    player1TotalWin.innerHTML = ""
    player2TotalWin.innerHTML = ""
}

resetGameBtn.addEventListener("click", function() {
    resetGame()
})