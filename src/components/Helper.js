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


export function defineEmptySquares(currentBoard) {
    let emptyElements = currentBoard
        .map((item, index) => {
            return !item ? index : false;
        })
        .filter(Boolean);
    return emptyElements;
}


let moves = [];

export function minimax(squares, player) {
    //find empty array indexes
    let availSquares = defineEmptySquares(squares);

    //Base
    if (calculateWinner(squares) === "X") { return { evaluation: -10 }; } 
    else if (calculateWinner(squares) === "O") { return { evaluation: 10 }; } 
    else if (availSquares.length === 0) { return { evaluation: 0 }; }
    
    
    for(let i = 0; i< availSquares.length; i++){
        let id = availSquares[i];
        let move = {};
        move.id = id;
        let savedBoardSpace = squares[id];
        squares[id] = player

        
        if(player === 'O'){move.evaluation = minimax(squares, 'X').evaluation}
        else{move.evaluation = minimax(squares, 'O').evaluation}
        squares[id] = savedBoardSpace
        moves.push(move);
    }
    
    let bestMove;
    if( player === 'O'){
        let bestEvaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if (moves[i].evaluation >bestEvaluation){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
    }else{
        let bestEvaluation = +Infinity;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].evaluation < bestEvaluation){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i]
                
            }
        }
    }
    return bestMove;


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
    
    
    minMax algoritms

    mevcut array'le kontrol yap ve bu kontrol
    mevcut array'ı gönder, bunlardan boş slotlar neresiyle onların indexlerinin içerdiği bir array çıkart.

    */
