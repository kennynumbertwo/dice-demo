import React from 'react';
import DiceContainerMobile from './DiceContainerMobile';
import Treasure from './Treasure';
import BossTreasure from './BossTreasure';
import '../styles/MainScreen.scss';

function MainScreen() {
  return (
    <div className='MainScreenContainer'>
      {/* <DiceContainerMobile /> */}
      <Treasure />
      <BossTreasure />
    </div>
  )
}

export default MainScreen;
