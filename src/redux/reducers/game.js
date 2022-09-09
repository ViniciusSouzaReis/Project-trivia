import { TRIVIA_GAME } from '../actions';

const INITIAL_STATE = {
  trivia: {},
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TRIVIA_GAME:
    return {
      ...state,
      trivia: action.payload,
    };
  default:
    return state;
  }
}
export default game;
