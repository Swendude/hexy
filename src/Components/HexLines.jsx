import { Shape } from "react-konva";
import { subDiv, generateRands } from "../gridUtils";
import { useState } from "react";
const HexLines = ({ lines }) => {
  const [rands, setRands] = useState(lines.map(() => generateRands()));

  const renderLines = (ctx, shp) => {
    ctx.beginPath();
    lines.forEach((line, i) => {
      ctx.moveTo(line[0].x, line[0].y);
      const fwd = subDiv(line[0], line[1], 0.28);
      ctx.lineTo(fwd.x, fwd.y);
      ctx.moveTo(line[1].x, line[1].y);
      const bwd = subDiv(line[1], line[0], 0.28);
      ctx.lineTo(bwd.x, bwd.y);
      // pick two random points between gap
      let r1, r2;
      if (rands[i].winner === 0) {
        r1 = subDiv(fwd, bwd, rands[i].start);
        r2 = subDiv(fwd, bwd, rands[i].end);
      } else {
        r1 = subDiv(bwd, fwd, rands[i].start);
        r2 = subDiv(bwd, fwd, rands[i].end);
      }
      ctx.moveTo(r1.x, r1.y);
      ctx.lineTo(r2.x, r2.y);
    });
    ctx.closePath();
    ctx.fillStrokeShape(shp);
  };

  return (
    <Shape
      x={0}
      y={0}
      strokeWidth={2}
      lineJoin={"round"}
      lineCap={"butt"}
      stroke={"#1C0B19"}
      opacity={0.2}
      sceneFunc={renderLines}
    />
  );
};

export default HexLines;
