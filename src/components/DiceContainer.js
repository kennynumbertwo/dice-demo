import React, { useState, useEffect } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import DSix from './DSix';
import '../styles/DiceContainer.scss';

function DiceContainer() {
  const [selectedDie, setSelectedDie] = useState(20);
  // PLAYER STATE
  const [playerDiceRoll, setPlayerDiceRoll] = useState(0);
  const [playerAttack, setPlayerAttack] = useState(12);
  const [damageDone, setDamageDone] = useState(0);

  // ENEMY STATE
  const [enemyDiceQty, setEnemyDiceQty] = useState(1);
  const [enemyDiceRoll, setEnemyDiceRoll] = useState(0);
  const [enemyDice, setEnemyDice] = useState([
    {name: 'diceOne', roll: 1, threshold: 1},
    {name: 'diceTwo', roll: 0, threshold: 2},
    {name: 'diceThree', roll: 0, threshold: 3},
    {name: 'diceFour', roll: 0, threshold: 4},
    {name: 'diceFice', roll: 0, threshold: 5}
  ]);

  useEffect(() => {
    setEnemyDice([
      {name: 'diceOne', roll: 0, threshold: 1},
      {name: 'diceTwo', roll: 0, threshold: 2},
      {name: 'diceThree', roll: 0, threshold: 3},
      {name: 'diceFour', roll: 0, threshold: 4},
      {name: 'diceFice', roll: 0, threshold: 5}
    ])
  }, [enemyDiceQty])

  useEffect(() => {
    const damage = (playerDiceRoll + playerAttack) - enemyDiceRoll
    setDamageDone(damage);
  }, [enemyDiceRoll, playerDiceRoll]);

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
      setDiceRoll(1)
      setSelectedDie(20);
    }
    if (id === 'd10') {
      setDiceRoll(1)
      setSelectedDie(10);
    }
    if (id === 'd6') {
      setDiceRoll(1)
      setSelectedDie(6);
    }
  }

  const rollPlayerDie = () => {
    let roll = Math.floor(Math.random() * 20 + 1);
    console.log('running')
    setPlayerDiceRoll(roll);
  }

  const rollEnemyDice = (sides) => {
    let newDice = [...enemyDice]
    console.log(newDice)
    enemyDice.forEach((die, index) => {
      if (die.threshold <= enemyDiceQty) {
        let roll = Math.floor(Math.random() * sides + 1);
        newDice[index].roll = roll;
      }
    })
    const newTotalRoll = newDice.reduce((totalRoll, die) => {
      return die.roll + totalRoll;
    }, 0)
    console.log(newDice)
    setEnemyDice(newDice);
    setEnemyDiceRoll(newTotalRoll)
  }

  const handleAddAttack = () => {
    setPlayerAttack(playerAttack + 1)
  }
  const handleRemoveAttack = () => {
    if (playerAttack >= 1)
    setPlayerAttack(playerAttack - 1)
  }

  const handleAddDie = () => {
    if (enemyDiceQty <= 5) {
      setEnemyDiceQty(enemyDiceQty + 1)
    }
  }
  const handleRemoveDie = () => {
    if (enemyDiceQty > 1) {
      setEnemyDiceQty(enemyDiceQty - 1)
    }
  }

  const handleRoll = () => {
    rollPlayerDie();
    rollEnemyDice(10);
  }

  return(
    <div className='DiceContainerWrapper'>
      <div className='DiceMainContainer'>
        <div className='playerDiceContainer'>
          <div className='dTwentyContainer'>
            <DTwenty />
            <p className='dTwentyNum'>{playerDiceRoll}</p>
          </div>
        </div>
        <div className='enemyDiceContainer'>
          {enemyDice.map(die => {
            if (die.threshold <= enemyDiceQty) {
              return <DTen key={die.name} roll={die.roll} size={2} fontSize={1.2} fontTop={25}/>
            }
            return null;
          })}
        </div>
      </div>
      <div className='selectDieContainer'>
        {/* <button className='selectButton' type='button' onClick={() => handleDiceSelect('d20')}>d20</button> */}
        <div className='playerButtons'>
          <h4>Player Attack: {playerAttack}</h4>
          <h4>Player Total Damge: {playerAttack + playerDiceRoll}</h4>
          <button className='selectButton' type='button' onClick={handleRemoveAttack}>-</button>
          <button className='selectButton' type='button' onClick={handleAddAttack}>+</button>
        </div>
        <div className='enemyButtons'>
          <h4>Enemy Damage: {enemyDiceRoll}</h4>
          <button className='selectButton' type='button' onClick={handleRemoveDie}>-</button>
          <button className='selectButton' type='button' onClick={handleAddDie}>+</button>
        </div>
        <h4>Damage Done: {damageDone > 0 ? damageDone : '0'}</h4>
      </div>
      <button className='rollButton' type='button' onClick={handleRoll}>Roll!</button>
    </div>
  )
}

export default DiceContainer;