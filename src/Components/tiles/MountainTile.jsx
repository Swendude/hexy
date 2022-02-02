const MountainTile = ({ hex, hexD }) => {
  const renderMountain = (hex) => {
    const s = hexD.w;
    const w = s * 0.7;
    const h = s * 0.5;
    let pathStr = `M${hex.toPoint().x},${hex.toPoint().y + (hexD.h * 0.18)} 
                    m${0.5 * w},${0}
                    l${-0.5 * w},${-h}
                    l${-0.5 * w},${h}
                    `;
    return pathStr;
  };

  return (
    <path
      d={renderMountain(hex)}
      strokeWidth={hexD.w/20}
      stroke={"#000"}
      opacity={0.4}
      fill={"none"}
      strokeLinecap="round"
    />
  );
};
export default MountainTile;
