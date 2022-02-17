import React from 'react';
import bossTreasureList from '../lists/bossTreasureList';

const stats = ['dodge', 'block', 'body', 'skill', 'mind', 'will', 'luck'];

export default function BossTreasure() {
  const getRandomItem = () => {
    const bossTreasureRoll = getDOneHundred();
    return bossTreasureList[`bossTreasure${bossTreasureRoll}`];
  }

  const getDOneHundred = () => {
    return Math.floor(Math.random() * 100 + 1)
  }

  const getRandomStat = () => {
    const index = Math.floor(Math.random() * stats.length);
    return stats[index];
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
    let effects = []
    for (let i = 0; i < numEffect; i++) {
      const stat = getRandomStat();
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
    const item = getRandomItem();
    if (item.isEnchanted) {
      const enchantment = getEnchantment()
      item.enchantment = enchantment;
    }
    return item;
  }

  console.log(getBossTreasure());

  return (
    <div>
      treasure
    </div>
  )
}
