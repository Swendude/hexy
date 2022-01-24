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

export { uniqueLines, allEdges, subDiv, comparePoints };
