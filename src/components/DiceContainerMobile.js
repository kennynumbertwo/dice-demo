import React, { useEffect, useReducer } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import Sword from './Sword';
import LifeBarPlayer from './LifeBarPlayer';
import allDiceReducer from '../reducers/allDice.reducer';
import playerReducer from '../reducers/player.reducer';
import '../styles/DiceContainerMobile.scss';

function DiceContainer() {
  // PLAYER STATE
  const [player, dispatchPlayer] = useReducer(playerReducer, {
    maxHP: 100,
    currentHP: 100,
    attack: 0,
  })
  // DICE STATE
  const [allDice, dispatchAllDice] = useReducer(allDiceReducer, {
    selectedDie: 'D10',
    dTwentiesCount: 1,
    dTensCount: 1,
    dTwentiesRoll: 0,
    dTensRoll: 0,
    dSixRoll: 0,
    enemyDTwentyRoll: 0,
    damage: 0,
    dTwenties: [
      {name: 'diceOne', roll: 0, threshold: 1},
      {name: 'diceTwo', roll: 0, threshold: 2},
    ],
    dTens: [
      {name: 'diceOne', roll: 0, threshold: 1},
      {name: 'diceTwo', roll: 0, threshold: 2},
      {name: 'diceThree', roll: 0, threshold: 3},
      {name: 'diceFour', roll: 0, threshold: 4},
      {name: 'diceFive', roll: 0, threshold: 5}
    ]
  })

  useEffect(() => {
    dispatchAllDice({type: 'RESET_DICE'})
  }, [allDice.dTensCount])

  const rollallDice = () => {
    let newDTwenties = [...allDice.dTwenties]
    allDice.dTwenties.forEach((die, index) => {
      if (die.threshold <= allDice.dTwentiesCount) {
        let roll = Math.floor(Math.random() * 20 + 1);
        newDTwenties[index].roll = roll;
      }
    })
    let newDTens = [...allDice.dTens]
    allDice.dTens.forEach((die, index) => {
      if (die.threshold <= allDice.dTensCount) {
        let roll = Math.floor(Math.random() * 10 + 1);
        newDTens[index].roll = roll;
      }
    })
    const newTotalDTwentiesRoll = newDTwenties.reduce((totalRoll, die) => {
      return die.roll + totalRoll;
    }, 0)
    const newTotalDTensRoll = newDTens.reduce((totalRoll, die) => {
      return die.roll + totalRoll;
    }, 0)
    let damageTest = newDTwenties[0].roll === 20 ? (
      (newTotalDTwentiesRoll + player.attack - newTotalDTensRoll) * 2
    ) : (
      newTotalDTwentiesRoll + player.attack - newTotalDTensRoll
    )
    dispatchAllDice({
      type: 'ROLL',
      dTens: newDTens,
      dTensRoll: newTotalDTensRoll,
      dTwenties: newDTwenties,
      dTwentiesRoll: newTotalDTwentiesRoll,
      damage: damageTest
    });
  }

  const handleRoll = () => {
    rollallDice();
  }

  const handleEnemyRoll = () => {
    const enemyDTwenty = Math.floor(Math.random() * 20 + 1);
    const dSix = Math.floor(Math.random() * 6 + 1);
    dispatchAllDice({ type: 'ROLL_ENEMY', enemyDTwentyRoll: enemyDTwenty, dSixRoll: dSix })
  }

  return (
    <div className='DiceContainerMobile'>
      <div className='topInfoContainer'>
        <div className='topLeftContainer'>
          <LifeBarPlayer width={44 * 3} current={player.currentHP} max={player.maxHP} />
          <div className='attackContainer'>
            <Sword width={44} />
            <input
              value={player.attack}
              type='number'
              onChange={(e) => dispatchPlayer({ type: 'SET_CURRENT_ATTACK', currentAttack: e.target.value })}
            />
          </div>
        </div>
        <div className='topRightContainer'>
          <div className='dTwentyWrapper'>
            <DTwenty size={0.7} />
            <p>{allDice.dTwentiesCount}x</p>
          </div>
          <div className='dTenWrapper'>
            <DTen size={0.7} />
            <p>{allDice.dTensCount}x</p>
          </div>
        </div>
      </div>
      <div className='middleContainer' />
      <div className='bottomInfoContainer'>
        <div className='diceButtonContainer'>
          <button className='buttonDiceCount' type='button' onClick={() => dispatchAllDice({ type: `DECREMENT_${allDice.selectedDie}`, amount: 1 })}>-</button>
          <button className='buttonDTwentySelect' type='button' onClick={() => dispatchAllDice({ type: 'SET_DIE', selectedDie: 'D20' })}>d20</button>
          <button className='buttonDTenSelect' type='button' onClick={() => dispatchAllDice({ type: 'SET_DIE', selectedDie: 'D10' })}>d10</button>
          <button className='buttonDiceCount' type='button' onClick={() => dispatchAllDice({ type: `INCREMENT_${allDice.selectedDie}`, amount: 1 })}>+</button>
        </div>
        <div className='actionButtonContainer'>
          <button className='buttonAction' type='button'>Take Hit</button>
          <button className='buttonAction' type='button' onClick={handleEnemyRoll}>Enemy Roll</button>
          <button className='buttonAction' type='button' onClick={handleRoll}>Player Roll</button>
        </div>
      </div>
    </div>
  )
}

export default DiceContainer;
