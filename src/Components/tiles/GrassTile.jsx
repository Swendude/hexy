import { useState, useEffect } from "react";
const GrassTile = ({ hex, hexD }) => {
  const [points, setPoints] = useState(null);
  useEffect(() => {
    const dchoices = [...new Array(8)].map((i) => Math.random());
    const achoices = [...new Array(dchoices.length)].map((i) => Math.random());
    let points_ = [];
    const s = hexD.w * 0.4;
    for (let i = 0; i < dchoices.length; i++) {
      const r = s * 0.8 * Math.sqrt(dchoices[i]);
      const randAngle = achoices[i] * 2 * Math.PI;
      const x = r * Math.cos(randAngle);
      const y = r * Math.sin(randAngle);
      points_.push({ x, y });
    }
    setPoints(points_);
  }, [hexD]);

  return points ? (
    <g>
      {points.map((p, i) => {
        return (
          <rect
            key={i}
            x={p.x + hex.toPoint().x}
            y={p.y + hex.toPoint().y}
            width={hexD.w / 20}
            height={hexD.w / 50}
            fill={"#000"}
            opacity={0.2}
          />
        );
      })}
    </g>
  ) : (
    <></>
  );
};
export default GrassTile;
