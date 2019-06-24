import * as React from 'react';
import './Timer.scss';

interface ITimerProps {
    name: string;
    startTime: number;
}

interface ITimerState {
    currentTime: number;
    timer: NodeJS.Timeout;
    isPlaying: boolean;
}

class Timer extends React.Component<ITimerProps, ITimerState> {
    constructor(props: ITimerProps) {
        super(props);
        this.state = {
            currentTime: props.startTime,
            timer: null,
            isPlaying: false
        };
        this.startTimer = this.startTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    startTimer() {
        clearTimeout(this.state.timer);

        var interval = setInterval(() => {
            this.setState(prevState => {
                return {currentTime: Math.max(0, prevState.currentTime - 0.1)};
            });
            if (this.state.currentTime <= 0) {
                clearInterval(this.state.timer);
                this.setState({
                    isPlaying: true,
                    timer: setInterval(() => {}, 100)
                });
            }
        }, 100);
        this.setState({
            timer: interval,
            isPlaying: true
        });
    }
    stopTimer() {
        clearTimeout(this.state.timer);
        this.setState({isPlaying: false});
    }

    resetTimer() {
        clearInterval(this.state.timer);
        this.setState({
            currentTime: this.props.startTime,
            isPlaying: false
        });
    }

    public render() {
        return (
            <>
                <div className='timer'>
                    <div className='timer__title'>
                        {this.props.name ? this.props.name : 'Timer'}
                    </div>
                    <div className='timer__clock' onClick={this.startTimer}>
                        Time left: {this.state.currentTime.toFixed(1)}
                    </div>
                    <div
                        className='timer__button timer__button--red'
                        onClick={this.resetTimer}>
                        <i className='material-icons'>restore</i>
                    </div>
                    {!this.state.isPlaying && (
                        <div
                            className='timer__button timer__button--green'
                            onClick={this.startTimer}>
                            <i className='material-icons'>play_arrow</i>
                        </div>
                    )}
                    {this.state.isPlaying && (
                        <div
                            className='timer__button timer__button--green'
                            onClick={this.stopTimer}>
                            <i className='material-icons'>pause</i>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Timer;
