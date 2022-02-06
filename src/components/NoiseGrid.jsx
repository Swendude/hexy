import { mapRange } from "../utils";

const NoiseGrid = ({ grid, w, h }) => {
  return grid ? (
    <svg className="grid" width={w * 5} height={h * 5}>
      <rect x={0} y={0} width={w * 5} height={h * 5} fill={"#fff"} />
      {grid.map((val, i) => (
        <rect
          key={i}
          x={(i % w) * 5}
          y={Math.floor(i / w) * 5}
          width={5}
          height={5}
          fill={"#000"}
          opacity={mapRange(val, -1, 1, 0, 1)}
        />
      ))}
    </svg>
  ) : (
    <></>
  );
};

export default NoiseGrid;
