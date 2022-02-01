const MountainTile = ({ hex }) => {
  const renderMountain = (hex) => {
    const s = hex.size.xRadius;
    const w = s * 1.1;
    const h = s * 0.8;
    let pathStr = `M${hex.toPoint().x},${hex.toPoint().y + 6} 
                    m${0.5 * w},${0}
                    l${-0.5 * w},${-h}
                    l${-0.5 * w},${h}
                    `;
    return pathStr;
  };

  return (
    <path
      d={renderMountain(hex)}
      strokeWidth={2}
      stroke={"#000"}
      opacity={0.4}
      fill={"none"}
      strokeLinecap="round"
    />
  );
};
export default MountainTile;
