import React, { useState } from 'react';
import DTwenty from './DTwenty';
import '../styles/DiceContainer.scss';

function DiceContainer() {
  const [dTwentyRoll, setDTwentyRoll] = useState(0)

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides + 1);
    return roll;
  }

  const handleRollDice = (sides) => {
    const total = rollDice(sides);
    setDTwentyRoll(total);
  }

  return(
    <div className='DiceContainerWrapper'>
      <div className='dTwentyContainer'>
        <DTwenty />
        <p className='dTwentyNum'>{dTwentyRoll}</p>
      </div>
      <button className='rollButton' type='button' onClick={() => handleRollDice(20)}>Roll D20</button>
    </div>
  )
}

export default DiceContainer;