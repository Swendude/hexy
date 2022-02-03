import "./App.css";
import { useEffect, useState } from "react";
import { defineGrid, extendHex } from "honeycomb-grid";
import { getEdgeLines, allEdges, uniqueLines } from "./gridUtils";
import Hex from "./components/Hex";
import HexLines from "./components/HexLines";
import EdgeLines from "./components/EdgeLines";
import { FpsView } from "react-fps";
import SimplexNoise from "simplex-noise";
import { mapRange } from "./utils";
import NoiseGrid from "./components/NoiseGrid";

function App() {
  const [gridLines, setGridLines] = useState(null);
  const [edgeLines, setEdgeLines] = useState(null);
  const [hexD, setHexD] = useState({ w: 0, h: 0 });
  const [grid, setGrid] = useState(null);
  const [elevationGrid, setElevationGrid] = useState(null);
  const [tempGrid, setTempGrid] = useState(null);

  const size = 20;

  useEffect(() => {
    if (!grid || !elevationGrid || !tempGrid) {
      const elevationNoise = new SimplexNoise();
      const tempNoise = new SimplexNoise();

      const customHex = extendHex({
        size: size,
        origin: [0.5 * Math.sqrt(3) * size, 2 * size * 0.5],
      });

      const g = defineGrid(customHex);

      const baseGrid = g.rectangle({ width: 32, height: 26 });
      let elevation_vals = [];
      let temp_vals = [];

      baseGrid.map((hex) => {
        const el_val = mapRange(
          elevationNoise.noise2D(hex.x / 10, hex.y / 10),
          -1,
          1,
          0,
          1
        );
        const t_val = mapRange(
          tempNoise.noise2D(hex.x / 50, hex.y / 50),
          -1,
          1,
          0,
          1
        );

        elevation_vals.push(el_val);
        temp_vals.push(t_val);

        return hex.set({
          x: hex.x,
          y: hex.y,
          elevation: el_val,
          temperature: t_val,
        });
      });
      setTempGrid(temp_vals);
      setElevationGrid(elevation_vals);
      setGrid(baseGrid);
    }
  }, [elevationGrid, grid, tempGrid]);

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
        <div>
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
                <Hex
                  key={i}
                  hex={hex}
                  hexD={hexD}
                  hexElevation={hex.elevation}
                  hexTemp={hex.temperature}
                />
              ))}
            </g>
            <g>
              {gridLines ? <HexLines lines={gridLines} /> : <></>}
              {edgeLines ? <EdgeLines lines={edgeLines} /> : <></>}
            </g>
          </svg>
        </div>
      )}

      {elevationGrid && tempGrid ? (
        <div>
          <span>Elevation</span>
          <NoiseGrid grid={elevationGrid} w={grid.width} h={grid.height} />
          <span>Temp</span>
          <NoiseGrid grid={tempGrid} w={grid.width} h={grid.height} />
        </div>
      ) : (
        <></>
      )}

      <div>
        <FpsView />
      </div>
    </div>
  );
}

export default App;
