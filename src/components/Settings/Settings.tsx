import * as React from 'react';
import './Settings.scss';
import Header from 'components/Header/Header';
import GamesStore from 'utils/GamesStore';
import {Game} from 'types/Game.interface';
import * as serviceWorker from 'serviceWorker';

import {Link} from 'types/Link.interface';
import Footer from 'components/Footer/Footer';

enum MessageType {
    Error,
    Information,
    Success
}

interface ISettingsState {
    message: string;
    gameJson: string;
    gameStore: GamesStore;
    isLoading: boolean;
    messageType: MessageType;
}

interface ISettingsProps {}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
    constructor(props) {
        super(props);
        let gamesStore = new GamesStore();
        this.state = {
            message: '',
            gameStore: gamesStore,
            gameJson: JSON.stringify(gamesStore.getGames(), null, 2),
            isLoading: false,
            messageType: MessageType.Information
        };
        this.handleConfigJsonChange = this.handleConfigJsonChange.bind(this);
        this.saveConfigJson = this.saveConfigJson.bind(this);
        this.clearCache = this.clearCache.bind(this);
    }

    handleConfigJsonChange(event) {
        // Config text box was changed
        event.persist();
        this.setState({
            gameJson: event.target.value
        });
    }

    saveConfigJson() {
        let configObject: Game[];
        try {
            configObject = JSON.parse(this.state.gameJson);
        } catch {
            this.setState({message: 'Could not save config: Invalid JSON'});
            return;
        }
        this.state.gameStore.deleteGames();
        configObject.forEach(game => {
            this.state.gameStore.addGame(game);
        });
        this.setState({message: 'Successfully saved config'});
    }

    clearCache() {
        this.setState({
            isLoading: true
        });
        // Set a small pause to show that something is actually happening
        setTimeout(() => {
            if (!navigator.onLine) {
                this.setState({
                    isLoading: false,
                    message: 'You need to be online to check for updates',
                    messageType: MessageType.Error
                });
                return;
            }

            if ('serviceWorker' in navigator) {
                caches.keys().then(cacheNames => {
                    cacheNames.forEach(cacheName => {
                        caches.delete(cacheName);
                    });
                });
                serviceWorker.unregister();
                serviceWorker.register();
                fetch('./index.html')
                    .then(response => {
                        console.log(response);
                        if (response.ok) {
                            this.setState({
                                isLoading: false,
                                message: 'You are up to date',
                                messageType: MessageType.Success
                            });
                        } else {
                            this.setState({
                                isLoading: false,
                                message: `Network error: Code ${response.status}`,
                                messageType: MessageType.Error
                            });
                        }
                    })
                    .catch(e => {
                        this.setState({
                            isLoading: false,
                            message: 'Could not update: {e}'
                        });
                    });
                return;
            }
            this.setState({
                message:
                    "Your browser does not support service workers so there's no cache to clear",
                messageType: MessageType.Information
            });
        }, 1000);
    }

    render() {
        const getMessageClass = (messageType: MessageType): string => {
            switch (messageType) {
                case MessageType.Success:
                    return 'settings__region--success';
                case MessageType.Information:
                    return 'settings__region--info';
                case MessageType.Error:
                    return 'settings__region--error';
                default:
                    return '';
            }
        };
        const footerLinks: Link[] = [
            {
                text: 'Source',
                href: 'https://github.com/Box-Of-Hats/boardgame-toolbox'
            },
            {
                text: 'Follow me',
                href: 'https://twitter.com/box_of_hats'
            }
        ];
        return (
            <>
                <Header title='Settings' backLink='/' />
                <div className='settings'>
                    {this.state.message != '' && (
                        <div
                            className={`settings__region ${getMessageClass(
                                this.state.messageType
                            )}`}>
                            {this.state.message}
                        </div>
                    )}
                    <div className='settings__region'>
                        <div className='settings__title'>About</div>
                        Current version: 0.4
                    </div>
                    <div className='settings__region'>
                        <div className='settings__title'>Cache</div>
                        <div
                            onClick={this.clearCache}
                            className='settings__button settings__button--white'>
                            Check for updates
                            <div
                                className={`settings__icon ${
                                    this.state.isLoading
                                        ? 'settings__icon--loading'
                                        : ''
                                }`}>
                                <i className='material-icons'>refresh</i>
                            </div>
                        </div>
                    </div>
                    <div className='settings__region'>
                        <div className='settings__title'>
                            Your game configuration
                        </div>
                        <textarea
                            className='settings__json-editor'
                            value={this.state.gameJson}
                            onChange={this.handleConfigJsonChange}></textarea>
                        <div className='settings__group'>
                            <div className='settings__warning'>
                                Warning: Saving your config could potentially
                                break your games. Use with caution!
                            </div>
                            <div
                                className='settings__button settings__button--red'
                                role='button'
                                onClick={this.saveConfigJson}>
                                Save
                            </div>
                        </div>
                    </div>
                    <Footer links={footerLinks}></Footer>
                </div>
            </>
        );
    }
}

export default Settings;
