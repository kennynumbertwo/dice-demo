import React, { useState } from 'react';
import treasureList from '../lists/treasureList';
import '../styles/Treasure.scss';

export default function Treasure() {
  const [treasure, setTreasure] = useState(null);

  const getTreasure = () => {
    const treasureRoll = Math.floor(Math.random() * 100 + 1);
    return setTreasure(treasureList[`treasure${treasureRoll}`]);
  }

  const getItemHTML = () => {
    if (treasure.quantity > 1) {
      return <p className="itemText">{`You've obtained ${treasure.quantity}x ${treasure.item}!`}</p>
    }
    if (!treasure.modifier.stat && !treasure.isEnchanted) {
      return <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
    }
    if (treasure.isEnchanted) {
      const html = (
        <>
          <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
          <p>Enchantments</p>
        </>
      )
      return html;
    }
    if (treasure.modifier.stat && !treasure.isEnchanted) {
      const html = (
        <>
          <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
          <p>modifiers</p>
        </>
      )
      return html;
    }
  }

  return (
    <div className="TreasureContainer">
      <div className="TreasureBorder">
        {treasure && (
          <div className='itemDetails'>
            {getItemHTML()}
          </div>
        )}
        <button className='TreasureButton' type='button' onClick={getTreasure}>Open Chest</button>
      </div>
    </div>
  )
}
