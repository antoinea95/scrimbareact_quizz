import React from 'react'
import {nanoid} from 'nanoid'
import { decode } from 'html-entities';

export default function Question(props) {
    
    
    // map pour affichier les réponses de chaque question
    const incorrectAnswerElement = props.incorrectAnswers.map(answer => {
        
        // constante pour déterminer la classe à appliquer
        const incorrect = `
            ${props.selectedAnswer === answer ? 'btn-selected' : 'answer-btn'}
            ${props.check && props.selectedAnswer === answer ? 'btn-selected-wrong' : 'answer-btn'}
            ${props.check && props.selectedAnswer !== answer && 'answer-btn-checked'}
        `
        //création des boutons des mauvaises réponses
        return (  
            <button className={incorrect} key={nanoid()} onClick={() => props.handleResponse(props.id, answer)}>
                {decode(answer)}
            </button> )
        
    })
    
    // détermine la classe à appliquer aux boutons de bonnes réponses
     const correct = `
            ${props.selectedAnswer === props.correctAnswer ? 'btn-selected' : 'answer-btn'}
            ${props.check && 'btn-correct'}
            `
    
    // création des boutons des bonnes réponses
    const correctAnswerElement = 
            <button className = {correct} key={nanoid()} onClick= {() =>props.handleResponse(props.id, props.correctAnswer)}>
                {decode(props.correctAnswer)}
            </button>
    
    
    // mélange des réponses pour quelles affichent de manières aléatoires
    incorrectAnswerElement.push(correctAnswerElement)
    const sortedAnswerElement = incorrectAnswerElement.sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);
    

    
    return(
            <div className='question'>
                <h2 className='question-title'>{decode(props.question)}</h2>
                <div className='answer-container'>
                {sortedAnswerElement}  
                </div>
            </div>
        
    )
}