import React, { useState } from 'react';
import DiceContainerMobile from './DiceContainerMobile';
import Treasure from './Treasure';
import BossTreasure from './BossTreasure';
import '../styles/MainScreen.scss';

function MainScreen() {
  const [isShowing, setIsShowing] = useState('treasure');

  return (
    <div className='MainScreenContainer'>
      {isShowing === 'dice' && <DiceContainerMobile />}
      {isShowing === 'treasure' && <Treasure />}
    </div>
  )
}

export default MainScreen;
