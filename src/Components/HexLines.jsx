import { Shape } from "react-konva"

const HexLines = ({lines}) => {
    console.log('render lines')
    const renderLines = (ctx, shp) => {
        ctx.beginPath();
        lines.forEach(line => {
          ctx.moveTo(line[0].x, line[0].y);
        
          const nextpointx = 0.8 * line[0].x + 0.2 * line[1].x;
          const nextpointy = 0.8 * line[0].y + 0.2 * line[1].y;
          ctx.lineTo(nextpointx, nextpointy);
            
          ctx.moveTo(line[1].x, line[1].y)
          const nextpointx_ = 0.8 * line[1].x + 0.2 * line[0].x;
          const nextpointy_ = 0.8 * line[1].y + 0.2 * line[0].y;
          ctx.lineTo(nextpointx_, nextpointy_);

          const nextpointx__ = 0.6 * nextpointx + 0.4 * nextpointx_;
          const nextpointy__ = 0.6 * nextpointy + 0.4 * nextpointy_;
          ctx.moveTo(nextpointx__, nextpointy__)
          
          const nextpointx___ = 0.6 * nextpointx_ + 0.4 * nextpointx;
          const nextpointy___ = 0.6 * nextpointy_ + 0.4 * nextpointy;
          ctx.lineTo(nextpointx___, nextpointy___)

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