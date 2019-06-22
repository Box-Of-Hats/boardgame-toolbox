import * as React from 'react';
import './Settings.scss';
import Header from 'components/Header/Header';

interface ISettingsState {
    message: string;
}

interface ISettingsProps {}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.clearCache = this.clearCache.bind(this);
    }
    clearCache() {
        if ('serviceWorker' in navigator) {
            caches.keys().then(function(cacheNames) {
                cacheNames.forEach(function(cacheName) {
                    caches.delete(cacheName);
                });
            });
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
                        <div
                            onClick={this.clearCache}
                            className='settings__button settings__button--white'>
                            Clear cache
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Settings;
