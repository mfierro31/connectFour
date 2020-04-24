/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = new Array(HEIGHT); // array of rows, each row is array of cells  (board[y][x]).  To make it
//dynamic, we set the array's length to HEIGHT

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(WIDTH);
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }
    //This creates
    // [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
    // 0: (7) [0, 0, 0, 0, 0, 0, 0]
    // 1: (7) [0, 0, 0, 0, 0, 0, 0]
    // 2: (7) [0, 0, 0, 0, 0, 0, 0]
    // 3: (7) [0, 0, 0, 0, 0, 0, 0]
    // 4: (7) [0, 0, 0, 0, 0, 0, 0]
    // 5: (7) [0, 0, 0, 0, 0, 0, 0]
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" constiable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector("#board");

    // TODO: add comment for this code
    const top = document.createElement("tr"); //creates topmost row of clickable boxes to drop the pieces in
    top.setAttribute("id", "column-top"); //sets this row's id and associated style to column-top
    top.addEventListener("click", handleClick); //adds a click event listener to this row

    for (let x = 0; x < WIDTH; x++) {
        //creates a certain number of cells, that matches our WIDTH, in the top row
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    htmlBoard.append(top); //attaches the top row to the game board

    // TODO: add comment for this code
    //this part creates all the normal rows and columns
    for (let y = 0; y < HEIGHT; y++) {
        //this for loop creates the 6 rows and appends them to the game board
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            //this for loop creates the 7 cells and appends them to each row
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let i = 1; i <= HEIGHT; i++) {
        const btmCell = document.querySelector(`#${CSS.escape(HEIGHT - i)}-${CSS.escape(x)}`);
        if (btmCell.childElementCount === 0) {
            return HEIGHT - i;
        }
    }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const piece = document.createElement("div");
    piece.setAttribute("class", "piece");

    if (currPlayer === 1) {
        piece.classList.add("p1");
    } else {
        piece.classList.add("p2");
    }

    const cell = document.querySelector(`#${CSS.escape(y)}-${CSS.escape(x)}`);
    cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
    alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === undefined) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);
    board[y][x] = currPlayer;

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so, call endGame
    const isFull = board.every(arr => arr.every(val => val === 1 || val === 2));

    if (isFull) {
        endGame("It's a tie!");
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    if (currPlayer === 1) {
        currPlayer = 2;
    } else {
        currPlayer = 1;
    }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(([y, x]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
    }

    // TODO: read and understand this code. Add comments to help you.

    for (let y = 0; y < HEIGHT; y++) {//This loop checks every single cell, starting with 0,0 first, then 0,1 and throughout the rest of the x values before moving onto the 2nd y value, and then repeating the process all over again
        for (let x = 0; x < WIDTH; x++) {
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();