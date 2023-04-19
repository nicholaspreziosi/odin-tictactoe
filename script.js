const gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const board = ['', '', '', '', '', '', '', '', ''];

    const gameboardContainer = document.querySelector('#gameboard');
    for (let i = 0; i < board.length; i++) {
        const btn = document.createElement("button");
        gameboardContainer.appendChild(btn);
        btn.classList.add("gameboard-btn");
        btn.textContent = board[i];
    }
})();

const playerFactory = (name, symbol) => {
    return { name, symbol };
  };

let playerOne = playerFactory('Player 1', 'X');
let playerTwo = playerFactory('Player 2', 'O');



const gameplay = () => {
    const getPlayers = () => {
        const play = document.querySelector('#play');
        const players = document.querySelector('#players')
        const playersForm = document.querySelector('#players-form');
        const playerOneInput = document.querySelector('#player-one');
        const playerTwoInput = document.querySelector('#player-two');
        playersForm.addEventListener('submit', event => {
            event.preventDefault();
            playerOne.name = playerOneInput.value;
            playerTwo.name = playerTwoInput.value;
            players.textContent = `${playerOne.name} vs. ${playerTwo.name}`;
        })
    }


    const toggleForm = () => {
        const formContainer = document.querySelector('#form-container');
        const play = document.querySelector('#play')
        const start = document.querySelector('#start')
        play.addEventListener('click', () => {
            if (formContainer.style.display === 'flex') {
                formContainer.style.display = 'none';
            }
        })
        start.addEventListener('click', () => {
            if (formContainer.style.display === 'none') {
                formContainer.style.display = 'flex';
            }
        })
    }


    let counter = 0;
    const checkClicks = () => {
        const gameboardBtns = document.querySelectorAll('.gameboard-btn');
        for (let i = 0; i < gameboardBtns.length; i++) {
            gameboardBtns[i].addEventListener('click', event => {
                if (counter % 2 === 0) {
                    gameboardBtns[i].textContent = playerOne.symbol
                }
                else if (counter % 2 !== 0) {
                    gameboardBtns[i].textContent = playerTwo.symbol
                }
                gameboardBtns[i].setAttribute('disabled', 'disabled')
                counter++;
                console.log(counter)
                findWinner(playerOne);
                findWinner(playerTwo);
                checkForTie();
            })
        }
    }

    const disbleBoard = () => {
        const gameboardBtns = document.querySelectorAll('.gameboard-btn');
        for (let i = 0; i < gameboardBtns.length; i++) {
            gameboardBtns[i].setAttribute('disabled', 'disabled')
        }
    }

    const resetGame = () => {
        const resetBtn = document.querySelector('#reset');
        const gameboardBtns = document.querySelectorAll('.gameboard-btn');
        const winner = document.querySelector('#winner');
        resetBtn.addEventListener('click', event => {
            for (let i = 0; i < gameboardBtns.length; i++) {
                gameboardBtns[i].textContent = '';
                gameboardBtns[i].removeAttribute('disabled')
            }
            counter = 0;
            winner.textContent = '';
        })
    }

    const findWinner = (player) => {
        const gameboardBtns = document.querySelectorAll('.gameboard-btn');
        const winner = document.querySelector('#winner');
        if (((gameboardBtns[0].textContent === player.symbol) && (gameboardBtns[1].textContent === player.symbol) && (gameboardBtns[2].textContent === player.symbol))
            || ((gameboardBtns[3].textContent === player.symbol) && (gameboardBtns[4].textContent === player.symbol) && (gameboardBtns[5].textContent === player.symbol))
            || ((gameboardBtns[6].textContent === player.symbol) && (gameboardBtns[7].textContent === player.symbol) && (gameboardBtns[8].textContent === player.symbol))
            || ((gameboardBtns[0].textContent === player.symbol) && (gameboardBtns[3].textContent === player.symbol) && (gameboardBtns[6].textContent === player.symbol))
            || ((gameboardBtns[1].textContent === player.symbol) && (gameboardBtns[4].textContent === player.symbol) && (gameboardBtns[7].textContent === player.symbol))
            || ((gameboardBtns[2].textContent === player.symbol) && (gameboardBtns[5].textContent === player.symbol) && (gameboardBtns[8].textContent === player.symbol))
            || ((gameboardBtns[0].textContent === player.symbol) && (gameboardBtns[4].textContent === player.symbol) && (gameboardBtns[8].textContent === player.symbol))
            || ((gameboardBtns[2].textContent === player.symbol) && (gameboardBtns[4].textContent === player.symbol) && (gameboardBtns[6].textContent === player.symbol))) {
            winner.textContent = `${player.name} Wins!`;
            disbleBoard();
            return true
        }
        else {
            return false;
        }
    }

    const checkForTie = () => {
        const winner = document.querySelector('#winner');
        if (counter > 8) {
            if ((findWinner(playerOne) === true) || findWinner(playerTwo) === true) {
                return false;
            }
            else {
                winner.textContent = `It's a Tie!`;
                disbleBoard();
                return true;
            }
        }
    }

    return { toggleForm, getPlayers, checkClicks, resetGame };
};

const game = gameplay();
game.toggleForm();
game.getPlayers();
game.checkClicks();
game.resetGame();