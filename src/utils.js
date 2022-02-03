const mapRange = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

// type options for hexes
const typeOptions = [
  {
    renderType: "Water",
    begin: 0,
    end: 0.25,
    temp_options: [
      { begin: 0, end: 0.2, color: "#EDF5FD" },
      { begin: 0.2, end: 1, color: "#BFDBF7" },
    ],
  },
  {
    renderType: "Plains",
    begin: 0.25,
    end: 0.7,
    temp_options: [
      { begin: 0, end: 0.2, color: "#FCF5ED" },
      { begin: 0.2, end: 0.8, color: "#B6C197" },
      { begin: 0.8, end: 1, color: "#DDD78D" },
    ],
  },
  {
    renderType: "Mountain",
    begin: 0.7,
    end: 1,
    temp_options: [{ begin: 0, end: 1, color: "#C46D5E" }],
  },
];

export { mapRange, typeOptions };
