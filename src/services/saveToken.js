const TOKEN = 'token';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

// if (!JSON.parse(localStorage.getItem(TOKEN))) {
//   localStorage.setItem(TOKEN, JSON.stringify([]));
// }
const readToken = () => JSON.parse(localStorage.getItem(TOKEN));

const saveToken = (token) => localStorage
  .setItem(TOKEN, token);

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

const simulateRequest = (resp) => (callback) => {
  setTimeout(() => {
    callback(resp);
  }, TIMEOUT);
};

export const getToken = () => new Promise((resolve) => {
  const token = readToken();
  simulateRequest(token)(resolve);
});

export const addToken = (token) => new Promise((resolve) => {
  // if (token) {
  // const favoriteToken = readToken();
  saveToken(token);
  // }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeToken = (token) => new Promise((resolve) => {
  const favoriteToken = readToken();
  saveToken(favoriteToken.filter((s) => s.trackId !== token.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
