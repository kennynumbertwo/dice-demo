function playerReducer(state, action) {
  switch (action.type) {
    case 'SET_MAX_HP':
      if (action.maxHP > 1) {
        return { ...state, currentHP: action.maxHP, maxHP: action.maxHP };
      }
      if (action.maxHP <= 1) {
        return { ...state, currentHP: 1, maxHP: action.maxHP };
      }
      return { ...state, maxHP: action.maxHP };
    case 'SET_CURRENT_HP':
      if (action.currentHP > state.maxHP) {
        return { ...state, currentHP: state.maxHP }
      }
      return { ...state, currentHP: action.currentHP }
    case 'INCREMENT_ATTACK':
      return { ...state, attack: state.attack + action.attack}
    case 'DECREMENT_ATTACK':
      if (state.attack > 0) {
        return { ...state, attack: state.attack - action.attack}
      }
      return state;
    case 'SET_CURRENT_ATTACK':
      return { ...state, attack: action.currentAttack}
    default:
      return state;
  }
}

export default playerReducer;
