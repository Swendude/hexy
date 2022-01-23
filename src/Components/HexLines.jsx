import { Shape } from "react-konva"

const HexLines = ({lines}) => {
    console.log('render lines')
    const renderLines = (ctx, shp) => {
        ctx.beginPath();
        lines.forEach(line => {
          ctx.moveTo(line[0].x, line[0].y);
          ctx.lineTo(line[1].x, line[1].y)
        //   const next = corners[(i + 1) % corners.length];
        //   const nexthalfpointx = 0.7 * x + 0.3 * next.x;
        //   const nexthalfpointy = 0.7 * y + 0.3 * next.y;
        //   ctx.lineTo(nexthalfpointx, nexthalfpointy);
        //   ctx.moveTo(x, y);
        //   let prev = null;
        //   if (i == 0) {
        //     prev = corners[5];
        //   } else {
        //     prev = corners[i - 1];
        //   }
        //   const prevhalfpointx = 0.7 * x + 0.3 * prev.x;
        //   const prevhalfpointy = 0.7 * y + 0.3 * prev.y;
        //   ctx.lineTo(prevhalfpointx, prevhalfpointy);
        });
        ctx.fillStrokeShape(shp);
      };

    return (
        <Shape
        x={0}
        y={0}
        strokeWidth={1}
        stroke={'#000'}
        sceneFunc={renderLines}
      />
    )
}

export default HexLines