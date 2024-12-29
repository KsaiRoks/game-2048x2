import * as React from "react";
import BoardTile from "../BoardTile";
import { IBoardProps } from "./types";

const Board: React.FC<IBoardProps> = ({ children, ...slideHandlers }) => {
  const tiles: any[][] = Array(4).fill(Array(4).fill(null));

  return (
    <div className="board" {...slideHandlers}>
      {tiles.map((row, x) => {
        return row.map((tile, y) => {
          return <BoardTile key={`board-tile-${x}-${y}`} x={x} y={y} />;
        });
      })}
      {children}
    </div>
  );
};

export default Board;