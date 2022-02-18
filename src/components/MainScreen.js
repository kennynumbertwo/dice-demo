import React, { useState } from 'react';
import DiceContainerMobile from './DiceContainerMobile';
import Treasure from './Treasure';
import BossTreasure from './BossTreasure';
import '../styles/MainScreen.scss';

function MainScreen() {
  const [isShowingTreasure, setIsShowingTreasure] = useState(true);
  const [isShowingBossTreasure, setIsShowingBossTreasure] = useState(false);
  return (
    <div className='MainScreenContainer'>
      <DiceContainerMobile />
      {isShowingTreasure && <Treasure />}
      {isShowingBossTreasure && <BossTreasure /> }
    </div>
  )
}

export default MainScreen;
