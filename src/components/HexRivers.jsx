import Bezier from "paths-js/bezier";

const generateRiverPath = (source) => {
  let points = [[source.toPoint().x, source.toPoint().y]];

  let cur = source;
  while (true) {
    const next = cur.river.to[0];
    if (next) {
      points.push([next.river_ctrl.x, next.river_ctrl.y]);
      cur = next;
    } else {
      break;
    }
  }

  return Bezier({
    points: points,
  }).path.print();
};

const HexRivers = ({ sources }) => {
  return (
    <g>
      {sources.map((source, i) => (
        <path
          key={i}
          d={generateRiverPath(source)}
          fill="none"
          stroke="#BFDBF7"
          strokeWidth={5}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
};

export default HexRivers;
