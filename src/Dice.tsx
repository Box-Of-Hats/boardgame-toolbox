import React, { Component } from "react";
import { Interface } from "readline";

interface IDiceState {
    currentRoll: number;
}

interface IDiceProps {
    currentRoll: number;
}

export default class Dice extends Component<IDiceProps, IDiceState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentRoll: props.currentRoll ? props.currentRoll : 8
        };
    }

    render() {
        return <div>You rolled: {this.state.currentRoll}</div>;
    }
}
