import "./App.css";
import { Stage, Layer, Circle, Rect, Group } from "react-konva";
import { useEffect, useState } from "react";
import { defineGrid, extendHex } from "honeycomb-grid";
import { allEdges, uniqueLines } from "./gridUtils";
import Hex from "./Components/Hex";
import HexLines from "./Components/HexLines";
import { FpsView } from "react-fps";

function App() {
  const [grid, setGrid] = useState(null);
  const [gridLines, setGridLines] = useState(null);

  useEffect(() => {
    const Hex = extendHex({ size: 27, color: "#fff" });
    const GridFactory = defineGrid(Hex);
    setGrid(GridFactory.rectangle({ width: 15, height: 15 }));
  }, []);

  useEffect(() => {
    if (grid) {
      let gridEdges = [];
      grid.forEach((hex) => {
        gridEdges = gridEdges.concat(
          allEdges(
            hex.corners().map((cor) => ({
              x: cor.x + hex.toPoint().x,
              y: cor.y + hex.toPoint().y,
            }))
          )
        );
      });
      setGridLines(uniqueLines(gridEdges));
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
        <Stage
          className="Stage"
          width={grid.pointWidth() + 20}
          height={grid.pointHeight() + 20}
        >
          <Layer>
            <Group
              offset={{
                x: -10,
                y: -10,
              }}
            >
              {gridToArr(grid).map((hex, i) => (
                <Hex
                  key={i}
                  pos={hex.toPoint()}
                  corners={hex.corners()}
                  pcolor={hex.color}
                />
              ))}
              {gridLines ? <HexLines lines={gridLines} /> : <></>}
            </Group>
          </Layer>
        </Stage>
      )}
      <div>
        <FpsView />
      </div>
    </div>
  );
}

export default App;
