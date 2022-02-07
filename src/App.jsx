import "./App.css";
import { useEffect, useState } from "react";
import { defineGrid, extendHex } from "honeycomb-grid";
import { getEdgeLines, uniqueLines, getAllHexEdges } from "./gridUtils";
import Hex from "./components/Hex";
import HexLines from "./components/HexLines";
import EdgeLines from "./components/EdgeLines";
import SimplexNoise from "simplex-noise";
import NoiseGrid from "./components/NoiseGrid";
import HexInspector from "./components/HexInspector";
import { showOrcs } from "./features/storymaster/storymasterSlice";
import InspectMarker from "./components/InspectMarker";
import { determineType } from "./utils";
import { useDispatch } from "react-redux";
import seedrandom from "seedrandom";
import SeedChanger from "./components/SeedChanger";
import { determineHexValue } from "./features/storymaster/heuristic";
import lifeforms from "./features/storymaster/lifeforms.json";

function App() {
  const [gridLines, setGridLines] = useState(null);
  const [edgeLines, setEdgeLines] = useState(null);
  const [hexD, setHexD] = useState({ w: 0, h: 0 });
  const [grid, setGrid] = useState(null);
  const [elevationGrid, setElevationGrid] = useState(null);
  const [tempGrid, setTempGrid] = useState(null);
  const [vegetationGrid, setVegetationGrid] = useState(null);
  const [seed, setSeed] = useState(null);
  const [generating, setGenerating] = useState(true);
  const dispatch = useDispatch();
  const size = 20;

  useEffect(() => {
    setSeed(Math.round(Math.random() * 1000000).toString());
  }, []);

  useEffect(() => {
    if (seed) {
      const rng = seedrandom(seed);
      const elevationNoise = new SimplexNoise(rng());
      const tempNoise = new SimplexNoise(rng());
      const vegNoise = new SimplexNoise(rng());

      const customHex = extendHex({
        size: size,
        origin: [0.5 * Math.sqrt(3) * size, 2 * size * 0.5],
      });

      const g = defineGrid(customHex);

      const baseGrid = g.rectangle({ width: 32, height: 26 });
      let elevation_vals = [];
      let temp_vals = [];
      let veg_vals = [];

      baseGrid.forEach((hex) => {
        const el_val = elevationNoise.noise2D(hex.x / 10, hex.y / 10);
        const t_val = tempNoise.noise2D(hex.x / 50, hex.y / 50);
        const v_val = vegNoise.noise2D(hex.x / 15, hex.y / 15);

        elevation_vals.push(el_val);
        temp_vals.push(t_val);
        veg_vals.push(v_val);

        hex.set({
          x: hex.x,
          y: hex.y,
          elevation: el_val,
          temperature: t_val,
          vegetation: v_val,
          typeName: determineType(el_val, t_val, v_val),
        });
      });

      for (const kin of lifeforms) {
        const determineKinValue = (h) =>
          determineHexValue(
            kin["type-preferences"],
            h.typeName,
            baseGrid
              .neighborsOf(h)
              .filter(Boolean)
              .map((hex) => hex.typeName)
          );
        const kin_vals = gridToArr(baseGrid).map((h) => determineKinValue(h));
        const max_eval = Math.max(...kin_vals);
        const winners = baseGrid.filter(
          (hex) => determineKinValue(hex) === max_eval
        );
        const winner = winners[Math.floor(rng() * winners.length)];

        winner.set({
          x: winner.x,
          y: winner.y,
          elevation: winner.elevation,
          temperature: winner.temperature,
          vegetation: winner.vegetation,
          typeName: kin.citytypes[0]["citytype-name"],
        });
      }

      setTempGrid(temp_vals);
      setElevationGrid(elevation_vals);
      setVegetationGrid(veg_vals);
      setGrid(baseGrid);
      setHexD({ w: baseGrid.get(0).width(), h: baseGrid.get(0).height() });
      const allHexEdges = getAllHexEdges(baseGrid);
      const uniques = uniqueLines(allHexEdges);
      const edges = uniqueLines(
        getEdgeLines(baseGrid, baseGrid.width, baseGrid.height)
      );
      setGridLines(uniques);
      setEdgeLines(edges);
    }
  }, [seed]);

  useEffect(() => {
    if (
      grid &&
      gridLines &&
      edgeLines &&
      elevationGrid &&
      tempGrid &&
      vegetationGrid
    ) {
      setGenerating(false);
    }
  }, [grid, gridLines, edgeLines, elevationGrid, tempGrid, vegetationGrid]);

  // Turns the grid object into an array object, usefull for mapping
  const gridToArr = (grid) => {
    const hexxes = [];
    grid.forEach((hex) => hexxes.push(hex));
    return hexxes;
  };

  return (
    <div className="App">
      {generating ? (
        <h3 className="generating">Generating..</h3>
      ) : (
        <div>
          <div className="map-wrapper">
            <HexInspector hexGrid={grid} />
            <svg
              className="Stage"
              viewBox={`${-0.55 * hexD.w} ${-0.2 * hexD.h} ${
                grid.pointWidth() + hexD.w * 0.1
              } ${grid.pointHeight() + hexD.h * 0.1}`}
              width={grid.pointWidth() + hexD.w * 2}
              height={grid.pointHeight() + hexD.h * 2}
            >
              <g>
                {gridToArr(grid).map((hex, i) => (
                  <Hex
                    key={i}
                    hex_i={i}
                    hex={hex}
                    hexD={hexD}
                    neighbors={grid
                      .neighborsOf(hex)
                      .filter(Boolean)
                      .map((hex) => hex.typeName)}
                  />
                ))}
              </g>
              <g>
                {gridLines ? <HexLines lines={gridLines} /> : <></>}
                {edgeLines ? <EdgeLines lines={edgeLines} /> : <></>}
                <InspectMarker hexGrid={grid} />
              </g>
            </svg>

            <div className="toggles">
              <span>Seed: {seed} </span>
              <SeedChanger setter={setSeed} />
              <button onClick={() => dispatch(showOrcs())}>Show orcs</button>
            </div>
            <div className="noise-grids">
              <div>
                <p>Elevation</p>
                <NoiseGrid
                  grid={elevationGrid}
                  w={grid.width}
                  h={grid.height}
                />
              </div>
              <div>
                <p>Temperature</p>
                <NoiseGrid grid={tempGrid} w={grid.width} h={grid.height} />
              </div>
              <div>
                <p>Vegetation</p>
                <NoiseGrid
                  grid={vegetationGrid}
                  w={grid.width}
                  h={grid.height}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
