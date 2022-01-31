import { Shape, Circle, Text } from "react-konva";
import { useMemo, useState, useEffect } from "react";
import { mapRange } from "../utils";
import WaterTile from "./tiles/WaterTile";
import GrassTile from "./tiles/GrassTile";
import MountainTile from "./tiles/MountainTile";
import CrossTile from "./tiles/CrossTile";
import TouchTile from "./tiles/TouchTile";

const Hex = ({ hex, pos, hexElevation }) => {
  const [elevation, setElevation] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);

  const typeOptions = [
    { renderType: "Water", begin: 0, end: 0.25, color: "#BFDBF7" },
    { renderType: "Grass", begin: 0.25, end: 0.7, color: "#B6C197" },
    { renderType: "Mountain", begin: 0.7, end: 1, color: "#C46D5E" },
  ];

  const renderHex = (ctx, shp) => {
    // console.log("rerender");
    const [firstCor, ...others] = hex.corners();
    ctx.beginPath();
    ctx.moveTo(firstCor.x, firstCor.y);
    others.forEach(({ x, y }, i) => {
      ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStrokeShape(shp);
  };

  useEffect(() => {
    setElevation(hexElevation);
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
    <>
      <Shape
        x={pos.x}
        y={pos.y}
        stroke={color}
        strokeWidth={2}
        fill={color}
        sceneFunc={renderHex}
        listening={false}
      />
      {typeOptions[type].renderType === "Water" ? (
        <WaterTile pos={pos} hex={hex} listening={false} />
      ) : typeOptions[type].renderType === "Grass" ? (
        <GrassTile pos={pos} hex={hex} listening={false} />
      ) : typeOptions[type].renderType === "Mountain" ? (
        <MountainTile pos={pos} hex={hex} listening={false} />
      ) : (
        <CrossTile pos={pos} hex={hex} listening={false} />
      )}
      <TouchTile pos={pos} renderFunc={renderHex} cycleFunc={cycleType} />
    </>
  ) : (
    <></>
  );
};

export default Hex;
