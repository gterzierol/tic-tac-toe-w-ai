import { goToStep } from "./gameAction"

const INITIAL_STATE = {
    history:[Array(9).fill(null)],
    stepNumber:0
}

const gameReducer = (state= INITIAL_STATE, action ) => {
    switch(action.type){
        case 'ADD_STEP':
            return {
                ...state,
                history: [...action.payload.historyPoint, action.payload.squares]}
        case 'ADD_STEP_NUMBER':
            return {
                ...state,
                stepNumber: action.payload.stepNumber
            }
        case 'GO_TO_STEP':
            return {
                ...state,
                history: [...INITIAL_STATE.history, action.payload.current]
            }
        case 'RESTART_GAME':
            return state = INITIAL_STATE
        default:
            return state
        }   
}
export default gameReducer