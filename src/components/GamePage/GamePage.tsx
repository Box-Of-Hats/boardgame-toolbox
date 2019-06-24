import React, {Component} from 'react';
import {Counter} from 'components/Counter/Counter';
import GamesStore from 'utils/GamesStore';
import Dice from 'components/Dice/Dice';
import ScoreTable from 'components/ScoreTable/ScoreTable';
import Spinner from 'components/Spinner/Spinner';
import {Link} from 'react-router-dom';
import './GamePage.scss';
import Header from 'components/Header/Header';
import Coin from 'components/Coin/Coin';
import NotePad from 'components/NotePad';
import Timer from 'components/Timer/Timer';

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
                <>
                    <Header title={'Game not found'} backLink={'/'} />
                    <div className='game-page'>
                        <div className='game-page__error'>
                            We couldnt find a game with ID: '{this.state.gameId}
                            '
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <Header
                    title={game.name}
                    backLink={'/'}
                    actionCallback={() => {
                        this.state.gamesStore.deleteGame(this.state.gameId);
                    }}
                    actionCallbackRedirect='/'
                    actionIcon='delete'
                    actionIconStyle={{color: '#cc0000', fontSize: '2em'}}
                />
                <div className='game-page'>
                    <div>
                        {game.tools.map(toolConfig => {
                            switch (toolConfig.id) {
                                case 0:
                                    return (
                                        <Dice
                                            diceCount={toolConfig.diceCount}
                                            maximumRoll={toolConfig.maximumRoll}
                                            name={toolConfig.name}
                                        />
                                    );

                                case 1:
                                    return (
                                        <Counter
                                            title={toolConfig.name}
                                            value={toolConfig.value}
                                        />
                                    );
                                case 2:
                                    return <Spinner title={toolConfig.name} />;
                                case 3:
                                    return (
                                        <ScoreTable
                                            title={toolConfig.name}
                                            playerNames={toolConfig.playerNames}
                                            scoreNames={toolConfig.scoreNames}
                                        />
                                    );
                                case 4:
                                    return (
                                        <Coin
                                            name={toolConfig.name}
                                            icons={toolConfig.icons}
                                        />
                                    );
                                case 5:
                                    return <NotePad name={toolConfig.name} />;
                                case 6:
                                    return (
                                        <Timer
                                            name={toolConfig.name}
                                            startTime={toolConfig.startTime}
                                            flashColor={toolConfig.flashColor}
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
