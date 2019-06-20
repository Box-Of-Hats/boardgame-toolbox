import * as React from 'react';
import {Component} from 'react';
import {Game} from 'types/Game.interface';
import GamesStore from 'utils/GamesStore';
import {Link} from 'react-router-dom';
import './GamesList.scss';
import Header from 'components/Header/Header';

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
            <>
                <Header title='Boardgame Toolbox' />
                <div className='games-list'>
                    {this.gamesStore.getGames().map(game => {
                        return (
                            <Link key={game.id} to={`/game/${game.id}`}>
                                <div className='games-list__item'>
                                    <div className='games-list__game-name'>
                                        {game.name}
                                    </div>
                                    <div className='games-list__game-description'>
                                        {game.description}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    <Link to='/add'>
                        <div className='games-list__button'>+</div>
                    </Link>
                </div>
            </>
        );
    }
}

export default GamesList;
