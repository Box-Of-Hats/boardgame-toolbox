import {Game} from '../types/Game.interface';

export class GamesDatabase {
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

    addGame = (game: Game) => {
        if (!localStorage.getItem(this.localStorageName)) {
            // Games were not found in local storage
            localStorage.setItem(this.localStorageName, JSON.stringify([game]));
        } else {
            let gamesList = this.getGames();
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
                game.id !== gameId;
            });
            localStorage.setItem(
                this.localStorageName,
                JSON.stringify(gamesList)
            );
        }
    };
}
