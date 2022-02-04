import { subDiv, generateRands as generateLineRands } from "../gridUtils";
import { useState } from "react";
import { useEffect, useCallback } from "react";

const HexLines = ({ lines }) => {
  const [rands, setRands] = useState(null);
  const generatePath = useCallback(
    (lines) => {
      if (rands) {
        let pathstr = "";
        lines.forEach((line, i) => {
          pathstr += `M${line[0].x}, ${line[0].y} `;

          const fwd = subDiv(line[0], line[1], 0.28);
          pathstr += `L${fwd.x}, ${fwd.y} `;
          pathstr += `M${line[1].x}, ${line[1].y} `;

          const bwd = subDiv(line[1], line[0], 0.28);
          pathstr += `L${bwd.x}, ${bwd.y} `;
          // pick two random points between gap
          let r1, r2;
          if (rands[i].winner === 0) {
            r1 = subDiv(fwd, bwd, rands[i].start);
            r2 = subDiv(fwd, bwd, rands[i].end);
          } else {
            r1 = subDiv(bwd, fwd, rands[i].start);
            r2 = subDiv(bwd, fwd, rands[i].end);
          }
          pathstr += `M${r1.x}, ${r1.y} `;
          pathstr += `L${r2.x}, ${r2.y} `;
        });
        return pathstr;
      } else {
        return "";
      }
    },
    [rands]
  );

  useEffect(() => {
    setRands(lines.map(() => generateLineRands()));
  }, [lines]);

  return (
    <path
      d={generatePath(lines)}
      stroke={"#1C0B19"}
      strokeWidth={1}
      opacity={0.6}
      strokeLinecap="butt"
    />
  );
};

export default HexLines;
