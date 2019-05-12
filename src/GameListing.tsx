import React from "react";

export type GameListingProps = {
    title: string;
    description: string;
};

const GameListing = ({ title, description }: GameListingProps) => {
    return (
        <div className="game-listing">
            <div className="game-listing__title">{title}</div>
            <div className="game-listing__button">+</div>
            <div className="game-listing__description">{description}</div>
        </div>
    );
};

export default GameListing;
