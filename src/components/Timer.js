import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

const root = {
  textAlign: 'center',
};

const progressStyle = {
  transform: 'rotate(-90deg)',
  display: 'inline-block',
  position:'relative',
};

const timeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(90deg)',
  fontSize: '150%',
  fontWeight: 'bold',
};

class Timer extends Component {
  constructor(props) {
    super(props);
    const {minutes, seconds} = this.props;
    this.state = {completed: 100, maxTime: (minutes * 60 + seconds)};
  }
  componentWillReceiveProps(nextProps) {
    const {completed, maxTime} = this.state;
    const {minutes, seconds} = nextProps;
    const progress = (completed - (completed - ((minutes * 60 + seconds) / maxTime * 100)));
    this.setState({completed: progress})
  }
  render() {
    const {completed} = this.state;
    const {minutes, seconds} = this.props;
    const time = minutes + ' : ' + (seconds < 10 ? '0' + seconds : seconds);
    return (
      <div style={root}>
        <div style={progressStyle}>
          <CircularProgress
            mode="determinate"
            value={completed}
            size={150}
            color={seconds < 10 ? 'red' : null}
          />
            <div style={timeStyle}>
              {time}
            </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

export default Timer;
