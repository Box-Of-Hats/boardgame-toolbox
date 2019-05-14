import React from "react";
import GameListing from "./GameListing";
import Dice from "./Dice";
import Counter from "./Counter";
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
    let out = getGames().map(x => (
        <GameListing title={x.title} description={x.description} />
    ));

    out.push(<Dice />);
    out.push(<Dice maximumRoll={100} />);
    out.push(<Counter />);
    out.push(<Counter value={10} />);
    out.push(<Counter value={100} />);
    return <div>{out}</div>;
};
