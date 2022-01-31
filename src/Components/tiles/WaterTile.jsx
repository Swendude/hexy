import { Shape } from "react-konva";
const WaterTile = ({ hex, pos }) => {
  const renderWater = (ctx, shp) => {
    const s = hex.size.xRadius;
    const wave = (r, x, y, _ctx) => {
      ctx.moveTo(x, y);
      ctx.arc(-s * r + x, y, s * r, 0, Math.PI);
      ctx.moveTo(x, y);
      ctx.arc(s * r + x, y, s * r, Math.PI, 0, true);
    };

    ctx.beginPath();
    ctx.moveTo(0, 0);
    // ctx.lineTo(-0.5 * s, 0);
    wave(0.1, -4, -5, ctx);
    ctx.moveTo(0, 0);
    wave(0.1, s * -0.5, s * 0.3, ctx);
    ctx.moveTo(0, 0);
    wave(0.1, s * 0.5, s * 0.2, ctx);
    ctx.moveTo(0, 0);
    // ctx.moveTo(0, 0);

    // ctx.closePath();
    ctx.fillStrokeShape(shp);
  };
  return (
    <Shape
      x={pos.x}
      y={pos.y}
      strokeWidth={2}
      stroke={"#000"}
      opacity={0.2}
      sceneFunc={renderWater}
    />
  );
};
export default WaterTile;
