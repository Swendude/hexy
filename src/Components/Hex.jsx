import { useState, useEffect } from "react";
import { mapRange } from "../utils";
import WaterTile from "./tiles/WaterTile";
import GrassTile from "./tiles/GrassTile";
import MountainTile from "./tiles/MountainTile";
import CrossTile from "./tiles/CrossTile";

const Hex = ({ hex, hexElevation, hexTemp, hexD }) => {
  const [elevation, setElevation] = useState(null);
  const [hexPathStr, setHexPathStr] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);
  const [temp, setTemp] = useState(null);
  const [hover, setHover] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

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

  const hexPath = (corners) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr;
  };

  useEffect(() => {
    setElevation(hexElevation);
    setTemp(hexTemp);
    setHexPathStr(hexPath(hex.corners().map((cor) => cor.add(hex.toPoint()))));
  }, [hex, hexD])

  useEffect(() => {
    determineRender(elevation, temp);
  }, [elevation, temp]);

  const determineRender = (elevation, temp) => {
    for (const opt_i in typeOptions) {
      const opt = typeOptions[opt_i];
      if (elevation > opt.begin && elevation <= opt.end) {
        setType(parseInt(opt_i));
        for (const t_opt_i in typeOptions[opt_i].temp_options) {
          const t_opt = typeOptions[opt_i].temp_options[t_opt_i];
          if (temp > t_opt.begin && temp <= t_opt.end) {
            setColor(t_opt.color);
          }
        }
      }
    }
  };


  return !(type == null) && !(color == null) ? (
    <g>
      <path d={hexPathStr} fill={color} />

      {typeOptions[type].renderType === "Water" ? (
        <WaterTile hex={hex} hexD={hexD} hexD={hexD} />
      ) : typeOptions[type].renderType === "Plains" ? (
        <GrassTile hex={hex} hexD={hexD} />
      ) : typeOptions[type].renderType === "Mountain" ? (
        <MountainTile hex={hex} hexD={hexD} />
      ) : (
        <CrossTile hex={hex} hexD={hexD} />
      )}

      <path
        d={hexPathStr}
        opacity={hover ? 0.1 : 0}
        fill={"#000"}
        onMouseEnter={() => !hover && setHover(true)}
        onMouseLeave={() => hover && setHover(false)}
      />
    </g>
  ) : (
    <></>
  );
};

export default Hex;
