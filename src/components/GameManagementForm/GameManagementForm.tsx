import React, {SFC} from 'react';
import GameManagement from 'components/GameManagement/GameManagement';
import './GameManagementForm.scss';
import {Link} from 'react-router-dom';
import Header from 'components/Header/Header';

const GameManagementForm: SFC = () => {
    return (
        <>
            <Header title={'Add new game'} backLink={'/'} />
            <div className='game-management-form'>
                <GameManagement
                    toolOptions={[
                        {
                            id: 2,
                            name: 'Spinner'
                        },
                        {
                            id: 1,
                            name: 'Counter',
                            value: 0
                        },
                        {
                            id: 3,
                            name: 'ScoreTable',
                            playerNames: ['person-1', 'person-2'],
                            scoreNames: ['Round 1', 'Round 2', 'Round 3']
                        },
                        {
                            id: 0,
                            name: 'Dice',
                            maximumRoll: 6,
                            diceCount: 2
                        }
                    ]}
                />
            </div>
        </>
    );
};

export default GameManagementForm;
