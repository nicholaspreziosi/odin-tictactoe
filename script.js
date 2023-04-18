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

const playerOne = playerFactory('Player 1', 'X');
const playerTwo = playerFactory('Player 2', 'O');

const gameplay = () => {
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
        }
    }


    const checkForTie = () => {
        const winner = document.querySelector('#winner');
        if (counter > 8) {
            winner.textContent = `It's a Tie!`;
            disbleBoard();
        }
    }

    return { checkClicks, resetGame };
};

const game = gameplay();
game.checkClicks();
game.resetGame();