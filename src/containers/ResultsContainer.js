import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import RePlay from 'material-ui/svg-icons/av/replay';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/questions';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: false};
    this.spendTime = this.spendTime.bind(this);
    this.reStartTest = this.reStartTest.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
  }
  componentWillUnmount() {
    const {resetUserAnswers} = this.props;
    resetUserAnswers();
  }
  spendTime(time) {
    const {testState: {numOfQuestions, timer: {minutes, seconds}}} = this.props;
    let spentTimeInSeconds;
    if(time) {
      spentTimeInSeconds = time;
    } else {
      spentTimeInSeconds = numOfQuestions * (minutes * 60 + seconds);
    }
    const spend = ((spentTimeInSeconds / 60) + '').split('.');
    const min = spend[0];
    const sec = spend[1] ?
      (Number.parseFloat(('0.' + spend[1])) * 60).toFixed() : '0';
    return min + '.' + ((sec < 10) ? 0 + sec : sec);
  }
  reStartTest() {
    const {resetSpentTime, history} = this.props;
    resetSpentTime();
    history.push('/test');
  }
  toggleResults() {
    this.setState({showResults: !this.state.showResults});
  }
  render() {
    const {showResults} = this.state;
    const {testState} = this.props;
    const {spentTime, userAnswers} = testState;
    const numOfCorrAns = userAnswers.reduce((prev, curr) => {
      const correctAnswer = curr.answers.find(answer => answer.isTrue);
      if(correctAnswer.id === curr.userAnswer.id) {
        ++prev;
      }
      return prev;
    }, 0);
    const percentages = numOfCorrAns / userAnswers.length * 100;
    const scaleFive = 5 * percentages / 100;
    const resultsButton = <RaisedButton
      label={!showResults ? 'Show Results' : 'Hide Results'}
      labelPosition="before"
      secondary={true}
      style={{margin: '20px 0px'}}
      icon={!showResults ? <ExpandMore /> : <ExpandLess />}
      onTouchTap={this.toggleResults}/>;
    return (
      <div style={style}>
        <h3>
          You've spent {spentTime} sec. or {this.spendTime(spentTime)} min.<br/>
          You've answered correctly {numOfCorrAns} question(s) from {userAnswers.length}!<br/>
          {percentages.toFixed(2)}% or {scaleFive.toFixed(2)} - 5:)
        </h3>
        <RaisedButton
          label="Restart Test"
          labelPosition="before"
          primary={true}
          icon={<RePlay />}
          onTouchTap={this.reStartTest}
        /><br/>
        {resultsButton}
        {showResults && userAnswers.length > 0 && userAnswers.map(question => (
          <Question
            key={question.id}
            question={question}
            testState={testState}
          />
        ))}
        {showResults && userAnswers.length > 0 && resultsButton}
      </div>
    )
  }
}

Results.propTypes = {
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
  testState: PropTypes.shape({
    numOfQuestions: PropTypes.number.isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
    userAnswers: PropTypes.array.isRequired,
    spentTime: PropTypes.number.isRequired,
  }).isRequired,
  resetSpentTime: PropTypes.func.isRequired,
  resetUserAnswers: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions,
  testState: state.testState,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);

export default withRouter(ResultsContainer);
