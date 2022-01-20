function enemyDiceReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      if (state.count < 5) {
        return { ...state, count: state.count + action.amount };
      } return state;
    case 'DECREMENT':
      if (state.count > 1) {
        return { ...state, count: state.count - action.amount };
      } return state;
    case 'ROLL':
      return { ...state, roll: action.roll, dice: action.dice };
    case 'RESET_DICE':
      return {
        ...state,
        roll: 0,
        dice: [
          {name: 'diceOne', roll: 0, threshold: 1},
          {name: 'diceTwo', roll: 0, threshold: 2},
          {name: 'diceThree', roll: 0, threshold: 3},
          {name: 'diceFour', roll: 0, threshold: 4},
          {name: 'diceFive', roll: 0, threshold: 5}
        ]};
    default:
      return state;
  }
}

export default enemyDiceReducer;
