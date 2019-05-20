import React, { Component } from "react";
import "../style/game-management.scss";
import { Tool } from "../types/Tool.interface";
import { GamesDatabase } from "../GamesDatabase";
import ToolManagement from "./ToolManagement";

interface IGameManagementProps {}

interface IGameManagementState {
    name: string;
    description: string;
    tools: Tool[];
}

export default class GameManagement extends Component<
    IGameManagementProps,
    IGameManagementState
> {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            tools: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();
        this.setState((prevState, props) => {
            prevState[event.target.name] = event.target.value;
            return prevState;
        });
    }

    handleSubmit(event) {
        let db = new GamesDatabase();
        db.addGame({
            name: this.state.name,
            description: this.state.description,
            tools: []
        });
    }

    render() {
        let fields = ["name", "description"].map(x => {
            return (
                <div className="game-management__group">
                    <div className="game-management__label">{x}</div>
                    <input className="game-management__input" type="text" />
                </div>
            );
        });

        return (
            <div className="game-management">
                <div className="game-management__group">
                    <div className="game-management__label">name</div>
                    <input
                        className="game-management__input"
                        name="name"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />
                </div>
                <div className="game-management__group">
                    <div className="game-management__label">description</div>
                    <input
                        className="game-management__input"
                        name="description"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                </div>
                <div className="game-management__group">
                    <ToolManagement
                        options={[
                            {
                                id: 2,
                                name: "Spinner",
                                settingsSchema: {
                                    id: 2,
                                    name: "Spinner"
                                }
                            },
                            {
                                id: 1,
                                name: "Counter",
                                settingsSchema: {
                                    id: 1,
                                    name: "Counter"
                                }
                            },
                            {
                                id: 3,
                                name: "ScoreTable",
                                settingsSchema: {
                                    id: 3,
                                    name: "ScoreTable",
                                    names: ["person-1", "person-2", "..."]
                                }
                            },
                            {
                                id: 0,
                                name: "Dice",
                                settingsSchema: {
                                    id: 0,
                                    name: "Dice"
                                }
                            }
                        ]}
                    />
                </div>
                <div
                    className="game-management__button"
                    onClick={this.handleSubmit}
                >
                    Save
                </div>
            </div>
        );
    }
}