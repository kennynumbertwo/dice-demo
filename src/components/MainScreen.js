import React from 'react';
import Button from './Button'
import DiceContainer from './DiceContainer';
import '../styles/MainScreen.scss';

function MainScreen() {
  return (
    <div className='MainScreenContainer'>
      <DiceContainer />
    </div>
  )
}

export default MainScreen;
