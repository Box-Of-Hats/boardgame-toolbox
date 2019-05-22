import React, { Component } from "react";
import "../style/tool-management.scss";

interface IToolConfig {
    id: number;
    name: string;
    [key: string]: any;
}

interface IToolManagementProps {
    options: IToolConfig[];
    handleChange: Function;
    toolJson: string;
    onToolJsonChange: Function;
}

interface IToolManagementState {
    selectedConfig: IToolConfig | undefined;
    toolConfigString: string;
}

export default class ToolManagement extends Component<
    IToolManagementProps,
    IToolManagementState
> {
    constructor(props: IToolManagementProps) {
        super(props);
        this.state = {
            selectedConfig: this.props.options[0],
            toolConfigString: JSON.stringify([], null, 2)
        };

        this.handleSelectedToolChange = this.handleSelectedToolChange.bind(
            this
        );
        this.addTool = this.addTool.bind(this);
        this.handleConfigChange = this.handleConfigChange.bind(this);
        this.isValidJson = this.isValidJson.bind(this);
    }

    handleSelectedToolChange(event) {
        event.persist();
        this.setState((prevState, props) => {
            var selectedOption = this.props.options.filter(
                opt => event.target.value === opt.id.toString()
            )[0];
            return {
                selectedConfig: selectedOption
            };
        });
    }

    isValidJson() {
        //Check if the current toolConfigString is valid json
        try {
            JSON.parse(this.state.toolConfigString);
            return true;
        } catch {
            return false;
        }
    }

    handleConfigChange(event) {
        // Config text box was changed
        event.persist();
        this.setState((prevState, props) => {
            return {
                toolConfigString: event.target.value
            };
        });
        if (this.isValidJson()) {
            this.props.handleChange(JSON.parse(this.state.toolConfigString));
        }
    }

    addTool() {
        // Add a tool to the config
        if (!this.isValidJson()) {
            return false;
        }
        this.setState((prevstate, props) => {
            let toolConfig = JSON.parse(prevstate.toolConfigString);
            toolConfig.push(this.state.selectedConfig);

            this.props.handleChange(toolConfig);

            return {
                toolConfigString: JSON.stringify(toolConfig, null, 2)
            };
        });
    }

    render() {
        return (
            <div className="tool-management">
                <select
                    className="tool-management__select"
                    onChange={this.handleSelectedToolChange}
                >
                    {this.props.options.map(toolConfig => {
                        return (
                            <option value={toolConfig.id}>
                                {toolConfig.name}
                            </option>
                        );
                    })}
                    )}
                </select>
                <div
                    className={`tool-management__button  ${
                        this.isValidJson()
                            ? ""
                            : "tool-management__button--disabled"
                    }`}
                    onClick={this.addTool}
                >
                    Add +
                </div>
                <textarea
                    className="tool-management__description"
                    name="configOptions"
                    value={this.props.toolJson}
                    onChange={this.props.onToolJsonChange}
                />
            </div>
        );
    }
}
