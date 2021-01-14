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
        case 'CHOOSE_DIFFICULT':
            return {
                ...state,
                difficult: action.payload.difficult
            }
        default:
            return state
        }   
}
export default gameReducer