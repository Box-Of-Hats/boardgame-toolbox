import * as React from 'react';
import './ToolList.scss';
import {Tool} from 'types/Tool.interface';

interface IToolListProps {
    tools: Tool[];
    onDelete: Function;
}

export const ToolList = (props: IToolListProps) => {
    const [expandedTool, setExpandedTool] = React.useState<string>('');
    var index = 0;
    return (
        <div className='tool-list'>
            {props.tools.map(tool => {
                index++;
                let isExpanded = expandedTool === tool.name;
                return (
                    <div
                        className='tool-list__listing'
                        onClick={e =>
                            isExpanded
                                ? setExpandedTool(null)
                                : setExpandedTool(tool.name)
                        }
                        key={`${tool.name}${index}`}>
                        <div className='tool-list__title'>
                            {`${tool.name}`}
                            <div className='tool-list__buttons'>
                                <div
                                    className={
                                        'tool-list__button tool-list__button--expand'
                                    }
                                    onClick={e =>
                                        isExpanded
                                            ? setExpandedTool(null)
                                            : setExpandedTool(tool.name)
                                    }>
                                    {isExpanded ? (
                                        <i className='material-icons'>
                                            expand_less
                                        </i>
                                    ) : (
                                        <i className='material-icons'>
                                            expand_more
                                        </i>
                                    )}
                                </div>

                                <div
                                    className='tool-list__button tool-list__button--delete'
                                    role='button'
                                    onClick={e => {
                                        props.onDelete(tool.name);
                                    }}>
                                    <i className='material-icons'>delete</i>
                                </div>
                            </div>
                        </div>
                        {isExpanded && (
                            <div className='tool-list__properties'>
                                {Object.keys(tool).map(toolProps => {
                                    return (
                                        <div className='tool-list__group'>
                                            <div className='tool-list__label'>
                                                {toolProps}
                                            </div>
                                            <div className='tool-list__text'>
                                                {tool[toolProps]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
