import { useEffect, useState } from "react";
import HexBase from "./HexBase";
import SimplexNoise from "simplex-noise";
import HexRivers from "./HexRivers";
import { determineType } from "../utils";
import { determineHexValue } from "../features/storymaster/heuristic";
import lifeforms from "../features/storymaster/lifeforms.json";
import HexRender from "./HexRender";
// Turns the grid object into an array object, usefull for mapping
const gridToArr = (grid) => {
  const hexes = [];
  grid.forEach((hex) => hexes.push(hex));
  return hexes;
};

const random_point_hex = (_hex, rng, w) => {
  const r = w * Math.sqrt(rng());
  const theta = rng() * 2 * Math.PI;
  const p = {
    x: _hex.toPoint().x + r * Math.cos(theta),
    y: _hex.toPoint().y + r * Math.sin(theta),
  };
  return p;
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
    let _world = grid.map((_hex) => {
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
        river: { from: [], to: [] },
        river_ctrl: random_point_hex(_hex, rng, _hex.size.xRadius * 0.5),
      });
    });
    // -- GENERATE RIVERS
    const river_count = Math.ceil(rng() * 8);
    // get the highest hexes
    const potential_sources = [];

    [...gridToArr(_world)]
      .filter((_hex) => _hex.typeName.startsWith("mountain normal"))
      .forEach((_hex) => {
        // Remove mountains that are next to each other
        if (
          potential_sources.filter((mnt) => _hex.distance(mnt) < 3).length === 0
        ) {
          potential_sources.push(_hex);
        }
      });

    potential_sources.sort((fst, snd) => snd.elevation - fst.elevation);
    const sources =
      potential_sources.length > river_count
        ? potential_sources.slice(0, river_count)
        : potential_sources;

    // highest_hexes.forEach((_hex) => _hex.set({ ..._hex }));

    for (const high_hex of sources) {
      let cur = high_hex;

      while (true) {
        const nbs = _world.neighborsOf(cur);

        const lowest_nbs_elevation = Math.min(
          ...nbs
            .filter((_hex) => _hex !== undefined)
            .map((_hex) => _hex.elevation)
        );
        const candidates = nbs.filter(
          (_hex) =>
            _hex === undefined || _hex.elevation === lowest_nbs_elevation
        );
        // Pick a random lowest neighbour/edge
        const winner = candidates[Math.floor(rng() * candidates.length)];
        cur.set({
          ...cur,
          river: { ...cur.river, to: [...cur.river.to, winner] },
        });
        // Hit a edge
        if (winner === undefined) {
          break;
        }
        winner.set({
          ...winner,
          river: { ...winner.river, from: [...winner.river.from, cur] },
        });
        if (winner.typeName.startsWith("water")) {
          break;
        } else {
          cur = winner;
        }
      }
    }
    // -- GENERATE INHABITANTS--
    const world = _world.map((_hex) => {
      const nbs = _world.neighborsOf(_hex).filter(Boolean);

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
    setWorld(_world);
  }, [grid, rng]);

  return (
    world && (
      <g>
        {gridToArr(world).map((hex, i) => (
          <HexBase key={i} hex_i={i} hex={hex} typeName={hex.typeName} />
        ))}
        <HexRivers
          sources={gridToArr(
            world.filter(
              (_hex) =>
                _hex.river.from.length === 0 && _hex.river.to.length !== 0
            )
          )}
        />
        {gridToArr(world).map((hex, i) => (
          <HexRender key={i} hex_i={i} hex={hex} typeName={hex.typeName} />
        ))}
      </g>
    )
  );
};

export default HexWorld;
