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
                            id: 0,
                            name: 'Dice'
                        },
                        {
                            id: 1,
                            name: 'Counter'
                        },
                        {
                            id: 2,
                            name: 'Spinner'
                        },
                        {
                            id: 3,
                            name: 'ScoreTable'
                        },
                        {
                            id: 4,
                            name: 'Coin'
                        },
                        {
                            id: 5,
                            name: 'NotePad'
                        },
                        {
                            id: 6,
                            name: 'Timer'
                        },
                        {
                            id: 7,
                            name: 'Rules'
                        }
                    ]}
                />
            </div>
        </>
    );
};

export default GameManagementForm;
