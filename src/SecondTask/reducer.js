import { SET_USER_DATA, SET_GAME_RESULT } from './actions.js';

const initialState = {
  name: null,
  phone: null,
  result: null,
  timeSpent: null
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone
      };
    case SET_GAME_RESULT:
      return {
        ...state,
        result: action.payload.result,
      };
    default:
      return state;
  }
};

export default gameReducer;
