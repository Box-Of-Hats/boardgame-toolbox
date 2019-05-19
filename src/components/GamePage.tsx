import React, { Component } from "react";
import GameListing from "./GameListing";
import Dice from "./Dice";
import { Counter } from "./Counter";
import Spinner from "./Spinner";
import ScoreTable from "./ScoreTable";
import { GamesDatabase } from "../GamesDatabase";
import { Game } from "../types/Game.interface";

interface IGamePageProps {}

interface IGamePageState {
    gamesDb: GamesDatabase;
    games: Game[];
}

export class GamePage extends Component<IGamePageProps, IGamePageState> {
    constructor(props: IGamePageProps) {
        super(props);
        this.state = {
            gamesDb: new GamesDatabase(),
            games: []
        };
    }

    render() {
        var out: any[] = [];

        this.state.gamesDb
            .loadGames()
            .then(
                g => {
                    if (g.length === 0) {
                        // No games in local indexDB
                        let seedGames = this.state.gamesDb.addSeedGames();
                        this.setState({
                            games: seedGames
                        });
                    } else if (this.state.games.length !== g.length) {
                        // Number of games in local indexDB is more than currently loaded
                        this.setState({
                            games: g
                        });
                    } else {
                        // Dont set state and cause re-render
                    }
                },
                f => {
                    //Reject
                }
            )
            .catch(f => {
                //Error
            });

        this.state.games.forEach(gameConfig => {
            console.log(`Found game: ${gameConfig.name}`);
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
                                title={toolConfig.name}
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
