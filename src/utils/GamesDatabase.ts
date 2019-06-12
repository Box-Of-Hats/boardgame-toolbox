import {Game} from '../types/Game.interface';
import Dexie from 'dexie';

interface IGame {
    id?: number;
    name: string;
    description: string;
    tools: any;
}

export class GamesDatabase extends Dexie {
    games: Dexie.Table<Game, number>;

    constructor() {
        super('GamesDatabase');
        this.version(1).stores({
            games: '++id, name, description, tools'
        });

        this.games = this.table('games');
    }

    async loadGames(): Promise<Array<Game>> {
        return await this.games.toArray().then(
            g => {
                return g;
            },
            f => {
                return f;
            }
        );
    }

    addGame(game: Game) {
        this.games.put(game);
    }

    addSeedGames(): Game[] {
        const seedGames = [
            // {
            //     id: 0,
            //     name: "Sushi GO!",
            //     description: "A fast paced sushi making game.",
            //     tools: [
            //         {
            //             id: 3,
            //             name: "ScoreTable",
            //             playerNames: ["Jake", "Alena"],
            //             scoreNames: ["Round 1", "Round 2", "Round 3", "Dessert"]
            //         }
            //     ]
            // },
            // {
            //     id: 1,
            //     name: "Monopoly",
            //     description: "Seriously, why does anyone play this game?",
            //     tools: [
            //         {
            //             id: 0,
            //             name: "Dicey Dice"
            //         },
            //         {
            //             id: 2,
            //             name: "Spinny Spinner"
            //         }
            //     ]
            // }
        ];
        this.games.bulkPut(seedGames);
        return seedGames;
    }
}
