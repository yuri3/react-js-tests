import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import { getTime } from '../tools';

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
    const {time} = this.props;
    this.state = {completed: 100, maxTime: time};
  }
  componentWillReceiveProps(nextProps) {
    const {completed, maxTime} = this.state;
    const {time} = nextProps;
    const progress = (completed - (completed - (time / maxTime * 100)));
    this.setState({completed: progress})
  }
  render() {
    const {completed} = this.state;
    const {time} = this.props;
    return (
      <div style={root}>
        <div style={progressStyle}>
          <CircularProgress
            mode="determinate"
            value={completed}
            size={150}
            color={time < 10 ? 'red' : null}
            innerStyle={{border: '1px solid #00BCD4', borderRadius: '50%'}}
          />
            <div style={timeStyle}>
              {getTime(time)}
            </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number,
};

export default Timer;
