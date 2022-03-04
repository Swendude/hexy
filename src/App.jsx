import "./App.css";
import { useEffect, useState } from "react";
import { defineGrid, extendHex } from "honeycomb-grid";
import { getEdgeLines, uniqueLines, getAllHexEdges } from "./gridUtils";
import HexLines from "./components/HexLines";
import EdgeLines from "./components/EdgeLines";
import HexInspector from "./components/HexInspector";
import InspectMarker from "./components/InspectMarker";
import SeedChanger from "./components/SeedChanger";
import seedrandom from "seedrandom";
import HexWorld from "./components/HexWorld";
import lifeforms from "./features/storymaster/lifeforms.json";
import LifeFormInspector from "./components/LifeFormInspector";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HexRivers from "./components/HexRivers";

function App() {
  const [mapLines, setMapLines] = useState(null);
  const [grid, setGrid] = useState(null);
  const [seed, setSeed] = useState(null);
  // const dispatch = useDispatch();
  const size = 20;
  const hexD = { w: Math.sqrt(3) * size, h: 2 * size };

  useEffect(() => {
    setSeed(Math.round(Math.random() * 1000000).toString());

    const customHex = extendHex({
      size: size,
      origin: [Math.sqrt(3) * size * 0.5, 2 * size * 0.5],
    });
    const gridFactory = defineGrid(customHex);
    const baseGrid = gridFactory.rectangle({ width: 32, height: 26 });
    setGrid(baseGrid);

    const allHexEdges = getAllHexEdges(baseGrid);
    const uniques = uniqueLines(allHexEdges);
    const edges = uniqueLines(
      getEdgeLines(baseGrid, baseGrid.width, baseGrid.height)
    );
    setMapLines({ gridLines: uniques, edgeLines: edges });
  }, []);

  return (
    <div className="App">
      <Header />
      {grid && seed && (
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
              <HexWorld grid={grid} rng={seedrandom(seed)} />
              {mapLines && (
                <g>
                  <HexLines lines={mapLines.gridLines} />
                  <EdgeLines lines={mapLines.edgeLines} />
                  <InspectMarker hexGrid={grid} />
                </g>
              )}
            </svg>

            <div className="toggles">
              <SeedChanger seed={seed} setter={setSeed} />
              <LifeFormInspector lifeforms={lifeforms} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
