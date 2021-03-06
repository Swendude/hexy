import { useEffect, useState } from "react";
import Hex from "./Hex";
import SimplexNoise from "simplex-noise";

import { determineType } from "../utils";
import { determineHexValue } from "../features/storymaster/heuristic";
import lifeforms from "../features/storymaster/lifeforms.json";
// Turns the grid object into an array object, usefull for mapping
const gridToArr = (grid) => {
  const hexxes = [];
  grid.forEach((hex) => hexxes.push(hex));
  return hexxes;
};

const HexWorld = ({ grid, rng }) => {
  const [world, setWorld] = useState(null);

  useEffect(() => {
    console.time("worldgen");

    // -- GENERATE TERRAIN--
    const elevationNoise = new SimplexNoise(rng());
    const tempNoise = new SimplexNoise(rng());
    const vegNoise = new SimplexNoise(rng());
    // offset to a random point in the noise
    const [x_off, y_off] = [rng(), rng()];
    const terrain = grid.map((_hex) => {
      const [hexx, hexy] = [x_off + _hex.x, y_off + _hex.y];
      const el_val = elevationNoise.noise2D(hexx / 10, hexy / 10);
      const t_val = tempNoise.noise2D(hexx / 50, hexy / 50);
      const v_val = vegNoise.noise2D(hexx / 15, hexy / 15);
      return _hex.set({
        ..._hex,
        elevation: el_val,
        temperature: t_val,
        vegetation: v_val,
        typeName: determineType(el_val, t_val, v_val),
      });
    });

    // -- GENERATE INHABITANTS--
    const world = terrain.map((_hex) => {
      const nbs = terrain.neighborsOf(_hex).filter(Boolean);

      const kin_vals = {};
      for (const kin of lifeforms) {
        kin_vals[kin["kin-name-plural"]] = determineHexValue(
          kin["type-preferences"],
          _hex.typeName,
          [_hex, ...nbs].map((h) => h.typeName)
        );
      }
      return _hex.set({
        ..._hex,
        neighbors: nbs,
        kin_vals: kin_vals,
      });
    });

    const worldArray = gridToArr(world);
    for (const kin of lifeforms) {
      const highest = Math.max(
        ...worldArray.map((_hex) => _hex.kin_vals[kin["kin-name-plural"]])
      );
      const winners = world.filter(
        (_hex) => _hex.kin_vals[kin["kin-name-plural"]] === highest
      );
      const winner = winners[Math.floor(rng() * winners.length)];
      winner.set({ ...winner, typeName: kin.citytypes[0]["citytype-name"] });
    }

    console.timeEnd("worldgen");
    // BENCHMARK TRACKING
    // With Nbs: ~400ms
    // With Kin-prefs: ~420ms
    setWorld(world);
  }, [grid, rng]);

  return (
    world && (
      <g>
        {gridToArr(world).map((hex, i) => (
          <Hex key={i} hex_i={i} hex={hex} typeName={hex.typeName} />
        ))}
      </g>
    )
  );
};

export default HexWorld;
