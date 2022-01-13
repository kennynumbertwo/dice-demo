import React, { useState, useEffect } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import '../styles/DiceContainer.scss';
import Sword from './Sword';

function DiceContainer() {
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
    if (playerAttack >= 1) {
      setPlayerAttack(playerAttack - 1)
    }
  }

  const handleAddDie = () => {
    if (enemyDiceQty < 5) {
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

  return (
    <div className='DiceContainerWrapper'>
      <div className='DiceMainContainer'>
        <div className='playerSide'>
          <div className='diceSide'>
            <DTwenty roll={playerDiceRoll} size={3.0} fontSize={1.4} fontTop={39} />
          </div>
          <h1>+</h1>
          <div className='swordSide'>
            <div className='swordContainer'>
              <Sword />
              <h4>Attack Power: {playerAttack}</h4>
            </div>
            <div className='playerButtons'>
              <button className='selectButton' type='button' onClick={handleRemoveAttack}>-</button>
              <button className='selectButton' type='button' onClick={handleAddAttack}>+</button>
            </div>
          </div>
        </div>
        <h1>-</h1>
        <div className='enemySide'>
          <div className='enemyWrapper'>
            <div className='enemyDiceContainer'>
              {enemyDice.map(die => {
                if (die.threshold <= enemyDiceQty) {
                  return <DTen key={die.name} roll={die.roll} size={2} fontSize={1.2} fontTop={25} />
                }
                return null;
              })}
            </div>
            <div className='enemyButtons'>
              <button className='selectButton' type='button' onClick={handleRemoveDie}>-</button>
              <button className='selectButton' type='button' onClick={handleAddDie}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className='bottomMenu'>
        <h4>Player Total Damage: {playerDiceRoll > 0 ? playerAttack + playerDiceRoll : 0}</h4>
        <h4>Enemy Defense: {enemyDiceRoll}</h4>
        <h4>Damage Done: {damageDone > 0 && playerDiceRoll > 0 ? damageDone : '0'}</h4>
        <button className='rollButton' type='button' onClick={handleRoll}>Roll!</button>
      </div>
    </div>
  )
}

export default DiceContainer;
