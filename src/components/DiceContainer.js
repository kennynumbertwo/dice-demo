import React, { useState, useEffect, useReducer } from 'react';
import DTwenty from './DTwenty';
import DTen from './DTen';
import Sword from './Sword';
import LifeBarPlayer from './LifeBarPlayer';
import allDiceReducer from '../reducers/allDice.reducer';
import playerReducer from '../reducers/player.reducer';
import '../styles/DiceContainer.scss';

function DiceContainer() {
  const [isShowingDialog, setIsShowingDialog] = useState(false);
  // PLAYER STATE
  const [player, dispatchPlayer] = useReducer(playerReducer, {
    maxHP: 100,
    currentHP: 100,
    attack: 0,
  })

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

  useEffect(() => {
    dispatchAllDice({type: 'RESET_DICE'})
  }, [allDice.count])

  const rollallDice = (sides) => {
    let playerRoll = dTwentyManual > 0 ? dTwentyManual : Math.floor(Math.random() * 20 + 1);
    let newDice = [...allDice.dice]
    allDice.dice.forEach((die, index) => {
      if (die.threshold <= allDice.count) {
        let roll = Math.floor(Math.random() * sides + 1);
        newDice[index].roll = roll;
      }
    })
    const newTotalRoll = newDice.reduce((totalRoll, die) => {
      return die.roll + totalRoll;
    }, 0)
    let damageTest = playerRoll === 20 ? (
      (playerRoll + player.attack - newTotalRoll) * 2
    ) : (
      playerRoll + player.attack - newTotalRoll
    )
    setDTwentyManual(0);
    dispatchAllDice({
      type: 'ROLL',
      roll: newTotalRoll,
      dice: newDice,
      dTwenty: playerRoll,
      damage: damageTest
    });
  }

  const handleRoll = () => {
    setIsShowingDialog(true);
    setTimeout(() => {
      setIsShowingDialog(false);
    }, 4000)
    rollallDice(10);
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
      <div className='DiceMainContainer'>
        <div className='playerSide'>
          <div className='diceSide'>
            <DTwenty roll={allDice.dTwenty} size={3.0} fontSize={1.4} fontTop={39} />
            <input className='diceInput' value={dTwentyManual} type='number' onChange={(e) => handleSetDTwentyManual(e)} />
          </div>
        </div>
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
      <div className='menuWrapper'>
        {isShowingDialog && (
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
          </div>
        )}
        <div className='statsContainer'>
          <div className='playerHealth'>
            <div className='playerHp'>
              <p className='hpHeader'>Player HP:</p>
              <LifeBarPlayer width={44 * 5} current={player.currentHP} max={player.maxHP} />
              <div className='hpInputs'>
                <input className='hpInput' value={player.currentHP} type='number' onChange={(e) => dispatchPlayer({ type: 'SET_CURRENT_HP', currentHP: e.target.value })} />
                <p className='slash'>/</p>
                <input className='hpInput' value={player.maxHP} type='number' onChange={(e) => dispatchPlayer({ type: 'SET_MAX_HP', maxHP: e.target.value })} />
              </div>
            </div>
          </div>
          <div className='attackContainer'>
            <div className='swordContainer'>
              <div>
                <p>Attack Power:</p>
                <p className='attackPower'>{player.attack}</p>
              </div>
              {/* <Sword width={44 * 2} /> */}
            </div>
            <div className='playerButtons'>
              <button className='attackButton' type='button' onClick={() => dispatchPlayer({ type: 'DECREMENT_ATTACK', attack: 1 })}>-</button>
              <button className='attackButton' type='button' onClick={() => dispatchPlayer({ type: 'INCREMENT_ATTACK', attack: 1 })}>+</button>
            </div>
          </div>
          <div className='rollContainer'>
            <button className='rollButton' type='button' onClick={handleRoll}>Roll!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiceContainer;
