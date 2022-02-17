import { useState, useEffect } from "react";
import { determineRender } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../features/hexmap/hexmapSlice";

const Hex = ({ hex_i, hex, neighbors, typeName }) => {
  const [hexPathStr, setHexPathStr] = useState(null);
  const [typePathStr, setTypePathStr] = useState(null);
  const [render, setRender] = useState(null);
  const showLifeform = useSelector((state) => state.storymaster.showLifeform);
  const dispatch = useDispatch();
  const hexPath = (corners) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr;
  };
  const hexD = { w: hex.width(), h: hex.height() };

  useEffect(() => {
    const render = determineRender(typeName);
    setRender(render);
    setHexPathStr(hexPath(hex.corners()));
    setTypePathStr(render.pathFn());
  }, [hex, typeName]);

  return render ? (
    <g>
      <path
        d={hexPathStr}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y})`}
        fill={render.color}
      />
      )
      {/* {hex.river && hex.river.from && (
        <line
          x1={hex.river.from.toPoint().x}
          y1={hex.river.from.toPoint().y}
          x2={hex.toPoint().x}
          y2={hex.toPoint().y}
          strokeWidth={4}
          stroke={"#BFDBF7"}
        />
      )}
      {hex.river && hex.river.to && (
        <line
          x1={hex.toPoint().x}
          y1={hex.toPoint().y}
          x2={hex.river.to.toPoint().x}
          y2={hex.river.to.toPoint().y}
          strokeWidth={4}
          stroke={"#BFDBF7"}
        />
      )} */}
      <path
        d={typePathStr}
        stroke={"#000"}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        opacity={render.opacity}
        fillOpacity={render.fillOpacity}
        fill={render.fill}
        transform={`translate(${hex.toPoint().x},${hex.toPoint().y}) scale(${
          hexD.w / 100
        })`}
      />
      {showLifeform && (
        <g>
          <circle
            r={10}
            fill={"#000"}
            opacity={0.2}
            transform={`translate(${hex.toPoint().x},${hex.toPoint().y})`}
          />
          <text
            fontFamily="monospace"
            fontSize="small"
            textAnchor="middle"
            fill={"#fff"}
            opacity={0.8}
            transform={`translate(${hex.toPoint().x},${hex.toPoint().y + 3})`}
          >
            {hex.kin_vals[showLifeform]}
          </text>
        </g>
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
