import { useState, useEffect } from "react";
import { mapRange } from "../utils";
import WaterTile from "./tiles/WaterTile";
import GrassTile from "./tiles/GrassTile";
import MountainTile from "./tiles/MountainTile";
import CrossTile from "./tiles/CrossTile";

const Hex = ({ hex, hexElevation, hexD }) => {
  const [elevation, setElevation] = useState(null);
  const [hexPathStr, setHexPathStr] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);
  const [hover, setHover] = useState(false);

  const typeOptions = [
    { renderType: "Water", begin: 0, end: 0.25, color: "#BFDBF7" },
    { renderType: "Grass", begin: 0.25, end: 0.7, color: "#B6C197" },
    { renderType: "Mountain", begin: 0.7, end: 1, color: "#C46D5E" },
  ];

  const hexPath = (corners) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr;
  };

  useEffect(() => {
    setElevation(hexElevation);
    setHexPathStr(hexPath(hex.corners().map((cor) => cor.add(hex.toPoint()))));
  }, []);

  useEffect(() => {
    determineRender(elevation);
  }, [elevation]);

  const determineRender = (elevation) => {
    for (const opt_i in typeOptions) {
      const opt = typeOptions[opt_i];
      if (elevation > opt.begin && elevation <= opt.end) {
        setColor(opt.color);
        setType(parseInt(opt_i));
      }
    }
  };

  const cycleType = () => {
    const next = typeOptions[(type + 1) % typeOptions.length];
    setElevation(mapRange(Math.random(), 0, 1, next.begin, next.end));
  };

  return !(type == null) && !(color == null) ? (
    <g>
      <path d={hexPathStr} fill={color} />

      {typeOptions[type].renderType === "Water" ? (
        <WaterTile hex={hex} hexD={hexD} hexD={hexD} />
      ) : typeOptions[type].renderType === "Grass" ? (
        <GrassTile hex={hex} hexD={hexD} />
      ) : typeOptions[type].renderType === "Mountain" ? (
        <MountainTile hex={hex} hexD={hexD} />
      ) : (
        <CrossTile hex={hex} hexD={hexD} />
      )}

      <path
        d={hexPathStr}
        opacity={hover ? 0.1 : 0}
        fill={"#000"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchEnd={() => cycleType()}
        onMouseUp={() => cycleType()}
      />
    </g>
  ) : (
    <></>
  );
};

export default Hex;
