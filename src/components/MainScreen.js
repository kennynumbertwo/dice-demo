import React, { useState } from 'react';
import DiceContainerMobile from './DiceContainerMobile';
import Treasure from './Treasure';
import BossTreasure from './BossTreasure';
import '../styles/MainScreen.scss';

function MainScreen() {
  const [isShowing, setIsShowing] = useState('dice');

  return (
    <div className='MainScreenContainer'>
      {isShowing === 'dice' && <DiceContainerMobile setIsShowing={setIsShowing} />}
      {isShowing === 'treasure' && <Treasure setIsShowing={setIsShowing} />}
    </div>
  )
}

export default MainScreen;
