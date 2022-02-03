import { useSelector } from "react-redux";

const HexInspector = () => {
  const inspectedHex = useSelector((state) => state.hexmap.hoveredHex);
  return (
    <div>
      <div class="hex-inspect">
        {inspectedHex ? (
          <>
            <span>
              Coords: {inspectedHex.x}, {inspectedHex.y}
            </span>
            <span>Elevation: {Math.round(inspectedHex.elevation * 100)}</span>
            <span>
              Temperature: {Math.round(inspectedHex.temperature * 100)}
            </span>
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
