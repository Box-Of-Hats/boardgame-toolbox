import React, { Component } from "react";
import "./style/dice.scss";
interface IDiceState {
    currentRoll: number;
    isAnimating: boolean;
}

interface IDiceProps {
    title?: string;
    currentRoll?: number;
    maximumRoll?: number;
}

export default class Dice extends Component<IDiceProps, IDiceState> {
    constructor(props: IDiceProps) {
        super(props);
        this.state = {
            currentRoll: props.currentRoll
                ? props.currentRoll
                : this.getRandomNumber(
                      this.props.maximumRoll ? this.props.maximumRoll : 6
                  ),
            isAnimating: false
        };
    }

    getRandomNumber = (maximum: number): number => {
        return Math.floor(Math.random() * maximum) + 1;
    };

    randomiseRoll = (maximum?: number): void => {
        this.setState({ isAnimating: true });
        setTimeout(() => {
            this.setState({ isAnimating: false });
            this.setState({
                currentRoll: this.getRandomNumber(maximum ? maximum : 6)
            });
        }, 600);
    };

    render() {
        return (
            <div className="dice-tool">
                <div className="dice-tool__title">
                    {this.props.title ? this.props.title : "Dice"}
                </div>
                <div className="dice-tool__dice-container">
                    <div
                        className={`dice-tool__dice ${
                            this.state.isAnimating
                                ? "dice-tool__dice--roll"
                                : ""
                        }`}
                    >
                        {this.state.isAnimating ? "?" : this.state.currentRoll}
                    </div>
                </div>
                <div
                    className="dice-tool__button"
                    onClick={() => this.randomiseRoll(this.props.maximumRoll)}
                >
                    Roll
                </div>
            </div>
        );
    }
}
