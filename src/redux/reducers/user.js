import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  hash: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.email,
      user: action.user,
      hash: action.hash,
    };
  default:
    return state;
  }
}
export default user;
