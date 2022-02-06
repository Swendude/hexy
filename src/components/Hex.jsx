import { useState, useEffect } from "react";
import { determineRender } from "../utils";
import { useDispatch } from "react-redux";
import { select } from "../features/hexmap/hexmapSlice";

const Hex = ({ hex_i, hex, hexElevation, hexTemp, hexVegetation, hexD }) => {
  const [elevation, setElevation] = useState(null);
  const [hexPathStr, setHexPathStr] = useState(null);
  const [typePathStr, setTypePathStr] = useState(null);
  const [color, setColor] = useState(null);
  const [opacity, setOpacity] = useState(null);
  const [type, setType] = useState(null);
  const [temp, setTemp] = useState(null);
  const [vegetation, setVegetation] = useState(null);
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
    setVegetation(hexVegetation);
    setHexPathStr(hexPath(hex.corners().map((cor) => cor.add(hex.toPoint()))));
  }, [hex, hexD, hexElevation, hexTemp, hexVegetation]);

  useEffect(() => {
    const { color, path, typename, opacity } = determineRender(
      elevation,
      temp,
      vegetation
    );
    setColor(color);
    setType(typename);
    setTypePathStr(path);
    setOpacity(opacity);
  }, [elevation, temp, vegetation]);

  return !(type == null) && !(color == null) ? (
    <g>
      <path d={hexPathStr} fill={color} />
      {typePathStr && (
        <path
          d={typePathStr}
          stroke={"#000"}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          opacity={opacity}
          fill={"none"}
          transform={`translate(${hex.toPoint().x},${hex.toPoint().y}) scale(${
            hexD.w / 100
          })`}
        />
      )}
      {/* RESIST THE TEMPTATION TO MAKE THIS ONHOVER !!!!! */}
      <path
        d={hexPathStr}
        fill="#fff"
        opacity={0}
        onMouseUp={() => dispatch(select({ hex_i, type, temp, elevation }))}
        onTouchEnd={() => dispatch(select({ hex_i, type, temp, elevation }))}
      />
    </g>
  ) : (
    <></>
  );
};

export default Hex;
