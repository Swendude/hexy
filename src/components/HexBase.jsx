import { useState, useEffect } from "react";
import { determineRender } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../features/hexmap/hexmapSlice";

const HexBase = ({ hex_i, hex, neighbors, typeName }) => {
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
    </g>
  ) : (
    <></>
  );
};

export default HexBase;
