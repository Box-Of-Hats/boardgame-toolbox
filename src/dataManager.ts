import { Game } from "./types/Game.interface";

export const getGames = () => {
    return [
        {
            id: 0,
            name: "Sushi GO!",
            description: "A fast paced sushi making game.",
            tools: [
                {
                    typeId: 3,
                    name: "ScoreTable",
                    playerNames: ["Jake", "Alena"],
                    scoreNames: ["Round 1", "Round 2", "Round 3", "Dessert"]
                }
            ]
        }
    ];
};

export const addGame = (game: Game) => {};
