import { PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_INFO:
    return {
      ...state,
      name: action.name,
      assertions: action.assertions,
      score: action.score,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return state;
  }
}
export default player;
