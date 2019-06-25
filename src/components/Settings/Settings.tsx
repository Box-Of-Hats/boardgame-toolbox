import * as React from 'react';
import './Settings.scss';
import Header from 'components/Header/Header';
import GamesStore from 'utils/GamesStore';
import {Game} from 'types/Game.interface';
import * as serviceWorker from 'serviceWorker';

interface ISettingsState {
    message: string;
    gameJson: string;
    gameStore: GamesStore;
}

interface ISettingsProps {}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
    constructor(props) {
        super(props);
        let gamesStore = new GamesStore();
        this.state = {
            message: '',
            gameStore: gamesStore,
            gameJson: JSON.stringify(gamesStore.getGames(), null, 2)
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
        if ('serviceWorker' in navigator) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    caches.delete(cacheName);
                });
            });
            serviceWorker.unregister();
            serviceWorker.register();
            this.setState({message: 'Cleared cache!'});
            return;
        }
        this.setState({message: 'Could not clear cache'});
    }
    render() {
        return (
            <>
                <Header title='Settings' backLink='/' />
                <div className='settings'>
                    {this.state.message != '' && (
                        <div className='settings__region'>
                            {this.state.message}
                        </div>
                    )}
                    <div className='settings__region'>
                        <div className='settings__title'>About</div>
                        Current version: 0.3
                    </div>
                    <div className='settings__region'>
                        <div className='settings__title'>Cache</div>
                        <div
                            onClick={this.clearCache}
                            className='settings__button settings__button--white'>
                            Clear cache
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
                </div>
            </>
        );
    }
}

export default Settings;
