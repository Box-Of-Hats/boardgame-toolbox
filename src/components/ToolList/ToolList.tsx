import * as React from 'react';
import './ToolList.scss';

export const ToolList = props => {
    let index = 0;
    return (
        <div className='tool-list'>
            {props.tools.map(tool => {
                index++;
                return (
                    <div
                        className='tool-list__listing'
                        key={`${tool.name}${index}`}>
                        <div className='tool-list__title'>
                            {`${tool.name}`}
                            <div
                                className='tool-list__minus'
                                role='button'
                                onClick={e => {
                                    props.onDelete(tool.name);
                                }}>
                                -
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
