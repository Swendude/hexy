import { Shape } from "react-konva";
import { useState, useEffect } from "react";
const TouchTile = ({ pos, renderFunc, cycleFunc }) => {
  const [hover, setHover] = useState(false);
  return (
    <Shape
      x={pos.x}
      y={pos.y}
      opacity={hover ? 0.3 : 0}
      fill={"#fff"}
      sceneFunc={renderFunc}
      onMouseUp={cycleFunc}
      onTouchEnd={cycleFunc}
      onMouseOver={() => !hover && setHover(true)}
      onMouseOut={() => hover && setHover(false)}
    />
  );
};
export default TouchTile;
