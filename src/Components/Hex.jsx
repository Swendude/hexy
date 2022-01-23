import { Shape, Circle, Text } from "react-konva";
import { useState, useEffect } from "react";
import { extendHex } from "honeycomb-grid";
const Hex = ({ pos, corners, pcolor }) => {
  const [color, setColor] = useState(pcolor);

  const renderHexCorns = (ctx, shp) => {
      console.log('hi')
    ctx.beginPath();
    corners.forEach(({ x, y }, i) => {
      ctx.moveTo(x, y);
      const next = corners[(i + 1) % corners.length];
      const nexthalfpointx = 0.7 * x + 0.3 * next.x;
      const nexthalfpointy = 0.7 * y + 0.3 * next.y;
      ctx.lineTo(nexthalfpointx, nexthalfpointy);
      ctx.moveTo(x, y);
      let prev = null;
      if (i == 0) {
        prev = corners[5];
      } else {
        prev = corners[i - 1];
      }
      const prevhalfpointx = 0.7 * x + 0.3 * prev.x;
      const prevhalfpointy = 0.7 * y + 0.3 * prev.y;
      ctx.lineTo(prevhalfpointx, prevhalfpointy);
    });
    ctx.fillStrokeShape(shp)
  };
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

  //   return ;
  return (
    <>
      {/* {corners.map(({ x, y }, i) => (
        <Text x={x} y={y} radius={5} text={i}></Text>
      ))} */}
      <Shape
        x={pos.x}
        y={pos.y}
        fill={color}
        strokeWidth={0}
        sceneFunc={renderHex}
        onMouseOver={() => setColor("red")}
        onMouseLeave={() => setColor(pcolor)}
      />
      <Shape
        x={pos.x}
        y={pos.y}
        stroke={"#000000"}
        strokeWidth={1}
        sceneFunc={renderHexCorns}
      />
      
    </>
  );
};

export default Hex;
