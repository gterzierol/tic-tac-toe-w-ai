export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            
            return squares[a];
        }
    }
    return null;
}

export const findRandomMove = (squares) => {
    const emptySquareIndexes = defineEmptySquares(squares);
    if (emptySquareIndexes.length > 0) {
        const randomMove = Math.floor(
            Math.random() * emptySquareIndexes.length
        );
        return emptySquareIndexes[randomMove];
    }
    return null;
};

export function defineEmptySquares(currentBoard) {
    let emptyElements = [] 
    currentBoard
        .map((item, index) => {
            !item && emptyElements.push(index);
            return index;
        });
    return emptyElements;
}

export function minimax(squares, player) {
    //find empty array indexes
    let availSquares = defineEmptySquares(squares);
    if (calculateWinner(squares) === "X") {
        return { evaluation: -10 };
    } else if (calculateWinner(squares) === "O") {
        return { evaluation: 10 };
    } else if (availSquares.length === 0) {
        return { evaluation: 0 };
    }
    let moves = [];
    for (let i = 0; i < availSquares.length; i++) {
        
        let id = availSquares[i];
        let move = {};
        move.id = id;
        let savedBoardSpace = squares[id];
        squares[id] = player;
        if (player === "O") {
            move.evaluation = minimax(squares, "X").evaluation;
        } else {
            move.evaluation = minimax(squares, "O").evaluation;
        }
        squares[id] = savedBoardSpace;
        moves.push(move);
    }
    let bestMove;
    if (player === "O") {
        let bestEvaluation = -Infinity;

        for (let i = 0; i < moves.length; i++) {
            if (moves[i].evaluation > bestEvaluation) {
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    } else {
        let bestEvaluation = +Infinity;

        for (let i = 0; i < moves.length; i++) {
            if (moves[i].evaluation < bestEvaluation) {
                bestEvaluation = moves[i].evaluation;

                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}
