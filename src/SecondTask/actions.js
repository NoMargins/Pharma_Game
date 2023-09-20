export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_GAME_RESULT = 'SET_GAME_RESULT';

export const setUserData = (name, phone) => ({
  type: SET_USER_DATA,
  payload: {
    name,
    phone
  }
});

export const setGameResult = (result) => ({
  type: SET_GAME_RESULT,
  payload: {
    result
  }
});
