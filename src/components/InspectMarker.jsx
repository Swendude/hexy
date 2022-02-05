import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const InspectMarker = ({ hexGrid }) => {
  const inspectedHex = useSelector((state) => state.hexmap.hoveredHex);
  const [hexPathStr, setHexPathStr] = useState(null);
  const [hex, setHex] = useState(null);
  useEffect(() => {
    const hex = hexGrid.get(0);
    setHexPathStr(hexPath(hex.corners().map((cor) => cor.add(hex.toPoint()))));
  }, [hexGrid]);

  useEffect(() => {
    if (inspectedHex !== null) {
      setHex(hexGrid.get(inspectedHex));
    }
  }, [inspectedHex, hexGrid]);

  const hexPath = (corners) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr + " Z";
  };
  return (
    hex && (
      <path
        d={hexPathStr}
        transform={`translate(${hex.toPoint().x} ${hex.toPoint().y})`}
        stroke={"#000"}
        opacity={0.2}
        fill={"none"}
        strokeWidth={3}
      />
    )
  );
};

export default InspectMarker;
