import { useCallback } from "react";

const CrossTile = ({ hex, hexD }) => {
  const renderCross = useCallback((hex) => {
    const hexPos = hex.toPoint();
    let pathStr = `M${hexPos.x},${hexPos.y} l5,5 
                    M${hexPos.x},${hexPos.y} l-5,5  
                    M${hexPos.x},${hexPos.y} l-5,-5 
                    M${hexPos.x},${hexPos.y} l5,-5`;
    return pathStr;
  }, []);
  return (
    <path
      d={renderCross(hex)}
      strokeWidth={hexD.w / 20}
      stroke={"#000"}
      opacity={0.2}
    />
  );
};
export default CrossTile;
