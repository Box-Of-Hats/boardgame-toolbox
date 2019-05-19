import React, { Component } from "react";
import GameListing from "./GameListing";
import Dice from "./Dice";
import { Counter } from "./Counter";
import Spinner from "./Spinner";
import ScoreTable from "./ScoreTable";
import { getGames } from "../dataManager";
import { Game } from "../types/Game.interface";

interface IGamePageProps {}

interface IGamePageState {
    games: Array<Game>;
}

export class GamePage extends Component<IGamePageProps, IGamePageState> {
    constructor(props: IGamePageProps) {
        super(props);
        this.state = {
            games: getGames()
        };
    }

    render() {
        let out: any = [];

        this.state.games.forEach(gameConfig => {
            out.push(
                <GameListing
                    title={gameConfig.name}
                    description={gameConfig.description}
                />
            );
            gameConfig.tools.forEach(toolConfig => {
                switch (toolConfig.typeId) {
                    case 0:
                        out.push(
                            <Dice
                                diceCount={1}
                                maximumRoll={6}
                                title={toolConfig.title}
                            />
                        );
                        break;
                    case 1:
                        out.push(<Counter title={toolConfig.title} />);
                        break;
                    case 2:
                        out.push(<Spinner title={toolConfig.title} />);
                        break;
                    case 3:
                        out.push(
                            <ScoreTable
                                title={toolConfig.title}
                                playerNames={toolConfig.playerNames}
                                scoreNames={toolConfig.scoreNames}
                            />
                        );
                        break;
                    default:
                        break;
                }
            });
        });
        return <div>{out}</div>;
    }
}
