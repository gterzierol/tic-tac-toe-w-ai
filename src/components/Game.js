import React, { useEffect, useState } from "react";
import {
    calculateWinner,
    defineEmptySquares,
    minimax,
    findRandomMove,
} from "./Helper";
import Board from "./Board";

let squares = [];

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [XO, setXO] = useState("X");
    const winner = calculateWinner(history[stepNumber]);
    let isTie = false;

    ///AI Picker
    const aiMove = () => {
        if (XO === "X") return;
        console.log("burası AI burası yapayzeka ===> ", XO);

        if (defineEmptySquares(history[stepNumber]).length !== 0) {
            const historyPoint = history.slice(0, stepNumber + 1);
            console.log(historyPoint)
            const current = historyPoint[stepNumber];
            squares = [...current];
            console.log(squares)

            let index = minimax(squares, XO);
            if (squares[index.id] || winner) return;

            squares[index.id] = XO;
            setHistory([...historyPoint, squares]);
            setStepNumber(historyPoint.length);
            setXO("X");
        }
    };

    ///Random Picker!
    // const RandomAiMove =  (player) => {
    //     if (player === "X") return;
    //     //define random move

    //     if (defineEmptySquares(history[stepNumber]).length !== 0) {
    //         const historyPoint = history.slice(0, stepNumber + 1);
    //         const current = historyPoint[stepNumber];
    //         squares = [...current];

    //         let index = findRandomMove(squares);
    //         if (squares[index] || winner) return;

    //         squares[index] = XO;
    //         setHistory([...historyPoint, squares]);
    //         setStepNumber(historyPoint.length);
    //         setXIsNext(!xIsNext);
    //     }
    // };
    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        squares = [...current];
        if (squares[i] || winner) return;

        squares[i] = XO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXO(XO === "O" ? "X" : "O");
    };

    useEffect(() => {
        aiMove();
    }, [XO]);


    const jumpTo = (step) => {
        setStepNumber(step);
        setXO(step % 2 === 0 ? "X" : "O");
    };

    const renderMoves = () =>
        history.map((_step, move) => {
            const destination = move ? `go to move #${move}` : "go to start";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });

    return (
        <>
            <div className="game-container">
                <div className="title">
                    <h1>React Tic Tac Toe Game</h1>
                </div>
                <div className="container">
                    <div className={winner ? "player active" : "player"}>
                        <h3>
                            {winner
                                ? "Winner => " + winner
                                : "Next Player: " + XO || (isTie && "TIE")}
                        </h3>
                    </div>

                    <Board
                        squares={history[stepNumber]}
                        onClick={handleClick}
                    />
                    <div className="info-wrapper">
                        <div>
                            <h3>History</h3>
                            {renderMoves()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
