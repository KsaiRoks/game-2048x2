import * as React from "react";
import { ITileMoveProps } from "./types";
import Tile from "./Tile";

const TileMove: React.FC<ITileMoveProps> = ({
  from,
  final,
  hideAfterMove = false
}) => {
  const className = hideAfterMove ? "moveAndHide" : "move";

  return (
    <Tile
      className={className}
      x={final.x}
      y={final.y}
      value={final.value}
    />
  );
};

export default TileMove;