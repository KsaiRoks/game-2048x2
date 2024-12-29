import * as React from "react";
import { ITileMergeProps } from "./types";
import TileMove from "./TileMove";
import TileNew from "./TileNew";

const TileMerge: React.FC<ITileMergeProps> = ({ from, to, final }) => {
  return (
    <>
      <TileMove from={to} final={{ ...final, value: to.value }} hideAfterMove />
      <TileMove
        from={from}
        final={{ ...final, value: from.value }}
        hideAfterMove
      />
      <TileNew final={final} />
    </>
  );
};

export default TileMerge;