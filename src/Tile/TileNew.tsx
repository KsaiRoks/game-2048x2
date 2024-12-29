import * as React from "react";
import { ITileNewProps } from "./types";
import Tile from "./Tile";

const TileNew: React.FC<ITileNewProps> = ({ final }) => {
  return (
    <Tile
      className="Tile-new"
      x={final.x}
      y={final.y}
      value={final.value}
    />
  );
};

export default TileNew;