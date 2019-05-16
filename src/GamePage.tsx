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
    const getGames = (): Game[] => {
        return [
            {
                id: 0,
                title: "Catan",
                description:
                    "Amet curabitur ante adipiscing enim sed non nec nec iaculis tincidunt ante tellus sed orci orci vulputate sapien sapien risus. Felis convallis gravida primis et donec quis mattis convallis tincidunt pellentesque."
            },
            {
                id: 1,
                title: "Monopoly Deal",
                description:
                    "Sapien feugiat fermentum sollicitudin non ac molestie amet faucibus faucibus cursus varius amet vulputate ut felis at malesuada."
            },
            {
                id: 2,
                title: "Sushi GO!",
                description:
                    "Malesuada risus curabitur nisl fames tortor lorem elementum orci amet ut amet nam amet varius pellentesque orci faucibus felis convallis. Felis gravida."
            },
            {
                id: 3,
                title: "IOTA",
                description:
                    "Felis tincidunt consectetur sed ullamcorper mi justo vulputate curabitur mi nulla etiam lorem curabitur quis interdum iaculis aliquam fermentum vulputate. Pellentesque quis dictum justo dignissim sodales."
            }
        ];
    };

    const getToolData = (): any[] => {
        return [
            {
                typeId: 0,
                title: "Dice",
                maximumRoll: 10,
                diceCount: 2
            },
            {
                typeId: 1,
                value: 10,
                title: "Counter"
            },
            {
                typeId: 2,
                title: "Spinner"
            },
            {
                typeId: 3,
                title: "ScoreTable",
                playerNames: ["Jake", "Alena", "Person"],
                scoreNames: ["cols", "rows", "bonus", "pen"]
            }
        ];
    };

    let out = getGames().map(x => (
        <GameListing title={x.title} description={x.description} />
    ));

    getToolData().forEach(toolConfig => {
        switch (toolConfig.typeId) {
            case 0:
                out.push(
                    <Dice
                        diceCount={toolConfig.diceCount}
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
    return <div>{out}</div>;
};
