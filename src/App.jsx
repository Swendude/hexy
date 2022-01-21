import "./App.css";
import { Stage, Layer, Circle, Rect, Group } from "react-konva";
import { useEffect, useState } from "react";
import { defineGrid, extendHex } from "honeycomb-grid";
import Hex from "./Components/Hex";
function App() {
  const [grid, setGrid] = useState(null);

  useEffect(() => {
    const Hex = extendHex({ size: 18, color: "#B0BEA9" });
    const GridFactory = defineGrid(Hex);
    setGrid(GridFactory.rectangle({ width:20, height:20 }));
  }, []);

  useEffect(() => {
    if (grid) {
      console.log({ x: grid.pointWidth() / 2, y: grid.pointHeight() / 2 });
    }
  }, [grid]);
  // Turns the grid object into an array object, usefull for mapping
  const gridToArr = (grid) => {
    const hexxes = [];
    grid.forEach((hex) => hexxes.push(hex));
    return hexxes;
  };

  return (
    <div className="App">
      <h1>Hexheim</h1>
      {!grid ? (
        <p>Loading</p>
      ) : (
        <Stage className="Stage" width={grid.pointWidth()} height={grid.pointHeight()}>
          <Layer>
            <Rect x={0} y={0} width={grid.pointWidth()} height={grid.pointHeight()} fill={"#B0BEA9"} />
            <Group
              // offset={{
              //   x: -(grid.pointWidth() / 2),
              //   y: -(grid.pointHeight() / 2),
              // }}
            >
              {gridToArr(grid).map((hex, i) => (
                <Hex
                  key={i}
                  pos={hex.toPoint()}
                  corners={hex.corners()}
                  color={hex.color}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
      )}
    </div>
  );
}

export default App;
