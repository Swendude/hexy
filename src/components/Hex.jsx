import { useState, useEffect } from "react";
import WaterTile from "./tiles/WaterTile";
import GrassTile from "./tiles/GrassTile";
import MountainTile from "./tiles/MountainTile";
import CrossTile from "./tiles/CrossTile";
import { typeOptions } from "../utils";
import { useDispatch } from "react-redux";
import { select } from "../features/hexmap/hexmapSlice";

const Hex = ({ hex_i, hex, hexElevation, hexTemp, hexD }) => {
  const [elevation, setElevation] = useState(null);
  const [hexPathStr, setHexPathStr] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);
  const [temp, setTemp] = useState(null);
  const dispatch = useDispatch();

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
  }, [hex, hexD, hexElevation, hexTemp]);

  useEffect(() => {
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

    determineRender(elevation, temp);
  }, [elevation, temp]);

  return !(type == null) && !(color == null) ? (
    <g>
      <path d={hexPathStr} fill={color} />

      {typeOptions[type].renderType === "Water" ? (
        <WaterTile hex={hex} hexD={hexD} />
      ) : typeOptions[type].renderType === "Plains" ? (
        <GrassTile hex={hex} hexD={hexD} />
      ) : typeOptions[type].renderType === "Mountain" ? (
        <MountainTile hex={hex} hexD={hexD} />
      ) : (
        <CrossTile hex={hex} hexD={hexD} />
      )}
      {/* RESIST THE TEMPTATION TO MAKE THIS ONHOVER !!!!! */}
      <path
        d={hexPathStr}
        fill="#fff"
        opacity={0}
        onMouseUp={() => dispatch(select(hex_i))}
        onTouchEnd={() => dispatch(select(hex_i))}
      />
    </g>
  ) : (
    <></>
  );
};

export default Hex;
