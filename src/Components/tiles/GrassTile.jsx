import { Shape } from "react-konva";
import { useState, useEffect } from "react";
const GrassTile = ({ hex, pos }) => {
  const [distanceChoices, setDistanceChoices] = useState(null);
  const [angleChoices, setAngleChoices] = useState(null);
  useEffect(() => {
    const dchoices = [...new Array(8)].map((i) => Math.random());
    setDistanceChoices(dchoices);
    setAngleChoices([...new Array(dchoices.length)].map((i) => Math.random()));
  }, []);
  const renderGrass = (ctx, shp) => {
    const s = hex.size.xRadius;
    ctx.beginPath();

    for (let i = 0; i < distanceChoices.length; i++) {
      const r = s * 0.8 * Math.sqrt(distanceChoices[i]);
      const randAngle = angleChoices[i] * 2 * Math.PI;
      const x = r * Math.cos(randAngle);
      const y = r * Math.sin(randAngle);
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + Math.ceil(s * 0.01));
    }
    ctx.fillStrokeShape(shp);
  };
  return distanceChoices && angleChoices ? (
    <Shape
      x={pos.x}
      y={pos.y}
      strokeWidth={2}
      stroke={"#000"}
      opacity={0.2}
      sceneFunc={renderGrass}
    />
  ) : (
    <></>
  );
};
export default GrassTile;
