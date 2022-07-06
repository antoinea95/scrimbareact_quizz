import React from 'react'

export default function Start(props) {
    
    return (
        <main className='main-start'>
            <h1 className='start-title'>Quizzical</h1>
            <p className='start-text'> Ready to shine with your knowledge in sport ?</p>
            <button className='start-btn' onClick={props.handleStart}> Start Quizz </button>
        </main> 
    )
}