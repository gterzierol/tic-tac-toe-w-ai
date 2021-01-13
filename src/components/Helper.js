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

        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
export function availableSquares(currentBoard) {
    return currentBoard.filter((s) => s !== "O" && s !== "X");
}

export function defineEmptySquares(currentBoard) {
    let emptyElements = currentBoard
        .map((item, index) => {
            return !item ? index : false;
        })
        .filter(Boolean);
    return emptyElements;
}

let scores= {
    X: 10,
    O: -10,
    tie:0
}

export function bestMove(squares,depth, isMaximizing, human, ai) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
    if(squares[i] === null){
        squares[i] = ai;
        let score = minimax(squares, 0, false, human, ai);
        squares[i] = null;
        if(score > bestScore){
            move = i
        }
    }        
    }
    return move
}

export function minimax(squares,depth, isMaximizing, human, ai) {
    let result = calculateWinner(squares)

    if(result !== null){
        return scores[result]
    }
    if(isMaximizing){
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if(squares[i] === null){
                squares[i] = ai
                let score = minimax(squares,depth + 1, false, ai, human)
                squares[i] = null
                bestScore = Math.max(score, bestScore)
            }            
        }
        return bestScore
    }else{
        let bestScore = Infinity
        for (let i = 0; i < 9; i++) {
            if(squares[i]=== null){
                squares[i] = human;
                let score = minimax(squares, depth + 1, true, ai, human)
                squares[i] = null;
                bestScore = Math.min(score, bestScore)
            }
            
        }
        return bestScore

    }

}

//eğer xIsNext === 'O' ise aiMove() çalışsın ve ai seçimini yapsın. yaptığı seçimde handleClick içerisinde yazılı olan square  [i]||winner kontrolü yapılsın.
//aiMove() açığırıldığında xIsNext kontrolü tekrar gerçekleştirilsin (belki burası kaldırılabilir.)
//BestMove için availableSquares belilrlenmeli board.filter(s=> typeof  == null)
//tieCheck Yap if(emptySquares().lentgh === 0)

/*
    1- handleClick yapıldıktan sonra mevcut handle click func işleyecek.
    2- handleClick bittikten sonra sıra bilgisayara gelecek ve onun hamlesini içeren fonksiyon çalışacak
    3- 
    --- bilgisayarın hamlesinin içeriğide handleClick ile birebir işlemleri gerçekleştirecek
    --- bir fark olacak, öncelikle hangi boş kareler mevcut onlar bulunacak eğer boş alan kalmamışsa Beraberlik ilan edilecek kalmışsa, onlar bulunduktan sonra, bu kalan boş kareler içerisinde seçim yapması sağlanacak
    */
