import React, { useState } from 'react';
import DiceContainer from './DiceContainer';
import DiceContainerMobile from './DiceContainerMobile';
import '../styles/MainScreen.scss';

function MainScreen() {
  const [isMobile, setIsMobile] = useState(true);
  return (
    <div className='MainScreenContainer'>
      {isMobile ? (
        <DiceContainerMobile />
      ) : (
        <DiceContainer />
      )}
    </div>
  )
}

export default MainScreen;
