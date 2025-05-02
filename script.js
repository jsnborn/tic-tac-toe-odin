const Player = (name, mark) => ({ name, mark }); //  returns a new object with the player’s name and marker (X or O).

const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""]; // 9 empty strings representing the game board.

    const getBoard = () => board; // returns the current state of the board.
    const placeMark = (index, mark) => {
        if (board[index] === "") { // checks if the selected cell is empty.
            board[index] = mark; // places the mark in the selected cell.
            return true; // returns true if the mark was placed successfully.
        }
        return false; // returns false if the cell was already occupied.
    };






    return { getBoard, placeMark, reset }; // returns the board, a function to place a mark on the board, and a function to reset the board.
})();