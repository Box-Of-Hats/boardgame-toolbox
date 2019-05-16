import React, { Component } from "react";
import "./style/scoretable.scss";

interface IScoreTableProps {
    title?: string;
    playerNames: string[];
    scoreNames: string[];
}

interface IScoreTableState {
    //scores: any;
}

export default class ScoreTable extends Component<
    IScoreTableProps,
    IScoreTableState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            //scores: {}
        };
        // this.props.playerNames.forEach(name => {
        //     this.state.scores[name] = Array(this.props.scoreNames.length).fill(
        //         0
        //     );
        // });
        // console.log(this.state.scores);
    }

    getTotalForPlayer(playerName: string): number {
        let inputs = document.querySelectorAll<HTMLInputElement>(
            `.scoretable__input--${playerName}`
        );

        console.log(inputs);
        return 0;
    }

    render() {
        return (
            <div className="scoretable">
                <div className="scoretable__title">
                    {this.props.title ? this.props.title : "Scoretable"}
                </div>
                <table className="scoretable__table">
                    <tr>
                        <th />
                        {this.props.playerNames.map(name => (
                            <th>{name}</th>
                        ))}
                    </tr>
                    {this.props.scoreNames.map(scoreName => {
                        return (
                            <tr className="scoretable__row">
                                <td>{scoreName}</td>
                                {this.props.playerNames.map(playerName => (
                                    <td className="scoretable__cell">
                                        <input
                                            className={`scoretable__input scoretable__input--${playerName}`}
                                            type="number"
                                            max={10000}
                                            min={-10000}
                                            size={3}
                                        />
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="scoretable__cell scoretable__cell--sum">
                            Sum
                        </td>
                        {this.props.playerNames.map(playerName => {
                            return (
                                <td>{this.getTotalForPlayer(playerName)}</td>
                            );
                        })}
                    </tr>
                </table>
            </div>
        );
    }
}
