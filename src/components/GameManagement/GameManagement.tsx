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
    //tools: Tool[];
    options: IToolConfig[];
    toolJson: string;
    selectedTool: IToolConfig | undefined;
    currentEditor: number;
}

export default class GameManagement extends Component<
    IGameManagementProps,
    IGameManagementState
> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            toolJson: '[]',
            options: this.props.toolOptions,
            selectedTool: this.props.toolOptions[0],
            currentEditor: -1
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

    addToolObject(tool: object) {
        // add a tool to the tools list
        this.setState((prevstate, props) => {
            let toolConfig = JSON.parse(prevstate.toolJson);
            toolConfig.push(tool);
            return {
                toolJson: JSON.stringify(toolConfig, null, 2)
            };
        });
    }

    handleToolSelectChange(event) {
        // Tool dropdown was changed
        event.persist();
        this.setState({
            selectedTool: this.state.options.filter(
                opt => event.target.value === opt.id.toString()
            )[0],
            currentEditor: event.target.value
        });
    }

    handleSubmit() {
        // Save the game to the local store
        let db = new GamesStore();
        db.addGame({
            name: this.state.name,
            description: this.state.description,
            tools: JSON.parse(this.state.toolJson)
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
        options.unshift(
            <option key='default' disabled={true} value={-1}>
                Select a tool
            </option>
        );

        var editor = <div>No editor selected</div>;
        switch (this.state.currentEditor.toString()) {
            case '0': //Dice
                editor = (
                    <Editor
                        name={'Dice'}
                        onSubmit={(properties: object) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'disabled',
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
                        onSubmit={(properties: object) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'disabled',
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
                        onSubmit={(properties: object) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'disabled',
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
                        onSubmit={(properties: object) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'disabled',
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
                        onSubmit={(properties: object) => {
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'disabled',
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
                    <div className='game-management__label'>description</div>
                    <input
                        className='game-management__input'
                        name='description'
                        type='text'
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                </div>
                <div className='game-management__group'>
                    <select
                        defaultValue={'-1'}
                        className='game-management__input'
                        onChange={this.handleToolSelectChange}>
                        {options}
                    </select>
                </div>

                <div className='game-management__group'>{editor}</div>

                {/* TODO: Create a component to display added tools */}
                <div className='game-management__group'>
                    <ul className=''>
                        {JSON.parse(this.state.toolJson).map(tool => {
                            return (
                                <li
                                    key={`${tool.name}`}>{`${tool.name} ${tool.id}`}</li>
                            );
                        })}
                    </ul>
                </div>

                <Link to='/' onClick={this.handleSubmit}>
                    <div className='game-management__button'> Save</div>
                </Link>
            </div>
        );
    }
}
