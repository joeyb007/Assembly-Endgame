import { useState, useEffect } from 'react'
import { languages } from './languages'
import Chips from './components/chips'
import './styles/App.css'
import { clsx } from 'clsx'
import { getFarewellText } from './utils'
function App() {
  const [currentWord, setCurrentWord] = useState<string>('react')
  const alphapbet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.split('').includes(letter)).length
  const isGameLost = languages.length - 1 == wrongGuessesCount 
  const isGameWon = currentWord.split('').every(correctLetter => guessedLetters.includes(correctLetter))
  const isGameOver = isGameLost || isGameWon
  const lastGuess = guessedLetters[guessedLetters.length - 1]
  const isLastGuessWrong = !currentWord.includes(lastGuess)
  const gameResultStyles : React.CSSProperties = {
    visibility: wrongGuessesCount == 0 && !isGameOver ? "hidden" : "visible",
    backgroundColor: isGameOver ? (isGameWon ? '#10A95B':'#BA2A2A') :  (isLastGuessWrong ? "#7A5EA7" : 'rgba(0,0,0,0)')
  }



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
            disabled={isGameOver}
            key={letter} 
            className={classes}>
              {letter.toUpperCase()}
            </button>)
          })
    // Adding a useEffect which only runs when the game starts and ends to add and remove event listeners
    // on each keyboard key in the alphabet so that instead of clicking, users can also opt for physical keyboard
  
    useEffect(() => {
      const handleKeyBoardClick = (e: KeyboardEvent) => {
        const characterPressed = e.key.toLowerCase();
        if (/^[a-z]$/.test(characterPressed) && !isGameOver) {
          handleKeyboardClick(characterPressed);
        }
      }
      document.addEventListener('keydown', handleKeyBoardClick)
      return () => document.removeEventListener('keydown', handleKeyBoardClick)
    },[isGameOver])
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section  style={gameResultStyles}
                className='gameResult'>
        {isGameOver ? (
        <>
          <h2>{isGameWon ? 'You Win!' : 'Game Over!'}</h2>
          <h2>{isGameWon ? 'Well Done! 🎉' : 'You lose! Better start learning Assembly 😭'}</h2>
        </>
        ) : ((lastGuess && isLastGuessWrong) ? <h2>{getFarewellText(languages[wrongGuessesCount - 1].name)}</h2> : undefined)
      }
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
      { isGameOver && <button className='newGame'>New Game</button>}
    </main>
  )
}

export default App
