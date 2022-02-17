const generateRiverPath = (source) => {
  let pathStr = `
    M${source.toPoint().x} ${source.toPoint().y} 
    Q ${source.toPoint().x} ${source.toPoint().y} 
    ${source.river.to[0].toPoint().x} ${source.river.to[0].toPoint().y} `;
  let cur = source;
  while (true) {
    const next = cur.river.to[0];
    if (next) {
      pathStr += `Q
      ${next.river_ctrl.x}
      ${next.river_ctrl.y} 
      ${next.toPoint().x}
      ${next.toPoint().y} `;
      cur = next;
    } else {
      break;
    }
  }
  return pathStr;
};

const HexRivers = ({ sources }) => {
  return (
    <g>
      {sources.map((source, i) => (
        <path
          key={i}
          d={generateRiverPath(source)}
          fill="none"
          stroke="blue"
          strokeWidth={6}
        />
      ))}
    </g>
  );
};

export default HexRivers;
