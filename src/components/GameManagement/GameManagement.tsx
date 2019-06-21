import React, {Component} from 'react';
import './GameManagement.scss';
import {Link} from 'react-router-dom';
import GamesStore from 'utils/GamesStore';
import {Editor} from 'components/Editor/Editor';

interface IToolConfig {
    id: number;
    name: string;
    [key: string]: any;
}

interface IGameManagementProps {
    toolOptions: IToolConfig[];
}

interface IGameManagementState {
    name: string;
    description: string;
    options: IToolConfig[];
    selectedTools: IToolConfig[];
    currentEditor: number;
}

const ToolList = props => {
    let index = 0;
    return (
        <div className='game-management__tool-list'>
            {props.tools.map(tool => {
                index++;
                return (
                    <div
                        className='game-management__tool-listing'
                        key={`${tool.name}${index}`}>
                        {`${tool.name}`}
                        <div
                            className='game-management__minus'
                            onClick={e => {
                                props.onDelete(tool.name);
                            }}>
                            -
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default class GameManagement extends Component<
    IGameManagementProps,
    IGameManagementState
> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            options: this.props.toolOptions,
            selectedTools: [],
            currentEditor: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToolSelectChange = this.handleToolSelectChange.bind(this);
    }

    handleChange(event) {
        // Generic input change handler
        event.persist();
        this.setState((prevState, props) => {
            prevState[event.target.name] = event.target.value;
            return prevState;
        });
    }

    addToolObject(tool: IToolConfig) {
        // add a tool to the tools list
        this.setState((prevstate, props) => {
            //let toolConfig = JSON.parse(prevstate.toolJson);
            let previouslySelectedTools = prevstate.selectedTools;
            previouslySelectedTools.push(tool);
            return {
                selectedTools: previouslySelectedTools
            };
        });
    }

    handleToolSelectChange(event) {
        // Tool dropdown was changed
        event.persist();
        this.setState({
            currentEditor: event.target.value
        });
    }

    handleSubmit() {
        // Save the game to the local store
        let db = new GamesStore();
        db.addGame({
            name: this.state.name,
            description: this.state.description,
            tools: this.state.selectedTools
        });
    }

    render() {
        let options = this.state.options.map(o => {
            return (
                <option value={o.id} key={`${o.id}${o.name}`}>
                    {o.name}
                </option>
            );
        });
        var editor;
        switch (this.state.currentEditor.toString()) {
            case '0': //Dice
                editor = (
                    <Editor
                        name={'Dice'}
                        onSubmit={(properties: IToolConfig) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 0,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'Dice',
                                propertyName: 'name'
                            },
                            {
                                label: 'Max Roll',
                                type: 'number',
                                default: 6,
                                propertyName: 'maximumRoll'
                            },
                            {
                                label: 'Dice Count',
                                type: 'number',
                                default: 1,
                                propertyName: 'diceCount'
                            }
                        ]}
                    />
                );
                break;

            case '1': //Counter
                editor = (
                    <Editor
                        name={'Counter'}
                        onSubmit={(properties: IToolConfig) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 1,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'Counter',
                                propertyName: 'name'
                            },
                            {
                                label: 'Start Value',
                                type: 'number',
                                default: 0,
                                propertyName: 'value'
                            }
                        ]}
                    />
                );
                break;

            case '2': //Spinner
                editor = (
                    <Editor
                        name={'Spinner'}
                        onSubmit={(properties: IToolConfig) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 2,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'Spinner',
                                propertyName: 'name'
                            }
                        ]}
                    />
                );
                break;

            case '3': //ScoreTable
                let toolName = 'ScoreTable';
                editor = (
                    <Editor
                        name={toolName}
                        onSubmit={(properties: IToolConfig) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 3,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: toolName,
                                propertyName: 'name'
                            },
                            {
                                label: 'Players',
                                type: 'textList',
                                default: ['person-1', 'person-2'],
                                propertyName: 'playerNames'
                            },
                            {
                                label: 'Rounds',
                                type: 'textList',
                                default: ['Round 1', 'Round 2', 'Round 3'],
                                propertyName: 'scoreNames'
                            }
                        ]}
                    />
                );
                break;

            case '4': //Coin
                editor = (
                    <Editor
                        name={'Coin'}
                        onSubmit={(properties: IToolConfig) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 4,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'Coin',
                                propertyName: 'name'
                            },
                            {
                                label: 'Icons',
                                type: 'textList',
                                default: ['face', 'euro_symbol'],
                                propertyName: 'icons'
                            }
                        ]}
                    />
                );
                break;

            default:
                break;
        }

        return (
            <>
                <div className='game-management'>
                    <div className='game-management__group'>
                        <div className='game-management__label'>name</div>
                        <input
                            className='game-management__input'
                            name='name'
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className='game-management__group'>
                        <div className='game-management__label'>
                            description
                        </div>
                        <input
                            className='game-management__input'
                            name='description'
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>
                    <hr />
                    <div className='game-management__group'>
                        <select
                            defaultValue={'0'}
                            className='game-management__input game-management__input--select'
                            onChange={this.handleToolSelectChange}>
                            {options}
                        </select>
                    </div>

                    {editor}
                </div>
                {this.state.selectedTools.length > 0 && (
                    <ToolList
                        tools={this.state.selectedTools}
                        onDelete={(name: string) => {
                            this.setState({
                                selectedTools: this.state.selectedTools.filter(
                                    tool => {
                                        return tool.name != name;
                                    }
                                )
                            });
                        }}></ToolList>
                )}
                <div className='game-management__bottom-bar'>
                    <Link to='/' onClick={this.handleSubmit}>
                        <div className='game-management__button game-management__button--save'>
                            {' '}
                            Save
                        </div>
                    </Link>
                </div>
            </>
        );
    }
}
