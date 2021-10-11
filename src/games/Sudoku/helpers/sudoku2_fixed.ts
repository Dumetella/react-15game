interface BoardCell {
    v: number,
    row: number,
    col: number,
}

type board = BoardCell[][];


class Sudoku2 {
    public get Board(): board {
        return this.board.slice();
    }
    private board: board;

    constructor() {
        this.board = [];
        for (let i = 0; i < 9; i++) {
            this.board.push([]);
            for (let j = 0; j < 9; j++) {
                this.board[i].push({ v: 0, row: i, col: j });
            }
        }
    }

    private shuffle() {
        let copyFiller = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = copyFiller.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copyFiller[i], copyFiller[j]] = [copyFiller[j], copyFiller[i]];
        }
        return copyFiller;
    }

    private isRowSafe(cell: BoardCell, num: number): boolean {
        return !(this.board[cell.row].some((c) => c.v === num));
    }

    private isColSafe(cell: BoardCell, num: number): boolean {
        return !this.board.some(c => c[cell.col].v === num);
    }

    private isBoxSafe(cell: BoardCell, num: number): boolean {

        const boxStartRow = cell.row - (cell.row % 3) // Define top left corner of box region for empty cell
        const boxStartCol = cell.col - (cell.col % 3)
        //each box is 3 by 3 cells 
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                if (this.board[boxStartRow + boxRow][boxStartCol + boxCol].v === num) {
                    return false
                }
            }
        }
        return true
    }

    private combineCheck(cell: BoardCell, num: number): boolean {
        return this.isRowSafe(cell, num) && this.isColSafe(cell, num) && this.isBoxSafe(cell, num);
    }

    private findEmptySquare(): BoardCell | null {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j].v === 0) {
                    return this.board[i][j];
                }
            }
        }
        return null;
    }

    fillBoard(): boolean {
        const emptyCell = this.findEmptySquare();
        if (!emptyCell) {
            return true;
        }

        for (let num of this.shuffle()) {
            if (!this.combineCheck(emptyCell, num)) {
                continue
            }

            this.board[emptyCell.row][emptyCell.col].v = num;

            if (this.fillBoard()) {
                return true;
            }

            this.board[emptyCell.row][emptyCell.col].v = 0;
        }
        return false;
    }

    preparePuzzle = (holes: number) => {

        const removedVals: BoardCell[] = [];

        while (removedVals.length < holes) {

            const val = Math.floor(Math.random() * 81);
            const rndRow = Math.floor(val / 9);
            const rndCol = val % 9;

            if (this.board[rndRow][rndCol].v == 0) {
                continue;
            };

            removedVals.push({
                row: rndRow,
                col: rndCol,
                v: this.board[rndRow][rndCol].v,
            });

            this.board[rndRow][rndCol].v = 0;

            if (!this.fillBoard()) {
                this.board[rndRow][rndCol].v = removedVals.pop()!.v
            }
        }
        return removedVals;
    }
}

const aboba = new Sudoku2();

aboba.fillBoard();

console.table(aboba.preparePuzzle(20));

const display = () => {
    let res: number[][] = [];
    for (let i = 0; i < 9; i++) {
        res.push([]);
        for (let j = 0; j < 9; j++) {
            res[i].push(aboba.Board[i][j].v)
        }

    }
    return res;
}

console.table(display());



