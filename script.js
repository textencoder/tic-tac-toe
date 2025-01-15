let board = [
    [null, null, 'o'],
    [null, 'o', null],
    ['o', null, null],
];

//horizontal wins
/*for (let i = 0; i < 3; i++) {
    if (board[i].join('') == 'xxx' || board[i].join('') == 'ooo') {
        console.log(true);
    }
}*/

function checkWin(board) {
    const size = board.length;

    for (let i = 0; i < size; i++) {
        // Check row
        if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
            return board[i][0];
        }
        // Check column
        if (board[0][i] && board.every(row => row[i] === board[0][i])) {
            return board[0][i];
        }
    }

    // Check diagonals
    // Top-left to bottom-right
    if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) {
        return board[0][0];
    }
    // Top-right to bottom-left
    if (board[0][size - 1] && board.every((row, index) => row[size - 1 - index] === board[0][size - 1])) {
        return board[0][size - 1];
    }

    // No winner
    return null;
}

console.log(checkWin(board));