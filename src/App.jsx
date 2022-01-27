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

function App() {
  const [gridLines, setGridLines] = useState(null);
  const [edgeLines, setEdgeLines] = useState(null);
  const [noise, setNoise] = useState(new SimplexNoise());
  const [grid, setGrid] = useState(null);

  useEffect(() => {
    const hexf = extendHex({ size: 24, color: 0.1 });
    const g = defineGrid(hexf);
    const newGrid = g.rectangle({ width: 20, height: 20 });
    // const mappedGrid = newGrid.map((hex, i) => hex.set({ color: 0.5 }));
    // newGrid.set(0, hexf({ color: 0.6 }));
    newGrid.forEach((hex, i) => {
      newGrid.set(i, hexf({ color: 0.6 }));
    });
    console.log(g.isValidHex(newGrid.get(0)));
    setGrid(newGrid);
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
