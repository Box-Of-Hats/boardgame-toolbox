import React, { Component } from "react";
import "../style/tool-management.scss";

interface IToolConfig {
    id: number;
    name: string;
    settingsSchema: object;
    [key: string]: any;
}

interface IToolManagementProps {
    options: IToolConfig[];
}

interface IToolManagementState {
    selectedConfig: IToolConfig | undefined;
    configOptions: object;
}

export default class ToolManagement extends Component<
    IToolManagementProps,
    IToolManagementState
> {
    constructor(props: IToolManagementProps) {
        super(props);
        this.state = {
            selectedConfig: this.props.options[0],
            configOptions: this.props.options[0].settingsSchema
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectedToolChange = this.handleSelectedToolChange.bind(
            this
        );
    }

    handleSelectedToolChange(event) {
        event.persist();
        this.setState((prevState, props) => {
            var selectedOption = this.props.options.filter(
                opt => event.target.value == opt.id
            )[0];
            return {
                selectedConfig: selectedOption,
                configOptions: selectedOption.settingsSchema
            };
        });
    }

    handleChange(event) {
        // Generic input event change handler
        event.persist();
        this.setState((prevState, props) => {
            prevState[event.target.name] = event.target.value;
            return prevState;
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

                <textarea
                    className="tool-management__description"
                    name="configOptions"
                    value={JSON.stringify(this.state.configOptions, null, 2)}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
