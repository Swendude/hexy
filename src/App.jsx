import "./App.css";
import { Stage, Layer, Circle, Rect, Group } from "react-konva";
import { useEffect, useState } from "react";
import { defineGrid, extendHex } from "honeycomb-grid";
import { getEdgeLines, allEdges, uniqueLines } from "./gridUtils";
import Hex from "./Components/Hex";
import HexLines from "./Components/HexLines";
import EdgeLines from "./Components/EdgeLines";
import { FpsView } from "react-fps";
import SimplexNoise from "simplex-noise";
import { mapRange } from "./utils";

function App() {
  const [gridLines, setGridLines] = useState(null);
  const [edgeLines, setEdgeLines] = useState(null);
  const [grid, setGrid] = useState(null);
  const size = 22;
  useEffect(() => {
    const seed = Math.random();
    const noise = new SimplexNoise();
    const customHex = extendHex({
      size: size,
      origin: [0.5 * Math.sqrt(3) * size, 2 * size * 0.5],
    });
    const g = defineGrid(customHex);
    const baseGrid = g.rectangle({ width: 22, height: 20 });

    baseGrid.map((hex) =>
      hex.set({
        x: hex.x,
        y: hex.y,
        elevation: mapRange(noise.noise2D(hex.x / 10, hex.y / 10), -1, 1, 0, 1),
      })
    );
    setGrid(baseGrid);
  }, []);

  useEffect(() => {
    if (grid) {
      let gridEdges = [];
      grid.forEach((hex) => {
        gridEdges = gridEdges.concat(
          allEdges(hex.corners().map((cor) => cor.add(hex.toPoint())))
        );
      });
      const uniques = uniqueLines(gridEdges);
      const edges = uniqueLines(getEdgeLines(grid, grid.width, grid.height));
      setGridLines(uniques);
      setEdgeLines(edges);
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
          offsetX={-size * 0.6}
          offsetY={-size * 0.6}
          width={grid.pointWidth() + size}
          height={grid.pointHeight() + size}
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
                  hex={hex}
                  pos={hex.toPoint()}
                  hexElevation={hex.elevation}
                />
              ))}
              {gridLines ? <HexLines lines={gridLines} /> : <></>}
              {edgeLines ? <EdgeLines lines={edgeLines} /> : <></>}
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
