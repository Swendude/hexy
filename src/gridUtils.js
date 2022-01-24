// Helper function to generate a list of edges from a list of corners (essentialy looping the edges with a wrap)
const allEdges = (corners) =>
  corners.map((current, i) => {
    const next = corners[i + 1] || corners[0];
    return [current, next];
  }, []);

// compares two points (objects with x and y keys)
const comparePoints = (p1, p2) => {
  if (p1.x === p2.x) {
    if (p1.y === p2.y) {
      return 0;
    } else if (p1.y > p2.y) {
      return 1;
    } else {
      return -1;
    }
  } else if (p1.x > p2.x) {
    return 1;
  } else {
    return -1;
  }
};
// Removes duplicates
const dedupLines = (lines) =>
  [...new Set(lines.map(JSON.stringify))].map(JSON.parse);

// Sorts lines
const sortLines = (lines) => lines.map((pair) => [...pair].sort(comparePoints));

// Gets unique lines from an array of lines (disregarding direction)
const uniqueLines = (lines) => dedupLines(sortLines(lines));

// Get a point at a certain division between two points
const subDiv = (from, to, division) => ({
  x: (1 - division) * from.x + division * to.x,
  y: (1 - division) * from.y + division * to.y,
});

const generateRands = () => ({
  start: Math.random().toFixed(2),
  end: Math.random().toFixed(2),
  winner: Math.round(Math.random()),
});

const getEdgeLines = (grid, w, h) => {
  const lefts = grid.filter(
    (hex) => hex.coordinates().x == 0 && hex.coordinates().y % 2 === 0
  );
  const rights = grid.filter(
    (hex) => hex.coordinates().x == w - 1 && hex.coordinates().y % 2 !== 0
  );
  const rights_inners = grid.filter(
    (hex) => hex.coordinates().x == w - 1 && hex.coordinates().y % 2 === 0
  );
  const lefts_inners = grid.filter(
    (hex) => hex.coordinates().x == 0 && hex.coordinates().y % 2 !== 0
  );
  const tops = grid.filter((hex) => hex.coordinates().y == 0);
  const bottoms = grid.filter((hex) => hex.coordinates().y == h - 1);

  const corns = (hs) =>
    hs.map((h) =>
      [...h.corners()].map((p) => ({
        x: p.x + h.toPoint().x,
        y: p.y + h.toPoint().y,
      }))
    );
  const left_corns = corns(lefts);
  const left_inner_corns = corns(lefts_inners);
  const top_corns = corns(tops);
  const bottom_corns = corns(bottoms);
  const right_corns = corns(rights);
  const right_inner_corns = corns(rights_inners);
  return [
    ...left_corns.map((c) => [...c].splice(4, 2)),
    ...left_corns.map((c) => [...c].splice(2, 2)),
    ...left_corns.map((c) => [...c].splice(3, 2)),
    ...left_inner_corns.map((c) => [...c].splice(3, 2)),
    ...top_corns.map((c) => [...c].splice(4, 2)),
    ...top_corns.map((c) => [c[5], c[0]]),
    ...bottom_corns.map((c) => [...c].splice(2, 2)),
    ...bottom_corns.map((c) => [...c].splice(1, 2)),
    ...right_corns.map((c) => [...c].splice(1, 2)),
    ...right_corns.map((c) => [c[5], c[0]]),
    ...right_corns.map((c) => [...c].splice(0, 2)),
    ...right_inner_corns.map((c) => [...c].splice(0, 2)),
  ];
};

export {
  getEdgeLines,
  generateRands,
  uniqueLines,
  allEdges,
  subDiv,
  comparePoints,
};
