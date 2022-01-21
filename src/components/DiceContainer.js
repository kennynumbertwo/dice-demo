import React, { useState, useEffect, useReducer } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import Sword from './Sword';
import LifeBarPlayer from './LifeBarPlayer';
import LifeBarEnemy from './LifeBarEnemy';
import allDiceReducer from '../reducers/allDice.reducer';
import playerReducer from '../reducers/player.reducer';
import '../styles/DiceContainer.scss';

function DiceContainer() {
  // PLAYER STATE
  const [player, dispatchPlayer] = useReducer(playerReducer, {
    maxHP: 100,
    currentHP: 100,
    attack: 0,
  })
  const [damageDone, setDamageDone] = useState(0);

  // DICE STATE
  const [dTwentyManual, setDTwentyManual] = useState(0);
  const [allDice, dispatchAllDice] = useReducer(allDiceReducer, {
    count: 1,
    roll: 0,
    dice: [
      {name: 'diceOne', roll: 0, threshold: 1},
      {name: 'diceTwo', roll: 0, threshold: 2},
      {name: 'diceThree', roll: 0, threshold: 3},
      {name: 'diceFour', roll: 0, threshold: 4},
      {name: 'diceFive', roll: 0, threshold: 5}
    ],
    dTwenty: 0,
    damage: 0
  })
  const [maxEnemyHp, setMaxEnemyHp] = useState(100);
  const [currentEnemyHp, setCurrentEnemyHp] = useState(100);

  useEffect(() => {
    dispatchAllDice({type: 'RESET_DICE'})
  }, [allDice.count])

  const rollallDice = (sides) => {
    let newDice = [...allDice.dice]
    let playerRoll = dTwentyManual > 0 ? dTwentyManual : Math.floor(Math.random() * 20 + 1);
    allDice.dice.forEach((die, index) => {
      if (die.threshold <= allDice.count) {
        let roll = Math.floor(Math.random() * sides + 1);
        newDice[index].roll = roll;
      }
    })
    const newTotalRoll = newDice.reduce((totalRoll, die) => {
      return die.roll + totalRoll;
    }, 0)
    setDTwentyManual(0);
    let damageTest = playerRoll === 20 ? (
      (playerRoll + player.attack - newTotalRoll) * 2
    ) : (
      (playerRoll + player.attack - newTotalRoll)
    )
    console.log(damageTest);
    dispatchAllDice({
      type: 'ROLL',
      roll: newTotalRoll,
      dice: newDice,
      dTwenty: playerRoll,
      damage: damageTest
    });
  }

  const handleRoll = () => {
    rollallDice(10);
  }

  const handleReset = () => {
    setMaxEnemyHp(100);
    setCurrentEnemyHp(100);
    setDTwentyManual(0);
    dispatchAllDice({type: 'RESET_DICE'})
  }

  const handleSetMaxEnemyHp = (e) => {
    if (e.target.value > 1) {
      setCurrentEnemyHp(e.target.value);
      setMaxEnemyHp(e.target.value);
    }
    if (e.target.value <= 1) {
      setCurrentEnemyHp(1)
    }
    setMaxEnemyHp(e.target.value);
  }

  const handleSetDTwentyManual = (e) => {
    if (e.target.value > 20) {
      return setDTwentyManual(20);
    }
    if (e.target.value <= 0) {
      return setDTwentyManual(0);
    }
    return setDTwentyManual(Number(e.target.value))
  }

  return (
    <div className='DiceContainerWrapper'>
      <div className='lifeBarContainer'>
        <div className='playerHealth'>
          <LifeBarPlayer width={44 * 4} current={player.currentHP} max={player.maxHP} />
          <div className='playerHp'>
            <p>Player HP:</p>
            <input className='hpInput' value={player.currentHP} type='number' onChange={(e) => dispatchPlayer({ type: 'SET_CURRENT_HP', currentHP: e.target.value })} />
            <p className='slash'>/</p>
            <input className='hpInput' value={player.maxHP} type='number' onChange={(e) => dispatchPlayer({ type: 'SET_MAX_HP', maxHP: e.target.value })} />
          </div>
        </div>
        <div className='enemyHealth'>
          <LifeBarEnemy width={44 * 4} current={currentEnemyHp} max={maxEnemyHp} />
          <div className='enemyHp'>
            {currentEnemyHp > 0 ? (
              <>
                <p>Enemy HP:</p>
                <input className='hpInput' value={currentEnemyHp} type='number' onChange={(e) => setCurrentEnemyHp(e.target.value)} />
                <p className='slash'>/</p>
                <input className='hpInput' value={maxEnemyHp} type='number' onChange={(e) => handleSetMaxEnemyHp(e)} />
              </>
            ) : (
              <>
                <p>Enemy Defeated!</p>
                <button className='resetButton' type='button' onClick={handleReset}>Reset</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='DiceMainContainer'>
        <div className='playerSide'>
          <div className='diceSide'>
            <DTwenty roll={allDice.dTwenty} size={3.0} fontSize={1.4} fontTop={39} />
            <input className='diceInput' value={dTwentyManual} type='number' onChange={(e) => handleSetDTwentyManual(e)} />
          </div>
          <h1>+</h1>
          <div className='swordSide'>
            <div className='swordContainer'>
              <Sword />
              <h4>Attack Power: {player.attack}</h4>
            </div>
            <div className='playerButtons'>
              <button className='selectButton' type='button' onClick={() => dispatchPlayer({ type: 'DECREMENT_ATTACK', attack: 1 })}>-</button>
              <button className='selectButton' type='button' onClick={() => dispatchPlayer({ type: 'INCREMENT_ATTACK', attack: 1 })}>+</button>
            </div>
          </div>
        </div>
        <h1>-</h1>
        <div className='enemySide'>
          <div className='enemyWrapper'>
            <div className='enemyDiceContainer'>
              {allDice.dice.map(die => {
                if (die.threshold <= allDice.count) {
                  return <DTen key={die.name} roll={die.roll} size={2} fontSize={1.2} fontTop={25} />
                }
                return null;
              })}
            </div>
            <div className='enemyButtons'>
              <button className='selectButton' type='button' onClick={() => dispatchAllDice({ type: 'DECREMENT', amount: 1 })}>-</button>
              <button className='selectButton' type='button' onClick={() => dispatchAllDice({ type: 'INCREMENT', amount: 1 })}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className='bottomMenu'>
        {allDice.dTwenty === 20 && <h4>Critical Hit! Player Total Attack: {player.attack + allDice.dTwenty}</h4>}
        {allDice.dTwenty < 20 && <h4>Player Total Attack: {allDice.dTwenty > 0 ? player.attack + allDice.dTwenty : 0}</h4>}
        <h4>Enemy Defense: {allDice.roll}</h4>
        {allDice.roll > 0 && allDice.damage > 0 && (
          <h4>{ allDice.dTwenty === 20 ? 'Critical Damage Done' : 'Damage Done'}: {allDice.damage > 0 && allDice.dTwenty > 0 && allDice.damage}</h4>
        )}
        {allDice.roll > 0 && allDice.damage <= 0 && (
          <h4>The enemy blocked the attack!</h4>
        )}
        <button className='rollButton' type='button' onClick={handleRoll}>Roll!</button>
      </div>
    </div>
  )
}

export default DiceContainer;
