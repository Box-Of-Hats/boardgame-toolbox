import React, { Component } from "react";
import "./style/spinner.scss";

interface ISpinnerState {
    rotation: number;
    rotationDuration: number;
}

interface ISpinnerProps {
    title?: string;
}

export default class Spinner extends Component<ISpinnerProps, ISpinnerState> {
    constructor(props: ISpinnerProps) {
        super(props);
        this.state = {
            rotation: -10,
            rotationDuration: 2
        };
    }

    getRandomNumber = (minimum: number, maximum: number): number => {
        return Math.random() * (maximum - minimum) + minimum;
    };

    spin = (minRotation: number, maxRotation: number, duration: number) => {
        let rotationAmount = this.getRandomNumber(minRotation, maxRotation);
        let windupDuration = 800;
        let windupRotation = -40;
        let anticipationDuration = 250;
        let pauseDuration = 100;
        this.setState({
            rotationDuration: (windupDuration - pauseDuration) / 1000,
            rotation: 0
        });
        setTimeout(() => {
            this.setState({
                rotationDuration: 250 / 1000,
                rotation: windupRotation
            });
        }, windupDuration);
        setTimeout(() => {
            this.setState({
                rotationDuration: duration,
                rotation: rotationAmount
            });
        }, windupDuration + anticipationDuration);
    };

    render() {
        return (
            <div className="spinner">
                <div className="spinner__title">
                    {this.props.title ? this.props.title : "Spinner"}
                </div>
                <div
                    className="spinner__body"
                    onClick={() => {
                        this.spin(720, 1440, 4);
                    }}
                >
                    <div
                        className="spinner__arrow"
                        style={{
                            transform: `rotate(${this.state.rotation}deg)`,
                            transition: `${this.state.rotationDuration}s`
                        }}
                    >
                        <div className="spinner__tip">^</div>
                    </div>
                </div>
                <div
                    className="spinner__button"
                    onClick={() => {
                        this.spin(720, 1440, 4);
                    }}
                >
                    Spin
                </div>
            </div>
        );
    }
}
