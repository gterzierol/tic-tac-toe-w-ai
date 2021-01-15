export const historyRegister = (historyPoint, squares) => {
    return{
        type:'ADD_STEP',
        payload:{
            historyPoint,
            squares
        }
    }
}

export const stepNumberRegister = (stepNumber) => {
    return{
        type:'ADD_STEP_NUMBER',
        payload:{
            stepNumber
        }
    }
}
export const goToStep = (current) => {
    return{
        type: 'GO_TO_STEP',
        payload:{
            current
        }
    }
}
export const restartGame = () => {
    return{
        type:'RESTART_GAME'
    }
}
