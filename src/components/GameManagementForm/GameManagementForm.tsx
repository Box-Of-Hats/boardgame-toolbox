import React, {SFC} from 'react';
import GameManagement from 'components/GameManagement/GameManagement';
import './GameManagementForm.scss';
import {Link} from 'react-router-dom';

const GameManagementForm: SFC = () => {
    return (
        <div className='game-management-form'>
            <div className='game-management-form__title'>Add new game</div>

            <GameManagement
                toolOptions={[
                    {
                        id: 2,
                        name: 'Spinner'
                    },
                    {
                        id: 1,
                        name: 'Counter'
                    },
                    {
                        id: 3,
                        name: 'ScoreTable',
                        playerNames: ['person-1', 'person-2'],
                        scoreNames: ['Round 1', 'Round 2', 'Round 3']
                    },
                    {
                        id: 0,
                        name: 'Dice'
                    }
                ]}
            />
            <Link className='game-management-form__button' to='/'>
                BACK
            </Link>
        </div>
    );
};

export default GameManagementForm;
