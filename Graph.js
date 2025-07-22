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

    getNextMoves(index) {
        return this.adjacencyList[index];
    }

    knightMoves(start, end) {
        const queue = [];
        const dist = [];
        const parent = [];
        const visited = [];

        for(let i = 0; i < this.size * this.size; i++) {
            dist.push(-1);
            parent.push(0);
        }

        const startIndex = this.getIndex(...start);
        parent[startIndex] = startIndex;
        queue.push(startIndex);

        while(queue.length !== 0) {
            const currentIndex = queue.shift();
            visited.push(currentIndex);
            const parentIndex = parent[currentIndex];
            dist[currentIndex] = dist[parentIndex] + 1;

            const possibleNextMoves = this.getNextMoves(currentIndex);
            for(const nextMove of possibleNextMoves) {
                if(!visited.includes(nextMove)) {
                    parent[nextMove] = currentIndex;
                    queue.push(nextMove);
                }
            }
        }

        this.printMoves(start, end, dist, parent);
    }

    printMoves(start, end, dist, parent) {
        const movesStack = [];

        const startIndex = this.getIndex(...start);
        const endIndex = this.getIndex(...end);

        movesStack.push(endIndex);
        let currentIndex = endIndex;
        while(currentIndex !== startIndex) {
            const parentIndex = parent[currentIndex];
            movesStack.push(parentIndex);
            currentIndex = parentIndex;
        }

        const totalMoves = dist[endIndex]
        console.log(`You made it in ${totalMoves} moves! Here's your path:`)
        while(movesStack.length > 0) {
            console.log(this.getPosition(movesStack.pop()));
        }
    }
}