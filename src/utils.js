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

const _typeOptions = [
  {
    elevation_tn: "water",
    elevation_max: -0.6,
    temp_options: [
      {
        temp_tn: "ice",
        temp_max: -0.3,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#EDF5FD",
            pathFn: () => {
              return "M -36 -20 Q -18 -30 0 -20 Q 18 -10 36 -20 M -42 0 Q -21 -10 0 0 Q 21 10 42 0 M -36 20 Q -18 10 0 20 Q 18 30 36 20";
            },
          },
        ],
      },
      {
        temp_tn: "normal",
        temp_max: 1,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#BFDBF7",
            pathFn: () => {
              return `M -36 -20 Q -18 -30 0 -20 Q 18 -10 36 -20 M -42 0 Q -21 -10 0 0 Q 21 10 42 0 M -36 20 Q -18 10 0 20 Q 18 30 36 20`;
            },
          },
        ],
      },
    ],
  },
  {
    elevation_tn: "plains",
    elevation_max: 0.5,
    temp_options: [
      {
        temp_tn: "snowy",
        temp_max: -0.6,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#FCF5ED",
            pathFn: () => {
              return "M -25 15 L 5 15 M 9 15 L 15 15 M 19 15 L 21 15 M -15 -1 L 12 -1 M 17 -1 L 25 -1 M 29 -1 L 31 -1 M -35 -25 L -5 -25 M 0 -25 L 7 -25 M 10 -25 L 14 -25 M 16 -25 L 19 -25 M -19 30 L 13 30 M 17 30 L 23 30 M 25 30 L 26 30 M -27 -14 L -13 -14 M -11 -14 L -8 -14 M -6 -14 L -4 -14";
            },
          },
        ],
      },
      {
        temp_tn: "grassy",
        temp_max: 0.6,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#B6C197",
            pathFn: () => {
              return "M -27 -10 L -31 -17 M -26 -10 L -25 -14 M -25 -10 L -21 -14 M -23 -10 L -22 -12 M -21 -10 L -19 -12 M -29 -10 L -31 -12 M 14 13 L 11 10 M 15 13 L 14 8 M 17 13 L 15 9 M 20 13 L 22 10 M 19 13 L 20 8 M 15 -25 L 13 -31 M 16 -25 L 16 -29 M 20 -25 L 21 -29 M 23 -25 L 26 -27 M 13 -26 L 12 -27 M 18 -25 L 17 -33 M 22 -25 L 25 -31 M -20 23 L -21 21 M -19 23 L -19 22 M -18 23 L -16 22 M -17 23 L -16 23";
            },
          },
        ],
      },
      {
        temp_tn: "sandy",
        temp_max: 1,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#DDD78D",
            pathFn: () => {
              return "M -25 15 L 5 15 M 9 15 L 15 15 M 19 15 L 21 15 M -15 -1 L 12 -1 M 17 -1 L 25 -1 M 29 -1 L 31 -1 M -35 -25 L -5 -25 M 0 -25 L 7 -25 M 10 -25 L 14 -25 M 16 -25 L 19 -25 M -19 30 L 13 30 M 17 30 L 23 30 M 25 30 L 26 30 M -27 -14 L -13 -14 M -11 -14 L -8 -14 M -6 -14 L -4 -14";
            },
          },
        ],
      },
    ],
  },
  {
    elevation_tn: "mountain",
    elevation_max: 1,
    temp_options: [
      {
        temp_tn: "snowy",
        temp_max: -0.6,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#657B7A",
            opacity: 0.3,
            pathFn: () => {
              return "M -38 25 L 0 -35 L 38 25 M -15 -11 L -7 -6 L 0 -15 L 5 -10 L 12 -16";
            },
          },
        ],
      },
      {
        temp_tn: "normal",
        temp_max: 0.6,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#C46D5E",
            opacity: 0.4,
            pathFn: () => {
              return "M -38 25 L 0 -35 L 38 25";
            },
          },
        ],
      },
      {
        temp_tn: "mesa",
        temp_max: 1,
        veg_options: [
          {
            veg_tn: "",
            veg_val: null,
            color: "#F1D302",
            pathFn: () => {
              return "M -38 25 L -16 -15 L 16 -15 L 38 25";
            },
          },
        ],
      },
    ],
  },
];

const determineRender = (
  elevation,
  temp,
  vegetation,
  options = _typeOptions
) => {
  let el_choice = null;
  let temp_choice = null;
  let veg_choice = null;

  // Determine hex elevation type
  const sorted_elevation = [...options].sort(
    (a, b) => a.elevation_max - b.elevation_max
  );
  for (let elevation_option of sorted_elevation) {
    if (elevation <= elevation_option.elevation_max) {
      el_choice = elevation_option;
      break;
    }
  }
  if (el_choice === null) {
    throw Error("No elevation matched, please provide a valid elevation");
  }

  // Determine hex temperature type
  const sorted_temp = [...el_choice.temp_options].sort(
    (a, b) => a.temp_max - b.temp_max
  );
  for (let temp_option of sorted_temp) {
    if (temp < temp_option.temp_max) {
      temp_choice = temp_option;
      break;
    }
  }
  if (temp_choice === null) {
    throw Error("No temperature matched, please provide a valid temperature");
  }

  // Determine hex vegetation type
  for (let veg_option of temp_choice.veg_options) {
    if (veg_option.veg_val === vegetation) {
      veg_choice = veg_option;
    }
  }

  if (veg_choice === null) {
    throw Error("No vegetation matched, please provide a valid vegetation");
  }

  return {
    typename: [el_choice.elevation_tn, temp_choice.temp_tn, veg_choice.veg_tn]
      .join(" ")
      .trim(),
    color: veg_choice.color,
    path: veg_choice.pathFn(),
    opacity: veg_choice.opacity || 0.2,
  };
};

// };

// Render selection for hexes, should return and object with a path and color key
// Elevation should determine the first choice,
// then temp and finally vegetation, all three are values between 0 and 1

// const determineRender = (elevation, temp, vegetation) => {
//   for (const opt_i in typeOptions) {
//     const opt = typeOptions[opt_i];
//     if (elevation > opt.begin && elevation <= opt.end) {
//       setType(parseInt(opt_i));
//       for (const t_opt_i in typeOptions[opt_i].temp_options) {
//         const t_opt = typeOptions[opt_i].temp_options[t_opt_i];
//         if (temp > t_opt.begin && temp <= t_opt.end) {
//           setColor(t_opt.color);
//         }
//       }
//     }
//   }
// };

export { mapRange, determineRender };
