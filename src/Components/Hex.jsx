import { Shape, Circle, Text } from "react-konva";
import { memo, useState, useEffect } from "react";
import WaterTile from "./tiles/WaterTile";
import GrassTile from "./tiles/GrassTile";
import MountainTile from "./tiles/MountainTile";

const Hex = ({ hex, pos, hexElevation }) => {
  const [elevation, setElevation] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);

  const typeOptions = ["Water", "Grass", "Mountain"];

  const renderHex = (ctx, shp) => {
    const [firstCor, ...others] = hex.corners;
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
    determineColor(hexElevation);
  }, [elevation]);

  const determineColor = (elevation) => {
    if (elevation < 0.25) {
      setColor("#BFDBF7");
      setType("Water");
    } else if (elevation < 0.7) {
      setColor("#B6C197");
      setType("Grass");
    } else {
      setColor("#C46D5E");
      setType("Mountain");
    }
  };

  return (
    <>
      <Shape
        x={pos.x}
        y={pos.y}
        stroke={color}
        strokeWidth={2}
        fill={color}
        sceneFunc={renderHex}
      />
      {type === "Water" ? (
        <WaterTile pos={pos} hex={hex} />
      ) : type === "Grass" ? (
        <GrassTile pos={pos} hex={hex} />
      ) : (
        <MountainTile pos={pos} hex={hex} />
      )}
    </>
  );
};

export default Hex;
