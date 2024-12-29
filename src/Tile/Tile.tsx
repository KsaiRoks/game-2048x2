import React from "react";
import { ITileProps } from "./types";
import "../Style/Tile/tile.css"

const colors = {
  "color-2": "#eee4da",
  "color-4": "#ede0c8",
  "color-8": "#f2b179",
  "color-16": "#f59563",
  "color-32": "#f67c5f",
  "color-64": "#f65e3b",
  "color-128": "#edcf72",
  "color-256": "#edcc61",
  "color-512": "#edc850",
  "color-1024": "#edc53f",
  "color-2048": "#edc22e",
  "color-4096": "#d84315",
  "color-8192": "#e65100",
  "color-x2": "#2196F3",
};

const Tile: React.FC<ITileProps> = ({ className = "", x, y, value }) => {
  const width = "(100% - 5 * 10px) / 4";
  const colorKey = `color-${value}` as keyof typeof colors;
  const style = {
    top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
    left: `calc(${width} * ${x} + 10px * ${x + 1})`,
    width: `calc(${width})`,
    height: `calc(${width})`,
    backgroundColor: colors[colorKey]
  };

  return (
    <div className={`tile ${className}`} style={style}>
      <h5>{value === "x2" ? "x2" : value}</h5>
    </div>
  )
}

export default Tile;