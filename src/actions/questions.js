import {CALL_API} from '../middleware/api';
//---FETCH_QUESTIONS------------------------------------------------------------->
export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';

const fetch = () => ({
  [CALL_API]: {
    types: [FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE],
    endpoint: 'questions',
  }
});

export const fetchQuestions = () => dispatch => {
  dispatch(fetch());
};
