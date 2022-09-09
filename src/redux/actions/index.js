export const USER_LOGIN = 'USER_LOGIN';
export const TRIVIA_GAME = 'TRIVIA_GAME';

export const userLoginAction = (email, user, hash) => ({
  type: USER_LOGIN,
  email,
  user,
  hash,
});

export const triviaGame = (payload) => ({
  type: TRIVIA_GAME,
  payload,
});

export function getGameInfo(token) {
  return async (dispatch) => {
    try {
      const TRIVIA_API = `https://opentdb.com/api.php?amount=5&token=${token}`;

      const request = await fetch(TRIVIA_API);
      const response = await request.json();
      dispatch(triviaGame(response));
    } catch (error) {
      console.log(error);
    }
  };
}
