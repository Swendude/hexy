import { Shape, Circle, Text } from "react-konva";
import { memo, useState, useEffect } from "react";
import { extendHex } from "honeycomb-grid";

const Hex = ({ hex, pos, corners, hexElevation }) => {
  const [elevation, setElevation] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);

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
    setElevation(hexElevation);
  }, []);

  useEffect(() => {
    determineColor(hexElevation);
  }, [elevation]);

  const renderCross = (ctx, shp) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 5);
    ctx.moveTo(0, 0);
    ctx.lineTo(-5, -5);
    ctx.moveTo(0, 0);
    ctx.lineTo(5, -5);
    ctx.moveTo(0, 0);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fillStrokeShape(shp);
  };

  const renderWater = (ctx, shp) => {
    const s = hex.size.xRadius;
    const wave = (r, x, y, _ctx) => {
      ctx.moveTo(x, y);
      ctx.arc(-s * r + x, y, s * r, 0, Math.PI);
      ctx.moveTo(x, y);
      ctx.arc(s * r + x, y, s * r, Math.PI, 0, true);
    };

    ctx.beginPath();
    ctx.moveTo(0, 0);
    // ctx.lineTo(-0.5 * s, 0);
    wave(0.1, -4, -5, ctx);
    ctx.moveTo(0, 0);
    wave(0.1, s * -0.5, s * 0.3, ctx);
    ctx.moveTo(0, 0);
    wave(0.1, s * 0.5, s * 0.2, ctx);
    ctx.moveTo(0, 0);
    // ctx.moveTo(0, 0);

    // ctx.closePath();
    ctx.fillStrokeShape(shp);
  };

  const renderGrass = (ctx, shp) => {
    const s = hex.size.xRadius;
    ctx.beginPath();

    for (let i = 10; i > 0; i--) {
      const r = s * 0.48 * Math.sqrt(Math.random());
      const randAngle = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(randAngle);
      const y = r * Math.sin(randAngle);
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + Math.ceil(s * 0.01));
    }
    ctx.fillStrokeShape(shp);
  };
  const renderMountain = (ctx, shp) => {
    const s = hex.size.xRadius;
    ctx.beginPath();

    const w = s * 1.2;
    const h = s * 0.8;
    const x = 0;
    const y = 6;
    ctx.moveTo(x - 0.5 * w, y);
    ctx.lineTo(x, y - h);
    ctx.lineTo(x + 0.5 * w, y);

    ctx.fillStrokeShape(shp);
  };

  const determineColor = (elevation) => {
    if (elevation < 0.25) {
      setColor("#BFDBF7");
      setType("Water");
    } else if (elevation < 0.7) {
      setColor("#B6C197");
      setType("Grass");
    } else {
      setColor("#C46D5E");
      setType("None");
    }
  };

  return (
    <>
      {/* {render ? (
        
      ) : (
        <></>
      )} */}
      <Shape
        x={pos.x}
        y={pos.y}
        // opacity={elevation}
        stroke={color}
        strokeWidth={2}
        fill={color}
        sceneFunc={renderHex}
      />
      {type === "Water" ? (
        <Shape
          x={pos.x}
          y={pos.y}
          strokeWidth={2}
          stroke={"#000"}
          opacity={0.1}
          sceneFunc={renderWater}
        />
      ) : type === "Grass" ? (
        <Shape
          x={pos.x}
          y={pos.y}
          strokeWidth={2}
          stroke={"#000"}
          opacity={0.1}
          sceneFunc={renderGrass}
        />
      ) : (
        <Shape
          x={pos.x}
          y={pos.y}
          strokeWidth={2}
          stroke={"#000"}
          opacity={0.1}
          fill={color}
          sceneFunc={renderMountain}
        />
      )}

      {/* <Text text={hex} x={pos.x} y={pos.y} /> */}
    </>
  );
};

export default Hex;
