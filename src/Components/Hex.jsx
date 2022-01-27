import { Shape, Circle, Text } from "react-konva";
import { memo, useState, useEffect } from "react";
import { extendHex } from "honeycomb-grid";

const Hex = ({ pos, corners, pcolor }) => {
  const [color, setColor] = useState(null);

  const renderHex = (ctx, shp) => {
    const [firstCor, ...others] = corners;
    ctx.beginPath();
    ctx.moveTo(firstCor.x, firstCor.y);
    others.forEach(({ x, y }, i) => {
      ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStrokeShape(shp);
  };
  useEffect(() => {
    setColor(pcolor);
  }, []);
  // useEffect(() => {
  //   console.log(color);
  // }, [color]);

  return (
    <>
      {/* {corners.map(({ x, y }, i) => (
        <Text x={x} y={y} radius={5} text={i}></Text>
      ))} */}
      <Shape
        x={pos.x}
        y={pos.y}
        opacity={color}
        fill={"#000"}
        sceneFunc={renderHex}
      />
    </>
  );
};

export default Hex;
