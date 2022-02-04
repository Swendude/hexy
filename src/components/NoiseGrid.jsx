const NoiseGrid = ({ grid, w, h }) => {
  return grid ? (
    <svg className="grid" width={w * 2} height={h * 2}>
      <rect x={0} y={0} width={w * 2} height={h * 2} fill={"#fff"} />
      {grid.map((val, i) => (
        <rect
          key={i}
          x={(i % w) * 2}
          y={Math.floor(i / w) * 2}
          width={2}
          height={2}
          fill={"#000"}
          opacity={val}
        />
      ))}
    </svg>
  ) : (
    <></>
  );
};

export default NoiseGrid;
