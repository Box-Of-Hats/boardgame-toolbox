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
        this.addTool = this.addTool.bind(this);
        this.handleConfigJsonChange = this.handleConfigJsonChange.bind(this);
    }

    handleChange(event) {
        event.persist();
        this.setState((prevState, props) => {
            prevState[event.target.name] = event.target.value;
            return prevState;
        });
    }

    isValidJson() {
        //Check if the current toolJson is valid json
        try {
            JSON.parse(this.state.toolJson);
            return true;
        } catch {
            return false;
        }
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

    addTool() {
        // Add the currently selected tool to the tool list json
        if (!this.isValidJson) {
            return false;
        }
        this.setState((prevstate, props) => {
            let toolConfig = JSON.parse(prevstate.toolJson);
            toolConfig.push(this.state.selectedTool);

            return {
                toolJson: JSON.stringify(toolConfig, null, 2)
            };
        });
    }

    handleToolSelectChange(event) {
        event.persist();
        this.setState({
            selectedTool: this.state.options.filter(
                opt => event.target.value === opt.id.toString()
            )[0],
            currentEditor: event.target.value
        });
    }

    handleConfigJsonChange(event) {
        // Config text box was changed
        event.persist();
        this.setState({
            toolJson: event.target.value
        });
    }

    handleSubmit(event) {
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

        var editor = <div>No editor selected</div>;
        switch (this.state.currentEditor.toString()) {
            case '1':
                var editor = (
                    <Editor
                        name={'Counter'}
                        onSubmit={(properties: object) => {
                            console.log(properties);
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
                        className='game-management__input'
                        onChange={this.handleToolSelectChange}>
                        {options}
                    </select>
                    <div
                        className={`game-management__button  ${
                            this.isValidJson()
                                ? ''
                                : 'game-management__button--disabled'
                        }`}
                        onClick={this.addTool}>
                        Add +
                    </div>
                </div>
                <div className='game-management__group'>{editor}</div>

                <div className='game-management__group'>
                    <textarea
                        className='game-management__textarea'
                        name='configOptions'
                        value={this.state.toolJson}
                        onChange={this.handleConfigJsonChange}
                    />
                </div>
                {!this.isValidJson() && (
                    <div
                        className={
                            'game-management__message game-management__message--error'
                        }>
                        Invalid JSON
                    </div>
                )}

                <Link to='/' onClick={this.handleSubmit}>
                    <div
                        className={`game-management__button ${
                            this.isValidJson()
                                ? ''
                                : 'game-management__button--disabled'
                        }`}>
                        Save
                    </div>
                </Link>
            </div>
        );
    }
}
