import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { calculateWinner,defineEmptySquares, minimax } from "./Helper";
import Board from "./Board";
import {historyRegister, stepNumberRegister} from '../store/gameAction';

let squares = [];

const Game = (props) => {
    const [XO, setXO] = useState("X");
    
    let winner = calculateWinner(props.history[props.stepNumber]);
    let isDrawn = (defineEmptySquares(props.history[props.stepNumber]).length === 0)

    ///AI Picker
    const aiMove = () => {
        if (XO === "X") return;

        if (defineEmptySquares(props.history[props.stepNumber]).length !== 0) {
            const historyPoint = props.history.slice(0, props.stepNumber + 1);
            const current = historyPoint[props.stepNumber];
            squares = [...current];
            
            let index = minimax(squares, XO);
            if (squares[index.id] || winner) return;
            squares[index.id] = XO;
            props.dispatch(historyRegister([...historyPoint, squares]));
            props.dispatch(stepNumberRegister(historyPoint.length));
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
        const historyPoint = props.history.slice(0, props.stepNumber + 1);
        const current = historyPoint[props.stepNumber];
        squares = [...current];
        console.log(winner)
        if (squares[i] || winner) return;
        console.log(winner)
        squares[i] = XO;
        props.dispatch(historyRegister([...historyPoint], squares))
        props.dispatch(stepNumberRegister(historyPoint.length));

        setXO(XO === "O" ? "X" : "O");
    };

    //=>  aiMove func depends on XO's state changes. When XO state changed,  that means when human or computer play their turn, XO statement changes for the determine to who is the next Player
    useEffect(() => {
        setTimeout(() =>  aiMove(), 500);
    }, [XO]);

    //=> when triggered this func, the stepNumber state is changes. This change is define which game state will  you return.
    const jumpTo = (step) => {
        props.dispatch(stepNumberRegister(step))
        setXO(step % 2 === 0 ? "X" : "O");
    };

    //=> renderMoves func creates step buttons
    const renderMoves = () =>
        props.history.map((_step, move) => {
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
                    <div className={(winner || isDrawn) ? "player active" : "player"}>
                        <h3>
                            {isDrawn ?  'DRAWN' : winner ? "Winner => " + winner : "Next Player: " + XO}
                            
                        </h3>
                    </div>

                    <Board
                        squares={props.history[props.stepNumber]}
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

const mapStateToProps = (state) => {
    return{
        history: state.history,
        stepNumber: state.stepNumber
    }
}
export default connect(mapStateToProps)(Game);
