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
    <div className='DiceContainerMobile'>
      <div className='topInfoContainer'>
        <div className='topLeftContainer'>
          <LifeBarPlayer width={44 * 3} current={player.currentHP} max={player.maxHP} />
          <div className='attackContainer'>
            <Sword />
            <p>{player.attack}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiceContainer;
