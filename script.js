const startContainer = document.getElementById('start-container');
const boardContainer = document.getElementById('board-container');


let board = [];
let turn = "x";
let win = false;

let xMoves = [];
let oMoves = [];

const setBoard = function() { 
        board = [];     
        for (let i = 0; i < 3; i++) {
            board.push(Array.of(null, null, null))
        }
        return board;
    }

function checkWin(board) {
    const size = board.length;

    for (let i = 0; i < size; i++) {
        if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
            return wrapItUp(board[i][0]);       
        }
        if (board[0][i] && board.every(row => row[i] === board[0][i])) {
            return wrapItUp(board[0][i]);
        }
    }

    if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) {
        return wrapItUp(board[0][0]);
    }
    if (board[0][size - 1] && board.every((row, index) => row[size - 1 - index] === board[0][size - 1])) {
        return wrapItUp(board[0][size - 1]);
    }

    if (board[0].every(cell => cell !== null) && board[1].every(cell => cell !== null) && board[2].every(cell => cell !== null)) {
            return wrapItUp('TIE');       
        }
    
    return null;
}

function markSquare(square) {
    let indexOne = Math.ceil(square / 3);
    let indexTwo = square > 6 ? square - 6
    : square > 3 ? square - 3
    : square; 

    if (board[indexOne - 1][indexTwo - 1] == null) {
        board[indexOne - 1][indexTwo - 1] = turn == "x" ? 'x' : 'o';
        //turn = board[indexOne - 1][indexTwo - 1] == "x" ? "o" : "x";
    } else {
        throw new Error('space already contains value');
    }
    
    console.log(board)
    trackMoves([indexOne - 1, indexTwo - 1, square - 1])
    
    checkWin(board);
}

function trackMoves(move) {

    if (turn == "x") {
        if (xMoves.length == 3) {
            let removed = xMoves.shift()
            console.log(removed)
            board[removed[0]][removed[1]] = null;
            console.log(xMoves)
            document.querySelectorAll('.grid-item')[removed[2]].innerHTML = "";
            document.querySelectorAll('.grid-item')[removed[2]].style.background = "none"
        }
        if (oMoves.length == 3) {
            document.querySelectorAll('.grid-item')[oMoves[0][2]].style.background = "grey"
        }
        xMoves.push(move)
    } else {
        if (oMoves.length == 3) {
            let removed = oMoves.shift()
            console.log(removed)
            board[removed[0]][removed[1]] = null;
            console.log(oMoves)
            document.querySelectorAll('.grid-item')[removed[2]].innerHTML = "";
            document.querySelectorAll('.grid-item')[removed[2]].style.background = "none"
        }
        if (xMoves.length == 3) {
            document.querySelectorAll('.grid-item')[xMoves[0][2]].style.background = "grey"
        }
        oMoves.push(move)
    }

}

function wrapItUp(winner) {
    console.log(winner + ' wins');
    turn = winner;
    console.log("new game - turn: ", turn)
    win = true;
    setBoard();
    cleanUpDom();
}

window.addEventListener('DOMContentLoaded', intermission);

document.querySelectorAll('.grid-item').forEach(button => {
    button.addEventListener('click', () => {
        markSquare(Number(button.dataset.label));
        console.log(Number(button.dataset.label));
        button.innerHTML = turn == "x" ? `<img src="./assets/x.svg">` 
        : `<img src="./assets/o.svg">`;
        if (!win) {
            turn = turn == "x" ? "o" : "x";
            console.log("turn: ", turn)
        }
    })
})

function cleanUpDom() {
    setTimeout(() => {
        document.querySelectorAll('.grid-item').forEach(button => {
            button.innerHTML = '';
        })
    }, 0)
    intermission();
}

function intermission() {
    startContainer.style.display = 'grid';
    boardContainer.style.display = 'none';
}

function newGame() {
    win = false;
    setBoard();
    startContainer.style.display = 'none';
    boardContainer.style.display = 'grid';
}

document.querySelector('#start-container button').addEventListener('click', newGame)