export const spendTime = ({numOfQuestions, timer: {minutes, seconds}}, time) => {
  const timeInSeconds = time || (numOfQuestions * (minutes * 60 + seconds));
  const spend = ((timeInSeconds / 60) + '').split('.');
  const min = spend[0];
  const sec = spend[1] ?
    (Number.parseFloat(('0.' + spend[1])) * 60).toFixed() : '0';
  return min + '.' + ((sec < 10) ? 0 + sec : sec);
};
