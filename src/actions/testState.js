//---UPDATE_TIME----------------------------------------------------------------->
export const UPDATE_TIMER = 'UPDATE_TIMER';

export const updateTimer = (timer) => ({
  type: UPDATE_TIMER,
  timer,
});
//---ADD_SPENT_TIME-------------------------------------------------------------->
export const ADD_SPENT_TIME = 'ADD_SPENT_TIME';

export const addSpentTime = (time) => ({
  type: ADD_SPENT_TIME,
  spentTime: time,
});
//---SAVE_USER_ANSWER------------------------------------------------------------>
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER';

export const saveUserAnswer = (checkedValue) => ({
  type: SAVE_USER_ANSWER,
  checkedValue,
});
//---NEXT_QUESTION--------------------------------------------------------------->
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const nextQuestion = (index) => ({
  type: NEXT_QUESTION,
  index,
});
//---RESET_TIMER----------------------------------------------------------------->
export const RESET_TIMER = 'RESET_TIMER';

export const resetTimer = () => ({
  type: RESET_TIMER,
});
//---RESET_SPENT_TIME------------------------------------------------------------>
export const RESET_SPENT_TIME = 'RESET_SPENT_TIME';

export const resetSpentTime = () => ({
  type: RESET_SPENT_TIME,
});
//---RESET_QUESTIONS------------------------------------------------------------->
export const RESET_QUESTIONS = 'RESET_QUESTIONS';

export const resetQuestions = () => ({
  type: RESET_QUESTIONS,
});
//---RESET_USER_ANSWERS---------------------------------------------------------->
export const RESET_USER_ANSWERS = 'RESET_USER_ANSWERS';

export const resetUserAnswers = () => ({
  type: RESET_USER_ANSWERS,
});
