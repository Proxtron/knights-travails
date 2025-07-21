//Represents the chessboard

export default class Graph {
    adjacencyList;
    size = 8;
    columns = this.size;
    rows = this.size;

    //list of 8 possible knight moves in [x, y] format
    possibleKnightMoves = [[-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1]];

    constructor() {
        this.makeAdjacencyList();
        this.populateAdjacencyList();
    }

    makeAdjacencyList() {
        this.adjacencyList = [];
        for(let i = 0; i < (this.size * this.size); i++) {
            this.adjacencyList.push([]);
        }
    }

    populateAdjacencyList() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                this.addEdges(i, j);
            }
        }
    }

    addEdges(row, column) {
        for(const move of this.possibleKnightMoves) {
            const rowAfterMove = row + move[1];
            const columnAfterMove = column + move[0];

            const outOfBounds = rowAfterMove < 0 || columnAfterMove < 0 || rowAfterMove >= this.size || columnAfterMove >= this.size
            if(outOfBounds) {
                continue;
            }

            const positionBeforeMove = this.getIndex(row, column);
            const positionAfterMove = this.getIndex(rowAfterMove, columnAfterMove);
            this.adjacencyList[positionBeforeMove].push(positionAfterMove);
        }
    }

    getIndex(row, column) {
        return (row * this.size) + column;
    }

    getPosition(index) {
        const row = Math.floor(index / this.size);
        const column = index % this.size;
        return [row, column]
    }
}