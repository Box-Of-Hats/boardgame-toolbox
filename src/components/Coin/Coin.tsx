import * as React from 'react';
import './Coin.scss';

interface ICoinProps {
    name: string;
    icons?: string[];
}
interface ICoinState {
    isAnimating: boolean;
    value: string;
}

class Coin extends React.Component<ICoinProps, ICoinState> {
    constructor(props: ICoinProps) {
        super(props);
        this.state = {
            isAnimating: false,
            value: this.getRandomValue()
        };
    }
    getRandomValue() {
        var choices = this.props.icons
            ? this.props.icons
            : ['face', 'euro_symbol'];

        return choices[Math.floor(Math.random() * choices.length)];
    }

    randomiseState = (maximum?: number): void => {
        this.setState({isAnimating: true});
        setTimeout(() => {
            this.setState({isAnimating: false});
            this.setState({
                value: this.getRandomValue()
            });
        }, 550);
    };

    public render() {
        return (
            <div className='coin-tool'>
                <div className='coin-tool__title'>
                    {this.props.name ? this.props.name : 'Coin'}
                </div>
                <div className='coin-tool__container'>
                    <div
                        className={`coin-tool__coin ${
                            this.state.isAnimating
                                ? 'coin-tool__coin--flip'
                                : ''
                        }`}
                        onClick={() => this.randomiseState(1)}>
                        {this.state.isAnimating ? (
                            ''
                        ) : (
                            <i className='material-icons'>{this.state.value}</i>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Coin;
