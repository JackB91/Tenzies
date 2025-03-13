// TODO: Go back over useEffect section!!



import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
// import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())  //provide function that will return initial state. react will not re run function on re-renders

    const buttonRef = useRef(null)


    let gameWon =   dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])
    


    function generateAllNewDice() {
      return new Array(10)
          .fill(0)
          .map(() => ({
              value: Math.ceil(Math.random() * 6), 
              isHeld: false,
              id: nanoid()
          }))
  }
   
    function rollDice () {
 if (!gameWon)
        {   
    setDice(oldDice => {
    return (oldDice.map(die => {
        return !die.isHeld? 
        {...die ,value: Math.ceil(Math.random() * 6) }:die
    }) )
})}

else {
    setDice(generateAllNewDice())
}

    }

    function hold(id) {  
        setDice(oldDice => {
            return oldDice.map(die => {
                return die.id === id ? ///check that id matches the one that is clicked
                    {...die, isHeld: !die.isHeld} : //return all previous values of die but flip is held
                    die                             //otherwise return die
            })
        })
    }


  const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))
    
    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
              <h1 className="title">Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
            
        </main>
    )
}

