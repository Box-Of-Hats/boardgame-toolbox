import * as React from 'react';
import './Timer.scss';

interface ITimerProps {
    name: string;
    startTime: number;
    flashColor?: string;
}

interface ITimerState {
    currentTime: number;
    timer: NodeJS.Timeout;
    isPlaying: boolean;
    isFlashing: boolean;
}

class Timer extends React.Component<ITimerProps, ITimerState> {
    constructor(props: ITimerProps) {
        super(props);
        this.state = {
            currentTime: props.startTime,
            timer: null,
            isPlaying: false,
            isFlashing: false
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
                this.setState(prevState => {
                    return {
                        isPlaying: true,
                        isFlashing: true,
                        timer: setInterval(() => {
                            this.setState(prevState => {
                                return {isFlashing: !prevState.isFlashing};
                            });
                        }, 200)
                    };
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
        if (this.state.currentTime <= 0) {
            this.setState({currentTime: this.props.startTime});
        }
        this.setState({isPlaying: false, isFlashing: false});
    }

    resetTimer() {
        clearInterval(this.state.timer);
        this.setState({
            currentTime: this.props.startTime,
            isPlaying: false,
            isFlashing: false
        });
    }

    public render() {
        var style = this.state.isFlashing
            ? {backgroundColor: this.props.flashColor}
            : {};
        return (
            <>
                <div className='timer' style={style}>
                    <div className='timer__title'>
                        {this.props.name ? this.props.name : 'Timer'}
                    </div>
                    <div className='timer__group'>
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
                    <div className='timer__clock'>
                        {this.state.currentTime.toFixed(1)}
                    </div>
                </div>
            </>
        );
    }
}

export default Timer;
