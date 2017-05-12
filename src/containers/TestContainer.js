import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Timer from 'material-ui/svg-icons/image/timer';

const style = {
  textAlign: 'center',
};

const NUM_OF_QUESTIONS = 10;
const TIMER = {
  minutes: '1',
  seconds: '0',
};

class TestContainer extends Component {
  constructor(props) {
    super(props);
    this.toInt = this.toInt.bind(this);
    this.willSpendTime = this.willSpendTime.bind(this);
  }
  toInt(value) {
    return Number.parseInt(value, 10);
  }
  willSpendTime() {
    const timeSumInSeconds = NUM_OF_QUESTIONS * (
      this.toInt(TIMER.minutes) * 60 + this.toInt(TIMER.seconds));
    const willSpend = ((timeSumInSeconds / 60) + '').split('.');
    const minutes = willSpend[0];
    const seconds = willSpend[1] ?
      (Number.parseFloat(('0.' + willSpend[1])) * 60).toFixed() : '0';
    return minutes + '.' + ((seconds < 10) ? 0 + seconds : seconds);
  }
  render() {
    return (
      <div style={style}>
        <header style={style}>
          <h3>Total time of the test {this.willSpendTime()} minutes.</h3>
        </header>
        <RaisedButton
          label="Start Test"
          labelPosition="before"
          primary={true}
          icon={<Timer />}
        />
      </div>
    );
  }
}

export default TestContainer;
