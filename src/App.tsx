import { useState } from 'react'
import { languages } from './languages'
import Chips from './components/chips'
import './styles/App.css'
import { clsx } from 'clsx'
function App() {
  const [currentWord, setCurrentWord] = useState<string>('react')
  const alphapbet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.split('').includes(letter)).length
  const languageChips = languages.map((language, index) => {
    return <Chips key={language.name} 
                  name={language.name} 
                  color={language.color} 
                  backgroundColor={language.backgroundColor}
                  classes={clsx('chip', index < wrongGuessesCount && 'lost' )}/>})
  const letterElements = currentWord.split('').map(letter => <span key={letter}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ''}</span>)
  // Function to handle the clicking of keyboard buttons (by updating the guessedLetters states)
  // Note that this function is called by an inline event listener within the JSX return,
  // avoiding the need to type the event and use its currentTarget.
  function handleKeyboardClick(buttonValue: string):void{
    setGuessedLetters(prevLetters => prevLetters.includes(buttonValue) ? prevLetters: [...prevLetters, buttonValue])
  }
  const keyboardButtonElements = alphapbet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isIncorrect = isGuessed && !currentWord.includes(letter)
    const classes = clsx('keyboardButton', isCorrect && 'correctGuess', isIncorrect && 'incorrectGuess')
    return (
    <button onClick={() => handleKeyboardClick(letter)} 
            key={letter} 
            className={classes}>
              {letter.toUpperCase()}
            </button>)
          })
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='gameResult'>
        <h2>You Win!</h2>
        <h2>Well Done! 🎉</h2>
      </section>
      <section className='chipsContainer'>
        {languageChips}
      </section>
      <section className='letterElementsContainer'>
        {letterElements}
      </section>
      <section className='keyboardContainer'>
        {keyboardButtonElements}
      </section>
      
    </main>
  )
}

export default App
