import React, { useState } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import '../styles/DiceContainer.scss';

function DiceContainer() {
  const [diceRoll, setDiceRoll] = useState(0)
  const [selectedDie, setSelectedDie] = useState(20)

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides + 1);
    return roll;
  }

  const handleRollDice = (sides) => {
    const total = rollDice(sides);
    setDiceRoll(total);
  }

  const handleDiceSelect = (id) => {
    if (id === 'd20') {
      setSelectedDie(20);
    }
    if (id === 'd10') {
      setSelectedDie(10);
    }
  }

  return(
    <div className='DiceContainerWrapper'>
      {selectedDie === 20 && (
        <div className='dTwentyContainer'>
          <DTwenty />
          <p className='dTwentyNum'>{diceRoll}</p>
        </div>
      )}
      {selectedDie === 10 && (
        <div className='dTenContainer'>
          <DTen />
          <p className='dTenNum'>{diceRoll}</p>
        </div>
      )}
      <div className='selectDieContainer'>
        <button className='selectButton' type='button' onClick={() => handleDiceSelect('d10')}>d10</button>
        <button className='selectButton' type='button' onClick={() => handleDiceSelect('d20')}>d20</button>
      </div>
      <button className='rollButton' type='button' onClick={() => handleRollDice(selectedDie)}>{`Roll D${selectedDie}`}</button>
    </div>
  )
}

export default DiceContainer;