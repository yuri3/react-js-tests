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
import { spendTime } from '../tools';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: false};
    this.reStartTest = this.reStartTest.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
  }
  componentWillUnmount() {
    const {resetQuestions, resetSpentTime, resetUserAnswers} = this.props;
    resetQuestions();
    resetSpentTime();
    resetUserAnswers();
  }
  reStartTest() {
    const {history} = this.props;
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
      return (correctAnswer.id === curr.userAnswer.id) ? prev + 1 : prev;
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
          You've spent {spentTime} sec. or {spendTime(testState, spentTime)} min.<br/>
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
            readonly={true}
            question={question}
          />
        ))}
        {showResults && userAnswers.length > 0 && resultsButton}
      </div>
    )
  }
}

Results.propTypes = {
  testState: PropTypes.shape({
    numOfQuestions: PropTypes.number.isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
    userAnswers: PropTypes.array.isRequired,
    spentTime: PropTypes.number.isRequired,
  }).isRequired,
  resetQuestions: PropTypes.func.isRequired,
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
