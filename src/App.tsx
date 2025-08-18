import { useState } from 'react'
import { languages } from './languages'
import Chips from './components/chips'
import './styles/App.css'
import type {JSX} from 'react'
// test commitx
function App() {
  const [langaugeChips, setLanguageChips] = useState<JSX.Element[]>(languages.map(language => (
  <Chips key={language.name} name={language.name} color={language.color} backgroundColor={language.backgroundColor}/>
  )))
  const [currentWord, setCurrentWord] = useState<string>('react')
  const letterElements = currentWord.split('').map(letter => <span>{letter.toUpperCase()}</span>)
  const alphapbet = "abcdefghijklmnopqrstuvwxyz"
  const keyboardButtonElements = alphapbet.split('').map(letter => <button key={letter}className='keyboardButton'>{letter.toUpperCase()}</button>)
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
        {langaugeChips}
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
