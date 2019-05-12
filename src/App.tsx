import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GamePage } from "./GamePage";

const App: React.FC = () => {
    return (
        <div className="App">
            <GamePage />
        </div>
    );
};

export default App;
