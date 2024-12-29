import * as React from "react";
import { INewGameButtonProps } from "./types";
import "../Style/Game/newGameButton.css";

const NewGameButton: React.FC<INewGameButtonProps> = ({ onNewGame }) => {
    return (
        <button className="new-game-button" onClick={onNewGame}>
            Новая игра
        </button>
    );
};

export default React.memo(NewGameButton);