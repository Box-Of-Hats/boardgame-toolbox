import React, { Component } from "react";
import "../style/scoretable.scss";

interface IScoreTableProps {
    title?: string;
    playerNames: string[];
    scoreNames: string[];
}

interface IScoreTableState {}

export default class ScoreTable extends Component<
    IScoreTableProps,
    IScoreTableState
> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    getTotalForPlayer(playerName: string): number {
        let inputs = document.querySelectorAll<HTMLInputElement>(
            `.scoretable__input--${playerName}`
        );
        let values: number[] = [];
        inputs.forEach(i => {
            values.push(parseInt(i.value));
        });
        return values.reduce(function(a, b) {
            return (isNaN(a) ? 0 : a) + (isNaN(b) ? 0 : b);
        }, 0);
    }

    updateTotals() {
        this.props.playerNames.forEach(playerName => {
            let score: number = this.getTotalForPlayer(playerName);
            let totalElement: HTMLElement | null = document.querySelector(
                `.scoretable__cell--total-${playerName}`
            );
            if (totalElement) {
                totalElement.innerText = score.toString();
            }
        });
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
                                            onChange={() => {
                                                this.updateTotals();
                                            }}
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
                                <td
                                    className={`scoretable__cell--total-${playerName}`}
                                >
                                    0
                                </td>
                            );
                        })}
                    </tr>
                </table>
            </div>
        );
    }
}
