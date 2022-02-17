import React from 'react';
import treasureList from '../lists/treasureList';

export default function Treasure() {
  const getTreasure = () => {
    const treasureRoll = Math.floor(Math.random() * 100 + 1);
    return treasureList[`treasure${treasureRoll}`];
  }
  const treasure = getTreasure();

  return (
    <div>
      treasure
    </div>
  )
}
