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
