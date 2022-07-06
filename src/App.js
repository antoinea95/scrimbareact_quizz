import React from 'react'
import Start from './components/Start'
import Question from './components/Question'
import {nanoid} from 'nanoid'
import shape1 from './images/blobs-1.svg'
import shape2 from './images/blobs.svg'
import './style.css'

export default function App() {
    
    // verifie si le jeu est commencé
    const[isStart, setIsStart] = React.useState(false)

    // stock les données de l'API
    const [allQuestions, setAllQuestions] = React.useState([])

    // création d'un nouveau tableau d'objets pour les questions
    const [allNewQuestions, setAllNewQuestions] = React.useState([])

    // stock les bonnes réponses
    const [answersCount, setAnswersCount] = React.useState(0) 

    // vérifie si l'utilisateur check ses réponses
    const [isCheck, setisCheck] = React.useState(false)

    // vérifie si l'utilisateur réinitialise le jeu
    const [isGameOver, setIsGameOver] = React.useState(false)
   
    
    // call API
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple')
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [isGameOver])
    

    // création des objets questions
    React.useEffect(() => {
        let allNewQuestions = []
        
        for(let i=0; i < allQuestions.length; i++) {
            
            let question = allQuestions[i]
            
            let newQuestion = {
                id: nanoid(),
                question: question.question,
                incorrectAnswers: question.incorrect_answers,
                correctAnswer: question.correct_answer,
                selectedAnswer: ""
            }
            
            allNewQuestions.push(newQuestion)
        }
            setAllNewQuestions(allNewQuestions)
        
        
    }, [allQuestions, isGameOver])
    
    
    // récupération de la réponse sélectionnée par l'utilisateur
    function handleResponse(questionId, answer) {
        setAllNewQuestions(prevAllQuestions => 
                                    (prevAllQuestions.map(question => (
					                    question.id === questionId
						                ? {...question, selectedAnswer: answer }
						                : question
				))))
    }
    

    
    // toggle pour le bouton check answers
    function check() {
        setisCheck(prevIsCheck => !prevIsCheck)
    } 
    
    // compte le nombres de bonnes réponses
    React.useEffect(() => {
        let countCorrectAnswers = 0
        allNewQuestions.forEach(question => {
                question.correctAnswer === question.selectedAnswer && countCorrectAnswers++     
        })
        
        setAnswersCount(countCorrectAnswers)
         
    }, [allNewQuestions])
    


    // création des questions 
    const questionElement = allNewQuestions.map(question => {
        return <Question
                    key={question.id}
                    id={question.id}
                    question={question.question}
                    incorrectAnswers= {question.incorrectAnswers} 
                    correctAnswer={question.correctAnswer}
                    selectedAnswer={question.selectedAnswer}
                    handleResponse={handleResponse}
                    check={isCheck}
                />
    })

    // toggle pour le début du jeu
    function handleStart() {
        setIsStart(prevStart => !prevStart)
    }
    
    // reset du jeu
    function resetGame() {
        setisCheck(false)
        setIsGameOver(prev => !prev)
        handleStart()
    }
    
    
    return(
        <div className='container'>
        <img src={shape1} className='shape-top' alt='shape'/>
        
            {isStart ? 
                <main className='main'>
                    <section className='questions-container'>
                        {questionElement}
                    </section>
                
                <div className='footer'>
                
                {isCheck && <p className='game-score'>You scored {answersCount}/5 correct answers</p>}
                {isCheck ? 
                    <button className='check-btn' onClick={resetGame}> Play Again </button> :
                    <button className='check-btn' onClick={check}> Check Answers </button>
                }
                
                </div>
                
                </main>
            : <Start handleStart={handleStart}/>}
            
        <img src={shape2} className='shape-bottom' alt='shape'/>
        </div>
    )
}