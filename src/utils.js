const mapRange = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const withDefault = (f, d) => ({...d, ...f() });

const determineRender = (typename) =>
    withDefault(() => _determineRender(typename), {
        color: "#ff0000",
        pathFn: () => "M -35 35 L 35 -35 M 35 35 L -35 -35",
        opacity: 0.2,
        fill: "none",
        fillOpacity: 0,
    });

const _determineRender = (typename) => {
    switch (typename) {
        case "camp":
            return {
                color: "#DBD8AE",
                fill: "#000",
                opacity: 0.8,
                fillOpacity: 0.3,
                pathFn: () =>
                    "M -27 22.4 L -4 -19.2 L -11 -29.6 L -5 -29.6 L 0 -21.6 L 4 -29.6 L 10 -29.6 L 4 -19.2 L 25 22.4 L 10 22.4 L 0 3.2 L -10 22.4 Z",
            };
        case "hall":
            return {
                color: "#C46D5E",
                fill: "#000",
                opacity: 0.8,
                fillOpacity: 0.3,
                pathFn: () =>
                    "M 5 18 L 5 -2 L -6 -2 L -15 -2 L -15 18 L -42 18 L -34 -3 L -28 3 L -22 -22 L -12 -17 L -6 -33 L 8 -14 L 8 -14 L 8 -14 L 16 -24 L 22 -3 L 31 -8 L 38 2 L 38 2 L 45 18 L 5 18",
            };
        case "circle":
            return {
                color: "#B6C197",
                fill: "#000",
                opacity: 0.8,
                fillOpacity: 0.3,
                pathFn: () =>
                    "m -4 31 l -13.5 0 c 3.6 -8.1 2.7 -16.2 2.7 -26.1 q -9.9 0.9 -9.9 -9 q -9 -3.6 -4.5 -13.5 q -2.7 -8.1 4.5 -9 q 0.9 -7.2 7.2 -6.3 q 1.8 -2.7 7.2 -2.7 q 5.4 0 7.2 2.7 q 6.3 -0.9 7.2 6.3 q 7.2 0.9 3.6 9 q 5.4 9.9 -3.6 13.5 q 0 9.9 -9.9 9 c 0 9.9 -0.9 18 2.7 26.1 z m 26.1 0 l 7.2 0 l 0 -13.5 c -3.9 -4.5 -9.9 -8.1 -11.7 -13.5 c -1.8 5.4 -7.8 9 -11.7 13.5 l 0 13.5 l 7.2 0 l 0.9 -7.2 c 2.7 -10.8 4.5 -10.8 7.2 0 z",
            };
        case "hamlet":
            return {
                color: "#B6C197",
                fill: "#000",
                opacity: 0.8,
                fillOpacity: 0.3,
                pathFn: () =>
                    "M -28.8 20 L -28.8 -20 L 0 -30 L 28.8 -20 L 28.8 20 L 7.2 20 L 7.2 5 A 1.44 1 0 0 0 -7.2 5 L -7.2 20 Z M 14.4 -25 L 14.4 -32 L 23.04 -32 L 23.04 -22",
            };
        case "burrow":
            return {
                color: "#C46D5E",
                fill: "#000",
                opacity: 0.8,
                fillOpacity: 0.3,
                pathFn: () =>
                    "M 23 18 L 8 18 A 1 1 0 0 0 -32 18 L -38 18 L -37 -3 L -28 -11 L -20 -27 L -8 -28 L 0 -23 L 12 -27 L 26 -16 L 32 3 M 23 18 L 27 3 L 38 3 L 41 18 L 23 18",
            };
        case "water ice":
            return {
                color: "#EDF5FD",
                pathFn: () => {
                    return "M -19 -19 L -9 -17 L 1 13 L -7 18 L 5 39 L 30 29 L 34 12 L 33 -16 L 21 -20 L 22 -33 L -9 -39 L -23 -29 l 4 10 M -11 -1 L -8 9 L -18 19 L -22 12 L -17 3 L -11 -1 M -13 -6 L -21 -3 L -27 6 L -38 -2 L -31 -13 L -25 -15 L -17 -14 L -13 -6";
                },
            };
        case "water normal":
            return {
                color: "#BFDBF7",
                pathFn: () => {
                    return `M -36 -12 Q -21 -22 0 -12 Q 18 -2 36 -12 M -42 0 Q -21 -10 0 0 Q 21 10 42 0 M -36 12 Q -18 2 0 12 Q 17 22 36 12`;
                },
            };
        case "plains snowy barren":
            return {
                color: "#FCF5ED",
                pathFn: () => {
                    return "M -25 15 L 5 15 M 9 15 L 15 15 M 19 15 L 21 15 M -15 -1 L 12 -1 M 17 -1 L 25 -1 M 29 -1 L 31 -1 M -35 -25 L -5 -25 M 0 -25 L 7 -25 M 10 -25 L 14 -25 M 16 -25 L 19 -25 M -19 30 L 13 30 M 17 30 L 23 30 M 25 30 L 26 30 M -27 -14 L -13 -14 M -11 -14 L -8 -14 M -6 -14 L -4 -14";
                },
            };
        case "plains snowy trees":
            return {
                opacity: 0.4,
                color: "#FCF5ED",
                pathFn: () => {
                    return "M -21 15 L -21 10 L -25 10 C -23.3333 4.3333 -21.6667 -1.3333 -20 -7 L -15 10 L -19 10 L -19 15 M 3 31 L 3 22 L -4 22 L 5 -2 L 14 22 L 7 22 L 7 31 M 20 4 L 20 -3 L 17 -3 L 21 -25 L 25 -3 L 22 -3 L 22 4 L 22 4 M -10 -13 L -10 -17 L -12 -17 L -9 -28 L -6 -17 L -8 -17 L -8 -13";
                },
            };
        case "plains grassy barren":
            return {
                color: "#B6C197",
                pathFn: () => {
                    return "M -27 -10 L -31 -17 M -26 -10 L -25 -14 M -25 -10 L -21 -14 M -23 -10 L -22 -12 M -21 -10 L -19 -12 M -29 -10 L -31 -12 M 14 13 L 11 10 M 15 13 L 14 8 M 17 13 L 15 9 M 20 13 L 22 10 M 19 13 L 20 8 M 15 -25 L 13 -31 M 16 -25 L 16 -29 M 20 -25 L 21 -29 M 23 -25 L 26 -27 M 13 -26 L 12 -27 M 18 -25 L 17 -33 M 22 -25 L 25 -31 M -20 23 L -21 21 M -19 23 L -19 22 M -18 23 L -16 22 M -17 23 L -16 23";
                },
            };
        case "plains grassy trees":
            return {
                color: "#B6C197",
                opacity: 0.4,
                pathFn: () => {
                    return "M -8 34 C -3 25 -4 16 -4 5 Q -15 6 -15 -5 Q -25 -9 -20 -20 Q -23 -29 -15 -30 Q -14 -38 -7 -37 Q -5 -40 0 -40 M 8 34 C 3 25 4 16 4 5 Q 15 6 15 -5 Q 25 -9 20 -20 Q 23 -29 15 -30 Q 14 -38 7 -37 Q 5 -40 0 -40 M -32 21 C -30 17.4 -30.4 13.8 -30.4 9.4 Q -34.8 9.8 -34.8 5.4 Q -38.8 3.8 -36.8 -0.6 Q -38 -4.2 -34.8 -4.6 Q -34.4 -7.8 -31.6 -7.4 Q -30.8 -8.6 -28.8 -8.6 M -25.6 21 C -27.6 17.4 -27.2 13.8 -27.2 9.4 Q -22.8 9.8 -22.8 5.4 Q -18.8 3.8 -20.8 -0.6 Q -19.6 -4.2 -22.8 -4.6 Q -23.2 -7.8 -26 -7.4 Q -26.8 -8.6 -28.8 -8.6";
                },
            };
        case "plains sandy barren":
            return {
                color: "#DBD8AE",
                pathFn: () => {
                    return "M -25 15 L 5 15 M 9 15 L 15 15 M 19 15 L 21 15 M -15 -1 L 12 -1 M 17 -1 L 25 -1 M 29 -1 L 31 -1 M -35 -25 L -5 -25 M 0 -25 L 7 -25 M 10 -25 L 14 -25 M 16 -25 L 19 -25 M -19 30 L 13 30 M 17 30 L 23 30 M 25 30 L 26 30 M -27 -14 L -13 -14 M -11 -14 L -8 -14 M -6 -14 L -4 -14";
                },
            };
        case "plains sandy jungle":
            return {
                color: "#DBD8AE",
                opacity: 0.4,
                pathFn: () => {
                    return "M -6 38 C -7.8528 26.1229 -1 4 -6 -9 C -12.0984 -3.597 -21 -3 -26.9584 -1.4742 C -25 -7 -25 -10 -14 -15 C -20 -16 -25 -13 -31.204 -14.2113 C -25 -19 -20 -25 -11 -24 C -13 -28 -15 -32 -23 -36 C -13 -39 -4 -37 -2 -29 C 4 -34 8 -35 19 -33 C 11 -28 8.4226 -27.6558 7 -24 C 12 -23 21.8672 -18.457 23.9899 -9.9656 C 16 -10 13 -15 6 -14 C 7.0073 -9.9656 14 -11 16 5 C 8 1 2.7615 -5.7198 1 -10 C 5 7 0.6387 26.1229 4 38";
                },
            };
        case "hill snowy":
            return {
                color: "#F9ECDC",
                opacity: 0.3,
                pathFn: () => {
                    return "M -40 5 Q -15 -22 10 5 M 5 0 Q 20 -11 35 0 M -5 15 Q 15 -4 35 15";
                },
            };
        case "hill normal":
            return {
                color: "#C46D5E",
                opacity: 0.4,
                pathFn: () => {
                    return "M -40 5 Q -15 -22 10 5 M 5 0 Q 20 -11 35 0 M -5 15 Q 15 -4 35 15";
                },
            };
        case "hill dunes":
            return {
                color: "#DDD78D",
                opacity: 0.4,
                pathFn: () => {
                    return "M -40 5 Q -15 -22 10 5 M 5 0 Q 20 -11 35 0 M -5 15 Q 15 -4 35 15";
                },
            };
        case "mountain snowy":
            return {
                color: "#F3D9B9",
                opacity: 0.3,
                pathFn: () => {
                    return "M -30 25 L 0 -35 L 30 25 M -20 5 L -27 -5 L -41 19 M -7 -21 L -5 -13 L 0 -18 L 5 -10 L 10 -15";
                },
            };
        case "mountain normal":
            return {
                color: "#C46D5E",
                opacity: 0.4,
                pathFn: () => {
                    return "M -38 25 L -11 -30 L 15 25 M -2 -11 L 4 -20 L 20 4 M 10 15 L 23 1 L 35 16";
                },
            };
        case "mountain mesa":
            return {
                color: "#DDD78D",
                opacity: 0.4,
                pathFn: () => {
                    return "M -35 20 L -20 -30 L 10 -30 L 18 10 M 13 -15 L 25 -15 L 37 20 M 5 20 L 9 10 L 23 10 L 27 18";
                },
            };
        default:
            return {};
    }
};

const typeOptions = [{
        elevation_tn: "water",
        elevation_max: -0.5,
        temp_options: [{
                temp_tn: "ice",
                temp_max: -0.6,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
            {
                temp_tn: "normal",
                temp_max: 1,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
        ],
    },
    {
        elevation_tn: "plains",
        elevation_max: 0.4,
        temp_options: [{
                temp_tn: "snowy",
                temp_max: -0.6,
                veg_options: [{
                        veg_tn: "barren",
                        veg_max: 0.4,
                    },
                    {
                        veg_tn: "trees",
                        veg_max: 1,
                    },
                ],
            },
            {
                temp_tn: "grassy",
                temp_max: 0.6,
                veg_options: [{
                        veg_tn: "barren",
                        veg_max: 0.4,
                    },
                    {
                        veg_tn: "trees",
                        veg_max: 1,
                    },
                ],
            },
            {
                temp_tn: "sandy",
                temp_max: 1,
                veg_options: [{
                        veg_tn: "barren",
                        veg_max: 0.4,
                    },
                    {
                        veg_tn: "jungle",
                        veg_max: 1,
                    },
                ],
            },
        ],
    },
    {
        elevation_tn: "hill",
        elevation_max: 0.6,
        temp_options: [{
                temp_tn: "snowy",
                temp_max: -0.6,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
            {
                temp_tn: "normal",
                temp_max: 0.6,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
            {
                temp_tn: "dunes",
                temp_max: 1,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
        ],
    },
    {
        elevation_tn: "mountain",
        elevation_max: 1,
        temp_options: [{
                temp_tn: "snowy",
                temp_max: -0.6,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
            {
                temp_tn: "normal",
                temp_max: 0.6,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
            {
                temp_tn: "mesa",
                temp_max: 1,
                veg_options: [{
                    veg_tn: "",
                    veg_max: null,
                }, ],
            },
        ],
    },
];

const determineType = (elevation, temp, vegetation, options = typeOptions) => {
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
    if (temp_choice.veg_options.length === 1) {
        veg_choice = temp_choice.veg_options[0];
    } else {
        const sorted_veg = [...temp_choice.veg_options].sort(
            (a, b) => a.veg_max - b.veg_max
        );
        for (let veg_option of sorted_veg) {
            if (vegetation < veg_option.veg_max) {
                veg_choice = veg_option;
                break;
            }
        }
    }

    if (veg_choice === null) {
        throw Error("No vegetation matched, please provide a valid vegetation");
    }

    return [el_choice.elevation_tn, temp_choice.temp_tn, veg_choice.veg_tn]
        .join(" ")
        .trim();
};

export { mapRange, determineRender, determineType };