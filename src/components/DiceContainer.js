import React, { useState, useEffect } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import '../styles/DiceContainer.scss';
import Sword from './Sword';
import LifeBarPlayer from './LifeBarPlayer';
import LifeBarEnemy from './LifeBarEnemy';

function DiceContainer() {
  // PLAYER STATE
  const [maxHp, setMaxHp] = useState(100);
  const [currentHp, SetCurrentHp] = useState(100);
  const [playerDiceRoll, setPlayerDiceRoll] = useState(0);
  const [playerAttack, setPlayerAttack] = useState(12);
  const [damageDone, setDamageDone] = useState(0);
  const [dTwenyManual, setDTwentyManual] = useState(0);

  // ENEMY STATE
  const [maxEnemyHp, setMaxEnemyHp] = useState(100);
  const [currentEnemyHp, SetCurrentEnemyHp] = useState(100);
  const [enemyDiceQty, setEnemyDiceQty] = useState(1);
  const [enemyDiceRoll, setEnemyDiceRoll] = useState(0);
  const [enemyDice, setEnemyDice] = useState([
    {name: 'diceOne', roll: 1, threshold: 1},
    {name: 'diceTwo', roll: 0, threshold: 2},
    {name: 'diceThree', roll: 0, threshold: 3},
    {name: 'diceFour', roll: 0, threshold: 4},
    {name: 'diceFice', roll: 0, threshold: 5}
  ]);

  // GENERIC STATE
  const [warningText, setWarningText] = useState('');

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
    if (playerDiceRoll === 20) {
      const damage = (playerDiceRoll + playerAttack) * 2 - enemyDiceRoll
      setDamageDone(damage);
    }
    if (playerDiceRoll < 20) {
      const damage = (playerDiceRoll + playerAttack) - enemyDiceRoll
      setDamageDone(damage);
    }
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
    if (dTwenyManual > 20) {
      setWarningText(`Are you sure you rolled a ${dTwenyManual} on a 20 sided die?`)
      setTimeout(() => {
        setWarningText('');
        setPlayerDiceRoll(0);
        setDTwentyManual(0);
        setEnemyDiceRoll(0);
        setEnemyDice([
          {name: 'diceOne', roll: 0, threshold: 1},
          {name: 'diceTwo', roll: 0, threshold: 2},
          {name: 'diceThree', roll: 0, threshold: 3},
          {name: 'diceFour', roll: 0, threshold: 4},
          {name: 'diceFice', roll: 0, threshold: 5}
        ])
      }, 2000)
    } else {
      if (dTwenyManual > 0) {
        const roll = Number(dTwenyManual);
        setDTwentyManual(0);
        setPlayerDiceRoll(roll);
      } else {
        rollPlayerDie();
      }
      rollEnemyDice(10);
    }
  }

  return (
    <div className='DiceContainerWrapper'>
      <div className='lifeBarContainer'>
        <div className='playerHealth'>
          <LifeBarPlayer width={44 * 4} current={33} max={100} />
          <p>{`Player HP: ${currentHp} / ${maxHp}`}</p>
        </div>
        <div className='enemyHealth'>
          <LifeBarEnemy width={44 * 4} current={88} max={100} />
          <p>{`Enemy HP: ${currentEnemyHp} / ${maxEnemyHp}`}</p>
        </div>
      </div>
      <div className='DiceMainContainer'>
        <div className='playerSide'>
          <div className='diceSide'>
            <DTwenty roll={playerDiceRoll} size={3.0} fontSize={1.4} fontTop={39} />
            <input className='diceInput' value={dTwenyManual} type='number' onChange={(e) => setDTwentyManual(e.target.value)} />
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
        {warningText && <div className='warning'>{warningText}</div>}
        {playerDiceRoll === 20 && !warningText && <h4>Critical Hit! Player Total Damage: {(playerAttack + playerDiceRoll) * 2}</h4>}
        {playerDiceRoll < 20 && !warningText && <h4>Player Total Damage: {playerDiceRoll > 0 ? playerAttack + playerDiceRoll : 0}</h4>}
        {!warningText && (
          <>
            <h4>Enemy Defense: {enemyDiceRoll}</h4>
            {enemyDiceRoll > 0 && (
              <h4>Damage Done: {damageDone > 0 && playerDiceRoll > 0 ? damageDone : 'The enemy blocked the attack!'}</h4>
            )}
          </>
        )}
        <button className='rollButton' type='button' onClick={handleRoll}>Roll!</button>
      </div>
    </div>
  )
}

export default DiceContainer;
