const EdgeLines = ({ lines }) => {
  return (
    <g>
      {lines.map((line) => {
        return (
          <line
            x1={line[0].x}
            y1={line[0].y}
            x2={line[1].x}
            y2={line[1].y}
            stroke={"#1C0B19"}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
      ;
    </g>
  );
};

export default EdgeLines;
