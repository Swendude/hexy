import { useState, useEffect } from "react";
import { determineRender, determineType } from "../utils";
import { useDispatch } from "react-redux";
import { select } from "../features/hexmap/hexmapSlice";

const Hex = ({ hex_i, hex, hexElevation, hexTemp, hexVegetation, hexD }) => {
  const [hexPathStr, setHexPathStr] = useState(null);
  const [typePathStr, setTypePathStr] = useState(null);
  const [type, setType] = useState(null);
  const [render, setRender] = useState(null);
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
    const type_choice = determineType(hexElevation, hexTemp, hexVegetation);
    setType(type_choice);
    const render = determineRender(type_choice);
    setRender(render);
    console.log(render);
    setHexPathStr(hexPath(hex.corners()));
    setTypePathStr(render.pathFn());
  }, []);

  return render ? (
    <g>
      <path
        d={hexPathStr}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y})`}
        fill={render.color}
      />

      <path
        d={typePathStr}
        stroke={"#000"}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        opacity={render.opacity}
        fill={"none"}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y}) scale(${
          hexD.w / 100
        })`}
      />

      {/* RESIST THE TEMPTATION TO MAKE THIS ONHOVER !!!!! */}
      <path
        d={hexPathStr}
        fill="#fff"
        opacity={0}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y})`}
        onMouseUp={() =>
          dispatch(
            select({ hex_i, type, hexTemp, hexElevation, hexVegetation })
          )
        }
        onTouchEnd={() =>
          dispatch(
            select({ hex_i, type, hexTemp, hexElevation, hexVegetation })
          )
        }
      />
    </g>
  ) : (
    <></>
  );
};

export default Hex;
