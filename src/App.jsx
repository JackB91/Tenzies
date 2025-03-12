import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice())
    
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
    setDice(oldDice => {
    return (oldDice.map(die => {
        return !die.isHeld? 
        {...die ,value: Math.ceil(Math.random() * 6) }:die
    }) )
})

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
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
            
        </main>
    )
}