import React from 'react'


const Square = ({value, onClick}) => {
    return(
        <button onClick={onClick} className='squares'>
            {value}
        </button>
    )
}

export default Square