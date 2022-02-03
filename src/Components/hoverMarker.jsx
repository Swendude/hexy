import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HoverMarker = ({ hexGrid }) => {
  const inspectedHex = useSelector((state) => state.hexmap.hoveredHex);
  const [hexPathStr, setHexPathStr] = useState(null);
  useEffect(() => {
    if (inspectedHex) {
      const hex = hexGrid.get({ x: inspectedHex.x, y: inspectedHex.y });
      setHexPathStr(
        hexPath(hex.corners().map((cor) => cor.add(hex.toPoint())))
      );
    }
  }, [inspectedHex, hexGrid]);

  useEffect(() => {
    const hex = hexGrid.get(0);
    setHexPathStr(hexPath(hex.corners()));
  }, [hexGrid]);

  const hexPath = (corners) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr + " Z";
  };
  return <path d={hexPathStr} stroke={"#000"} fill={"none"} strokeWidth={2} />;
};

export default HoverMarker;
