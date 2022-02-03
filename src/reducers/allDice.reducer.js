function allDiceReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT_D10':
      if (state.dTensCount < 5) {
        return { ...state, dTensCount: state.dTensCount + action.amount };
      } return state;
    case 'DECREMENT_D10':
      if (state.dTensCount > 0) {
        return { ...state, dTensCount: state.dTensCount - action.amount };
      } return state;
    case 'INCREMENT_D20':
      if (state.dTwentiesCount < 2) {
        return { ...state, dTwentiesCount: state.dTwentiesCount + action.amount };
      } return state;
    case 'DECREMENT_D20':
      if (state.dTwentiesCount > 1) {
        return { ...state, dTwentiesCount: state.dTwentiesCount - action.amount };
      } return state;
    case 'ROLL':
      return {
        ...state,
        dTensRoll: action.dTensRoll,
        dTens: action.dTens,
        dTwentiesRoll: action.dTwentiesRoll,
        dTwenties: action.dTwenties,
        damage: action.damage
      };
    case 'ROLL_ENEMY':
      return {
        ...state,
        enemyDTwentyRoll: action.enemyDTwentyRoll,
        dSixRoll: action.dSixRoll
      }
    case 'RESET_DICE':
      return {
        ...state,
        dTensRoll: 0,
        dTens: [
          {name: 'diceOne', roll: 0, threshold: 1},
          {name: 'diceTwo', roll: 0, threshold: 2},
          {name: 'diceThree', roll: 0, threshold: 3},
          {name: 'diceFour', roll: 0, threshold: 4},
          {name: 'diceFive', roll: 0, threshold: 5}
        ],
        dTwentiesRoll: 0,
        dTwenties: [
          {name: 'diceOne', roll: 0, threshold: 1},
          {name: 'diceTwo', roll: 0, threshold: 2},
        ]
      };
    case 'RESET_DICE_ENEMY':
      return {
        ...state,
        enemyDTwentyRoll: 0,
        dSixRoll: 0
      };
    case 'SET_DIE':
      return { ...state, selectedDie: action.selectedDie }
    default:
      return state;
  }
}

export default allDiceReducer;
