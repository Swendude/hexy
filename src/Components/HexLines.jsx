import { Shape } from "react-konva";
import { subDiv } from "../gridUtils";

const HexLines = ({ lines }) => {
  const renderLines = (ctx, shp) => {
    ctx.beginPath();
    lines.forEach((line) => {
      ctx.moveTo(line[0].x, line[0].y);
      const fwd = subDiv(line[0], line[1], 0.28);
      ctx.lineTo(fwd.x, fwd.y);
      ctx.moveTo(line[1].x, line[1].y);
      const bwd = subDiv(line[1], line[0], 0.28);
      ctx.lineTo(bwd.x, bwd.y);
      // pick two random points between gap
      let r1, r2;
      if (Math.round(Math.random()) === 0) {
        r1 = subDiv(fwd, bwd, Math.random().toFixed(2));
        r2 = subDiv(fwd, bwd, Math.random().toFixed(2));
      } else {
        r1 = subDiv(bwd, fwd, Math.random().toFixed(2));
        r2 = subDiv(bwd, fwd, Math.random().toFixed(2));
      }
      ctx.moveTo(r1.x, r1.y);
      ctx.lineTo(r2.x, r2.y);
    });
    ctx.fillStrokeShape(shp);
  };

  return (
    <Shape
      x={0}
      y={0}
      strokeWidth={2}
      lineJoin={"round"}
      lineCap={"butt"}
      stroke={"#00000099"}
      sceneFunc={renderLines}
    />
  );
};

export default HexLines;
