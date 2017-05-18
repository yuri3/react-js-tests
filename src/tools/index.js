export const getTime = (timer, numOfQuestions) => {
  const spend = numOfQuestions ? numOfQuestions * (timer / 60) + '' : (timer / 60) + '';
  if(spend[1] !== '.') {return spend + ' : 00';}
  const min = spend[0];
  const sec = spend[1] ?
    (Number.parseFloat(('0' + spend.slice(1))) * 60).toFixed() : 0;
  return min + ' : ' + (sec < 10 ? '0' + sec : sec);
};
