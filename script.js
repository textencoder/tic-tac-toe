let board = [];
let bool = false;

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
        board[indexOne - 1][indexTwo - 1] = bool ? 'x' : 'o';
        bool = !bool;
    } else {
        throw new Error('space already contains value');
    }
    
    checkWin(board);
}

function wrapItUp(winner) {
    console.log(winner + ' wins');
    setBoard();
    cleanUpDom();
}

window.addEventListener('DOMContentLoaded', setBoard);

document.querySelectorAll('.grid-item').forEach(button => {
    button.addEventListener('click', () => {
        markSquare(Number(button.dataset.label));
        console.log(Number(button.dataset.label));
        button.innerHTML = !bool ? `<img src="/assets/x.svg">` 
        : `<img src="/assets/o.svg">`;
    })
})

function cleanUpDom() {
    setTimeout(() => {
        document.querySelectorAll('.grid-item').forEach(button => {
            button.innerHTML = '';
        })
    }, 0)
    
}