import React, { useState } from 'react';
import treasureList from '../lists/treasureList';
import bossTreasureList from '../lists/bossTreasureList';
import '../styles/Treasure.scss';
import TreasureChest from './TreasureChest';

const stats = ['Dodge', 'Block', 'Body', 'Skill', 'Mind', 'Will', 'Luck'];

export default function Treasure({setIsShowing}) {
  const [treasure, setTreasure] = useState(null);

  const getRandomBossItem = () => {
    const bossTreasureRoll = getDOneHundred();
    return bossTreasureList[`bossTreasure${bossTreasureRoll}`];
  }

  const getDOneHundred = () => {
    return Math.floor(Math.random() * 100 + 1)
  }

  const getRandomStat = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    return [arr[index], index]
  }

  const getEnchantment = () => {
    let numEffect;
    const numEffectRoll = getDOneHundred();
    if (numEffectRoll >= 99) {
      numEffect = 4;
    } else if (numEffectRoll >= 95) {
      numEffect = 3
    } else if (numEffectRoll >= 51) {
      numEffect = 2
    } else {
      numEffect = 1
    }
    let statsCopy = [...stats]
    let effects = []
    for (let i = 0; i < numEffect; i++) {
      const [stat, index] = getRandomStat(statsCopy);
      statsCopy.splice(index, 1);
      console.log(statsCopy);
      let modifier;
      const statRoll = getDOneHundred();
      if (statRoll >= 98) {
        modifier = 6;
      } else if (statRoll >= 93) {
        modifier = 5
      } else if (statRoll >= 83) {
        modifier = 4
      } else if (statRoll >= 68) {
        modifier = 3
      } else if (statRoll >= 31) {
        modifier = 2
      } else {
        modifier = 1
      }
      effects.push({ stat, modifier})
    }
    return effects;
  }

  const getBossTreasure = () => {
    const item = getRandomBossItem();
    if (item.isEnchanted) {
      const enchantment = getEnchantment()
      item.enchantment = enchantment;
    }
    return setTreasure(item);
  }

  const getTreasure = () => {
    const treasureRoll = Math.floor(Math.random() * 100 + 1);
    return setTreasure(treasureList[`treasure${treasureRoll}`]);
  }

  const getItemHTML = () => {
    if (treasure.quantity > 1) {
      return <p className="itemText">{`You've obtained ${treasure.quantity}x ${treasure.item}!`}</p>
    }
    if (!treasure.modifier.stat && !treasure.isEnchanted) {
      if (treasure.item === 'Bag of gold') {
        const gold = Math.floor(Math.random() * 20 + 1);
        const html = (
          <div>
            <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
            <p className="itemText">{`${gold} gold added to your purse`}</p>
          </div>
        )
        return html;
      }
      if (treasure.item === 'Big Bag of gold') {
        let gold = 0;
        for (let i = 0; i < 3; i++) {
          gold += Math.floor(Math.random() * 20 + 1);
          console.log(gold);
        }
        const html = (
          <div>
            <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
            <p className="itemText">{`${gold} gold added to your purse`}</p>
          </div>
        )
        return html;
      }
      return <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
    }
    if (treasure.isEnchanted) {
      const enchantments = treasure.enchantment.map(enchantment => {
        return <p key={`enchantment${enchantment.stat}`}>{`${enchantment.stat} +${enchantment.modifier}`}</p>
      })
      const html = (
        <div>
          <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
          <p className="itemText">Enchantments:</p>
          <div className="itemText">{enchantments}</div>
        </div>
      )
      return html;
    }
    if (treasure.modifier.stat && !treasure.isEnchanted) {
      const html = (
        <div>
          <p className="itemText">{`You've obtained a ${treasure.item}!`}</p>
          <p>{`Effect: ${treasure.modifier.stat} +${treasure.modifier.amount}`}</p>
        </div>
      )
      return html;
    }
  }

  return (
    <div className="Treasure">
      <TreasureChest width={64 * 4} />
      <div className="TreasureContainer">
        {treasure && (
          <div className="TreasureBorder">
            <div className='itemDetails'>
              {getItemHTML()}
            </div>
          </div>
        )}
      </div>
      <div className='TreasureButtonContainer'>
        <button className='TreasureButton' type='button' onClick={() => setIsShowing('dice')}>Dice</button>
        <button className='TreasureButton' type='button' onClick={getTreasure}>Open Chest</button>
        <button className='TreasureButton' type='button' onClick={getBossTreasure}>Open Boss Chest</button>
      </div>
    </div>
  )
}
