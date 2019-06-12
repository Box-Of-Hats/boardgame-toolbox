import React, {SFC} from 'react';
import GameManagement from 'components/GameManagement/GameManagement';

const GameManagementForm: SFC = () => {
    return (
        <div>
            <h2>Game Management Page</h2>
            <a href='/'>BACK</a>
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
        </div>
    );
};

export default GameManagementForm;
