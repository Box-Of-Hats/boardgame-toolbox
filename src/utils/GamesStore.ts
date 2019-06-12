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
        if (!localStorage.getItem(this.localStorageName)) {
            // Games were not found in local storage
            localStorage.setItem(this.localStorageName, JSON.stringify([game]));
        } else {
            let gamesList = this.getGames();
            game.id = this.generateNextId(gamesList);
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
