import "./App.css";
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
  const [hover, setHover]= useState(false);
  const [gridLines, setGridLines] = useState(null);
  const [edgeLines, setEdgeLines] = useState(null);
  const [hexD, setHexD] = useState({ w: 0, h: 0 });
  const [grid, setGrid] = useState(null);
  const size = 22;
  useEffect(() => {
    const noise = new SimplexNoise();
    const customHex = extendHex({
      size: size,
      origin: [0.5 * Math.sqrt(3) * size, 2 * size * 0.5],
    });
    const g = defineGrid(customHex);
    const baseGrid = g.rectangle({ width: 22, height: 20 });

    baseGrid.map((hex) => {
      return hex.set({
        x: hex.x,
        y: hex.y,
        elevation: mapRange(noise.noise2D(hex.x / 10, hex.y / 10), -1, 1, 0, 1),
      });
    });
    setGrid(baseGrid);
  }, []);

  useEffect(() => {
    if (grid) {
      
      setHexD({ w: grid.get(0).width(), h: grid.get(0).height() });
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
        <svg
          className="Stage"
          viewBox={`${-hexD.w} ${-hexD.h} ${grid.pointWidth() + hexD.w} ${
            grid.pointHeight() + hexD.h
          }`}
          width={grid.pointWidth() + hexD.w * 2}
          height={grid.pointHeight() + hexD.h * 2}
        >
          <g>
            {gridToArr(grid).map((hex, i) => (
              <Hex key={i} hex={hex} hexD={hexD} hexElevation={hex.elevation}/>
            ))}
          </g>
          <g>
            {gridLines ? <HexLines lines={gridLines} /> : <></>}
            {edgeLines ? <EdgeLines lines={edgeLines} /> : <></>}
          </g>
        </svg>
      )}
      <div>
        <FpsView />
      </div>
    </div>
  );
}

export default App;
