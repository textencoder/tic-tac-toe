let board = [];

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
            console.log(board[i][0] + ' wins')
            return board[i][0];
            
        }
        if (board[0][i] && board.every(row => row[i] === board[0][i])) {
            console.log(board[0][i] + ' wins')
            return board[0][i];
        }
    }

    if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) {
        console.log(board[0][0] + ' wins')
        return board[0][0];
    }
    if (board[0][size - 1] && board.every((row, index) => row[size - 1 - index] === board[0][size - 1])) {
        console.log(board[0][size - 1] + ' wins')
        return board[0][size - 1];
    }

    return null;
}

console.log('set board: ', setBoard())

function markSquare(player, square) {
    let indexOne = Math.ceil(square / 3);
    let indexTwo = square > 6 ? square - 6
    : square > 3 ? square - 3
    : square; 

    board[indexOne - 1][indexTwo - 1] = player;

    checkWin(board);
}