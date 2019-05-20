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
}

export default class ToolManagement extends Component<
    IToolManagementProps,
    IToolManagementState
> {
    constructor(props: IToolManagementProps) {
        super(props);
        this.state = {
            selectedConfig: this.props.options[0]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.persist();
        this.setState((prevState, props) => {
            var selectedOption = this.props.options.filter(
                opt => event.target.value == opt.id
            )[0];
            return {
                selectedConfig: selectedOption
            };
        });
    }

    render() {
        return (
            <div className="tool-management">
                <select
                    className="tool-management__select"
                    onChange={this.handleChange}
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
                    value={
                        this.state.selectedConfig
                            ? JSON.stringify(
                                  this.state.selectedConfig.settingsSchema,
                                  null,
                                  2
                              )
                            : ""
                    }
                />
            </div>
        );
    }
}
