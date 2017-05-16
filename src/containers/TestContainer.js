import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TimerIcon from 'material-ui/svg-icons/image/timer';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/questions';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {isTestStart: false};
    this.willSpendTime = this.willSpendTime.bind(this);
    this.toggleTest = this.toggleTest.bind(this);
  }
  componentDidMount() {
    const {fetchQuestions} = this.props;
    fetchQuestions();
  }
  willSpendTime() {
    const {numOfQuestions, questionOptions: {timer: {minutes, seconds}}} = this.props;
    const timeSumInSeconds = numOfQuestions * (minutes * 60 + seconds);
    const willSpend = ((timeSumInSeconds / 60) + '').split('.');
    const min = willSpend[0];
    const sec = willSpend[1] ?
      (Number.parseFloat(('0.' + willSpend[1])) * 60).toFixed() : '0';
    return min + '.' + ((sec < 10) ? 0 + sec : sec);
  }
  toggleTest() {
    this.setState({...this.state, isTestStart: !this.state.isTestStart});
  }
  render() {
    const {isTestStart} = this.state;
    const {
      questions,
      questionOptions,
      updateTime,
      addSpentTime,
      saveUserAnswer,
      resetTimer,
      resetSpentTime,
      resetQuestions,
      resetUserAnswers,
      nextQuestion
    } = this.props;
    const {index, isFetching} = questionOptions;
    return (
      <div style={style}>
        {!isTestStart &&
          <div>
            <h3 style={style}>
              Total time of the test {this.willSpendTime()} minutes.
            </h3>
            <RaisedButton
              disabled={!(!isFetching && questions.length > 0)}
              label="Start Test"
              labelPosition="before"
              primary={true}
              icon={<TimerIcon />}
              onTouchTap={this.toggleTest}
            />
          </div>}
        {isTestStart && questions.length > 0 &&
          <Question
            key={index}
            question={questions[index]}
            questionOptions={questionOptions}
            updateTime={updateTime}
            addSpentTime={addSpentTime}
            saveUserAnswer={saveUserAnswer}
            resetTimer={resetTimer}
            resetSpentTime={resetSpentTime}
            resetQuestions={resetQuestions}
            resetUserAnswers={resetUserAnswers}
            nextQuestion={nextQuestion}
          />}
      </div>
    );
  }
}

Test.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    code: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      answer: PropTypes.string.isRequired,
      isTrue: PropTypes.bool,
    })).isRequired,
  })).isRequired,
  questionOptions: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  addSpentTime: PropTypes.func.isRequired,
  saveUserAnswer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  resetSpentTime: PropTypes.func.isRequired,
  resetQuestions: PropTypes.func.isRequired,
  resetUserAnswers: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

Test.defaultProps = {
  numOfQuestions: 5,
};

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions,
  questionOptions: state.questionOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

export default withRouter(TestContainer);
