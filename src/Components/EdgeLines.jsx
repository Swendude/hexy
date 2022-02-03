const EdgeLines = ({ lines }) => {
  console.log("rerender edges");
  return (
    <g>
      {lines.map((line, i) => {
        return (
          <line
            key={i}
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
