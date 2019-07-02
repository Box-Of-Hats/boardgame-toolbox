import {Game} from '../types/Game.interface';

export default class GamesStore {
    localStorageName = 'games';

    getGames = (): Game[] => {
        if (!localStorage.getItem(this.localStorageName)) {
            // Games were not found in local storage so store empty list
            localStorage.setItem(this.localStorageName, '[]');
            return [];
        } else {
            return JSON.parse(localStorage.getItem(this.localStorageName));
        }
    };

    getGame = (id: number): Game => {
        let foundGames = this.getGames().filter(game => {
            return game.id == id;
        });
        if (!foundGames) {
            return null;
        }
        return foundGames[0];
    };

    addGame = (game: Game) => {
        let gamesList = this.getGames();
        let nextGameId = this.generateNextId(gamesList);
        if (game.name === '') {
            game.name = `Game ${nextGameId}`;
        }
        if (!localStorage.getItem(this.localStorageName)) {
            // Games were not found in local storage
            localStorage.setItem(this.localStorageName, JSON.stringify([game]));
        } else {
            game.id = nextGameId;
            gamesList.push(game);
            localStorage.setItem(
                this.localStorageName,
                JSON.stringify(gamesList)
            );
        }
    };

    deleteGame = (gameId: number) => {
        if (!localStorage.getItem(this.localStorageName)) {
            // Games were not found in local storage
            localStorage.setItem(this.localStorageName, '[]');
        } else {
            let gamesList = this.getGames();
            gamesList = gamesList.filter(game => {
                return game.id != gameId;
            });
            localStorage.setItem(
                this.localStorageName,
                JSON.stringify(gamesList)
            );
        }
    };

    deleteGames = () => {
        // Remove all games in local storage
        localStorage.setItem(this.localStorageName, '[]');
    };

    generateNextId = (games: Game[]) => {
        // Get a unique ID for the next game to be stored
        if (games == null) {
            games = this.getGames();
        }
        if (games.length === 0) {
            return 1;
        }
        return (
            Math.max.apply(
                Math,
                games.map(function(game) {
                    return game.id;
                })
            ) + 1
        );
    };
}
