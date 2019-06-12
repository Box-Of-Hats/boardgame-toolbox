import React, {Component} from 'react';
import {Counter} from 'components/Counter/Counter';
import GamesStore from 'utils/GamesStore';
import Dice from 'components/Dice/Dice';
import ScoreTable from 'components/ScoreTable/ScoreTable';
import Spinner from 'components/Spinner/Spinner';
import {Link} from 'react-router-dom';
import './GamePage.scss';

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
        var out: any[] = [];

        out.push(
            <Link to='/'>
                <div className='game-page__button'>back</div>
            </Link>
        );

        out.push(
            <Link to='/'>
                <div
                    className='game-page__button'
                    onClick={() =>
                        this.state.gamesStore.deleteGame(this.state.gameId)
                    }>
                    delete
                </div>
            </Link>
        );

        let game = this.state.gamesStore.getGame(this.state.gameId);

        if (!game) {
            out.push(<div className='game-page__title'>Game Page</div>);
            out.push(
                <p>We couldnt find a game with ID: '{this.state.gameId}'</p>
            );
            return out;
        }

        out.push(<div className='game-page__title'>{game.name}</div>);
        out.push(
            <div className='game-page__description'>{game.description}</div>
        );

        game.tools.forEach(toolConfig => {
            switch (toolConfig.id) {
                case 0:
                    out.push(
                        <Dice
                            diceCount={1}
                            maximumRoll={6}
                            title={toolConfig.name}
                        />
                    );
                    break;
                case 1:
                    out.push(<Counter title={toolConfig.title} />);
                    break;
                case 2:
                    out.push(<Spinner title={toolConfig.title} />);
                    break;
                case 3:
                    out.push(
                        <ScoreTable
                            title={toolConfig.title}
                            playerNames={toolConfig.playerNames}
                            scoreNames={toolConfig.scoreNames}
                        />
                    );
                    break;
                default:
                    break;
            }
        });

        return <div className='game-page'>{out}</div>;
    }
}
