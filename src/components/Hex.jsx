import { useState, useEffect } from "react";
import { determineRender } from "../utils";
import { determineHexValue } from "../features/storymaster/heuristic";
import lifeforms from "../features/storymaster/lifeforms.json";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../features/hexmap/hexmapSlice";

const Hex = ({ hex_i, hex, hexD, neighbors }) => {
  const [hexPathStr, setHexPathStr] = useState(null);
  const [typePathStr, setTypePathStr] = useState(null);
  const [render, setRender] = useState(null);
  const dispatch = useDispatch();
  const showOrcs = useSelector((state) => state.storymaster.showOrcs);
  const hexPath = (corners) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr;
  };

  useEffect(() => {
    const render = determineRender(hex.typeName);
    setRender(render);
    setHexPathStr(hexPath(hex.corners()));
    setTypePathStr(render.pathFn());
  }, [hex]);

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
        fill={render.fill}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y}) scale(${
          hexD.w / 100
        })`}
      />
      {showOrcs && (
        <text
          fontFamily="monospace"
          fontSize="small"
          strokeWidth={2}
          transform={`translate(${hex.toPoint().x},${hex.toPoint().y})`}
        >
          {determineHexValue(
            lifeforms[0]["type-preferences"],
            hex.typeName,
            neighbors
          )}
        </text>
      )}

      {/* RESIST THE TEMPTATION TO MAKE THIS ONHOVER !!!!! */}
      <path
        d={hexPathStr}
        fill="#fff"
        opacity={0}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y})`}
        onMouseUp={() =>
          dispatch(
            select({
              hex_i,
              type: hex.typeName,
            })
          )
        }
        onTouchEnd={() =>
          dispatch(
            select({
              hex_i,
              type: hex.typeName,
            })
          )
        }
      />
    </g>
  ) : (
    <></>
  );
};

export default Hex;
