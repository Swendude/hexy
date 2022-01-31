import { Shape } from "react-konva";
import { subDiv, generateRands } from "../gridUtils";
import { useState } from "react";
const EdgeLines = ({ lines }) => {
  const renderLines = (ctx, shp) => {
    ctx.beginPath();
    lines.forEach((line) => {
      ctx.moveTo(line[0].x, line[0].y);
      ctx.lineTo(line[1].x, line[1].y);
    });
    ctx.fillStrokeShape(shp);
  };

  return (
    <Shape
      x={0}
      y={0}
      strokeWidth={3}
      lineJoin={"round"}
      lineCap={"round"}
      stroke={"#1C0B19"}
      sceneFunc={renderLines}
    />
  );
};

export default EdgeLines;
