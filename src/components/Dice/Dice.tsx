import React, {Component} from 'react';
import './Dice.scss';
interface IDiceState {
    rollValues: number[];
    isAnimating: boolean;
}

interface IDiceProps {
    name?: string;
    currentRoll?: number;
    maximumRoll: number;
    diceCount: number;
}

export default class Dice extends Component<IDiceProps, IDiceState> {
    constructor(props: IDiceProps) {
        super(props);
        this.state = {
            rollValues: Array(this.props.diceCount).fill(0),
            isAnimating: false
        };
    }

    getRandomNumber = (maximum: number): number => {
        return Math.floor(Math.random() * maximum) + 1;
    };

    randomiseRoll = (maximum?: number): void => {
        this.setState({isAnimating: true});
        setTimeout(() => {
            this.setState({isAnimating: false});
            this.setState({});
        }, 600);
    };

    render() {
        let dice: any = [];
        for (let i = 0; i < this.props.diceCount; i++) {
            this.state.rollValues[i] = this.getRandomNumber(
                this.props.maximumRoll
            );
            dice.push(
                <div
                    className={`dice-tool__dice ${
                        this.state.isAnimating ? 'dice-tool__dice--roll' : ''
                    }`}>
                    {this.state.isAnimating ? '?' : this.state.rollValues[i]}
                </div>
            );
        }
        return (
            <div className='dice-tool'>
                <div className='dice-tool__title'>
                    {this.props.name ? this.props.name : 'Dice'}
                </div>
                <div
                    className='dice-tool__dice-container'
                    onClick={() => this.randomiseRoll(this.props.maximumRoll)}>
                    {dice}
                </div>
            </div>
        );
    }
}
