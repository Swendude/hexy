import { Shape } from "react-konva";
const GrassTile = ({ hex, pos }) => {
  const renderGrass = (ctx, shp) => {
    const s = hex.size.xRadius;
    ctx.beginPath();

    for (let i = 8; i > 0; i--) {
      const r = s * 0.8 * Math.sqrt(Math.random());
      const randAngle = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(randAngle);
      const y = r * Math.sin(randAngle);
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + Math.ceil(s * 0.01));
    }
    ctx.fillStrokeShape(shp);
  };
  return (
    <Shape
      x={pos.x}
      y={pos.y}
      strokeWidth={2}
      stroke={"#000"}
      opacity={0.2}
      sceneFunc={renderGrass}
    />
  );
};
export default GrassTile;
