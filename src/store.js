import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './SecondTask/reducer';

const rootReducer = combineReducers({
  quiz: gameReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;