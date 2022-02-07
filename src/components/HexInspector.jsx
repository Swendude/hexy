import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HexInspector = ({ hexGrid }) => {
  const inspectedHex = useSelector((state) => state.hexmap.hoveredHex);
  const [hex, setHex] = useState(null);
  useEffect(() => {
    if (inspectedHex !== null) {
      setHex(hexGrid.get(inspectedHex.hex_i));
    }
  }, [hexGrid, inspectedHex]);
  return (
    <div className="hex-inspector">
      <div className="hex-inspect">
        {hex ? (
          <>
            <span>
              Coords: {hex.x}, {hex.y}
            </span>
            <span>Type: {hex.typeName}</span>
            <span>Elevation: {Math.round(hex.elevation * 100)}</span>
            <span>Temperature: {Math.round(hex.temperature * 100)}</span>
            <span>Vegetation: {Math.round(hex.vegetation * 100)}</span>
          </>
        ) : (
          <>
            <span>Coords: -</span>
            <span>Type: -</span>
            <span>Elevation: -</span>
            <span>Temperature: -</span>
            <span>Vegetation: -</span>
          </>
        )}
      </div>
    </div>
  );
};

export default HexInspector;
