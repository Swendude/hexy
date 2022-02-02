const WaterTile = ({ hex, hexD }) => {
  const renderWave = (hex, offsetX, offsetY, w, h) => {
    const hexPos = hex.toPoint().add({ x: offsetX, y: offsetY });
    return `M${hexPos.x},${hexPos.y} q ${w / 4} ${h} ${w / 2} 0 M${hexPos.x},${
      hexPos.y
    } q ${-w / 4} ${-h} ${-w / 2} 0`;
  };
  return (
    <g>
      <path
        d={renderWave(hex, 0, 0, hexD.w * 0.72, 2)}
        strokeWidth={2}
        stroke={"#000"}
        opacity={0.2}
      />
      <path
        d={renderWave(hex, 0, -0.12 * hexD.h, hexD.w * 0.61, 2)}
        strokeWidth={2}
        stroke={"#000"}
        opacity={0.2}
      />
      <path
        d={renderWave(hex, 0, 0.12 * hexD.h, hexD.w * 0.61, 2)}
        strokeWidth={2}
        stroke={"#000"}
        opacity={0.2}
      />
    </g>
  );
};
export default WaterTile;
