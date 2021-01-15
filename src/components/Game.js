import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { calculateWinner,defineEmptySquares, minimax, findRandomMove } from "./Helper";
import Board from "./Board";
import {historyRegister, restartGame, stepNumberRegister} from '../store/gameAction';
import { sendMove } from '../services/request';


let squares = [];

const Game = (props) => {
    const [XO, setXO] = useState("X");
    const [playWithWho, setPlayWithWho] = useState('')

    //=> Checking winner with current state
    let winner = calculateWinner(props.history[props.stepNumber]);
    //=> Checking the game is drawn or not with current state
    let isDrawn = (defineEmptySquares(props.history[props.stepNumber]).length === 0)

    //=> AI Picker
    const aiMove = (withWho) => {
        if (XO === "X") return;

        if (defineEmptySquares(props.history[props.stepNumber]).length !== 0) {
            const historyPoint = props.history.slice(0, props.stepNumber + 1);
            const current = historyPoint[props.stepNumber];
            squares = [...current];
            
            let index = withWho === 'Easy' ? findRandomMove(squares) :minimax(squares, XO).id ;
            if (squares[index] || winner) return;
            
            squares[index] = XO;
            props.dispatch(historyRegister([...historyPoint], squares));
            props.dispatch(stepNumberRegister(historyPoint.length));
            sendMove(`Move Triggered by ${XO} index of square ${XO}`);
            setXO("X");
        }
    };

    const handleClick = (i) => {
        const historyPoint = props.history.slice(0, props.stepNumber + 1);
        const current = historyPoint[props.stepNumber];
        squares = [...current];
        
        if (squares[i] || winner) return;

        squares[i] = XO;
        props.dispatch(historyRegister([...historyPoint], squares))
        props.dispatch(stepNumberRegister(historyPoint.length));
        sendMove(`Move Triggered by ${XO} index of square ${XO}`);
        setXO(XO === "O" ? "X" : "O");
    };

    //=>  aiMove func depends on XO's state changes. When XO state changed,  that means when human or computer play their turn, XO statement changes for the determine to who is the next Player
    useEffect(() => {
        setTimeout(() =>  {
            if(playWithWho === '2 Player') return
                aiMove(playWithWho)
            }, 300);
    }, [XO]);

    //=> when triggered this func, the stepNumber state is changes. This change is define which game state will  you return.
    const jumpTo = (step) => {
        if(step === 0){
            props.dispatch(restartGame())
            props.dispatch(stepNumberRegister(step))
        }else{
            const historyPoint = props.history.slice(0, step + 1)
            const current = historyPoint[step];
            props.dispatch(stepNumberRegister(step))
            props.dispatch(historyRegister([...historyPoint], current))
            setXO(step % 2 === 0 ? "X" : "O");
        }
    };

    //=> renderMoves func creates step buttons
    const renderMoves = () => props.history.map((_step, move) => {
        const destination = move ? `go to move  #${move}` : "go to start";
        
            if(move === 0){
                return(
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>{destination}</button>
                    </li>
                )
            }else{
                return(
                    <li key={move}>
                        <button onClick={() => jumpTo(move-1)}>{destination}</button>
                    </li>
                )
            }
        
    });


    return (
        <React.Fragment>
            <div className= "game-container">
                <div className="title">
                    <h1>React Tic Tac Toe Game</h1>
                </div>
                <div className='container'>
                    {
                        !playWithWho ? 
                        (<div className='choose'>
                            <span><button className='button' onClick={(e)=> {setPlayWithWho(e.target.textContent)}}>Easy</button></span>
                            <span><button className='button' onClick={(e)=> {setPlayWithWho(e.target.textContent)}}>Unbeatable</button></span>
                            <span><button className='button' onClick={(e)=> {setPlayWithWho(e.target.textContent)}}>2 Player</button></span>
                        </div>)
                        :
                        (<div>
                        {
                            (winner || isDrawn) && 
                            (<div className='endgame-container'>
                                <div className='endgame'>{(isDrawn && 'Drawn') || (winner && "Winneerrrr! =>" + winner)}</div>
                                <button className='endgame restart' onClick={()=> {jumpTo(0);}}>Restart Game</button>
                            </div>)
                        }
                            <div className={(winner || isDrawn) ? "container opacity" : "container"}>
                                <div className={(winner || isDrawn) ? "player active" : "player"}>
                                    <h3>
                                        {isDrawn ? 'DRAWN' : winner ? "Winner => " + winner : "Next Player: " + XO}
                                    </h3>
                                </div>
                                <Board squares={props.history[props.stepNumber]} onClick={handleClick}/>
                                <div className="info-wrapper">
                                    <div>
                                        <h3>History</h3>
                                        {props.history && renderMoves()}
                                    </div>
                                </div>
                            </div>
                            <div className={(winner || isDrawn) ? 'win': ''}/>
                        </div>)
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return{
        history: state.history,
        stepNumber: state.stepNumber
    }
}
export default connect(mapStateToProps)(Game);
