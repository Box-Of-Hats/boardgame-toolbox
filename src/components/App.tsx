import React from 'react';
import {GamePage} from './GamePage/GamePage';
import {BrowserRouter, Route} from 'react-router-dom';
import GameManagementForm from 'components/GameManagementForm/GameManagementForm';
import GamesList from 'components/GamesList/GamesList';
import Settings from './Settings/Settings';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={GamesList} />
            <Route exact path='/add' component={GameManagementForm} />
            <Route exact path='/settings' component={Settings} />
            <Route path='/game/:id' component={GamePage} />
        </BrowserRouter>
    );
};

export default App;
