import React, { useState } from "react";
import {
    calculateWinner,
    availableSquares,
    defineEmptySquares,
} from "./Helper";
import Board from "./Board";

let squares = [];

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const XO = xIsNext ? "X" : "O";
    let isTie = false;

    const findRandomMove = (squares) => {
        const emptySquareIndexes = defineEmptySquares(squares);
        if (emptySquareIndexes.length > 0) {
            const randomMove = Math.floor(
                Math.random() * emptySquareIndexes.length
            );
            return emptySquareIndexes[randomMove];
        }
        return null;
    };

    const aiMove = (player) => {
        if (player === "X") return;

        let index = findRandomMove(squares);
        if (availableSquares(squares).length !== 0) {
            const historyPoint = history.slice(0, stepNumber + 1);
            const current = historyPoint[stepNumber];
            squares = [...current];

            if (squares[index] || winner) return aiMove(XO);

            squares[index] = XO;
            setHistory([...historyPoint, squares]);
            setStepNumber(historyPoint.length);
            setXIsNext(!xIsNext);
        }
    };

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        squares = [...current];
        if (squares[i] || winner) return;

        squares[i] = XO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXIsNext(!xIsNext);
    };

    aiMove(XO);

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
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
