import * as React from "react";
import { IBoardTileProps } from "./types";
import "../Style/BoardTile/boardTile.css"

const BoardTile: React.FC<IBoardTileProps> = ({ x, y }) => {
    const width = "(100% - 5 * 10px) / 4";
    const style = {
        top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
        left: `calc(${width} * ${x} + 10px * ${x + 1})`,
        width: `calc(${width})`,
        height: `calc(${width})`,
    };

    return <div className="board-tile" style={style} />;
};

export default BoardTile;