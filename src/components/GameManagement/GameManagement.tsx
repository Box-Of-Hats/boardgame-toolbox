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
    selectedTools: IToolConfig[];
    currentEditor: number;
    showSaveButton: boolean;
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
                            role='button'
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
            selectedTools: [],
            currentEditor: -1,
            showSaveButton: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToolSelectChange = this.handleToolSelectChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputUnFocus = this.handleInputUnFocus.bind(this);
    }

    handleInputFocus() {
        this.setState({showSaveButton: false});
    }

    handleInputUnFocus() {
        this.setState({showSaveButton: true});
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
            let previouslySelectedTools = prevstate.selectedTools;

            if (
                previouslySelectedTools.findIndex(t => t.name === tool.name) !=
                -1
            ) {
                // If tools already contains a tool with the chosen name, generate a new one:
                let index = 0;
                let newName = tool.name;
                while (
                    previouslySelectedTools.findIndex(
                        t => t.name === newName
                    ) != -1
                ) {
                    index++;
                    newName = `${tool.name} (${index})`;
                }
                tool.name = newName;
            }
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
        let options = this.props.toolOptions.map(o => {
            return (
                <option value={o.id} key={`${o.id}${o.name}`}>
                    {o.name}
                </option>
            );
        });
        options.unshift(
            <option value='-1' key='none-selected'>
                Select a tool
            </option>
        );
        var editor;
        switch (this.state.currentEditor.toString()) {
            case '-1':
                editor = <div></div>;
                break;
            case '0': //Dice
                editor = (
                    <Editor
                        name={'Dice'}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
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
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
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
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
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
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
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
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
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
            case '5': //Notepad
                editor = (
                    <Editor
                        name={'NotePad'}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 5,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'NotePad',
                                propertyName: 'name'
                            }
                        ]}
                    />
                );
                break;
            case '6':
                editor = (
                    <Editor
                        name={'Timer'}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 6,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'Timer',
                                propertyName: 'name'
                            },
                            {
                                label: 'Start Time',
                                type: 'number',
                                default: 30,
                                propertyName: 'startTime'
                            },
                            {
                                label: 'Flash color',
                                type: 'color',
                                default: '#cc0033',
                                propertyName: 'flashColor'
                            }
                        ]}
                    />
                );
                break;
            case '7':
                editor = (
                    <Editor
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputUnFocus}
                        name={'Timer'}
                        onSubmit={(properties: IToolConfig) => {
                            this.setState({currentEditor: -1});
                            this.addToolObject(properties);
                        }}
                        values={[
                            {
                                label: 'ID',
                                type: 'hidden',
                                default: 7,
                                propertyName: 'id'
                            },
                            {
                                label: 'Name',
                                type: 'text',
                                default: 'Rules',
                                propertyName: 'name'
                            },
                            {
                                label: 'Text',
                                type: 'textarea',
                                default: '',
                                propertyName: 'text'
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
                            value={this.state.currentEditor}
                            className='game-management__input game-management__input--select'
                            onChange={this.handleToolSelectChange}>
                            {options}
                        </select>
                    </div>

                    {editor}
                </div>

                <div className='game-management__bottom-bar'>
                    {
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
                    }
                    {this.state.showSaveButton && (
                        <Link to='/' onClick={this.handleSubmit}>
                            <div className='game-management__button'> Save</div>
                        </Link>
                    )}
                </div>
            </>
        );
    }
}
