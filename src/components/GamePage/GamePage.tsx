import React, {Component} from 'react';
import {Counter} from 'components/Counter/Counter';
import GamesStore from 'utils/GamesStore';
import Dice from 'components/Dice/Dice';
import ScoreTable from 'components/ScoreTable/ScoreTable';
import Spinner from 'components/Spinner/Spinner';
import {Link} from 'react-router-dom';
import './GamePage.scss';
import Header from 'components/Header/Header';

interface IGamePageProps {
    match: any;
}

interface IGamePageState {
    gameId: number;
    gamesStore: GamesStore;
}

export class GamePage extends Component<IGamePageProps, IGamePageState> {
    constructor(props: IGamePageProps) {
        super(props);
        this.state = {
            gameId: undefined,
            gamesStore: new GamesStore()
        };
    }

    componentDidMount() {
        this.setState({
            gameId: this.props.match.params.id
        });
    }

    render() {
        let game = this.state.gamesStore.getGame(this.state.gameId);

        if (!game) {
            return (
                <div className='game-page'>
                    <div className='game-page__title'>Game Page</div>
                    <div className='game-page__error'>
                        We couldnt find a game with ID: '{this.state.gameId}'
                    </div>
                    <Link to='/'>
                        <div className='game-page__button'>back</div>
                    </Link>
                </div>
            );
        }

        return (
            <>
                <Header title={game.name} backLink={'/'} />
                <div className='game-page'>
                    <Link to='/'>
                        <div
                            className='game-page__button'
                            onClick={() =>
                                this.state.gamesStore.deleteGame(
                                    this.state.gameId
                                )
                            }>
                            delete
                        </div>
                    </Link>
                    <div>
                        {game.tools.map(toolConfig => {
                            switch (toolConfig.id) {
                                case 0:
                                    return (
                                        <Dice
                                            diceCount={1}
                                            maximumRoll={6}
                                            title={toolConfig.name}
                                        />
                                    );

                                case 1:
                                    return <Counter title={toolConfig.title} />;

                                case 2:
                                    return <Spinner title={toolConfig.title} />;

                                case 3:
                                    return (
                                        <ScoreTable
                                            title={toolConfig.title}
                                            playerNames={toolConfig.playerNames}
                                            scoreNames={toolConfig.scoreNames}
                                        />
                                    );

                                default:
                                    return;
                            }
                        })}
                    </div>
                </div>
            </>
        );
    }
}
