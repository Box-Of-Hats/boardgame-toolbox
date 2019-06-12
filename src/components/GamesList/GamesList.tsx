import * as React from 'react';
import {Component} from 'react';
import {Game} from 'types/Game.interface';
import GamesStore from 'utils/GamesStore';
import './GamesList.scss';
interface GamesListProps {
    games: Array<Game>;
}
interface GamesListState {
    gamesStore: GamesStore;
}

export class GamesList extends Component<GamesListProps, GamesListState> {
    gamesStore = new GamesStore();

    render() {
        return (
            <div className='games-list'>
                <div className='games-list__title'>Games List is here</div>
                <a href='/add'>ADD NEW</a>
                {this.gamesStore.getGames().map(game => {
                    return (
                        <a href={`/game/${game.id}`}>
                            <div className='games-list__item'>
                                <div className='games-list__game-name'>
                                    {game.name}
                                </div>
                                <div className='games-list__game-description'>
                                    {game.description}
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    }
}

export default GamesList;
