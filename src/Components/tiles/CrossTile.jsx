import { Shape } from "react-konva";
const CrossTile = ({ hex, pos }) => {
  const renderCross = (ctx, shp) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 5);
    ctx.moveTo(0, 0);
    ctx.lineTo(-5, -5);
    ctx.moveTo(0, 0);
    ctx.lineTo(5, -5);
    ctx.moveTo(0, 0);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fillStrokeShape(shp);
  };
  return (
    <Shape
      x={pos.x}
      y={pos.y}
      strokeWidth={2}
      stroke={"#000"}
      opacity={0.2}
      sceneFunc={renderCross}
    />
  );
};
export default CrossTile;
