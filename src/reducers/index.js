import { combineReducers } from 'redux';
import questions from './questions';
import testState from './testState';

const rootReducer = combineReducers({
  questions,
  testState,
});

export default rootReducer;
