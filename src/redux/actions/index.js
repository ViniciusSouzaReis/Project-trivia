export const USER_LOGIN = 'USER_LOGIN';

export const userLoginAction = (email, user, hash) => ({
  type: USER_LOGIN,
  email,
  user,
  hash,
});
