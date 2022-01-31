import { Shape } from "react-konva";
const MountainTile = ({ hex, pos }) => {
  const renderMountain = (ctx, shp) => {
    const s = hex.size.xRadius;
    ctx.beginPath();

    const w = s * 1.2;
    const h = s * 0.8;
    const x = 0;
    const y = 6;
    ctx.moveTo(x - 0.5 * w, y);
    ctx.lineTo(x, y - h);
    ctx.lineTo(x + 0.5 * w, y);

    ctx.fillStrokeShape(shp);
  };
  return (
    <Shape
      x={pos.x}
      y={pos.y}
      strokeWidth={2}
      stroke={"#000"}
      opacity={0.4}
      sceneFunc={renderMountain}
      fill={null}
    />
  );
};
export default MountainTile;
