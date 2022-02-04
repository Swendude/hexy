import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HexInspector = ({ hexGrid }) => {
  const inspectedHex_i = useSelector((state) => state.hexmap.hoveredHex);
  const [hex, setHex] = useState(null);
  useEffect(() => {
    if (inspectedHex_i !== null) {
      setHex(hexGrid.get(inspectedHex_i));
    }
  }, [hexGrid, inspectedHex_i]);
  return (
    <div>
      <div className="hex-inspect">
        {hex ? (
          <>
            <span>
              Coords: {hex.x}, {hex.y}
            </span>
            <span>Elevation: {Math.round(hex.elevation * 100)}</span>
            <span>Temperature: {Math.round(hex.temperature * 100)}</span>
          </>
        ) : (
          <>
            <span>Coords: none</span>
            <span>Elevation: -</span>
            <span>Temperature: -</span>
          </>
        )}
      </div>
    </div>
  );
};

export default HexInspector;
