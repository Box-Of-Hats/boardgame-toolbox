import React from 'react';
import './Counter.scss';

export interface ICounterProps {
    title?: string;
    value?: number;
}

export interface ICounterState {
    value: number;
}

export class Counter extends React.Component<ICounterProps, ICounterState> {
    constructor(props: ICounterProps) {
        super(props);
        this.state = {
            value: props.value ? props.value : 0
        };
    }

    modCounter(modifier: number) {
        this.setState((prevState, props) => {
            return { value: prevState.value + modifier };
        });
    }

    render() {
        return (
            <div className='counter'>
                <div className='counter__title'>
                    {this.props.title ? this.props.title : 'Counter'}
                </div>
                <div
                    className='counter__button counter__button--inc'
                    onClick={() => this.modCounter(1)}
                >
                    ++
                </div>
                <div className='counter__value'>{this.state.value}</div>

                <div
                    className='counter__button counter__button--dec'
                    onClick={() => this.modCounter(-1)}
                >
                    --
                </div>
            </div>
        );
    }
}
