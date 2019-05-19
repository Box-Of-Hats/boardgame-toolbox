import React from "react";
import GameListing from "./GameListing";
import Dice from "./Dice";
import { Counter } from "./Counter";
import Spinner from "./Spinner";
import ScoreTable from "./ScoreTable";
interface Game {
    id: number;
    title: string;
    description: string;
}

export const GamePage = () => {
    const getConfigData = () => {
        return [
            {
                name: "Sushi GO!",
                description: "A fast paced sushi making game.",
                tools: [
                    {
                        typeId: 3,
                        title: "ScoreTable",
                        playerNames: ["Jake", "Alena"],
                        scoreNames: ["Round 1", "Round 2", "Round 3", "Dessert"]
                    }
                ]
            }
        ];
    };

    let out: any = [];

    getConfigData().forEach(gameConfig => {
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
};
